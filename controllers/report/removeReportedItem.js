const Comment = require('../../db/model/comment');
const Feedback = require('../../db/model/feedback');
const Profile = require('../../db/model/profile');
const Post = require('../../db/model/post');
const Report = require('../../db/model/report');
const mongoose = require('mongoose');
async function removeReportedItem(req, res) {
  const user = req.user;
  const profileId = user?.profileId;
  const { reportId } = req.params;
  if (!reportId) {
    return res.status(200).json({
      success: false,
      message: 'Please enter report id.',
      data: {}
    });
  }
  try {
    const authenticatedUserProfile = await Profile.findById(profileId);
    if (
      !authenticatedUserProfile.roles.includes('admin') &&
      !authenticatedUserProfile.roles.includes('moderator')
    ) {
      return res.status(401).json({
        success: false,
        message: 'You do not have permission to delete this content.',
        data: {}
      });
    }

    const report = await Report.findById({
      _id: new mongoose.Types.ObjectId(reportId)
    });
    if (!report) {
      return res
        .status(400)
        .json({ success: false, message: 'Report does not exists.', data: {} });
    }
    const models = {
      post: Post,
      feedback: Feedback,
      comment: Comment,
      profile: Profile
    };
    const { deletedCount } = await models[report?.itemType].deleteOne({
      _id: report?.itemId
    });

    if (deletedCount === 1) {
      await Report.findByIdAndUpdate(report?._id, { status: 'removed' });

      return res.status(200).json({
        success: true,
        message: 'Successfully deleted content.',
        data: {}
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Content does not exists.',
        data: {}
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: 'Failed to delete content.', data: {} });
  }
}

module.exports = removeReportedItem;
