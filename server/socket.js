const socketIO = require("socket.io");
// Import the createChatMessage controller
const { createChatMessage } = require("./controllers/chatController");

// const Chat = require("./model/Chat");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

let io;

function init(server) {
  io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A new user connected ");

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("sendMessage", async (data) => {
      const { sender, receiver, content } = data;
      console.log("Data: ", data);

      // Save the message to MongoDB
      // const newChat = new Chat({
      //   sender: sender,
      //   receiver: receiver,
      //   content: content,
      // });
      // await newChat.save();

      // Create the chat message using the createChatMessage controller
      const chat = await createChatMessage({
        body: {
          sender,
          receiver,
          content,
          isSocket: true,
        },
      });
      await chat.save();

      // Emit the message to the sender and receiver
      console.log("ChatID: on socket server ", chat._id);

      // socket.join(chat._id); // Join the specified room
      // console.log(`User joined room: ${chat._id}`);

      // socket.emit("newMessage", { sender, receiver, content });
      // Send the message to all clients in the room
      io.to("123").emit("newMessage", { sender, receiver, content });
    });

    socket.on("userTyping", async (data) => {
      console.log("user typing data: ", data);
      io.to("123").emit("userIsTyping", {
        userWhichIsTyping: data.userWhichIsTyping,
        typing: data.userisTyping,
      });
    });

    socket.on("userAcknowledgeMsgReceived", async (data) => {
      console.log("Msg received acknowledge: ", data);
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  // Socket server
  const port = process.env.SOCKET_PORT;
  console.log("S PORT: ", port);
  server.listen(8000, () => {
    console.log(`Socket Servers running on http://localhost:${8000}`);
  });
}

module.exports = {
  init,
  io,
};
