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

io.on('connection', socket => {
    socket.emit('chat-message', 'Hello World')
})

//make server in port 3000
server.listen(process.env.PORT || 3000);