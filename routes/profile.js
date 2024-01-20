const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const getProfile = require('../controllers/profile/getProfile');
const createProfile = require('../controllers/profile/createProfile');
const updateProfile = require('../controllers/profile/updateProfile');

router.get('/:userId', getProfile);

router.post('/', verifyJwtToken, createProfile);

router.put('/:profileId', verifyJwtToken, updateProfile);

// router.post('/feedback/:profileId', verifyJwtToken, profileController);

// router.delete('/:profileId', verifyJwtToken, deleteProfile);

module.exports = router;
