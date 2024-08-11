const AuthController = require("../controllers/AuthController")
const express = require('express')
const router = express.Router()

router.post('/login', AuthController.login)
router.get('/', AuthController.getUsers)

module.exports = router



