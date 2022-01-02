const socket = io("/")
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

socket.on('chat-message', data => {
    console.log(data)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault() //stops page from sending message to server/refreshing; prevents us from losing messages
    const message = messageInput.value;
    socket.emit('send-chat-message', message);
    messageInput.value = "" //when message is sent, input value resets
})


