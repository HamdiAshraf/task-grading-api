require('dotenv').config()
const jwt = require('jsonwebtoken');
const appError = require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];

    if (!authHeader) {
        return next(appError.create('token is required', 401, httpStatusText.ERROR));
    }

    const token = authHeader.split(' ')[1];
    try {
        const currentUser = jwt.verify(token, process.env.SECRET_KEY)
        req.currentUser = currentUser;
        next();
    } catch (err) {
        return next(appError.create('invalid token', 401, httpStatusText.ERROR));

    }

}