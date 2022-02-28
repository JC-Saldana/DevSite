const User = require('../models/user.model');
const Project = require('../models/project.model');

module.exports.home = (req, res, next) => {
    res.render('misc/home')
}

module.exports.user = (req, res, next) => {
    User.findById(req.params.id)
        .populate("projects")
        .then(user => {
            res.render('user/profile', { user })
        })

        .catch((error) => next(error));
}

module.exports.userForm = (req, res, next) => {
    let nameRegex = new RegExp(req.query.name)
    const currentJobRegex = new RegExp(req.query.currentJob)
    console.log(nameRegex, currentJobRegex)
    User.find({ $and: [{ 'name': { $regex: nameRegex, $options: 'i' } }, { 'currentJob': { $regex: currentJobRegex, $options: 'i' } }] })
        .populate("projects")
        .then(users => {
            console.log(users.length)
            res.json(users)
        })
        .catch((error) => next(error));
}

module.exports.allUsers = (req, res, next) => {
    User.find()
        .populate("projects")
        .then(users => {
            res.json(users)
        })
        .catch((error) => next(error));
}

module.exports.projects = (req, res, next) => {
    Project.find()
        .then(projects => {
            res.render('misc/projects', { projects })
        })

        .catch((error) => next(error));
}

module.exports.projectDetails = (req, res, next) => {
    Project.findById(req.params.id)
        .then(project => {
            res.render('misc/project-details', { project })
        })

        .catch((error) => next(error));
}

module.exports.developers = (req, res, next) => {
    User.find()
        .then(users => {
            res.render('misc/developers', { users })
        })

        .catch((error) => next(error));
}