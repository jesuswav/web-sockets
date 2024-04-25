var socket = io.connect('http://localhost:8080', { forceNew: true })

socket.on('messages', (data) => {
  console.log(data)
  render(data)
})

const render = (data) => {
  var html = data
    .map(
      (message) =>
        `<div>
      <strong>${message.author}:</strong>${message.text}
      </div>`
    )
    .join(' ')
  document.getElementById('messages').innerHTML = html
}

const addMessage = () => {
  var payload = {
    author: document.getElementById('username').value,
    text: document.getElementById('text').value,
  }

  socket.emit('newMessage', payload)

  return false
}
