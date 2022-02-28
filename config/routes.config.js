const express = require('express')
const router = express.Router()
const passport = require('passport')

//controllers
const misc = require('../controllers/misc.controller')
const auth = require('../controllers/auth.controller')
const user = require('../controllers/user.controller')

/* Misc routes */
router.get('/', misc.home)
router.get('/user/:id', misc.user)
router.get('/allUsers', misc.allUsers)
router.get('/user/form/:params', misc.userForm)
router.get('/project/:id', misc.projectDetails)
router.get('/projects', misc.projects)
router.get('/developers', misc.developers)

// User profile edit
router.get('/user/:id/edit', user.edit)
router.post('/user/:id/edit', user.doEdit)

//Auth Routes
router.get('/register', auth.register)
router.post('/register', auth.doRegister)
router.get('/activate/:token', auth.activate)
router.get('/login', auth.login)
router.post('/login', auth.doLogin)
router.get('/logout', auth.logout)

//Social Login
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }))
router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
  );

module.exports = router