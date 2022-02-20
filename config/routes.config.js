const express = require('express')
const router = express.Router()

/* Misc routes */
router.get('/', (req, res, next) => {
    res.render("home")
})

module.exports = router