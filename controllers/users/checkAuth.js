async function checkAuth(req, res) {
  const user = req.user;

  return res
    .status(200)
    .json({ success: true, message: 'User is signed in.', data: user });
}

module.exports = checkAuth;
