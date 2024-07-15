const Profile = require('../../db/model/profile');
const Report = require('../../db/model/report');

const getAllReports = async (req, res) => {
  try {
    const user = req.user;
    const profileId = user?.profileId;

    if (!profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Profile does not exists'
      });
    }

    const profile = await Profile.findById({ _id: profileId });

    if (
      !profile?.roles?.includes('admin') &&
      !profile?.roles?.includes('moderator')
    ) {
      return res.status(403).json({
        success: false,
        data: [],
        message:
          'You do you not the required privileges to perform this action.'
      });
    }

    const allReports = await Report.find({})
      .populate({ path: 'reporterId', model: 'Profile' })
      .populate({ path: 'reportedProfileId', model: 'Profile' });

    return res.status(200).json({
      success: true,
      data: allReports,
      message: 'Successfully retrieve all reports'
    });
  } catch (error) {
    console.error('Error retrieving reports:', error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to retrieve user reports'
    });
  }
};

module.exports = getAllReports;
