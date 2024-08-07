const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const addWeapon = require('../controllers/gameDatabase/addWeapon');

router.post('/weapon', verifyJwtToken, addWeapon);

module.exports = router;
