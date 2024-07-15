const Profile = require('../../db/model/profile');
const User = require('../../db/model/user');

const getProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { fetchAllProfiles } = req.query;

    if (!profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Profile does not exists'
      });
    }

    const profile = await Profile.findById({ _id: profileId });

    if (!fetchAllProfiles) {
      return res.status(201).json({
        success: true,
        data: profile,
        message: 'Successfully retrieve profile'
      });
    }

    if (
      !profile?.roles?.includes('admin') &&
      !profile?.roles?.includes('moderator')
    ) {
      return res.status(403).json({
        success: false,
        data: [],
        message:
          'You do you not the required privileges to perform this action.'
      });
    }

    const allProfiles = await Profile.find({});
    return res.status(200).json({
      success: true,
      data: allProfiles,
      message: 'Successfully retrieve all profiles'
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
