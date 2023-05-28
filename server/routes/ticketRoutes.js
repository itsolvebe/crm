const express = require("express");
const router = express.Router();
const multer = require("multer");

// Specify storage destination and filename
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create Multer instance
const upload = multer({ storage: storage });

const {
  createTicket,
  updateTicket,
  getTicketDetails,
  getAllTickets,
  getClientTickets,
} = require("../controllers/ticketController");

// Create Ticket
router.post("/", upload.single("files"), createTicket);

// GET ALL Tickets
router.get("/", getAllTickets);

// Update Ticket
router.patch("/addmembers/:ticketId", updateTicket);

// Get Ticket Details
router.get("/:id", getTicketDetails);

// Get Specific Client Ticket Details
router.get("/client/:id", getClientTickets);

module.exports = router;
