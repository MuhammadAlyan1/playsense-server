const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    status: {
      type: 'string',
      enum: ['pending', 'reviewed', 'action taken'],
      default: 'pending'
    },

    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter reporter profile ID.']
    },
    reportedProfileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter reported profile ID.']
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please enter reported item ID.']
    },
    itemType: {
      type: 'string',
      required: true,
      enum: [
        'comment',
        'feedback',
        'matchanalytics',
        'post',
        'profile',
        'service'
      ]
    },
    reason: {
      type: 'string',
      required: true,
      enum: [
        'inappropriate content',
        'spam',
        'harassment',
        'misinformation',
        'copyright violation',
        'impersonation',
        'abusive language',
        'violence or threats',
        'hate speech',
        'privacy violation',
        'others'
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Report', reportSchema);
