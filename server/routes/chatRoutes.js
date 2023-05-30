const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Create a new chat message
router.post("/message/create", chatController.createChatMessage);

// Get all chat messages between two users
router.post("/message/get", chatController.getChatMessages);

// Update a chat message
router.put("/message/update", chatController.updateChatMessage);

// Update a chat message
router.patch("/addParticipant/:ticketId", chatController.updateParticipant);

// Delete a chat message
router.delete("/message/delete", chatController.deleteChatMessage);

module.exports = router;
