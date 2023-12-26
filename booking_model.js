const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'booked', enum: ['booked', 'cancelled', 'completed'] }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
