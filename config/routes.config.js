const express = require('express')
const router = express.Router()
const passport = require('passport')

//controllers
const misc = require('../controllers/misc.controller')
const auth = require('../controllers/auth.controller')

/* Misc routes */
router.get('/', misc.home)
router.get('/user', misc.user)
router.get('/developers', misc.developers)

//Auth Routes
router.get('/register', auth.register)
router.post('/register', auth.doRegister)
router.get('/login', auth.login)
router.post('/login', auth.doLogin)

//Social Login
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }))
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
  );

module.exports = router