const Post = require('../../db/model/post');
const { ObjectId } = require('mongoose').Types;

async function deletePost(req, res) {
  const user = req.user;
  const profileId = user?.id;

  const { postId } = req.params;

  if (!postId) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter post ID' });
  }

  try {
    const post = await Post.findById({ _id: postId });

    if (!post) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Post does not exist' });
    }

    console.log('POST ID: ', post.profileId, 'USER ID: ', profileId);

    // if (!user.roles.includes('admin') && post?.profileId?.toString() !== profileId) {
    if (post?.profileId?.toString() !== profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'You do not have permission to delete this post'
      });
    }
    const { deletedCount } = await Post.deleteOne({ _id: post.id });

    if (deletedCount === 1) {
      return res.status(200).json({
        success: true,
        data: {},
        message: 'Successfully deleted post'
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to delete post' });
  }
}

module.exports = deletePost;
