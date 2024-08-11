const AuthService = require("../services/AuthService")

class AuthController {
    async login (req, res, next) {
        try {
            const user = await AuthService.login(req.body)
            return res.status(200).json(user)
        } catch (e) {
            next(e)
        }
    }

    async getUsers (req, res, next) {
        try {
            const users = await AuthService.getUsers()
            return res.status(200).json(users)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()