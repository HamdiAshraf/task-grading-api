const { Router } = require('express')
const { register, login, getAllStudents,checkGrades } = require('../controllers/users.controller')

const { verifyToken } = require('../middlewares/verifyToken')
const { isAdmin, isStudent } = require('../middlewares/allowedTo')
const router = Router();


router.route('/').get(verifyToken, isAdmin, getAllStudents)
router.route('/register').post(register)
router.route('/login').post(login)
router.get('/grades', verifyToken, checkGrades)

module.exports = router;