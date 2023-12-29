const express = require('express');
const Booking = require('./booking_model');
const Room=require('./room_model');
const User=require('./database_model');
const mongoose=require('mongoose');

const auth=require("./auth_middleware");
const router = express.Router();

const PDFDocument = require('pdfkit');

function generateBookingPDF(booking, res) {
    const doc = new PDFDocument();

    doc.pipe(res); // Write the PDF to the response
    doc.fontSize(25).text('Booking Confirmation', 100, 100);
    // Add more content to the PDF
    doc.text(`Booking ID: ${booking._id}`, 100, 150);
    // Include more booking details as needed

    doc.end();}
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
    const durationInMs = new Date(endDate) - new Date(startDate);
    const durationInDays = durationInMs / dayInMs;
    
    return durationInDays * pricePerNight;
}
async function validateUserAndRoom(userId, roomId) {
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    return user && room;
}


router.post('/bookings',auth, async (req, res) => {
    
    const session = await mongoose.startSession();
    
    session.startTransaction();
    
    try {
        console.log(req.body);
        const { roomId, userId, newStartDate, newEndDate } = req.body;
        
        const user = await User.findById(userId).session(session);
        const room = await Room.findById(roomId).session(session);
        if (!user || !room) {
            console.log("invalid");
            throw new Error('Invalid user or room');
        }
        console.log("good when find")
        const available = await isRoomAvailable(roomId, newStartDate, newEndDate, session);
        
        if (!available) {
            throw new Error('Room is not available for the selected dates');
        }
        console.log("good when find2")

        const totalPrice = calculateTotalPrice(newStartDate, newEndDate, room.pricePerNight);
        console.log(totalPrice);
        console.log("Going booking");
        const booking = new Booking({ room: roomId, user: userId, startDate:newStartDate, endDate:newEndDate, totalPrice });
        console.log(booking);
        
        await booking.save({ session });
       
        // Update user and room with booking info
        user.bookings.push(booking);
        room.bookings.push(booking);
        await user.save({ session });
        await room.save({ session });

        await session.commitTransaction();
        res.status(201).send(booking);
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        res.status(500).send({ error: error.message });
    } finally {
        session.endSession();
    }
});

// Fetch all bookings for a user
router.get('/bookings/user/:userId',auth, async (req, res) => {
  
    try {
        const bookings = await Booking.find({ user: req.params.userId }).populate('room');
        res.send(bookings);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Cancel a booking
router.patch('/bookings/:bookingId/cancel', auth, async (req, res) => {
    console.log("cancelling");
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const booking = await Booking.findById(req.params.bookingId).session(session);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Update booking status
        booking.status = 'cancelled';
        await booking.save({ session });

        // Optionally, update the room and user documents
        // For example, remove this booking from the user's and room's bookings array

        await session.commitTransaction();
        res.send(booking);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).send({ error: error.message });
    } finally {
        session.endSession();
    }
});


// Modify a booking - this will depend on what you allow to be modified
router.patch('/bookings/:bookingId', auth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const bookingId = req.params.bookingId;
        const { newStartDate, newEndDate } = req.body;

        const booking = await Booking.findById(bookingId).session(session);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Additional logic to check room availability for new dates

        // Recalculate the price if needed
        const room = await Room.findById(booking.room).session(session);
        const newPrice = calculateTotalPrice(newStartDate, newEndDate, room.pricePerNight);

        booking.startDate = newStartDate;
        booking.endDate = newEndDate;
        booking.totalPrice = newPrice;
        await booking.save({ session });

        await session.commitTransaction();
        res.send(booking);
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        res.status(400).send({ error: error.message });
    } finally {
        session.endSession();
    }
});


router.get('/bookings/:bookingId/confirmation', auth,async (req, res) => {
    if (req.user._id.toString() !== req.params.userId) {
        return res.status(403).send({ error: 'Access denied' });
    }
    try {
        const booking = await Booking.findById(req.params.bookingId).populate('room');
        if (!booking) {
            return res.status(404).send();
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=confirmation-${booking._id}.pdf`);

        generateBookingPDF(booking, res);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports=router

