const PromoCode = require("../models/promoCode.model");

exports.validatePromo = async (req, res) => {
  try {
    const { promoCode, basePrice } = req.body;

    if (!promoCode || typeof basePrice !== "number") {
      return res.status(400).json({
        success: false,
        message: "promoCode and basePrice are required"
      });
    }

    const promo = await PromoCode.findOne({
      code: promoCode.toUpperCase()
    });

    if (!promo) {
      return res.status(400).json({
        success: false,
        message: "Invalid promo code"
      });
    }

    let discount = 0;
    const value = promo.discountValue;

    if (promo.discountType === "percentage") {
      discount = (basePrice * value) / 100;
    } else if (promo.discountType === "flat") {
      discount = value;
    }

    const finalPrice = Math.max(basePrice - discount, 0);

    res.json({
      success: true,
      promoCode: promo.code,
      discountType: promo.discountType,
      discountValue: value,
      discount: Math.round(discount),
      finalPrice: Math.round(finalPrice)
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
