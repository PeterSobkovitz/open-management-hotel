const express=require('express');
const User=require('./database_model');
const jwt=require('jsonwebtoken');
const router=express.Router();
const mongoose=require("mongoose");
const adminAuth=require("./admin_auth");
const auth=require("./auth_middleware");
const ServiceRequest=require("./custom_service_model");
router.post('/service-requests', auth, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const serviceRequest = new ServiceRequest({ ...req.body, user: req.user._id });
        await serviceRequest.save(session);
        await session.commitTransaction();
        res.status(201).send(serviceRequest);
        
    } catch (error) {
        res.status(400).send({ error: 'Error creating service request' });
        await session.abortTransaction();
    }finally{
        await session.endSession();
    }
});
router.get('/admin/customers', adminAuth, async (req, res) => {
    try {
        const customers = await User.find({}).populate('bookings').populate('inquiries');
        res.send(customers);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.get('/admin/customers/:customerId', adminAuth, async (req, res) => {
    try {
        const customer = await User.findById(req.params.customerId).populate('bookings').populate('inquiries');
        if (!customer) {
            return res.status(404).send({ error: 'Customer not found' });
        }
        res.send(customer);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.get('/admin/customers', adminAuth, async (req, res) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!")
    try {
        const searchCriteria = {}; // Construct search criteria based on query parameters
        const customers = await User.find(searchCriteria).populate('bookings').populate('inquiries');
        res.send(customers);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.get('/admin/service-requests', adminAuth, async (req, res) => {
    
    try {
        const serviceRequests = await ServiceRequest.find({}).populate('user');
        res.send(serviceRequests);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
router.patch('/admin/service-requests/:requestId', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const { response, status } = req.body;
        const serviceRequest = await ServiceRequest.findById(req.params.requestId);

        if (!serviceRequest) {
            return res.status(404).send({ error: 'Service request not found' });
        }

        serviceRequest.response = response;
        serviceRequest.status = status; // e.g., 'open' or 'closed'
        serviceRequest.updatedAt = new Date();

        await serviceRequest.save(session);
        await session.commitTransaction();
        res.send(serviceRequest);
    } catch (error) {
        await session.abortTransaction();
        res.status(500).send({ error: 'Internal Server Error' });
        
    }
    finally{
        await session.endSession();
    }
});


module.exports=router;