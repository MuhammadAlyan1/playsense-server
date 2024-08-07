const express = require('express');
const router = express.Router();

const createReport = require('../controllers/report/createReport');
const getAllReports = require('../controllers/report/getAllReports');
const verifyJwtToken = require('../middleware/verifyJwtToken');
const removeReportedItem = require('../controllers/report/removeReportedItem');
router.get('/', verifyJwtToken, getAllReports);
router.post('/', verifyJwtToken, createReport);
router.delete('/delete-content/:reportId', verifyJwtToken, removeReportedItem);

module.exports = router;
