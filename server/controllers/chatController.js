const Chat = require("../model/Chat");

// Create a new chat message
exports.createChatMessage = async (req, res) => {
  try {
    const {
      sender,
      ticketId,
      clientId,
      description,
      receiver,
      content,
      isSocket,
    } = req.body;
    console.log("chatController: ", {
      sender,
      ticketId,
      clientId,
      description,
      receiver,
      content,
      isSocket,
    });

    const chat = await Chat.findOne({
      ticket: ticketId,
      // participants: {
      //   $all: [sender, receiver],
      // },
    });

    console.log("chat: ", chat);

    if (chat) {
      // chat.messages.push({
      //   sender,
      //   receiver,
      //   content,
      // });
      return res.status(500).json({ error: "Can't create same ticket again" });
    } else {
      const newChat = new Chat({
        participants: [clientId],
        ticket: ticketId,
        messages: [
          {
            sender: clientId,
            // receiver,
            content: description,
          },
        ],
      });
      chat = await newChat.save();
    }
    console.log("CHAT: ", chat);

    if (isSocket) {
      return chat;
    }
    return res.status(201).json(chat);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create chat message" });
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
    // const chat = await Chat.findOne({
    //   participants: sender,
    // });

    if (!chat) {
      return res.status(404).json({ error: "Chats not found" });
    }
    // console.log("chat msgs; server controller: ", chat);

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Failed to get chat messages" });
  }
};

// Update a chat message
exports.updateChatMessage = async (req, res) => {
  try {
    const { chatId, messageId, content } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const message = chat.messages.id(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.content = content;
    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Failed to update chat message" });
  }
};

// Delete a chat message
exports.deleteChatMessage = async (req, res) => {
  try {
    const { chatId, messageId } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const message = chat.messages.id(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    message.remove();
    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete chat message" });
  }
};
