const adminAuth=require("./admin_auth");
const Booking=require("./booking_model");
const express = require('express');
const router=express.Router();

// Generate a revenue report
router.get('/admin/reports/revenue', adminAuth, async (req, res) => {
    
    try {
        // Example: Calculate total revenue from bookings
        const revenueReport = await Booking.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } }
        ]);
       
        res.send(revenueReport);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

module.exports=router;