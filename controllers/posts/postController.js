const Post = require('../../db/model/post');
const Comment = require('../../db/model/comment');

async function postController(req, res) {
  const user = req.user;
  const userId = user.id;
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
      const isLiked = post.likedBy.includes(userId);
      const update = isLiked
        ? { $pull: { likedBy: userId } }
        : { $addToSet: { likedBy: userId }, $pull: { dislikedBy: userId } };

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
      const isDisliked = post.dislikedBy.includes(userId);

      const update = isDisliked
        ? { $pull: { dislikedBy: userId } }
        : { $addToSet: { dislikedBy: userId }, $pull: { likedBy: userId } };

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
        userId
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
