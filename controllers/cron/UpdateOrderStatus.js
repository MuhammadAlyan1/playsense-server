const Order = require('../../db/model/order');
const moment = require('moment');
const updatedOrderStatus = async () => {
  const orders = await Order.updateMany(
    {
      sessionTime: {
        $exists: true,
        $lte: moment().toDate()
      },
      orderStatus: 'session scheduled'
    },
    {
      $set: { orderStatus: 'completed' }
    }
  );
  console.log(`Updated ${orders?.modifiedCount} orders status to completed`);
};

module.exports = updatedOrderStatus;
