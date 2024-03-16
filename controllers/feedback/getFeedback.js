const Feedback = require('../../db/model/feedback');
const Comment = require('../../db/model/comment');

const getFeedbackWithComments = async (req, res) => {
  try {
    const { feedbackId } = req.params;

    if (!feedbackId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please enter feedbackId'
      });
    }

    const feedback = await Feedback.findById(feedbackId)
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: {
          path: 'profileId',
          model: 'Profile'
        }
      })
      .populate({
        path: 'profileId',
        model: 'Profile'
      });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        data: {},
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      data: feedback,
      message: 'Feedback and comments retrieved successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: {},
      message: 'Error retrieving feedback and comments'
    });
  }
};

module.exports = getFeedbackWithComments;
