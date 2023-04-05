const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const { findById, findOneAndUpdate } = require('../models/chatModel');

// new message
router.post('/new-message', async (req, res) => {
  try {
    // store message
    const newMessage = new Message(req.body);
    const savedMessage = await newMessage.save();

    // update last message of chat
    const chat = await Chat.findOneAndUpdate(
      { _id: req.body.chat },
      {
        lastMessage: savedMessage._id,
        $inc: { unreadMessages: 1 },
      }
    );
    await chat.save();
    res.send({
      message: 'Message sent successfully',
      success: true,
      data: savedMessage,
    });
  } catch (error) {
    res.send({
      message: "Couldn't send message",
      success: false,
      error: error.message,
    });
  }
});

router.get('/get-all-messages/:chatId', async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    }).sort({ createdAt: 1 });
    res.send({
      data: messages,
      success: true,
      message: 'Messages found',
    });
  } catch (error) {
    res.send({
      message: "Couldn't get messages",
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
