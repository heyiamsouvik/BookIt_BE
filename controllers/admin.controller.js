const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Experience = require("../models/experience.model");


// REGISTER ADMIN
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email, role: "admin" });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    res.cookie("bookItAdminToken", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// LOGOUT ADMIN
const logoutAdmin = (req, res) => {
  res.clearCookie("bookItAdminToken", { httpOnly: true });
  res.status(200).json({ success: true, message: "Admin logged out successfully" });
};

// GET ADMIN PROFILE
const getAdminProfile = async (req, res) => {
  const admin = await User.findById(req.admin.id).select("-password");
  res.status(200).json({ success: true, admin });
};


module.exports = { registerAdmin, loginAdmin, logoutAdmin, getAdminProfile };
