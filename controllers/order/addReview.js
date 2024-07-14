const Order = require('../../db/model/order');
const Service = require('../../db/model/service');
const mongoose = require('mongoose');
const generateNotification = require('../notification/generateNotification');

const addReview = async (req, res) => {
  const user = req.user;
  const profileId = user?.profileId;
  const { orderId } = req.params;
  const { rating, review, serviceId } = req.body;

  try {
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Order does not exists'
      });
    }

    if (existingOrder.customerId.toString() !== profileId) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Unauthorized to update this order.'
      });
    }

    if (!rating || !review || !serviceId) {
      return res.status(400).json({
        success: false,
        data: {},
        message: 'Please enter all fields.'
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        rating: rating,
        review: review
      },
      { new: true }
    );

    const allServiceOrders = await Order.aggregate([
      {
        $match: {
          serviceId: new mongoose.Types.ObjectId(serviceId),
          orderStatus: 'completed',
          rating: { $nin: ['0', 0] }
        }
      }
    ]);

    if (allServiceOrders?.length > 0) {
      const accumulatedRating = allServiceOrders.reduce((acc, curr) => {
        return acc + curr.rating;
      }, 0);

      const rating = accumulatedRating / allServiceOrders.length;

      await Service.findByIdAndUpdate(
        { _id: serviceId },
        { rating: rating, reviews: allServiceOrders.length }
      );
    }

    generateNotification({
      senderId: existingOrder.customerId,
      receiverId: existingOrder.sellerId,
      message: `Your order has a new review!`,
      type: 'skillify'
    });

    return res.status(200).json({
      success: true,
      data: updatedOrder,
      message: 'Successfully updated order'
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Failed to update order'
    });
  }
};

module.exports = addReview;
