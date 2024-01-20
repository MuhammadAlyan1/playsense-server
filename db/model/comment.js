const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please enter comment content']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter userId']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
