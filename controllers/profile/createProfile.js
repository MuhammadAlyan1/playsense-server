const Profile = require('../../db/model/profile');
const User = require('../../db/model/user');

const createProfile = async (req, res) => {
  const user = req.user;
  const profileId = user.profileId;

  try {
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

    if (!profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please enter profileId'
      });
    }

    const newProfile = await Profile.create({
      profileId,
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
    });

    await User.findByIdAndUpdate(
      { _id: profileId },
      { profileId: newProfile?._id }
    );

    return res.status(201).json({
      success: true,
      data: newProfile,
      message: 'Successfully created profile'
    });
  } catch (error) {
    console.error('Error creating profile:', error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create profile' });
  }
};

module.exports = createProfile;
