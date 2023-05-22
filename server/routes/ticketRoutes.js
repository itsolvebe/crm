const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  createTicket,
  updateTicket,
  getTicketDetails,
} = require("../controllers/ticketController");

// Create Ticket
router.post("/", upload.array("files"), createTicket);

// Update Ticket
router.patch("/:id", updateTicket);

// Get Ticket Details
router.get("/:id", getTicketDetails);

module.exports = router;
