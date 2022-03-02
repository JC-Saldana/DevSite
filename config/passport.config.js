const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy

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
            active: true,
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

// passport google-login

passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, next) => {
  console.log({ profile });

  const googleID = profile.id;
  const email = profile.emails[0] ? profile.emails[0].value : undefined;
  const name = profile.displayName;

  if (googleID && email) {
    User.findOne({
      $or: [
        { googleID },
        { email }
      ]
    })
      .then(user => {
        if (user) {
          next(null, user)
        } else {
          return User.create({
            email,
            googleID,
            password: mongoose.Types.ObjectId(),
            active: true,
            name
          })
            .then(createdUser => {
              next(null, createdUser)
            })
        }
      })
      .catch(err => next(err))
  } else {
    next(null, false, { error: 'Error connecting to Google Auth' })
  }
}
))