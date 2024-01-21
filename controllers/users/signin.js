const User = require('../../db/model/user');
const Profile = require('../../db/model/profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateAccessToken = require('../../utils/generateAccessToken');
const generateRefreshToken = require('../../utils/generateRefreshToken');

async function signin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter all fields.' });
  }

  try {
    // Check if the email already exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'User does not exists.'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        data: {},
        message: 'Incorrect password.'
      });
    }

    const accessToken = generateAccessToken({
      id: user._id,
      profileId: user.profileId,
      roles: user.roles
    });

    const refreshToken = generateRefreshToken({
      id: user._id,
      profileId: user.profileId,
      roles: user.roles
    });

    await User.findByIdAndUpdate({ _id: user._id }, { refreshToken });
    const userProfile = await Profile.findOne({ userId: user._id });

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    return res.status(200).json({
      success: true,
      data: {
        _id: userProfile._id,
        userId: userProfile.userId,
        username: userProfile.username,
        roles: userProfile.roles,
        platform: userProfile.platform,
        bio: userProfile.bio,
        profilePicture: userProfile.profilePicture,
        banner: userProfile.banner,
        country: userProfile.country,
        twitchUrl: userProfile.twitchUrl,
        youtubeUrl: userProfile.youtubeUrl,
        twitterUrl: userProfile.twitterUrl,
        discordUsername: userProfile.discordUsername,
        monitor: userProfile.monitor,
        keyboard: userProfile.keyboard,
        headphones: userProfile.headphones,
        mouse: userProfile.mouse,
        mousepad: userProfile.mousepad,
        createdAt: userProfile.createdAt,
        updatedAt: userProfile.updatedAt,
        accessToken: accessToken
      },
      message: 'Successfully logged in.'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to login.'
    });
  }
}

module.exports = signin;
