const express = require("express");
const protect = require("../middleware/authMiddleware.js");
const userController = require("../controllers/userController.js");
const router = express.Router();
const { handleMulterErrors } = require("../middleware/uploadMiddleware.js");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.route("/profile").get(protect, userController.getUserProfile);
router.get("/", userController.getAllUsers);
router.patch("/update/:userId", handleMulterErrors, userController.updateUser);

module.exports = router;
