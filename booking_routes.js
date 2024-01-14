const express = require('express');
const Booking = require('./booking_model');
const Room=require('./room_model');
const User=require('./database_model');
const mongoose=require('mongoose');
const adminAuth=require("./admin_auth");
const auth=require("./auth_middleware");
const router = express.Router();
const DiscountCode=require("./discount_model");
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
async function updateRoomAvailability(roomId,session) {
    let status;
    const booking= await Booking.find({
        room: roomId,
        endDate: { $gte: new Date() },
        
        status: 'booked'
    }).session(session);
    if (booking.length===0){
        status="available";
    }
    else{
        status="booked"
    }
        

    console.log(booking);


    await Room.findByIdAndUpdate(roomId,{status:status},{session:session});

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
async function applyDiscount(discountCode, totalPrice) {
    const discount = await DiscountCode.findOne({ code: discountCode, isActive: true });
    if (!discount || discount.expirationDate < new Date()) {
        throw new Error('Invalid or expired discount code');
    }

    // Assuming a simple percentage-based discount for this example
    return totalPrice * (1 - discount.discountRate / 100);
}


router.post('/bookings',auth, async (req, res) => {
    
    const session = await mongoose.startSession();
    
    session.startTransaction();
    console.log("Booking1");
    try {
        
        const { roomId, userId, newStartDate, newEndDate } = req.body;
        const discountCode=req.body.DiscountCode;
        const user = await User.findById(userId).session(session);
        const room = await Room.findById(roomId).session(session);
        if (!user || !room) {
            console.log("invalid");
            throw new Error('Invalid user or room');
        }
      
        const available = await isRoomAvailable(roomId, newStartDate, newEndDate, session);
        
        if (!available) {
            throw new Error('Room is not available for the selected dates');
        }
        

        const totalPrice = calculateTotalPrice(newStartDate, newEndDate, room.pricePerNight);
        

        if (discountCode) {
            totalPrice = await applyDiscount(discountCode, totalPrice);
        }
        const booking = new Booking({ room: roomId, user: userId, startDate:newStartDate, endDate:newEndDate, totalPrice });
        console.log(booking);
        
        await booking.save({ session });
        console.log("bookingsaved")
        // // Update user and room with booking info
        user.bookings.push(booking);
        room.bookings.push(booking);
        console.log("infosaved")
        await user.save({ session });
        await room.save({ session });
        console.log("saved room user")
        
        await session.commitTransaction();
        console.log("updateroomavailabilty")
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

        // Update user's booking array
        await User.updateOne(
            { _id: booking.user }, 
            { $pull: { bookings: booking._id } },
            { session }
        );

        // Update room's booking array and availability

        await Room.updateOne(
            { _id: booking.room }, 
            { $pull: { bookings: booking._id } },
            { session }
        );
        

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
        const { newStartDate, newEndDate, discountCode } = req.body;

        const booking = await Booking.findById(bookingId).session(session);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Check room availability for new dates
        const available = await isRoomAvailable(booking.room, newStartDate, newEndDate, session);
        if (!available) {
            throw new Error('Room is not available for the selected dates');
        }

        // Recalculate the price
        const room = await Room.findById(booking.room).session(session);
        let newPrice = calculateTotalPrice(newStartDate, newEndDate, room.pricePerNight);

        // Apply discount if provided
        if (discountCode) {
            newPrice = await applyDiscount(discountCode, newPrice);
        }

        booking.startDate = newStartDate;
        booking.endDate = newEndDate;
        booking.totalPrice = newPrice;
        await booking.save({ session });

        // Update room availability based on the new booking dates
        await updateRoomAvailability(booking.room, session);

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
// View all bookings
router.get('/admin/bookings', adminAuth, async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('user').populate('room');
        res.send(bookings);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Update a booking
router.patch('/admin/bookings/:bookingId', adminAuth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { newStartDate, newEndDate, newRoomId, discountCode } = req.body;
        const booking = await Booking.findById(req.params.bookingId).session(session);
        if (!booking) {
            throw new Error('Booking not found');
        }

        // Check room availability if the room or dates are being changed
        if (newRoomId || newStartDate || newEndDate) {
            const roomId = newRoomId || booking.room;
            const available = await isRoomAvailable(roomId, newStartDate, newEndDate, session);
            if (!available) {
                throw new Error('Room is not available for the selected dates');
            }

            // Recalculate the price
            const room = await Room.findById(roomId).session(session);
            let newPrice = calculateTotalPrice(newStartDate, newEndDate, room.pricePerNight);
            if (discountCode) {
                newPrice = await applyDiscount(discountCode, newPrice);
            }

            booking.startDate = newStartDate;
            booking.endDate = newEndDate;
            booking.room = roomId;
            booking.totalPrice = newPrice;
        }

        await booking.save({ session });
        await updateRoomAvailability(booking.room, session);

        await session.commitTransaction();
        res.send(booking);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).send({ error: error.message });
    } finally {
        session.endSession();
    }
});


// Cancel a booking
router.patch('/admin/bookings/:bookingId/cancel', adminAuth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const booking = await Booking.findById(req.params.bookingId).session(session);
        if (!booking) {
            throw new Error('Booking not found');
        }

        booking.status = 'cancelled';
        await booking.save({ session });
        
        // Update room availability
        await updateRoomAvailability(booking.room, session);

        await session.commitTransaction();
        res.send(booking);
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: 'Internal Server Error' });
    } finally {
        session.endSession();
    }
});


module.exports=router

