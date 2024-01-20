const Post = require('../../db/model/post');

async function createPost(req, res) {
  const user = req.user;
  const userId = user.id;
  const { contents } = req.body;

  console.log({ userId, contents });
  console.log(req.body);
  if (!contents || !userId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields'
    });
  }

  try {
    const newPost = await Post.create({
      contents,
      userId
    });

    return res.status(201).json({
      success: true,
      data: newPost,
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
