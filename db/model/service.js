const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      required: [true, 'Please enter service description']
    },
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter profileId']
    },
    price: { type: Number, required: true },
    coverPicture: { type: String, required: true },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    },
    game: {
      type: String,
      enum: ['apex legends', 'warzone', 'csgo'],
      default: ['apex legends']
    },
    rating: { type: Number, min: 1, max: 5 },
    reviews: { type: Number, default: 0 },
    total_sales: { type: Number, default: 0 }
  },

  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
