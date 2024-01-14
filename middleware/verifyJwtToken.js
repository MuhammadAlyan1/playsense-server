const jwt = require('jsonwebtoken');

function verifyJwtToken(req, res, next) {
  const accessToken = req?.cookies?.accessToken;

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      message: 'Please provide access token',
      data: {}
    });
  }

  jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    (error, user) => {
      if (error) {
        return res.status(403).json({
          success: false,
          message: 'Invalid JWT access token',
          data: {}
        });
      } else {
        req.user = user;
        next();
      }
    }
  );
}

module.exports = verifyJwtToken;
