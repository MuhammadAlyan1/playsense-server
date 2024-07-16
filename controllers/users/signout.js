const express = require('express');
const router = express.Router();

const User = require('../../db/model/user');

async function signout(req, res) {
  try {
    const userId = req?.user?.id;
    console.log(req.user);
    await User.updateOne({ _id: userId }, { refreshToken: null });

    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });

    return res.status(200).json({
      success: true,
      data: {},
      message: 'User successfully signed out.'
    });
  } catch (error) {
    console.error('Error during sign-out:', error);
    return res.status(500).json({
      success: false,
      data: {},
      message: 'Internal server error during sign-out.'
    });
  }
}

module.exports = signout;
