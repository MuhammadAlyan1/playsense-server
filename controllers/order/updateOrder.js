const Order = require('../../db/model/order');

const updateOrder = async (req, res) => {
  const user = req.user;
  const profileId = user?.profileId;
  const { orderId } = req.params;
  const {
    orderStatus,
    rating,
    review,
    sellerDiscordId,
    sessionUrl,
    sessionTime,
    sessionAdditionalInformation
  } = req.body;

  try {
    const existingOrder = await Order.findById(orderId);

    if (!existingOrder) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Order does not exists'
      });
    }

    if (
      existingOrder.customerId.toString() !== profileId ||
      existingOrder.sellerId.toString() !== profileId
    ) {
      return res.status(403).json({
        success: false,
        data: {},
        message: 'Unauthorized to update this order.'
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        sellerDiscordId: sellerDiscordId || existingOrder.sellerDiscordId,
        sessionTime: sessionTime || existingOrder.sessionTime,
        sessionUrl: sessionUrl || existingOrder.sessionUrl,
        sessionAdditionalInformation:
          sessionAdditionalInformation ||
          existingOrder.sessionAdditionalInformation,
        orderStatus: orderStatus || existingOrder.orderStatus,
        rating: rating || existingOrder.rating,
        review: review || existingOrder.review
      },
      { new: true }
    );

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

module.exports = updateOrder;
