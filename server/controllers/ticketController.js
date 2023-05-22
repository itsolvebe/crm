const Ticket = require("../model/Ticket.js");

// Create Ticket
const createTicket = async (req, res) => {
  try {
    const { subject, description, deadline, service, budget, clientId, files } =
      req.body;

    const filesar = files.map((file) => file.filename);
    // const files = req.files;

    console.log(clientId, deadline, filesar);
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
    const { id } = req.params;
    const { assignedTo } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { assignedTo },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to update ticket" });
  }
};

// Get Ticket Details
const getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const ticket = await Ticket.findById(id).populate("assignedTo");

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
};
