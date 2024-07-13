const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const getAllOrders = require('../controllers/order/getAllOrders');
// const getOrder = require('../controllers/order/getOrder');
// const deleteOrder = require('../controllers/order/deleteOrder');
const createOrder = require('../controllers/order/createOrder');
const updateOrder = require('../controllers/order/updateOrder');
const addReview = require('../controllers/order/addReview');
router.get('/', getAllOrders);

// router.get('/:orderId', getOrder);

router.post('/', verifyJwtToken, createOrder);
router.put('/:orderId', verifyJwtToken, updateOrder);
router.put('/add-review/:orderId', verifyJwtToken, addReview);
// router.post('/order/:orderId', verifyJwtToken, orderController);
// router.delete('/:orderId', verifyJwtToken, deleteOrder);

module.exports = router;
