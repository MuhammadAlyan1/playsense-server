const User = require('../../db/model/user');

async function deleteUser(req, res) {
  const user = req.user;
  const userId = req.params.userId;
  if (!user.roles.includes('admin') && user.id !== userId) {
    return res.status(401).json({
      success: false,
      message: 'You do not have permission to delete this user.',
      data: {}
    });
  }

  try {
    const { deletedCount } = await User.deleteOne({ _id: user.id });

    if (deletedCount === 1) {
      return res.status(200).json({
        success: true,
        message: 'Successfully deleted user.',
        data: {}
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: 'User does not exists.', data: {} });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Failed to delete user.', data: {} });
  }
}

module.exports = deleteUser;
