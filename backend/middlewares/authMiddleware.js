const jwt = require('jsonwebtoken');
const User = require('../models/User');


const authMiddleware = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            const user = await User.findById(decoded.id)
            req.user = user
            next()
        } catch (err) {
            res.status(401).json('Not authorized, invalid token.')

        }
    } else {
        res.status(401).json('Not authorized, invalid token.')
    }
}

module.exports = authMiddleware;