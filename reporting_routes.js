const adminAuth=require("./admin_auth");
const Booking=require("./booking_model");
const express = require('express');
const router=express.Router();
const Room=require("./room_model");
const mongoose=require("mongoose");

// Generate a revenue report
router.get('/admin/reports/revenue', adminAuth, async (req, res) => {
    
    try {
        // Example: Calculate total revenue from bookings
        const revenueReport = await Booking.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
        ]);
        console.log("FFFFFFF")
        res.send(revenueReport);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.get('/admin/reports/bookings', adminAuth, async (req, res) => {
    try {
        // Logic to aggregate booking data
        const bookingsReport = await Booking.find({ /* Date range or other filters */ });
        res.send(bookingsReport);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.get('/admin/reports/occupancy', adminAuth, async (req, res) => {
    

    try {
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);
        
        // Calculate the total number of days in the range
        const totalDays = (endDate - startDate) / (1000 * 3600 * 24);
        
        // Calculate total available room nights
        
        const totalRooms = await Room.countDocuments();
        console.log("12333")
        const totalAvailableRoomNights = totalRooms * totalDays;
        
        // Calculate total booked room nights
        const bookedNights = await Booking.aggregate([
            { 
                $match: { 
                    startDate: { $lte: endDate }, 
                    endDate: { $gte: startDate } 
                }
            },
            {
                $project: {
                    nights: { $min: [{ $subtract: [endDate, "$startDate"] }, { $subtract: ["$endDate", startDate] }] }
                }
            },
            {
                $group: {
                    _id: null,
                    totalBookedNights: { $sum: { $divide: ["$nights", 1000 * 3600 * 24] } }
                }
            }
        ]);

        const occupancyRate = (bookedNights[0]?.totalBookedNights || 0) / totalAvailableRoomNights;
        res.send({ occupancyRate });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/admin/reports/adr', adminAuth, async (req, res) => {
    try {
        const startDate = new Date(req.query.startDate);
        const endDate = new Date(req.query.endDate);

        // Calculate the total revenue and the total number of booked nights
        const revenueData = await Booking.aggregate([
            { 
                $match: { 
                    startDate: { $lte: endDate }, 
                    endDate: { $gte: startDate },
                    status: 'booked' // Or whatever status indicates a confirmed booking
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                    totalNights: { $sum: { $min: [{ $subtract: [endDate, "$startDate"] }, { $subtract: ["$endDate", startDate] }] } }
                }
            }
        ]);

        const totalNights = revenueData[0]?.totalNights / (1000 * 3600 * 24) || 0;
        const averageDailyRate = totalNights > 0 ? revenueData[0]?.totalRevenue / totalNights : 0;

        res.send({ averageDailyRate });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


module.exports=router;