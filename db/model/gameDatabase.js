const mongoose = require('mongoose');

const gameDatabaseSchema = new mongoose.Schema(
  {
    itemType: {
      type: String,
      required: [true, 'Please enter game database item type.'],
      enum: ['weapon', 'legend']
    },
    weaponType: {
      type: String,
      default: ''
    },
    weaponName: {
      type: String,
      default: ''
    },
    ammoType: {
      type: [String],
      default: []
    },
    fireMode: {
      type: [String],
      default: []
    },
    attachments: {
      type: [String],
      default: []
    },
    weaponImage: {
      type: String,
      default: ''
    },
    weaponIcon: {
      type: String,
      default: ''
    },
    bodyDamage: {
      type: Number,
      default: 0
    },
    headshotDamage: {
      type: Number,
      default: 0
    },
    legDamage: {
      type: Number,
      default: 0
    },
    damagePerSecond: {
      type: Number,
      default: 0
    },
    game: {
      type: String,
      default: ''
    },

    legendImage: {
      type: String,
      default: ''
    },
    legendIcon: {
      type: String,
      default: ''
    },
    legendClass: {
      type: String,
      default: ''
    },
    legendName: {
      type: String,
      default: ''
    },
    passiveAbilityName: {
      type: String,
      default: ''
    },
    tacticalAbilityName: {
      type: String,
      default: ''
    },
    ultimateAbilityName: {
      type: String,
      default: ''
    },
    passiveAbilityDescription: {
      type: String,
      default: ''
    },
    tacticalAbilityDescription: {
      type: String,
      default: ''
    },
    ultimateAbilityDescription: {
      type: String,
      default: ''
    },
    passiveAbilityIcon: {
      type: String,
      default: ''
    },
    tacticalAbilityIcon: {
      type: String,
      default: ''
    },
    ultimateAbilityIcon: {
      type: String,
      default: ''
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
