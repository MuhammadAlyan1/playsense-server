const jwt = require('jsonwebtoken');

function generateRefreshToken(data) {
  const refreshToken = jwt.sign(
    { ...data },
    process.env.JWT_REFRESH_TOKEN_SECRET_KEY
  );

  return refreshToken;
}

module.exports = generateRefreshToken;
