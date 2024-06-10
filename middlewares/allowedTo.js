
exports.isAdmin = (req, res, next) => {
    if (req.currentUser && req.currentUser.role === 'ADMIN') {
        next();
    } else {
        return res.status(403).json({ status: 'fail', message: 'Access forbidden' });
    }
}


exports.isStudent = (req, res, next) => {
    if (req.currentUser && req.currentUser.role === 'STUDENT') {
        next();
    } else {
        return res.status(403).json({ status: 'fail', message: 'Access forbidden' });
    }
}