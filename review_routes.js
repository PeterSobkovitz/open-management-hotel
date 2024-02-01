const express = require('express');
const Review = require("./review_model");
const router = express.Router();
const mongoose = require("mongoose");
const auth=require("./auth_middleware");
const adminAuth=require("./admin_auth");
const Room=require("./room_model");
const Booking=require("./booking_model");

// Post a review


router.post('/reviews', auth, async (req, res) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();
   
    try {
        const { booking, rating, comment,type} = req.body;
        console.log(req.body);
        const userId = req.user._id; // Assuming this is set by your auth middleware
       
        const bookingfound = await Booking.findById(booking).session(session);
        console.log("checking");
        

        if (type==='review'){
            console.log("yes");
            if (!bookingfound) {
                return res.status(404).send({ error: 'Booking not found' });
            }
             
            if (bookingfound.user.toString() !== userId.toString()) {
                return res.status(403).send({ error: 'Cannot review a booking that is not yours' });
            }
            const review = new Review({ booking, user: userId, rating, comment });
            console.log("revied");
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
            res.status(201).send(review);
        }
        else if(type==='feedback'){
            console.log("feedback")
            const feedback= new Review({ user: userId, comment, type });
            try{
                await feedback.save({ session });
            }
            catch(e){
                console.log(e);
            }
           
           
            res.status(201).send(feedback);
        }
        else{
            throw new Error('Invalid Type Specified');
        }
        
        await session.commitTransaction();
        console.log("DONE")
       
        
        
        
       
        
       
        
        
       
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        res.status(400).send({ error: error.message });
    } finally {
        session.endSession();
    }
});




router.patch('/reviews/:reviewId/flag', auth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).send({ error: 'Review not found' });
        }

        review.flagged = true;
        review.moderationStatus = 'pending';
        await review.save(session);
        await session.commitTransaction();
        res.send({ message: 'Review or feedback flagged for moderation' });
        console.log("flagged");
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: error.message });
    }finally{
        await session.endSession();
    }
});

router.get('/reviews/moderation', adminAuth, async (req, res) => {
    
    try {
        const { type } = req.query; // Optionally filter by 'review' or 'feedback'
        const query = type ? { flagged: true, moderationStatus: 'pending', type } : { flagged: true, moderationStatus: 'pending' };
        const reviews = await Review.find(query);
        res.send(reviews);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// Endpoint to approve or reject a review
router.patch('/reviews/:reviewId/moderate', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()

    try {
        const { moderationStatus } = req.body; // 'approved' or 'rejected'
        const review = await Review.findById(req.params.reviewId);

        if (!review) {
            return res.status(404).send({ error: 'Review or feedback not found' });
        }
        
        await review.save(session);
        console.log(`Review or feedback ${moderationStatus}`)
        session.commitTransaction()
        res.send({ message: `Review or feedback ${moderationStatus}` });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
router.get('/reviews/user',auth,async(req,res)=>{
    const userId = req.user._id; // Extracted from the authenticated user

    try{
        const reviews=await Review.find({user:userId})
        res.send(reviews);

    }catch(error){
        res.status(500).send(error);
    }
})


router.get('/reviews/:bookingId', async (req, res) => {
    try {
        const { type } = req.query; // 'review' or 'feedback'
        const query = type ? { booking: req.params.bookingId, type } : { booking: req.params.bookingId };
        const reviews = await Review.find(query);
        res.send(reviews);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports=router;