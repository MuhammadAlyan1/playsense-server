const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const paymentSuccess = require('../controllers/paypal/paymentSuccess');

router.post('/payment-success', verifyJwtToken, paymentSuccess);

module.exports = router;
