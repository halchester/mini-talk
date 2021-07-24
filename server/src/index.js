const app = require('express')();
const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: true,
  origin: ['http://localhost:3000'],
});
const cors = require('cors');
const PORT = 8000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user', (name) => {
    users[socket.id] = name;
    socket.broadcast.emit(`user-connected`, name);
  });

  socket.on('send-chat-message', (mesg) => {
    socket.broadcast.emit('chat-message', {
      message: mesg,
      name: users[socket.id],
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit(`user-disconnected`, users[socket.id]);
    delete users[socket.id];
  });
});

http.listen(PORT, () => {
  console.log('Listening on *:8000');
});
