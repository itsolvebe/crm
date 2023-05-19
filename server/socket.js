const socketIO = require("socket.io");
const Chat = require('./model/Chat');

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
    console.log("A user connected");

    socket.on("sendMessage", async (data) => {
      const { sender, receiver, message } = data;
      console.log("Data: ", data);

      // Save the message to MongoDB
        const newChat = new Chat({ 
          admin: "1",
          client: "2",
          message: message,
       });
        await newChat.save();

      // Emit the message to the sender and receiver
      socket.emit("newMessage", newChat);
      socket.to(receiver).emit("newMessage", newChat);
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
