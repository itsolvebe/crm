const Chat = require("../model/Chat");

// Create a new chat message
exports.createChatMessage = async (req, res) => {
  try {
    const {
      sender,
      ticketId,
      clientId,
      ticketDetails,
      receiver,
      content,
      isSocket,
    } = req.body;
    console.log("chatController: ", {
      sender,
      ticketId,
      clientId,
      ticketDetails,
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

    let updatedChat;

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
            content: JSON.stringify(ticketDetails),
          },
        ],
      });
      updatedChat = await newChat.save();
    }
    console.log("CHAT: ", updatedChat);

    if (isSocket) {
      return chat;
    }
    return res.status(201).json(updatedChat);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create chat message" });
  }
};

// Get all chat messages between two users
exports.getChatMessages = async (req, res) => {
  try {
    const { sender, receiver, ticketId } = req.body;
    console.log("sender: ", sender, " receiver: ", receiver);

    // const chat = await Chat.findOne({
    //   participants: {
    //     $all: [sender, receiver],
    //   },
    // });
    const chat = await Chat.findOne({
      ticket: ticketId,
    }).populate("ticket");
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

// Update participants in chat message
exports.updateParticipant = async (req, res) => {
  try {
    const { ticketId } = req.params;
    console.log("req.body og updateParticipant: ", req.body);

    console.log("__", req.body, ticketId);
    const chat = await Chat.findByIdAndUpdate(
      ticketId,
      { $addToSet: { participants: req.body.membId } },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update ticket" });
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
