const Promotion = require("./promotion_model");
const express = require('express');
const router=express.Router();
const adminAuth=require("./admin_auth");
const DiscountCode=require("./discount_model");
router.post('/admin/promotions', adminAuth, async (req, res) => {
    try {
        const promotion = new Promotion(req.body);
        await promotion.save();
        res.status(201).send(promotion);
    } catch (error) {
        res.status(400).send({ error: 'Error creating promotion' });
    }
});
// Create a new discount code
router.post('/admin/discount-codes', adminAuth, async (req, res) => {
    try {
        const discountCode = new DiscountCode(req.body);
        await discountCode.save();
        res.status(201).send(discountCode);
    } catch (error) {
        res.status(400).send({ error: 'Error creating discount code' });
    }
});

// Update a discount code
router.patch('/admin/discount-codes/:codeId', adminAuth, async (req, res) => {
    try {
        const discountCode = await DiscountCode.findByIdAndUpdate(req.params.codeId, req.body, { new: true });
        if (!discountCode) {
            return res.status(404).send({ error: 'Discount code not found' });
        }
        res.send(discountCode);
    } catch (error) {
        res.status(400).send({ error: 'Error updating discount code' });
    }
});

// Delete a discount code
router.delete('/admin/discount-codes/:codeId', adminAuth, async (req, res) => {
    try {
        const discountCode = await DiscountCode.findByIdAndDelete(req.params.codeId);
        if (!discountCode) {
            return res.status(404).send({ error: 'Discount code not found' });
        }
        res.send({ message: 'Discount code deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
module.exports=router;