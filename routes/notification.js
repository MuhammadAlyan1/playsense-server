const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const getAllNotifications = require('../controllers/notification/getAllNotifications');
const updateNotificationReadStatus = require('../controllers/notification/updateNotificationReadStatus');

router.get('/', verifyJwtToken, getAllNotifications);
router.put('/', verifyJwtToken, updateNotificationReadStatus);

module.exports = router;
