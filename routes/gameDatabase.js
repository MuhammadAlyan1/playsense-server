const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const addWeapon = require('../controllers/gameDatabase/addWeapon');
const addLegend = require('../controllers/gameDatabase/addLegend');

router.post('/weapon', verifyJwtToken, addWeapon);
router.post('/legend', verifyJwtToken, addLegend);

module.exports = router;
