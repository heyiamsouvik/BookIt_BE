const express = require("express");
const { createBooking, confirmBooking } = require("../controllers/booking.controller");
const authMiddleware = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

router.post("/",authMiddleware, createBooking);

router.post("/confirm", confirmBooking);

module.exports = router;


