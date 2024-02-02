const express = require('express')
const indexController = require('../controller/indexController')
const router = express.Router()

router.get('/usuarios', indexController.show)
router.post('/usuarios', indexController.create)
router.post('/login', indexController.login)

module.exports = router