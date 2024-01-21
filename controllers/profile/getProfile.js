const Profile = require('../../db/model/profile');
const User = require('../../db/model/user');

const getProfile = async (req, res) => {
  try {
    const { profileId } = req.params;

    if (!profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Profile does not exists'
      });
    }

    const profile = await Profile.findById({ _id: profileId });

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
