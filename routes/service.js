const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

// const getAllService = require('../controllers/service/getAllService');
// const getService = require('../controllers/service/getService');
// const deleteService = require('../controllers/service/deleteService');
const createService = require('../controllers/service/createService');
// const serviceController = require('../controllers/service/serviceController');

// router.get('/', getAllService);

// router.get('/:serviceId', getService);

router.post('/', verifyJwtToken, createService);
// router.post('/service/:serviceId', verifyJwtToken, serviceController);

// router.delete('/:serviceId', verifyJwtToken, deleteService);

module.exports = router;
