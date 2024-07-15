const Profile = require('../../db/model/profile');
const User = require('../../db/model/user');

const assignRoles = async (req, res) => {
  const user = req.user;
  const profileId = user?.profileId;

  const { selectedUserProfileId, roles } = req.body;

  try {
    const authenticatedUserProfile = await Profile.findById(profileId);
    const selectedUserProfile = await Profile.findById(selectedUserProfileId);

    if (!selectedUserProfile) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Profile does not exists'
      });
    }

    if (!roles || roles.length === 0) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please provide roles'
      });
    }

    if (!authenticatedUserProfile?.roles?.includes('admin')) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Unauthorized to update this profile.'
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      selectedUserProfileId,
      {
        roles
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedProfile,
      message: 'Successfully updated profile'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to update profile'
    });
  }
};

module.exports = assignRoles;
