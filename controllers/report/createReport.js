const Report = require('../../db/model/report');

const createReport = async (req, res) => {
  const user = req.user;
  const profileId = user.profileId;

  try {
    const { reportedProfileId, itemId, itemType, reason } = req.body;

    if (!profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please enter profileId'
      });
    }

    if (!reportedProfileId || !itemId || !itemType || !reason) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please enter all fields.'
      });
    }

    const newReport = await Report.create({
      reporterId: profileId,
      status: 'pending',
      reportedProfileId,
      itemId,
      itemType,
      reason
    });

    return res.status(201).json({
      success: true,
      data: newReport,
      message: 'Successfully created report'
    });
  } catch (error) {
    console.error('Error creating report:', error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create report' });
  }
};

module.exports = createReport;
