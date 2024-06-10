const { Router } = require('express')
const { createTask, submitTask,updateSubmission } = require('../controllers/tasks.controller')
const { verifyToken } = require('../middlewares/verifyToken')
const { isAdmin, isStudent } = require('../middlewares/allowedTo')
const upload = require('../middlewares/upload');

const router = Router();

router.route('/').post(verifyToken, isAdmin, createTask)
router.route('/:id/submit').post(verifyToken, isStudent, upload, submitTask)
router.put('/:taskId/submissions/:submissionIndex', verifyToken, isAdmin, updateSubmission);




module.exports = router;