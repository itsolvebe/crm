const Ticket = require("../model/Ticket.js");

// Create Ticket
const createTicket = async (req, res) => {
  try {
    const { subject, description, deadline, service, budget, clientId } =
      req.body;

    // const filesar = files.map((file) => file.filename);

    const files = req.file.originalname;

    console.log(clientId, deadline, files);
    const ticket = new Ticket({
      subject,
      description,
      deadline,
      service,
      budget,
      clientId,
      files,
    });

    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to create ticket" });
    console.log(error);
  }
};

// Update Ticket
const updateTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    console.log("__", req.body, ticketId);
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { $push: { members: req.body } },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

// Get All Ticket Details
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("members");

    if (!tickets) {
      return res.status(404).json({ error: "Tickets not found" });
    }

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: "Failed to get ticket details" });
  }
};

// Get Specific User Ticket
const getClientTickets = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.find({ clientId: id }).populate("clientId");

    if (!ticket) {
      return res.status(404).json({ error: "Tickets not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to get ticket details" });
  }
};

// Get Ticket Details
const getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id).populate("members");

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to get ticket details" });
  }
};

module.exports = {
  createTicket,
  updateTicket,
  getTicketDetails,
  getAllTickets,
  getClientTickets,
};
