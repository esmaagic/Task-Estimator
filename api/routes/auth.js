const {login, register, logout} = require('../controllers/auth')
const express = require('express')
const router = express.Router()



router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router