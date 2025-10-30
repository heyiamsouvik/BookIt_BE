const Experience = require("../models/experience.model");
const Booking = require("../models/booking.model");
const { dailySlots } = require("../utils/slotConfig"); 



// GET ALL EXPERIENCES
const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().select("-createdBy"); // hide createdBy

    res.status(200).json({
      success: true,
      count: experiences.length,
      experiences,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addExperience = async (req, res) => {
  try {
    if (!req.admin || req.admin.role !== "admin") {
      return res.status(403).json({ message: "Only admin can add experiences" });
    }

    const { title, description, location, price, image } = req.body;

    if (!title || !description || !location || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExperience = await Experience.create({
      title,
      description,
      location,
      price,
      image,
      createdBy: req.admin._id
    });

    res.status(201).json({
      success: true,
      message: "Experience added successfully",
      experience: newExperience,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



const getExperienceDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id).select("-createdBy");

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json({
      success: true,
      experience
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllExperiences, addExperience,getExperienceDetails  };
