const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter sender profile ID.']
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter receiver profile ID.']
    },
    message: {
      type: 'string',
      required: true
    },
    isRead: {
      type: 'boolean',
      default: false
    },
    type: {
      type: 'string',
      default: 'system'
    },
    href: {
      type: 'string',
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Notification', notificationSchema);
