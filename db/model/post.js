const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    contents: {
      type: String,
      required: [true, 'Please enter post contents']
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter userId']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
