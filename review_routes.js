const express = require('express');
const Review = require("./review_model");
const router = express.Router();
const mongoose = require("mongoose");
const auth=require("./auth_middleware");
const adminAuth=require("./admin_auth");
const Room=require("./room_model");
const Booking=require("./booking_model");
// Post a review

// Assuming you have a middleware `auth` for authentication

router.post('/reviews', auth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log("!!!!!!!!!!!!!!1")
    try {
        const { booking, rating, comment } = req.body;
        console.log(req.body);
        const userId = req.user._id; // Assuming this is set by your auth middleware
        console.log(booking);
        const bookingfound = await Booking.findById(booking).session(session);
        console.log(bookingfound);

       
        if (!bookingfound) {
            return res.status(404).send({ error: 'Booking not found' });
        }
        console.log("ddd");
        if (bookingfound.user.toString() !== userId.toString()) {
            return res.status(403).send({ error: 'Cannot review a booking that is not yours' });
        }
        const review = new Review({ booking, user: userId, rating, comment });
       
        await review.save({ session });
        
       
// Manually calculate the new average
        
        const room = await Room.findById(bookingfound.room).session(session);
        if (!room) {
            console.log("Room nONE")
            throw new Error('Room not found');
        }
        console.log("room");
        // Manually calculate the new average rating
        const totalRating = (room.rating.average * room.rating.count) + rating;
        const newCount = room.rating.count + 1;
        room.rating.average = totalRating / newCount;
        room.rating.count = newCount;
        
        await room.save({ session });
        
        await session.commitTransaction();
        console.log("DONE")
        res.status(201).send(review);
        
        
        
       
        
       
        
        
       
    } catch (error) {
        await session.abortTransaction();
        res.status(400).send({ error: error.message });
    } finally {
        session.endSession();
    }
});




router.patch('/reviews/:reviewId/flag', auth, async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).send({ error: 'Review not found' });
        }

        review.flagged = true;
        review.moderationStatus = 'pending';
        await review.save();

        res.send({ message: 'Review flagged for moderation' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
router.get('/reviews/moderation', adminAuth, async (req, res) => {
    try {
        const reviews = await Review.find({ flagged: true, moderationStatus: 'pending' });
        res.send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Endpoint to approve or reject a review
router.patch('/reviews/:reviewId/moderate', adminAuth, async (req, res) => {
    try {
        const { moderationStatus } = req.body; // 'approved' or 'rejected'
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).send({ error: 'Review not found' });
        }

        review.moderationStatus = moderationStatus;
        await review.save();

        res.send({ message: `Review ${moderationStatus}` });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
router.get('/reviews/:bookingId', async (req, res) => {
    try {
        const reviews = await Review.find({ booking: req.params.bookingId });
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports=router;