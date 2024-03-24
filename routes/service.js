const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const getAllServices = require('../controllers/service/getAllServices');
const getService = require('../controllers/service/getService');
const deleteService = require('../controllers/service/deleteService');
const createService = require('../controllers/service/createService');
const updateService = require('../controllers/service/updateService');

router.get('/', getAllServices);

router.get('/:serviceId', getService);

router.post('/', verifyJwtToken, createService);
router.put('/:serviceId', verifyJwtToken, updateService);
// router.post('/service/:serviceId', verifyJwtToken, serviceController);
router.delete('/:serviceId', verifyJwtToken, deleteService);

module.exports = router;
