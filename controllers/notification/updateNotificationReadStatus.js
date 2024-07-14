const mongoose = require('mongoose');
const notification = require('../../db/model/notification');

const updateNotificationReadStatus = async (req, res) => {
  const user = req.user;
  const profileId = user?.profileId;

  const { notificationIds } = req.body;

  if (!notificationIds || notificationIds?.length === 0) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'please provide list of notification Ids.'
    });
  }

  const updatedNotifications = await notification.updateMany(
    {
      _id: { $in: [...notificationIds] },
      receiverId: new mongoose.Types.ObjectId(profileId)
    },
    { isRead: true }
  );

  console.log('UPDATED NOTIFICATIONS: ', updatedNotifications);

  return res.status(200).json({
    success: true,
    data: {},
    message: 'Successfully marked all notifications as read.'
  });
};

module.exports = updateNotificationReadStatus;
