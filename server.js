const express = require('express'); //create express server
const app = express(); //to run server
const server = require('http').Server(app);
const io = require('socket.io')(server);


//setup the express server
app.set('view engine', 'html');
app.use(express.static('public')); //all js and css goes in this public folder

//redirect user to a room
app.get('/', (req, res)  => {
    res.sendFile(__dirname + '/views/index.html')
})

const users = {}
io.on('connection', socket => {
    socket.on('new-user', username =>{
        users[socket.id] = username;
        socket.broadcast.emit('user-connected', username)
    })
    socket.on('send-chat-message', message => {
        //emit = sends to everyone including you
        //broadcast.emit = sends to everyone except you 
        socket.broadcast.emit('chat-message', {message: message, username: users[socket.id]})
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id]
    })
})

//make server in port 3000
server.listen(process.env.PORT || 3000);