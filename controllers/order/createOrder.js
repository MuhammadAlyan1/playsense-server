const Order = require('../../db/model/order');

async function createOrder(req, res) {
  const user = req.user;
  const profileId = user.profileId;
  const { serviceId, sellerId } = req.body;

  if (!profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please set up your profile.'
    });
  }

  if (!serviceId || !sellerId || !profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter serviceId, sellerId, and profileId.'
    });
  }

  try {
    const newOrder = await Order.create({
      orderStatus: 'pending',
      serviceId,
      customerId: profileId,
      sellerId
    });

    const newPopulatedOrder = await Order.findById({
      _id: newOrder._id
    })
      .populate({
        path: 'customerId',
        model: 'Profile'
      })
      .populate({
        path: 'sellerId',
        model: 'Profile'
      })
      .populate({
        path: 'serviceId',
        model: 'Service'
      });

    return res.status(201).json({
      success: true,
      data: newPopulatedOrder,
      message: 'Successfully created order.'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create order' });
  }
}

module.exports = createOrder;
