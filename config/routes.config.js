const express = require('express')
const router = express.Router()

//controllers
const misc = require('../controllers/misc.controller')
const auth = require('../controllers/auth.controller')

/* Misc routes */
router.get('/', misc.home)

//Auth Routes
router.get('/register', auth.register)
router.post('/register', auth.doRegister)
router.get('/login', auth.login)
router.post('/login', auth.doLogin)

module.exports = router