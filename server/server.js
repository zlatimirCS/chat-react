const express = require('express');
require('dotenv').config();

const app = express();
const dbConfig = require('./config/dbConfig');
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatsRoute');
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
