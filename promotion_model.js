const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    discountRate: { type: Number, required: true }, // Percentage or fixed amount
    validFrom: Date,
    validTo: Date,
    isActive: { type: Boolean, default: true }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
