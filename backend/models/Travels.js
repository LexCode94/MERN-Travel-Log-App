const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    commentId: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment'
    }]
})

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;