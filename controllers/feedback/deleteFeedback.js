const Feedback = require('../../db/model/feedback');
const { ObjectId } = require('mongoose').Types;

async function deleteFeedback(req, res) {
  const user = req.user;
  const profileId = user?.profileId;

  const { feedbackId } = req.params;

  if (!feedbackId) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter feedback ID' });
  }

  try {
    const feedback = await Feedback.findById({ _id: feedbackId });

    if (!feedback) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: 'Feedback does not exist' });
    }

    console.log(
      'FEEDBACK ID: ',
      feedback.profileId.toString(),
      'USER ID: ',
      profileId
    );

    // if (!user.roles.includes('admin') && feedback?.profileId?.toString() !== profileId) {
    if (feedback?.profileId?.toString() !== profileId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'You do not have permission to delete this feedback'
      });
    }
    const { deletedCount } = await Feedback.deleteOne({ _id: feedback.id });

    if (deletedCount === 1) {
      return res.status(200).json({
        success: true,
        data: {},
        message: 'Successfully deleted feedback'
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to delete feedback' });
  }
}

module.exports = deleteFeedback;
