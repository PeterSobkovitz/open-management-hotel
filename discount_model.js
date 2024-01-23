const mongoose = require('mongoose');

const discountCodeSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    associatedPromotion: { type: mongoose.Schema.Types.ObjectId, ref: 'Promotion' },
    expirationDate: Date,
    isActive: { type: Boolean, default: true }
});

const DiscountCode = mongoose.model('DiscountCode', discountCodeSchema);

module.exports = DiscountCode;
