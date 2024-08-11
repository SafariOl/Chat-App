const sql = require('../db')

class ChatService {
    async addChat ({user_1, user_2}) {
        const [chat] = await sql.query(`
            SELECT * FROM chats WHERE user_1 = ? AND user_2 = ?
        `, [user_1, user_2])
        if(chat[0]) throw new Error("Chat has already exist")
        await sql.query(`
            INSERT INTO chats (user_1, user_2) 
            VALUES (?, ?)
        `, [user_1, user_2])
        return await this.getChats(user_1)
    }

    async getChats (username) {
        const [chats] = await sql.query(`
            SELECT * FROM chats WHERE user_1 = ? OR user_2 = ?
        `, [username, username])
        return chats
    }

    async removeChat(chatId, username) {
        await sql.query(`
            DELETE FROM chats WHERE id = ? 
        `, [Number(chatId)])
        return await this.getChats(username)
    }

    async getChat (chatId) {
        const [chat] = await sql.query(`
          SELECT * FROM chat WHERE id = ?  
        `, [(Number(chatId))])
        return chat.reverse()
    }

    async sendMessage ({chatId, from_user, to_user, message}) {
        await sql.query(`
            INSERT INTO chat (id, from_user, to_user, message)
            VALUES(?, ?, ?, ?);
        `, [Number(chatId), from_user, to_user, message])
        return await this.getChat(chatId)
    }
}

module.exports = new ChatService()