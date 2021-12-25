const express = require('express');
const travelRouter = require('./routes/travelsRoute');
const authRouter = require('./routes/authRoute')
const dotenv = require('dotenv');
dotenv.config();
require('./config/dbConnect')();


const app = express();
app.use('/uploads', express.static('uploads'))
app.use(express.json());


app.use('/api/user', authRouter)
app.use('/api/travels', travelRouter);

app.use((req, res, next) => {
    const error = new Error('Not found.')
    error.status = 404
    next(error)
})


app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running!")
})