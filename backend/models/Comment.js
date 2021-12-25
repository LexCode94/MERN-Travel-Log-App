const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})


const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;