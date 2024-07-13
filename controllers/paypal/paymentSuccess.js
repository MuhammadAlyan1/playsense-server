const paypal = require('@paypal/checkout-server-sdk');
const payouts = require('@paypal/payouts-sdk');
const mongoose = require('mongoose');
const Order = require('../../db/model/order');
const Service = require('../../db/model/service');

const paypalClient = new paypal.core.PayPalHttpClient(
  new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

const PaymentSuccess = async (req, res) => {
  const user = req.user;
  const profileId = user.profileId;
  const { orderID, serviceId, sellerId, paypalAccountId, amount } = req.body;

  if (!profileId) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please set up your profile.'
    });
  }

  if (!orderID || !serviceId || !paypalAccountId || !sellerId || !amount) {
    return res.status(400).json({
      success: false,
      data: {},
      message: 'Please enter all the fields'
    });
  }

  try {
    const request = new paypal.orders.OrdersGetRequest(orderID);
    const order = await paypalClient.execute(request);

    const payoutResult = await createPayout(paypalAccountId, amount);

    const newOrder = await Order.create({
      orderStatus: 'pending',
      serviceId,
      customerId: profileId,
      sellerId,
      customerPaymentStatus: 'paid',
      customerPayment: order.result,
      sellerPaymentStatus: 'paid',
      sellerPayment: payoutResult
    });

    await Service.findOneAndUpdate(
      { _id: serviceId },
      {
        $inc: {
          totalSales: 1
        }
      }
    );

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
  } catch (err) {
    console.error('Error executing PayPal request:', err);
    return res
      .status(400)
      .json({ success: false, data: {}, message: 'Failed to create order' });
  }
};

const createPayout = async (paypalAccountId, amount, currency = 'USD') => {
  const requestBody = {
    sender_batch_header: {
      sender_batch_id: `batch-${Date.now()}`,
      email_subject: 'You have a payment'
    },
    items: [
      {
        recipient_type: 'PAYPAL_ID',
        amount: {
          value: amount,
          currency: currency
        },
        receiver: paypalAccountId,
        note: 'Payment for your service',
        sender_item_id: `item-${Date.now()}`
      }
    ]
  };

  const request = new payouts.payouts.PayoutsPostRequest();
  request.requestBody(requestBody);

  try {
    const response = await paypalClient.execute(request);
    return response.result;
  } catch (err) {
    console.error('Payout creation failed: ', err);
    throw err;
  }
};

module.exports = PaymentSuccess;
