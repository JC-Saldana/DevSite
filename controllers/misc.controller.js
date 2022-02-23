const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.home = (req, res, next) => {
    res.render('misc/home')
}
module.exports.user = (req, res, next) => {
    res.render('misc/user')
}
module.exports.developers = (req, res, next) => {
    User.find()
        .then(users => {
            res.render('misc/developers', { users })
        })

        .catch((error) => next(error));

}