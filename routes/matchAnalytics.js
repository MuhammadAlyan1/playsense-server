const express = require('express');
const router = express.Router();
const createMatchAnalytics = require('../controllers/matchAnalytics/createMatchAnalytics');
const getAllMatchAnalytics = require('../controllers/matchAnalytics/getAllMatchAnalytics');
// const signup = require('../controllers/matchAnalytics/signup');
// const deleteUser = require('../controllers/matchAnalytics/deleteUser');
// const signout = require('../controllers/matchAnalytics/signout');
const verifyJwtToken = require('../middleware/verifyJwtToken');

router.post('/', verifyJwtToken, createMatchAnalytics);
router.get('/', getAllMatchAnalytics);

// router.post('/signup', signup);
// router.post('/signout', verifyJwtToken, signout);
// router.delete('/delete/:userId', verifyJwtToken, deleteUser);

module.exports = router;
