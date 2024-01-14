const Promotion = require("./promotion_model");
const express = require('express');
const router=express.Router();
const adminAuth=require("./admin_auth");
const mongoose=require("mongoose");
const DiscountCode=require("./discount_model");
router.post('/admin/promotions', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const promotion = new Promotion(req.body);
        await promotion.save(session);
        await session.commitTransaction();
        res.status(201).send(promotion);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).send({ error: 'Error creating promotion' });
    }finally{
        await session.endSession();
    }
});
// Create a new discount code
router.post('/admin/discount-codes', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const discountCode = new DiscountCode(req.body);
        await discountCode.save(session);
        await session.commitTransaction();
        res.status(201).send(discountCode);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).send({ error: 'Error creating discount code' });
    }finally{
        await session.endSession();
    }
});

// Update a discount code
router.patch('/admin/discount-codes/:codeId', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const discountCode = await DiscountCode.findByIdAndUpdate(req.params.codeId, req.body, { new: true,session:session });
        if (!discountCode) {
            return res.status(404).send({ error: 'Discount code not found' });
        }
        session.commitTransaction();
        res.send(discountCode);
    } catch (error) {
        session.abortTransaction();
        res.status(400).send({ error: 'Error updating discount code' });
    }finally{
        session.endSession();
    }
});

// Delete a discount code
router.delete('/admin/discount-codes/:codeId', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const discountCode = await DiscountCode.findByIdAndDelete(req.params.codeId,{session:session});
        if (!discountCode) {
            return res.status(404).send({ error: 'Discount code not found' });
        }
        session.commitTransaction();
        res.send({ message: 'Discount code deleted successfully' });
    } catch (error) {
        session.abortTransaction();
        res.status(500).send({ error: 'Internal Server Error' });
    }finally{
        session.endSession();
    }
});
module.exports=router;