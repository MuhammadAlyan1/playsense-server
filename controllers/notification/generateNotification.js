const Notification = require('../../db/model/notification');
const generateNotification = async ({
  senderId,
  receiverId,
  message,
  isRead = false,
  type = 'system',
  href = ''
}) => {
  if (!senderId || !receiverId || !message) {
    throw new Error('Please enter senderId, receiverId, and message.');
  }

  const createdNotification = await Notification.create({
    senderId,
    receiverId,
    message,
    isRead,
    type,
    href
  });

  return createdNotification;
};

module.exports = generateNotification;
