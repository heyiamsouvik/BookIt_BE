const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/user.controller.js");
const authMiddleware = require("../middleware/authMiddleware.js");

 
// ✅ Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// ✅ Protected route (user must be logged in)
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
