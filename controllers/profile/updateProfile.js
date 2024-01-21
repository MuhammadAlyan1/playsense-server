const Profile = require('../../db/model/profile');
const User = require('../../db/model/user');

const updateProfile = async (req, res) => {
  const user = req.user;
  const userId = user?.id;
  const profileId = user?.profileId;

  const {
    profilePicture,
    banner,
    platform,
    bio,
    country,
    twitchUrl,
    youtubeUrl,
    discordUsername,
    monitor,
    headphones,
    keyboard,
    mouse,
    mousepad
  } = req.body;

  try {
    const existingProfile = await Profile.findById(profileId);

    if (!existingProfile) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Profile does not exists'
      });
    }

    if (existingProfile.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Unauthorized to update this profile.'
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      {
        profilePicture: profilePicture || existingProfile.profilePicture,
        banner: banner || existingProfile.banner,
        platform: platform || existingProfile.platform,
        bio: bio || existingProfile.bio,
        country: country || existingProfile.country,
        twitchUrl: twitchUrl || existingProfile.twitchUrl,
        youtubeUrl: youtubeUrl || existingProfile.youtubeUrl,
        discordUsername: discordUsername || existingProfile.discordUsername,
        monitor: monitor || existingProfile.monitor,
        headphones: headphones || existingProfile.headphones,
        keyboard: keyboard || existingProfile.keyboard,
        mouse: mouse || existingProfile.mouse,
        mousepad: mousepad || existingProfile.mousepad
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

module.exports = updateProfile;
