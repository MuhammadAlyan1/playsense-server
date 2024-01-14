const express = require('express');
const router = express.Router();
const signin = require('../controllers/users/signin');
const signup = require('../controllers/users/signup');
const deleteUser = require('../controllers/users/deleteUser');
const verifyJwtToken = require('../middleware/verifyJwtToken');
const signout = require('../controllers/users/signout');

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/signout', verifyJwtToken, signout);
router.delete('/delete/:userId', verifyJwtToken, deleteUser);

module.exports = router;
