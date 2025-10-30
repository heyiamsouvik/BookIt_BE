const Booking = require("../models/booking.model");
const { dailySlots } = require("../utils/slotConfig");

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      bookedUnderName,
      contactEmail,
      experienceId,
      date,
      time,
      quantity,
      totalPrice,
    } = req.body;

    if (
      !bookedUnderName ||
      !contactEmail ||
      !experienceId ||
      !date ||
      !time ||
      !totalPrice
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Find capacity for this time slot
    const slotConfig = dailySlots.find((s) => s.time === time);
    if (!slotConfig) {
      return res.status(400).json({
        success: false,
        message: "Invalid time slot",
      });
    }

    const capacity = slotConfig.capacity;

    // Count already booked seats for same date & time
    const bookings = await Booking.find({
      experience: experienceId,
      "slot.date": date,
      "slot.time": time,
    });

    const bookedSeats = bookings.reduce((sum, b) => sum + (b.quantity || 1), 0);
    const remainingSeats = capacity - bookedSeats;

    if (remainingSeats < (quantity || 1)) {
      return res.status(400).json({
        success: false,
        message: `Only ${remainingSeats} seats available for this time slot`,
      });
    }

    // Generate booking reference
    const refId =
      "HD" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // Save booking
    const booking = await Booking.create({
      user: userId,
      bookedUnderName,
      contactEmail,
      experience: experienceId,
      slot: { date, time },
      quantity: quantity || 1,
      totalPrice,
      referenceId: refId,
    });

    return res.json({
      success: true,
      bookingId: booking._id,
      refId,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Confirm Booking
exports.confirmBooking = async (req, res) => {
  try {
    const { refId, paymentId, paymentStatus } = req.body;

    if (!refId || !paymentId || !paymentStatus) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const booking = await Booking.findOne({ referenceId: refId });

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid reference ID" });
    }

    booking.paymentId = paymentId;
    booking.paymentStatus = paymentStatus;
    booking.status = "CONFIRMED";
    await booking.save();

    return res.json({
      success: true,
      message: "Booking confirmed successfully",
      refId: booking.referenceId,
      bookingId: booking._id,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
