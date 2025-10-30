const express = require("express");
const { addExperience, getAllExperiences,getExperienceById, getExperienceDetails } = require("../controllers/experience.controller");
const authMiddleware = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminAuth"); 

const router = express.Router();

// Admin creates experience
router.post("/addexperience", adminAuth, addExperience);

// user get all experiences
router.get("/", getAllExperiences);

// Get experience by ID with date query
// router.get("/:id", getExperienceById);

// details only
router.get("/details/:id", getExperienceDetails);


module.exports = router;
