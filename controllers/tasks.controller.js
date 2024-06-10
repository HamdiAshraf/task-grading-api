const asyncHandler = require('express-async-handler')
const Task = require('../models/Task')
const appError = require('../utils/appError')
const httpStatusText = require('../utils/httpStatusText')

exports.createTask = asyncHandler(async (req, res, next) => {
    const { title, description, dueDate, assignedTo } = req.body;
    try {
        const task = new Task({ title, description, dueDate, assignedTo });
        await task.save();
        res.status(201).json({ status: httpStatusText.SUCCESS, data: { task } })
    } catch (error) {
        return next(appError.create(error.message, 500, httpStatusText.FAIL));
    }
})



exports.submitTask = asyncHandler(async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return next(appError.create('Task not found', 404, httpStatusText.FAIL));
        }





        if (!task.assignedTo.includes(req.currentUser.id)) {
            return next(appError.create('You can only submit your assigned tasks', 403, httpStatusText.FAIL));
        }

        const existingSubmission = task.submissions.find(sub => sub.student.toString() === req.currentUser.id.toString());
        if (existingSubmission) {
            return next(appError.create('You have already submitted this task', 400, httpStatusText.FAIL));
        }

        task.submissions.push({
            student: req.currentUser.id,
            submittedAt: new Date(),
            file: req.body.file // Assuming file URL is provided in the body
        });

        await task.save();
        res.status(200).json({ status: httpStatusText.SUCCESS, data: { task } });
    } catch (error) {
        return next(appError.create(error.message, 500, httpStatusText.FAIL));
    }
});



exports.updateSubmission = async (req, res, next) => {
    try {
        const { taskId, submissionIndex } = req.params;
        const { grade, feedback } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ status: 'fail', message: 'Task not found' });
        }

        if (!task.submissions[submissionIndex]) {
            return res.status(404).json({ status: 'fail', message: 'Submission not found' });
        }

        task.submissions[submissionIndex].grade = grade;
        task.submissions[submissionIndex].feedback = feedback;

        await task.save();

        res.status(200).json({ status: 'success', data: task });
    } catch (error) {
        next(error);
    }
};