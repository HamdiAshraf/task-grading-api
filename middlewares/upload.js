// middleware/upload.js

const multer = require('multer');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.pdf'); // Generate unique filename
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file'); // 'pdfFile' should match the name attribute in your form input

// Check file type
function checkFileType(file, cb) {
    // Allowed file extensions
    const filetypes = /pdf/;
    // Check extension
    const extname = filetypes.test(file.originalname.toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Only PDF files are allowed');
    }
}

module.exports = upload;
