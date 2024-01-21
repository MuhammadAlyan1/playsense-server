const User = require('../../db/model/user');
const Profile = require('../../db/model/profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateAccessToken = require('../../utils/generateAccessToken');
const generateRefreshToken = require('../../utils/generateRefreshToken');

async function signup(req, res) {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter all fields.' });
  }

  try {
    // Check if the username already exists in the database
    const existingUser = await Profile.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Username already exists.'
      });
    }

    // Check if the email already exists in the database
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Email is already in use.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword
    });

    console.log({ userId: newUser.id, username });

    const newProfile = await Profile.create({
      userId: newUser._id,
      username
    });

    const accessToken = generateAccessToken({
      id: newUser?._id,
      profileId: newProfile?._id,
      roles: newProfile.roles
    });

    const refreshToken = generateRefreshToken({
      id: newUser._id,
      profileId: newProfile?._id,
      roles: newProfile.roles
    });

    await User.findByIdAndUpdate(
      { _id: newUser._id },
      { refreshToken, profileId: newProfile._id }
    );
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    return res.status(201).json({
      success: true,
      data: {
        _id: newProfile._id,
        userId: newProfile.userId,
        username: newProfile.username,
        roles: newProfile.roles,
        platform: newProfile.platform,
        bio: newProfile.bio,
        profilePicture: newProfile.profilePicture,
        banner: newProfile.banner,
        country: newProfile.country,
        twitchUrl: newProfile.twitchUrl,
        youtubeUrl: newProfile.youtubeUrl,
        twitterUrl: newProfile.twitterUrl,
        discordUsername: newProfile.discordUsername,
        monitor: newProfile.monitor,
        keyboard: newProfile.keyboard,
        headphones: userProfile.headphones,
        mouse: newProfile.mouse,
        mousepad: newProfile.mousepad,
        createdAt: newProfile.createdAt,
        updatedAt: newProfile.updatedAt,
        accessToken: accessToken
      },
      message: 'Successfully created new user.'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'There was an error while creating an account.'
    });
  }
}

module.exports = signup;
