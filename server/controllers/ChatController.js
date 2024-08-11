const ChatService = require("../services/ChatService")

class ChatController {
    async addChat (req, res, next) {
        try {
            const chats = await ChatService.addChat(req.body)
            return res.status(200).json(chats)
        } catch (e) {
            next(e)
        }
    }

    async getChats (req, res, next) {
        try {
            const userName = req.params.userName
            const chats = await ChatService.getChats(userName)
            return res.status(200).json(chats)
        } catch (e) {
            next(e)
        }
    }

    async removeChat(req, res, next) {
        try {
            const {chatId, username} = req.params
            console.log(chatId, username)
            const chats = await ChatService.removeChat(chatId, username)
            return res.status(200).json(chats)
        } catch (e) {
            next(e)
        }
    }

    async getChat (req, res, next) {
        try {
            const chatId = req.params.chatId
            const chat = await ChatService.getChat(chatId)
            return res.status(200).json(chat || [])
        } catch (e) {
            next(e)
        }
    }

    async sendMessage (req, res, next) {
        try {
            const messages = await ChatService.sendMessage(req.body)
            return res.status(200).json(messages)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ChatController()