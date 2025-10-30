const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    experience: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },

    bookedUnderName: { type: String, required: true },
    contactEmail: { type: String, required: true },

    slot: {
      date: { type: String, required: true },
      time: { type: String, required: true }
    },

    quantity: { type: Number, default: 1 },

    totalPrice: { type: Number, required: true },
    promoCode: { type: String },

    referenceId: { type: String, required: true },

    status: { type: String, default: "confirmed" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
