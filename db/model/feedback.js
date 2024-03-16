const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    contents: {
      type: String,
      required: [true, 'Please enter feedback contents']
    },
    type: {
      type: [
        {
          type: String,
          enum: ['suggestion', 'bug report', 'change request']
        }
      ],
      default: ['suggestion']
    },
    game: {
      type: [
        {
          type: String,
          enum: ['apex legends', 'warzone', 'csgo']
        }
      ],
      default: ['apex legends']
    },
    status: {
      type: [
        {
          type: String,
          enum: ['new', 'under review', 'closed', 'rejected']
        }
      ],
      default: ['new']
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    },
    dislikedBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User'
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Comment'
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter profileId']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Feedback', feedbackSchema);
