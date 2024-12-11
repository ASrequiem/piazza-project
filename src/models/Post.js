const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    topic: { type: String, required: true },
    body: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ body: String, user: String, date: Date }],
    expirationTime: { type: Date },
    status: { type: String, default: 'Live' },
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
