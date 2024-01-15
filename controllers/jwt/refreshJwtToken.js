const jwt = require('jsonwebtoken');
const User = require('../../db/model/user');
const generateAccessToken = require('../../utils/generateAccessToken');
const generateRefreshToken = require('../../utils/generateRefreshToken');

async function refreshJwtToken(req, res) {
  const refreshToken = req?.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      success: false,
      message: 'Please provide JWT refresh token.',
      data: {}
    });
  }

  const refreshTokenRecord = await User.findOne({ refreshToken });

  if (!refreshTokenRecord) {
    return res.status(401).json({
      success: false,
      message: 'Invalid refresh token.',
      data: {}
    });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
    (error, user) => {
      if (error) {
        return res.status(401).json({
          success: false,
          message: 'Please provide valid a refresh token.',
          data: {}
        });
      }

      const newAccessToken = generateAccessToken(user.data);

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true
      });

      return res.status(200).json({
        success: true,
        data: { accessToken: newAccessToken },
        message: 'Successfully generated new access token.'
      });
    }
  );
}

module.exports = refreshJwtToken;
