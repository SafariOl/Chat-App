const ChatController = require('../controllers/ChatController')

const router = require('express').Router()

router.post('/add-chat', ChatController.addChat)
router.delete('/remove-chat/:chatId/:username', ChatController.removeChat)
router.get('/get-chats/:userName', ChatController.getChats)
router.get('/get-chat/:chatId', ChatController.getChat)
router.post('/send-message', ChatController.sendMessage)

module.exports = router