const express = require('express')
const {getAuthToken} = require('./spotify.controller')

const router = express.Router()

router.get('/', getAuthToken)


module.exports = router