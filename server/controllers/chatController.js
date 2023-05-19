const Chat = require('../model/Chat');

// Create a new chat message
exports.createChatMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    const chat = await Chat.findOne({
      participants: {
        $all: [sender, receiver],
      },
    });

    if (chat) {
      chat.messages.push({
        sender,
        receiver,
        content,
      });
    } else {
      const newChat = new Chat({
        participants: [sender, receiver],
        messages: [
          {
            sender,
            receiver,
            content,
          },
        ],
      });
      chat = await newChat.save();
    }

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat message' });
  }
};

// Get all chat messages between two users
exports.getChatMessages = async (req, res) => {
  try {
    const { sender, receiver } = req.body;

    const chat = await Chat.findOne({
      participants: {
        $all: [sender, receiver],
      },
    });

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get chat messages' });
  }
};

// Update a chat message
exports.updateChatMessage = async (req, res) => {
  try {
    const { chatId, messageId, content } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const message = chat.messages.id(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.content = content;
    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update chat message' });
  }
};

// Delete a chat message
exports.deleteChatMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const message = chat.messages.id(messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    message.remove();
    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete chat message' });
  }
};
