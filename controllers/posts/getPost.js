const Post = require('../../db/model/post');
const Comment = require('../../db/model/comment');
const getPostWithComments = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please enter postId'
      });
    }

    const post = await Post.findById(postId)
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'profileId',
          model: 'Profile'
        }
      })
      .populate({
        path: 'profileId',
        model: 'Profile'
      });

    if (!post) {
      return res.status(404).json({
        success: false,
        data: {},
        message: 'Post not found'
      });
    }

    res.status(200).json({
      success: true,
      data: post,
      message: 'Post and comments retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: {},
      message: 'Error retrieving post and comments'
    });
  }
};

module.exports = getPostWithComments;
