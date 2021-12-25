const express = require('express');
const User = require('../models/User');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');


authRouter.post('/register', async(req, res) => {
    try {
        const userExists = await User.findOne({username: req.body.username})
        if(userExists){
            throw new Error("User exists.")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        await User.create({username: req.body.username, password: hashedPassword})
        res.status(201).json("User Created")
    } catch (err) {
        res.status(500).json(err.message)
        console.log(err)
    }
    
})


authRouter.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(401).json("Wrong password or username.")
        if(await bcrypt.compare(req.body.password, user.password)){
            res.status(200).json({
                id: user._id,
                username: user.username,
                token: generateToken(user._id)
            })
        } else {
            res.status(401).json("Wrong password or username.")
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err.message)
    }
})

module.exports = authRouter;