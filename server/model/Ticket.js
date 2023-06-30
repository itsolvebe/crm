const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  service: {
    type: [String],
    enum: ["App Development", "Graphic Designing", "Seo"], // Add any other services as needed
    required: true,
  },
  status: {
    type: [String],
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  files: {
    type: Object,
  },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
