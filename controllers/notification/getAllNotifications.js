const Notification = require('../../db/model/notification');
const mongoose = require('mongoose');

const getAllNotifications = async (req, res) => {
  const user = req.user;
  const profileId = user?.profileId;

  const { getAllNotifications } = req.query;
  const read = [false];

  if (getAllNotifications) {
    read.push(true);
  }

  const allNotifications = await Notification.find({
    receiverId: new mongoose.Types.ObjectId(profileId),
    isRead: { $in: read }
  })
    .populate({ path: 'senderId', model: 'Profile' })
    .populate({ path: 'receiverId', model: 'Profile' })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    data: allNotifications,
    message: 'Successfully retrieved all notifications.'
  });
};

module.exports = getAllNotifications;
