const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

var messages = [
  {
    id: 1,
    text: 'Hola',
    author: 'mayra',
  },
]

// para la parte publica de la aplicación
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.status(200).send('Hola mundo')
})

io.on('connection', (socket) => {
  console.log('New socket connection')
  socket.emit('messages', messages)

  socket.on('newMessage', (data) => {
    console.log(data)
    messages.push(data)

    io.sockets.emit('messages', messages)
  })
})

server.listen(8080, () => {
  console.log('Server running')
})
