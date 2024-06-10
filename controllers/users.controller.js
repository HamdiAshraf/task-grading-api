const asyncHandler = require('express-async-handler')
const Student = require('../models/Student')
const Task = require('../models/Task')

const bcrypt = require("bcryptjs")
const appError = require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')
const { generateToken } = require('../utils/generateToken')


exports.register = asyncHandler(async (req, res, next) => {
    const { username, email, password, token } = req.body;
    if (!username) return next(appError.create('username must be provided', 400, httpStatusText.FAIL))
    if (!email) return next(appError.create('email must be provided', 400, httpStatusText.FAIL))
    if (!password) return next(appError.create('password must be provided', 400, httpStatusText.FAIL))

    const existUser = await Student.findOne({ email })
    if (existUser) {
        return next(appError.create('user already exist', 400, httpStatusText.FAIL));
    }

    if (username && password && email) {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new Student({
            username,
            email,
            password: hashedPassword
        })

        const token = await generateToken({ email: newStudent.email, id: newStudent._id, role: newStudent.role })
        newStudent.token = token;
        await newStudent.save();

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { newStudent } })
    }

})



exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) return next(appError.create('email must be provided', 400, httpStatusText.FAIL))
    if (!password) return next(appError.create('password must be provided', 400, httpStatusText.FAIL))

    const student = await Student.findOne({ email })
    if (!student) {
        return next(appError.create('incorrect email', 404, httpStatusText.FAIL));
    }
    const matchedPassword = await bcrypt.compare(password, student.password)
    if (!matchedPassword) return next(appError.create('incorrect password', 400, httpStatusText.FAIL))
    if (student && matchedPassword) {
        const token = await generateToken({ email: student.email, id: student._id, role: student.role })



        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { token: token } })
    }
})

exports.getAllStudents = asyncHandler(async (req, res, next) => {
    try {
        const students = await Student.find({ role: 'STUDENT' }).select('_id email');
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });
    } catch (error) {
        next(error);
    }
});





exports.checkGrades = asyncHandler(async (req, res, next) => {

    try {
        const tasks = await Task.find({ 'submissions.student': req.currentUser.id }).populate({
            path: 'submissions',
            match: { student: req.currentUser.id }
        });


        const grades = tasks.map(task => ({
            task: task.title,
            grade: task.submissions[0].grade || 'Not graded yet',
            feedback: task.submissions[0].feedback || 'No feedback yet'
        }));
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { grades } });
    } catch (error) {
        next(error);
    }
});