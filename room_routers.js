
const express = require('express');
const Room = require('./room_model');
const router = express.Router();
const adminAuth=require("./admin_auth");
const auth=require("./auth_middleware");
// Get all rooms
router.get('/rooms', async (req, res) => {
  
    try {
        console.log("called");
        const rooms = await Room.find({});
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
    console.log("adminrooms")
    try {
        const room = new Room(req.body);
        await room.save();
        res.status(201).send(room);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Update room information
router.patch('/admin/rooms/:roomId', adminAuth, async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        if (!room) {
            return res.status(404).send({ error: 'Room not found' });
        }

        // Update logic here
        Object.assign(room, req.body);
        await room.save();
        res.send(room);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Delete a room
router.delete('/admin/rooms/:roomId', adminAuth, async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId);
        if (!room) {
            return res.status(404).send({ error: 'Room not found' });
        }

        await room.remove();
        res.send({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports = router;