const express = require("express");
const { validatePromo } = require("../controllers/promo.controller.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

// Validate promo code
router.post("/validate", validatePromo);
 
module.exports = router;
