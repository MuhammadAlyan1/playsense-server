// models/MatchAnalytics.js
const mongoose = require('mongoose');

const matchAnalyticsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    kills: {
      type: Number,
      required: true
    },
    assists: {
      type: Number,
      required: true
    },
    downs: {
      type: Number,
      required: true
    },
    damage: {
      type: Number,
      required: true
    },
    map: {
      type: String,
      required: true
    },
    character: {
      type: String,
      required: true
    },
    weapons: [
      {
        name: String,
        kills: Number,
        assists: Number,
        downs: Number,
        damage: Number
      }
    ],
    mode: {
      type: String,
      required: true
    },
    eliminationReason: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    mapCoordinates: {
      x: Number,
      y: Number
    }
  },
  { timestamps: true }
);

const MatchAnalytics = mongoose.model('MatchAnalytics', matchAnalyticsSchema);

module.exports = MatchAnalytics;
