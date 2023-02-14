const express = require('express')
const router = express.Router()

//User controler calling for register
const authController = require('../../controller/auth/auth')

router.post('/register', authController.register);
router.post('/login', authController.login)

router.get('/logout', authController.logout)

module.exports = router