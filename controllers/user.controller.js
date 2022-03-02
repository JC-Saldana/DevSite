const User = require('../models/user.model')

module.exports.edit = (req, res, next) => {
    User.findById(req.params.id)
        .then((user)=> {
            res.render('user/editProfile', {user})
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