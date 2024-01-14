const express=require('express');
const User=require('./database_model');
const jwt=require('jsonwebtoken');
const router=express.Router();
const Role=require("./role_model");
const adminAuth=require("./admin_auth");
const checkPermission=require("./permisson_middleware");
const mongoose=require("mongoose");
router.post('/admin/roles', adminAuth, async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    
    try {
        const role = new Role(req.body);
        
        await role.save(session);
        await session.commitTransaction();
        res.status(201).send(role);
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        res.status(400).send({ error: 'Error creating role' });
    }finally{
        await session.endSession();
    }
});
router.patch('/admin/users/:userId/roles', adminAuth,checkPermission('manage_rooms'), async (req, res) => {
    const session=await mongoose.startSession()
    session.startTransaction()
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        user.roles = req.body.roles; // Array of role IDs
        await user.save(session);
        await session.commitTransaction();
        res.send(user);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).send({ error: 'Error updating user roles' });
    }finally{
        await session.endSession();
    }
});

module.exports=router