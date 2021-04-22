import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  io.emit('user connected')

  socket.on('chat message', (message) => {
    socket.broadcast.emit('chat message', message)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
})

server.listen(3000, () => {
  console.log('Listening on *:3000')
})