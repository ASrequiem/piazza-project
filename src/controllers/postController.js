const Post = require('../models/Post');

// This will help create a post
exports.createPost = async (req, res) => {
    try {
        const { title, topic, body, expirationTime } = req.body;
        const post = await Post.create({
            title,
            topic,
            body,
            owner: req.user.id,
            expirationTime,
        });
        res.status(201).json({ post });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all posts by topic
exports.getPostsByTopic = async (req, res) => {
    try {
        const { topic } = req.params;
        const posts = await Post.find({ topic });
        res.status(200).json({ posts });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Like a post
exports.likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.likes.push(req.user.id);
        await post.save();
        res.status(200).json({ post });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
