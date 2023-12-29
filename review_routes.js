const express = require('express');
const Review = require("./review_model");
const router = express.Router();

// Post a review
router.post('/reviews', auth, async (req, res) => {
    try {
        const { bookingId, rating, comment } = req.body;
        const userId = req.user._id; // Extracted from auth middleware

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).send({ error: 'Booking not found' });
        }

        // Ensure the user is reviewing their own booking
        if (booking.user.toString() !== userId.toString()) {
            return res.status(403).send({ error: 'Cannot review a booking that is not yours' });
        }

        const review = new Review({ booking: bookingId, user: userId, rating, comment });
        await review.save();

        // Additional logic to update aggregate ratings (see point 4)
        const aggregate = await Review.aggregate([
            { $match: { room: booking.room } },
            { $group: { _id: null, averageRating: { $avg: "$rating" }, count: { $sum: 1 } } }
        ]);
        
        const room = await Room.findById(booking.room);
        room.rating.average = aggregate[0].averageRating;
        room.rating.count = aggregate[0].count;
        await room.save();
        res.status(201).send(review);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Get reviews for a room or booking
router.get('/reviews/:bookingId', async (req, res) => {
    try {
        const reviews = await Review.find({ booking: req.params.bookingId });
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
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
