const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const getProfile = require('../controllers/profile/getProfile');
const createProfile = require('../controllers/profile/createProfile');
const updateProfile = require('../controllers/profile/updateProfile');
const assignRoles = require('../controllers/profile/assignRoles');
const manageFriends = require('../controllers/profile/manageFriends');

router.get('/:profileId', getProfile);
router.post('/', verifyJwtToken, createProfile);
router.post('/friend', verifyJwtToken, manageFriends);

router.put('/', verifyJwtToken, updateProfile);
router.put('/assign-roles', verifyJwtToken, assignRoles);

// router.post('/feedback/:profileId', verifyJwtToken, profileController);

// router.delete('/:profileId', verifyJwtToken, deleteProfile);

module.exports = router;
