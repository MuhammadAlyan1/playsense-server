const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const getAllFeedback = require('../controllers/feedback/getAllFeedback');
const getFeedback = require('../controllers/feedback/getFeedback');
const deleteFeedback = require('../controllers/feedback/deleteFeedback');
const createFeedback = require('../controllers/feedback/createFeedback');
const updateStatus = require('../controllers/feedback/updateStatus');
const feedbackController = require('../controllers/feedback/feedbackController');

router.get('/', getAllFeedback);

router.get('/:feedbackId', getFeedback);

router.post('/', verifyJwtToken, createFeedback);
router.post('/feedback/:feedbackId', verifyJwtToken, feedbackController);
router.put('/:feedbackId', verifyJwtToken, updateStatus);
router.delete('/:feedbackId', verifyJwtToken, deleteFeedback);

module.exports = router;
