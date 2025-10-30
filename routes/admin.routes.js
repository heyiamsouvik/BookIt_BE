const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  getAdminProfile
} = require("../controllers/admin.controller.js");

const authMiddleware = require("../middleware/authMiddleware.js");
const adminAuth = require("../middleware/adminAuth");

// ✅ Public admin routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

// ✅ Protected admin route
router.get("/profile", adminAuth, getAdminProfile);


module.exports = router;
