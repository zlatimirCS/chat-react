const express = require('express');
require('dotenv').config();

const app = express();
const dbConfig = require('./config/dbConfig');
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatsRoute');
const messageRoutes = require('./routes/messageRoute');
app.use(express.json());

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// check the connection of socket from client
io.on('connection', (socket) => {
  console.log('connected wit socket id: ', socket.id);
});

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
