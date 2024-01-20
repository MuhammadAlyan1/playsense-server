const express = require('express');
const router = express.Router();
const verifyJwtToken = require('../middleware/verifyJwtToken');

const getAllPosts = require('../controllers/posts/getAllPosts');
const getPost = require('../controllers/posts/getPost');
const deletePost = require('../controllers/posts/deletePost');
const createPost = require('../controllers/posts/createPost');
const postController = require('../controllers/posts/postController');

router.get('/', getAllPosts);

router.get('/:postId', getPost);

router.post('/', verifyJwtToken, createPost);
router.post('/feedback/:postId', verifyJwtToken, postController);

router.delete('/:postId', verifyJwtToken, deletePost);

module.exports = router;
