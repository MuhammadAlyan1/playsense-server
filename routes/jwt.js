const express = require('express');
const router = express.Router();
const refreshJwtToken = require('../controllers/jwt/refreshJwtToken');
const checkAuth = require('../controllers/users/checkAuth');
const verifyJwtToken = require('../middleware/verifyJwtToken');

router.post('/refresh', refreshJwtToken);
router.get('/check-auth', verifyJwtToken, checkAuth);

module.exports = router;
