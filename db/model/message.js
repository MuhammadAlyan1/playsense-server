const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    contents: 'string',
    isRead: {
      type: 'boolean',
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
