const Profile = require('../../db/model/profile');
async function checkAuth(req, res) {
  const user = req.user;
  const profileId = user?.profileId;
  const profile = await Profile.findById({ _id: profileId });
  return res
    .status(200)
    .json({ success: true, message: 'User is signed in.', data: profile });
}

module.exports = checkAuth;
