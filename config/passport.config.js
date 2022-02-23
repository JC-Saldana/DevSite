const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose')

const User = require('../models/user.model');

passport.serializeUser((user, next) => {
  console.log(user)
  next(null, user.id)
})

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => {
      next(null, user)
    })
    .catch(err => next(err))
})

passport.use('local-auth', new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, next) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          next(null, false, { error: 'Email or password are incorrect' })
        } else {
          return user.checkPassword(password)
            .then((match) => {
              if (!match) {
                next(null, false, { error: 'Email or password are incorrect' })
              } else {
                next(null, user)
              }
            })
        }
      })
      .catch(err => next(err))
  }
))

// passport github-login
passport.use('github', new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
  }, function(accessToken, refreshToken, profile, done) {
    console.log({ profile })
    User.findOne({ $or: [{ githubId: profile.id }, { email: profile.email }] })
      .then((user) => {
        if (!user) {
          User.create({ 
            name: profile.displayName,
            email: profile.email || 'fakeemail@email.com',
            password: 'xdjkcnbekcbnkencjke',
            githubId: profile.id
           })
           .then((user) => done(null, user))
           .catch(e => done(e))
        } else {
          done(null, user)
        }
      })
      .catch(e => done(e))
  }
));

/* 
passport.use('github', new GitHubStrategy(
  {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log({profile});

    const name = profile.displayName
    const githubId= profile.id

    if(githubId) {
      User.findOne({githubId})
        .then(user => {
          if (user) {
            next(null, user)
          } else {
            return User.create({
              name,
              githubId,
              password: mongoose.Types.ObjectId() 
            })
              .then(createdUser => {
                next(null, createdUser)
              })
          }
        })
        .catch(next)
    } else {
      next(null, false, { error: 'Error connecting to Git Hub Auth' })
    }
  }
)) */