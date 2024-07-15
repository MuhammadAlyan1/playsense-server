const express = require('express');
const router = express.Router();

const createReport = require('../controllers/report/createReport');
const verifyJwtToken = require('../middleware/verifyJwtToken');

router.post('/', verifyJwtToken, createReport);

module.exports = router;
