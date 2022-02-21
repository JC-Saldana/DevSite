const { render } = require('express/lib/response')
const mongoose = require('mongoose')
const User = require('../models/user.model')

// register
module.exports.register = (req, res, next) => {
    res.render('auth/register')
}

module.exports.doRegister = (req, res, next) => {
    const user = req.body

    const renderWithErrors = (errors) => {
        res.render('auth/register', { errors, user })
    }

    User.findOne({ email: user.email })
        .then((userFound) => {
            if (userFound) {
                renderWithErrors({ email: 'Email already in use' })
            } else {
                return User.create(user)
                    .then((createdUser) => {
                        res.redirect('/')
                    })
            }
        })
        .catch( err => {
            if( err instanceof mongoose.Error.ValidationError) {
                renderWithErrors(err.errors)
            } else {
                next(err)
            }
        })
}

//login

