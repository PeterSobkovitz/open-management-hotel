const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    createdAt: { type: Date, default: Date.now },
    flagged: { type: Boolean, default: false },
    moderationStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
