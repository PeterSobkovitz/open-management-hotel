
const express = require('express');
const Room = require('./room_model');
const router = express.Router();
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

module.exports = router;