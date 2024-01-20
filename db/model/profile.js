const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter userId'],
      unique: true
    },

    platform: {
      type: String,
      enum: ['pc', 'playstation', 'xbox'],
      default: 'pc'
    },

    bio: {
      type: String
    },

    profilePicture: {
      type: String
    },

    banner: {
      type: String
    },

    country: {
      type: String
    },

    twitchUrl: {
      type: String
    },

    youtubeUrl: {
      type: String
    },

    twitterUrl: {
      type: String
    },

    discordUsername: {
      type: String
    },

    monitor: {
      type: String
    },

    headphones: {
      type: String
    },

    keyboard: {
      type: String
    },

    mouse: {
      type: String
    },

    mousepad: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
