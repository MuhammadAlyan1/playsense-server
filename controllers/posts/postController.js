const Post = require('../../db/model/post');
const Comment = require('../../db/model/comment');

async function postController(req, res) {
  const user = req.user;
  const profileId = user.profileId;
  const { postId } = req.params;
  const { like, dislike, comment, commentContents } = req.body;

  if (!postId) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter post ID' });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Post does not exists' });
    }

    if (!like && !dislike && !comment) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please select like, dislike, or comment'
      });
    }

    if (like) {
      const isLiked = post.likedBy.includes(profileId);
      const update = isLiked
        ? { $pull: { likedBy: profileId } }
        : {
            $addToSet: { likedBy: profileId },
            $pull: { dislikedBy: profileId }
          };

      const updatedPost = await Post.findByIdAndUpdate(postId, update, {
        new: true
      });

      return res.status(200).json({
        success: true,
        data: updatedPost,
        message: isLiked
          ? 'Removed like from post successfully.'
          : 'Liked post succesfully.'
      });
    }

    if (dislike) {
      const isDisliked = post.dislikedBy.includes(profileId);

      const update = isDisliked
        ? { $pull: { dislikedBy: profileId } }
        : {
            $addToSet: { dislikedBy: profileId },
            $pull: { likedBy: profileId }
          };

      const updatedPost = await Post.findByIdAndUpdate(postId, update, {
        new: true
      });

      return res.status(200).json({
        success: true,
        data: updatedPost,
        message: isDisliked
          ? 'Removed dislike from post successfully.'
          : 'Disliked post successfully.'
      });
    }

    if (comment) {
      if (!commentContents) {
        return res.status(400).json({
          success: false,
          data: {},
          message: "Please enter comment's content."
        });
      }

      const newComment = await Comment.create({
        content: commentContents,
        profileId
      });

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment?._id } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        data: updatedPost,
        message: 'Comment added successfully'
      });
    }

    return res.status(400).json({
      success: true,
      data: post,
      message: 'Please select an action.'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to update post' });
  }
}

module.exports = postController;
