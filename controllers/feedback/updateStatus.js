const Feedback = require('../../db/model/feedback');
const Profile = require('../../db/model/profile');

const updateStatus = async (req, res) => {
  const user = req.user;
  const profileId = user?.profileId;

  const { status } = req.body;
  const { feedbackId } = req.params;

  try {
    const authenticatedUserProfile = await Profile.findById(profileId);

    if (!status || !feedbackId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please provide updated feedback status'
      });
    }

    if (
      !authenticatedUserProfile?.roles?.includes('admin') &&
      !authenticatedUserProfile?.roles?.includes('moderator') &&
      !authenticatedUserProfile?.roles?.includes('game developer')
    ) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Unauthorized to update this profile.'
      });
    }

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      {
        status
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      data: updatedFeedback,
      message: 'Successfully updated feedback status'
    });
  } catch (error) {
    console.error('Error updating feedback status:', error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to update feedback status'
    });
  }
};

module.exports = updateStatus;
