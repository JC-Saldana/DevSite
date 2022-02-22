const mongoose = require('mongoose')
const User = require('../models/user.model')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

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
                    .then(() => {
                        res.redirect('/')
                    })
            }
        })
        .catch(err => {
            if (err instanceof mongoose.Error.ValidationError) {
                renderWithErrors(err.errors)
            } else {
                next(err)
            }
        })
}

//login
module.exports.login = (req, res, next) => {
    res.render('auth/login')
}

const login = (req, res, next, provider) => {
    passport.authenticate(provider || 'local-auth', (err, user, validations) => {
        if (err) {
            next(err)
        } else if (!user) {
            res.status(404).render('auth/login', { errorMessage: validations.error })
        } else {
            req.login(user, (loginError) => {
                if (loginError) {
                    next(loginError)
                } else {
                    res.redirect('/')
                }
            })
        }
    })(req, res, next)
}

module.exports.doLogin = (req, res, next) => {
    login(req, res, next);
}

