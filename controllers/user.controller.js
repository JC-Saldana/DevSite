const User = require('../models/user.model')
const Like = require('../models/like.model')
const Comment = require('../models/comment.model')
const Project = require('../models/project.model')

module.exports.edit = (req, res, next) => {
    User.findById(req.params.id)
        .then((user) => {
            res.render('user/editProfile', { user })
        })
        .catch(next)
}

module.exports.doEdit = (req, res, next) => {
    if (req.file) {
        req.body.avatar = req.file.path
    }
    User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true })
        .then((user) => res.redirect(`/user/${user.id}`))
        .catch(next)
}

module.exports.user = (req, res, next) => {
    User.findById(req.params.id)
        
        .populate("projects")
        .then(user => {
            Like.find({ user: user._id })
                .then(likes => {
                    const projectsIds = likes.map(like => like.project);
                    Project.find({ _id: { $in: projectsIds } })
                        .then(likedProjects => {
                            res.render('user/profile', { user, likedProjects })
                        })
                })
        })
        .catch((error) => next(error));
}

module.exports.userForm = (req, res, next) => {
    const nameRegex = new RegExp(req.query.name)
    const currentJobRegex = new RegExp(req.query.currentJob)
    const skillRegex = new RegExp(req.query.skill)
    User.find({
        $and: [{ 'name': { $regex: nameRegex, $options: 'i' } },
        { 'currentJob': { $regex: currentJobRegex, $options: 'i' } },
        { 'skills': { $regex: skillRegex, $options: 'i' } }]
    })
        .populate("projects")
        .then(users => {
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

module.exports.developers = (req, res, next) => {
    User.find()
        .then(users => {
            res.render('misc/developers', { users })
        })

        .catch((error) => next(error));
}

module.exports.doLike = (req, res, next) => {
    const projectId = req.params.id
    const userId = req.user.id
    Like.findOneAndDelete({ project: projectId, user: userId })
        .then(like => {
            if (like) {
                res.status(200).send({ success: 'Like remove from DDBB' })
            } else {
                return Like.create({ project: projectId, user: userId })
                    .then(() => {
                        res.status(201).send({ success: 'Like added to DDBB' })
                    })
            }
        })
        .catch(next)
}

module.exports.doComment = (req, res, next) => {
    const user = req.user;
    const comment = req.body.comment
    const projectId = req.params.id

    Comment.create({
        user: user,
        comment: comment,
        project: projectId
    })
        .then(() => res.redirect(`/project/${projectId}`))
        .catch(next)
}

module.exports.deleteComment = (req, res, next) => {
    const projectId = req.body.id

    Comment.findByIdAndDelete(req.params.id)
        .then(() => res.redirect(`/project/${projectId}`))
        .catch(next)
}
