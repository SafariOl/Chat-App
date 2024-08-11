require('dotenv').config()
const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const AuthRoutes = require('./routers/AuthRoutes')
const ChatRoutes = require('./routers/ChatRoutes')
const cors = require('cors')

const app = express()
app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.json())
app.use('/api/users', AuthRoutes)
app.use('/api/chats', ChatRoutes)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URI,
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('message', message => {
        io.emit('message', message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
})


server.listen(process.env.PORT, () => console.log(`connected on ${process.env.PORT}`))