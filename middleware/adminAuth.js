const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const adminAuth = async (req, res, next) => {
  try {
    // Use admin token, not user token
    const token = req.cookies?.bookItAdminToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No admin token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await User.findById(decoded.id);

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    if (admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error("Admin Auth error:", err.message);
    res.status(401).json({ message: "Invalid or expired admin token" });
  }
};

module.exports = adminAuth;
