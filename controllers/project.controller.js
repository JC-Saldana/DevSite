const Project = require('../models/project.model')
const Like = require('../models/like.model')

module.exports.projects = (req, res, next) => {
    Project.find()
        .populate("user")
        .then(projects => {
            res.render('misc/projects', { projects })
        })

        .catch((error) => next(error));
}

module.exports.projectDetails = (req, res, next) => {
    Project.findById(req.params.id)
        .populate("user")
        .then(project => {
            Like.findOne({ $and: [{ user: req.user._id }, { project: project._id }] })
                .then(liked => {
                    console.log("4here", liked)
                    res.render('misc/project-details', { project, liked })
                })
        })
        .catch((error) => next(error));
}

module.exports.createProject = (req, res, next) => {
    res.render('misc/createProyect')
}

module.exports.projectForm = (req, res, next) => {
    const titleRegex = new RegExp(req.query.title)
    const skillRegex = new RegExp(req.query.skill)
    Project.find({
        $and: [{ 'title': { $regex: titleRegex, $options: 'i' } },
        { 'skills': { $regex: skillRegex, $options: 'i' } }]
    })
        .populate("user")
        .then(projects => {
            res.json(projects)
        })
        .catch((error) => next(error));
}