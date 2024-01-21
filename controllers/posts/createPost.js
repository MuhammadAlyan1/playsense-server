const Post = require('../../db/model/post');

async function createPost(req, res) {
  const user = req.user;
  const profileId = user.profileId;
  const { contents } = req.body;

  if (!profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please set up your profile.'
    });
  }

  if (!contents || !profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields'
    });
  }

  try {
    const newPost = await Post.create({
      contents,
      profileId
    });

    const newPopulatedPost = await Post.findById({ _id: newPost._id }).populate(
      {
        path: 'profileId',
        model: 'Profile'
      }
    );

    return res.status(201).json({
      success: true,
      data: newPopulatedPost,
      message: 'Successfully created post'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create post' });
  }
}

module.exports = createPost;
