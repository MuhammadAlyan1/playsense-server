const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      unique: [true, 'Profile id is already in use.']
    },

    email: {
      type: String,
      require: [true, 'Please enter email'],
      unique: [true, 'email already in use'],
      lowercase: true
    },

    password: {
      type: String,
      require: [true, 'Please enter password']
    },

    refreshToken: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
