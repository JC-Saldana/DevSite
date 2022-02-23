const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;

const User = require('../models/user.model');

passport.serializeUser((user, next) => {
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
passport.use('github-auth', new GitHubStrategy(
  {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));