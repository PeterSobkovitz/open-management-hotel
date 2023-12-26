const express = require('express');
const Booking = require('./booking_model');
const Room=require('./room_model');
const User=require('./database_model');
const mongoose=require('mongoose');

const router = express.Router();


async function isRoomAvailable(roomId, startDate, endDate) {
    const existingBooking = await Booking.findOne({
        room: roomId,
        endDate: { $gte: startDate },
        startDate: { $lte: endDate },
        status: 'booked'
    });
    return !existingBooking;
}
function calculateTotalPrice(startDate, endDate, pricePerNight) {
    const dayInMs = 24 * 60 * 60 * 1000;
    const duration = (new Date(endDate) - new Date(startDate)) / dayInMs;
    return duration * pricePerNight;
}
async function validateUserAndRoom(userId, roomId) {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    return user && room;
}


router.post('/bookings', async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { roomId, userId, startDate, endDate } = req.body;

        const user = await User.findById(userId).session(session);
        const room = await Room.findById(roomId).session(session);
        if (!user || !room) {
            throw new Error('Invalid user or room');
        }

        const available = await isRoomAvailable(roomId, startDate, endDate, session);
        if (!available) {
            throw new Error('Room is not available for the selected dates');
        }

        const totalPrice = calculateTotalPrice(startDate, endDate, room.pricePerNight);
        const booking = new Booking({ room: roomId, user: userId, startDate, endDate, totalPrice });
        await booking.save({ session });

        // Update user and room with booking info
        user.bookings.push(booking);
        room.bookings.push(booking);
        await user.save({ session });
        await room.save({ session });

        await session.commitTransaction();
        res.status(201).send(booking);
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: error.message });
    } finally {
        session.endSession();
    }
});



module.exports=router

