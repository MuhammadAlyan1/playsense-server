const Feedback = require('../../db/model/feedback');

async function getAllFeedback(req, res) {
  const { profileId } = req.query;
  try {
    let allFeedback = [];
    if (profileId) {
      allFeedback = await Feedback.find({ profileId })
        .sort({ createdAt: -1 })
        .populate({
          path: 'profileId',
          model: 'Profile'
        });
    } else {
      allFeedback = await Feedback.find({}).sort({ createdAt: -1 }).populate({
        path: 'profileId',
        model: 'Profile'
      });
    }

    if (allFeedback.length === 0) {
      return res
        .status(400)
        .json({ success: true, data: [], message: 'No feedback found' });
    }

    return res.status(200).json({
      success: true,
      data: allFeedback,
      message: 'Successfully retrieved all feedback'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      data: [],
      message: 'Failed to retrieve feedback'
    });
  }
}

module.exports = getAllFeedback;
