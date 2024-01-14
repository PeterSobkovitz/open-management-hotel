
const express = require('express');
const Room = require('./room_model');
const router = express.Router();
const adminAuth=require("./admin_auth");
const auth=require("./auth_middleware");
const mongoose=require("mongoose");
// Get all rooms
router.get('/rooms', async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'asc' } = req.query;
    
    try {
        const rooms = await Room.find({})
            .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.send(rooms);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Get room by ID
router.get('/rooms/:id', async (req, res) => {
  
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return res.status(404).send();
        }
        res.send(room);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Filter rooms
router.get('/rooms/filter', async (req, res) => {
    const match = {};
    
    if (req.query.maxOccupancy) {
        match.maxOccupancy = req.query.maxOccupancy;
    }
    if (req.query.priceRange) {
        const [minPrice, maxPrice] = req.query.priceRange.split(',').map(Number);
        match.pricePerNight = { $gte: minPrice, $lte: maxPrice };
    }
    // Add more filters as needed

    try {
        const rooms = await Room.find(match);
        res.send(rooms);
    } catch (error) {
        res.status(500).send(error);
    }
});
// Add a new room
router.post('/admin/rooms', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const room = new Room(req.body);
        await room.save(session);
        await session.commitTransaction();
        res.status(201).send(room);
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: 'Internal Server Error' });
    }finally{
        await session.endSession();
    }
});

// Update room information
router.patch('/admin/rooms/:roomId', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const room = await Room.findById(req.params.roomId);
        if (!room) {
            return res.status(404).send({ error: 'Room not found' });
        }

        // Update logic here
        Object.assign(room, req.body);
        await room.save(session);
        session.commitTransaction();
        res.send(room);
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: 'Internal Server Error' });
    }finally{
        await session.endSession();
    }
});
router.patch('/admin/rooms/:roomId/availability', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const { status } = req.body; // Expect a boolean value
        
        const room = await Room.findByIdAndUpdate(req.params.roomId, { status }, { new: true ,session:session});
       
        if (!room) {
            
            return res.status(404).send({ error: 'Room not found' });
        }
        await session.commitTransaction();
        res.send(room);

       
    } catch (error) {
        await session.abortTransaction();
        res.status(400).send({ error: 'Invalid request' });
    }finally{
        await session.endSession();
    }
});

// Delete a room
router.delete('/admin/rooms/:roomId', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const room = await Room.findByIdAndDelete(req.params.roomId);
        if (!room) {
            return res.status(404).send({ error: 'Room not found' });
        }
        
      
        await session.commitTransaction();
        res.send({ message: 'Room deleted' });
    } catch (error) {
        console.log("ERR")
        console.log(error)
        await session.abortTransaction();
        res.status(500).send({ error: 'Internal Server Error' });
    }finally{
        await session.endSession();
    }
});
router.patch('/admin/rooms/:roomId/special-offers', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const { specialOffers } = req.body; // Expect an array of special offer objects
        const room = await Room.findById(req.params.roomId);

        if (!room) {
            return res.status(404).send({ error: 'Room not found' });
        }

        room.specialOffers = specialOffers;
        await room.save(session);
        await session.commitTransaction();
        res.send(room);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).send({ error: 'Invalid request' });
    }finally{
        await session.endSession();
    }
});

module.exports = router;