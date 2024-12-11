const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['like', 'dislike', 'comment'], 
        required: true 
    },
    comment: {
        body: { type: String },
        date: { type: Date, default: Date.now },
    },
}, { timestamps: true });

module.exports = mongoose.model('Interaction', interactionSchema);
