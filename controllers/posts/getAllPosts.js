const Post = require('../../db/model/post');

async function getAllPosts(req, res) {
  const { profileId } = req.query;
  try {
    let posts = [];
    if (profileId) {
      posts = await Post.find({ profileId }).sort({ createdAt: -1 }).populate({
        path: 'profileId',
        model: 'Profile'
      });
    } else {
      posts = await Post.find({}).sort({ createdAt: -1 }).populate({
        path: 'profileId',
        model: 'Profile'
      });
    }

    if (posts.length === 0) {
      return res
        .status(400)
        .json({ success: true, data: [], message: 'No posts found' });
    }

    return res.status(200).json({
      success: true,
      data: posts,
      message: 'Successfully retrieved all posts'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: [], message: 'Failed to retrieve posts' });
  }
}

module.exports = getAllPosts;
