const commentModel = require('../models/comments');

// Get all comments
const allComments = async (req, res) => {
    res.render('admin/comments' ,{role: req.role})
}

module.exports = {
    allComments
}