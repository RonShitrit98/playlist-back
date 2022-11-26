const express = require('express')
const {getOauthToken} = require('./google.controller')

const router = express.Router()

router.get('/', getOauthToken)


module.exports = router