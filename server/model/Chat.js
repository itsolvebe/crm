const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
  ],
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket",
    unique: true,
    required: true,
  },
  messages: [
    {
      sender: {
        // type: String,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      // receiver: {
      //   type: String,
      //   // type: mongoose.Schema.Types.ObjectId,
      //   ref: "User",
      //   required: true,
      // },
      content: {
        type: String,
        // required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
