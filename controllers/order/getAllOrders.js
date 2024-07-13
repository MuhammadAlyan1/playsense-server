const Order = require('../../db/model/order');

async function getAllOrders(req, res) {
  const { profileId, fetchAsCustomer, fetchAsSeller } = req.query;

  try {
    let orders = [];
    if (profileId) {
      orders = await Order.find(
        fetchAsCustomer
          ? { customerId: profileId }
          : fetchAsSeller
          ? { sellerId: profileId }
          : {}
      )
        .sort({ createdAt: -1 })
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
    } else {
      orders = await Order.find({})
        .sort({ createdAt: -1 })
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
    }

    if (orders.length === 0) {
      return res
        .status(400)
        .json({ success: true, data: [], message: 'No orders found' });
    }

    return res.status(200).json({
      success: true,
      data: orders,
      message: 'Successfully retrieved all orders'
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, data: [], message: 'Failed to retrieve orders' });
  }
}

module.exports = getAllOrders;
