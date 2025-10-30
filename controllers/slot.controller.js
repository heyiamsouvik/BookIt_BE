const Booking = require("../models/booking.model");
const { dailySlots } = require("../utils/slotConfig");

exports.getAvailableSlots = async (req, res) => {
  try {
    const { id } = req.params; // experience ID
    const { date } = req.query; // YYYY-MM-DD

    if (!date) {
      return res.status(400).json({ message: "Please pass date=YYYY-MM-DD" });
    }

    // Find all bookings for this experience and date
    const bookings = await Booking.find({
      experience: id,
      "slot.date": date
    });

    // Build slot availability result
    const slots = dailySlots.map(slot => {
      const bookedCount = bookings.filter(b => b.slot.time === slot.time).length;
      const remaining = slot.capacity - bookedCount;

      return {
        time: slot.time,
        booked: bookedCount,
        capacity: slot.capacity,
        remaining,
        available: remaining > 0
      };
    });

    return res.status(200).json({
      success: true,
      experience: id,
      date,
      slots
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
