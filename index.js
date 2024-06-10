require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const httpStatusText = require('./utils/httpStatusText')
const usersRouter = require('./routes/users.router')
const tasksRouter = require('./routes/tasks.router')
const app = express();

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json())
app.use(cors());


//routes
app.use('/api/v1/students', usersRouter)
app.use('/api/v1/tasks', tasksRouter)

// Global error handler
app.use((error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let statusText = error.statusText || httpStatusText.FAIL;
    let message = error.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: statusText,
        message: message,
    });
});
//global middleware for handle not found routes
app.all('*', (req, res, next) => {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available', code: 404 })

})

mongoose.connect(process.env.DB_URL).then(() => {
    console.log(`connected successfully to db`);
}).catch(err => {
    console.log(`DATABASE ERROR: ${err.message}`);
})
const server = app.listen(process.env.PORT, () => {
    console.log(`server started listening on port ${process.env.PORT}`);
})


module.exports = server;