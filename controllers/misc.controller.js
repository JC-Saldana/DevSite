const User = require('../models/user.model');
const Project = require('../models/project.model');

module.exports.home = (req, res, next) => {
    res.render('misc/home')
}


