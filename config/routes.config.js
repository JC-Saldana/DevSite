const express = require('express')
const router = express.Router()
const passport = require('passport')

const upload = require('../config/storage.config')

//scopes for google login
const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"
]

//controllers
const misc = require('../controllers/misc.controller')
const auth = require('../controllers/auth.controller')
const user = require('../controllers/user.controller')
const project = require('../controllers/project.controller')

// Misc

router.get('/', misc.home)

// User
router.get('/user/:id', user.user)
router.get('/allUsers', user.allUsers)
router.get('/user/form/params', user.userForm)
router.get('/developers', user.developers)
router.post('/like/:id', /* authMiddleware.isAuthenticated, */ user.doLike)
router.get('/user/:id/edit', user.edit)
router.post('/user/:id/edit', upload.single('avatar'), user.doEdit)
//comment
router.post('/comment/form/params', user.doComment)
router.post('/comment/:id/delete', user.deleteComment)

// Project
router.get('/project/:id', project.projectDetails)
router.get('/projects', project.projects)
router.get('/project/form/params', project.projectForm)
router.get('/create/project', project.createProject)
router.post('/projects', upload.single('images'), project.doCreateProject)
router.get('/project/:id/edit', project.editProject)
router.post('/project/:id/edit', upload.single('images'), project.doEditProject)
router.post('/project/:id/delete', project.delete)

//Auth Routes
router.get('/register', auth.register)
router.post('/register', upload.single('avatar'), auth.doRegister)
router.get('/activate/:token', auth.activate)
router.get('/login', auth.login)
router.get('/loginSelection', auth.loginSelection)
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

//google auth
router.get('/login/google', passport.authenticate('google-auth', { scope: SCOPES  }))
router.get('/auth/google/callback', auth.doLoginGoogle)



module.exports = router