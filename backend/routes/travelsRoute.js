const express = require('express');
const mongoose = require('mongoose');
const Travel = require('../models/Travels');
const Comment = require('../models/Comment');
const authMiddleware = require('../middlewares/authMiddleware')
const asyncHandler = require('express-async-handler');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
})
const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
}});

const travelRouter = express.Router();


travelRouter.post('/:id', authMiddleware, upload.single('travel-image') , asyncHandler(async (req, res) => {
    const travel = await Travel.create({title: req.body.title, location: req.body.location, image: req.file.path, description: req.body.description})
    if(travel){
        res.status(201).json(travel)
    } else {
        res.status(500)
        throw new Error("Travel post failed.")
    }
}))

travelRouter.get('/', asyncHandler(async (req, res) => {
    const travel = await Travel.find({})
    if(travel){
        res.status(200).json(travel)
    } else {
        res.status(500)
        throw new Error("Travel log is empty.")
    }
}))


travelRouter.post('/comments/:id', authMiddleware, asyncHandler(async (req, res) => {
    const comment = await Comment.create({author: req.user.username, text: req.body.text})
    const commentId = await Comment.find({author: req.user.username, text: req.body.text}).select('id')
    const travel = await Travel.findOne({title: req.params.id})
    travel.commentId = [...travel.commentId, commentId[0]._id]
    await travel.save()
    
    if(comment){
        res.status(201).json(comment)
    } else {
        res.status(500)
        throw new Error("Comment posting failed.")
    }
}))

travelRouter.get('/comments/:id', asyncHandler(async (req, res) => {
    const travel = await Travel.findOne({title: req.params.id}).populate('commentId')
    const commentsOnPage = travel.commentId
    res.send(commentsOnPage)
    
}))


module.exports = travelRouter;


