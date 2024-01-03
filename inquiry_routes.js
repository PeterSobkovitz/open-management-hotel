
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
// View all customer inquiries
router.get('/admin/inquiries', adminAuth, async (req, res) => {
    try {
        const inquiries = await Inquiry.find({}).populate('user');
        res.send(inquiries);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Respond to an inquiry
router.patch('/admin/inquiries/:inquiryId', adminAuth, async (req, res) => {
    console.log("11123")
    try {
        const inquiry = await Inquiry.findById(req.params.inquiryId);
        if (!inquiry) {
            return res.status(404).send({ error: 'Inquiry not found' });
        }

        inquiry.response = req.body.response;
        inquiry.status = 'closed';
        inquiry.updatedAt = new Date();
        await inquiry.save();

        res.send(inquiry);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


module.exports=router;