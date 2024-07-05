const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderStatus: {
      type: 'string',
      default: 'pending'
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Please enter service ID.']
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter customer profile ID.']
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
      required: [true, 'Please enter seller profile ID.']
    },
    rating: {
      type: 'string',
      default: 0
    },
    review: {
      type: 'string',
      default: ''
    },
    customerPaymentStatus: {
      type: 'string',
      default: 'pending'
    },
    sellerPaymentStatus: {
      type: 'string',
      default: 'pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
