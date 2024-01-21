const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter userId'],
      unique: true
    },
    username: {
      type: String,
      require: [true, 'Please enter username'],
      unique: [true, 'User already exists']
    },
    roles: {
      type: [
        {
          type: String,
          enum: [
            'user',
            'moderator',
            'admin',
            'game developer',
            'content creator',
            'coach',
            'esport elite'
          ]
        }
      ],
      default: ['user']
    },

    platform: {
      type: String,
      enum: ['pc', 'playstation', 'xbox'],
      default: 'pc'
    },

    bio: {
      type: String,
      default: "Hey there! I'm using PlaySense."
    },

    profilePicture: {
      type: String,
      default:
        'https://res.cloudinary.com/dcc8txmdw/image/upload/v1705819981/playsense-profile/vgiadrbjgmgd6qhdwoy2.jpg'
    },

    banner: {
      type: String,
      default:
        'https://res.cloudinary.com/dcc8txmdw/image/upload/v1705819985/playsense-profile/bozzoqaani8tgamqdqfg.jpg'
    },

    country: {
      type: String,
      default: 'Pakistan'
    },

    twitchUrl: {
      type: String,
      default: 'https://www.twitch.tv/'
    },

    youtubeUrl: {
      type: String,
      default: 'https://www.youtube.com/'
    },

    twitterUrl: {
      type: String,
      default: 'https://twitter.com/'
    },

    discordUsername: {
      type: String,
      default: 'PlaySense'
    },

    monitor: {
      type: String,
      default: ''
    },

    headphones: {
      type: String,
      default: ''
    },

    keyboard: {
      type: String,
      default: ''
    },

    mouse: {
      type: String,
      default: ''
    },

    mousepad: {
      type: String,
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
