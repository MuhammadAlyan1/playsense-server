const mongoose = require('mongoose');

const gameDatabaseSchema = new mongoose.Schema(
  {
    itemType: {
      type: String,
      required: [true, 'Please enter game database item type.'],
      enum: ['weapon', 'legend']
    },
    weaponType: {
      type: String
    },
    weaponName: {
      type: String
    },
    ammoType: {
      type: [String]
    },
    fireMode: {
      type: [String]
    },
    attachments: {
      type: [String]
    },
    weaponImage: {
      type: String
    },
    weaponIcon: {
      type: String
    },
    bodyDamage: {
      type: Number
    },
    headshotDamage: {
      type: Number
    },
    legDamage: {
      type: Number
    },
    damagePerSecond: {
      type: Number
    },
    game: {
      type: String
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter profileId']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('GameDatabase', gameDatabaseSchema);
