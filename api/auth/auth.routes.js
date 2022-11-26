const express = require('express')
const {loadUser, login, signup, logout} = require('./auth.controller')

const router = express.Router()

router.get('/', loadUser)
router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', logout)

module.exports = router