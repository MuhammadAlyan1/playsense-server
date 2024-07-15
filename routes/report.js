const express = require('express');
const router = express.Router();

const createReport = require('../controllers/report/createReport');
const getAllReports = require('../controllers/report/getAllReports');
const verifyJwtToken = require('../middleware/verifyJwtToken');

router.get('/', verifyJwtToken, getAllReports);
router.post('/', verifyJwtToken, createReport);

module.exports = router;
