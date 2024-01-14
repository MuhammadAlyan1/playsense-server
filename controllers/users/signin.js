const User = require('../../db/model/user');
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
      roles: user.roles
    });

    const refreshToken = generateRefreshToken({
      id: user._id,
      roles: user.roles
    });

    await User.findByIdAndUpdate({ _id: user._id }, { refreshToken });

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });

    return res.status(200).json({
      success: true,
      data: {},
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
