const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please enter comment content']
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter profileId']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
