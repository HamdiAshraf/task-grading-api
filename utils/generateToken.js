require('dotenv').config()
const jwt = require('jsonwebtoken')
exports.generateToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '5m' })
    return token;
}