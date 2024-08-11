const sql = require('../db')

class AuthService {
    async login ({username, password}) {
        const [user] = await sql.query(`
            SELECT * FROM users WHERE username = ? AND password = ?
        `, [username, password])
        if(!user[0]) throw new Error("Incorrect username or password")
        return user[0]
    }

    async getUsers() {
        const [users] = await sql.query(`
            SELECT * FROM users
        `)
        return users
    }
}

module.exports = new AuthService()