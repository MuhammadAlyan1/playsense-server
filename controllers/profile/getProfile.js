const Profile = require('../../db/model/profile');
const User = require('../../db/model/user');

const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'User does not exists' });
    }

    const profileId = user.profileId;

    if (!profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'User does not have a profile'
      });
    }

    const profile = await Profile.findById(profileId).populate('userId', [
      'username',
      'email'
    ]);

    return res.status(201).json({
      success: true,
      data: profile,
      message: 'Successfully retrieve profile'
    });
  } catch (error) {
    console.error('Error getting profile:', error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to retrieve user profile'
    });
  }
};

module.exports = getProfile;
