const jwt = require('jsonwebtoken');

function generateAccessToken(data) {
  const accessToken = jwt.sign(
    { ...data },
    process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: '15m' }
  );

  return accessToken;
}

module.exports = generateAccessToken;
