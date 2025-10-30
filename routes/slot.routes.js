const express = require("express");
const router = express.Router();
const { getAvailableSlots } = require("../controllers/slot.controller");

router.get("/:id/slots", getAvailableSlots);

module.exports = router;
