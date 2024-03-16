const Feedback = require('../../db/model/feedback');
const Comment = require('../../db/model/comment');

async function feedbackController(req, res) {
  const user = req.user;
  const profileId = user.profileId;
  const { feedbackId } = req.params;
  const { like, dislike, comment, commentContents } = req.body;

  if (!feedbackId) {
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Please enter feedback ID' });
  }

  try {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) {
      return res
        .status(400)
        .json({
          success: false,
          data: {},
          message: 'Feedback does not exists'
        });
    }

    if (!like && !dislike && !comment) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please select like, dislike, or comment'
      });
    }

    if (like) {
      const isLiked = feedback.likedBy.includes(profileId);
      const update = isLiked
        ? { $pull: { likedBy: profileId } }
        : {
            $addToSet: { likedBy: profileId },
            $pull: { dislikedBy: profileId }
          };

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        update,
        {
          new: true
        }
      );

      return res.status(200).json({
        success: true,
        data: updatedFeedback,
        message: isLiked
          ? 'Removed like from feedback successfully.'
          : 'Liked feedback succesfully.'
      });
    }

    if (dislike) {
      const isDisliked = feedback.dislikedBy.includes(profileId);

      const update = isDisliked
        ? { $pull: { dislikedBy: profileId } }
        : {
            $addToSet: { dislikedBy: profileId },
            $pull: { likedBy: profileId }
          };

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        update,
        {
          new: true
        }
      );

      return res.status(200).json({
        success: true,
        data: updatedFeedback,
        message: isDisliked
          ? 'Removed dislike from feedback successfully.'
          : 'Disliked feedback successfully.'
      });
    }

    if (comment) {
      if (!commentContents) {
        return res.status(400).json({
          success: false,
          data: {},
          message: "Please enter comment's content."
        });
      }

      const newComment = await Comment.create({
        content: commentContents,
        profileId
      });

      const updatedFeedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { $push: { comments: newComment?._id } },
        { new: true }
      );

      const populatedComment = await Comment.findById(newComment._id).populate({
        path: 'profileId',
        model: 'Profile'
      });

      return res.status(200).json({
        success: true,
        data: populatedComment,
        message: 'Comment added successfully'
      });
    }

    return res.status(400).json({
      success: true,
      data: feedback,
      message: 'Please select an action.'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to update feedback' });
  }
}

module.exports = feedbackController;
