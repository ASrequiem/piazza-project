const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createPost, getPostsByTopic, likePost } = require('../controllers/postController');
const router = express.Router();

router.post('/', protect, createPost);
router.get('/:topic', protect, getPostsByTopic);
router.post('/:id/like', protect, likePost);

module.exports = router;
