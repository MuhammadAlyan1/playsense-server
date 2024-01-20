const Profile = require('../../db/model/profile');
const User = require('../../db/model/user');

const createProfile = async (req, res) => {
  const user = req.user;
  const userId = user.id;

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

    if (!userId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please enter userId'
      });
    }

    const newProfile = await Profile.create({
      userId,
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
      { _id: userId },
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
