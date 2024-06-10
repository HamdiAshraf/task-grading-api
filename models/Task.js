const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    assignedTo: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    }], // Array of user references
    submissions: [{
        student: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Student' 
        },
        submittedAt: { 
            type: Date 
        },
        grade: { 
            type: Number 
        },
        feedback: { 
            type: String 
        },
        file: { 
            type: String 
        } // Assuming a file submission URL
    }]
});

module.exports = mongoose.model('Task', TaskSchema);
