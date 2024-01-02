
const auth=require("./auth_middleware");
const adminAuth=require("./admin_auth");

const express = require('express');
const Inquiry =require("./inquiry_model");
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/inquiries', auth, async (req, res) => {

    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    try {
        const inquiry = new Inquiry({ ...req.body, user: req.user._id });
        await inquiry.save();
        res.status(201).send(inquiry);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
// Get all open inquiries for staff
// router.get('/inquiries', adminAuth, async (req, res) => {
//     try {
//         const inquiries = await Inquiry.find({ status: 'open' });
//         res.send(inquiries);
//     } catch (error) {
//         res.status(500).send({ error: error.message });
//     }
// });

// Respond to an inquiry
// router.patch('/inquiries/:inquiryId', adminAuth, async (req, res) => {
//     try {
//         const inquiry = await Inquiry.findById(req.params.inquiryId);
//         if (!inquiry) {
//             return res.status(404).send({ error: 'Inquiry not found' });
//         }

//         inquiry.response = req.body.response;
//         inquiry.status = 'closed'; // or use the status sent from the request body if you want to keep it open
//         inquiry.updatedAt = new Date();
//         await inquiry.save();

//         res.send(inquiry);
//     } catch (error) {
//         res.status(400).send({ error: error.message });
//     }
// });
module.exports=router;