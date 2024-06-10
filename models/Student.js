const mongoose = require('mongoose');
const validator = require('validator')
const StudentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'invalid email address']
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    role: {
        type: String,
        enum: ["ADMIN", "STUDENT"],
        default: "STUDENT"
    }

})

module.exports = mongoose.model('Student', StudentSchema)