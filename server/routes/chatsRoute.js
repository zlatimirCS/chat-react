const router = require('express').Router();
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const authMiddleware = require('../middlewares/authMiddleware');

// create a new chat
router.post('/create-new-chat', authMiddleware, async (req, res) => {
  try {
    const newChat = new Chat(req.body);
    const savedChat = await newChat.save();
    res.send({
      message: 'Chat created successfully',
      success: true,
      data: savedChat,
    });
  } catch (error) {
    res.send({
      message: "Couldn't create chat",
      success: false,
      error: error.message,
    });
  }
});

// get all chats of a current user
router.get('/get-all-chats', authMiddleware, async (req, res) => {
  try {
    const chats = await Chat.find({ members: { $in: [req.body.userId] } });
    res.send({
      message: 'Chats found',
      success: true,
      data: chats,
    });
  } catch (error) {
    res.send({
      message: "Couldn't find chats",
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
