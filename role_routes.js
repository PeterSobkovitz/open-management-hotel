const express=require('express');
const User=require('./database_model');
const jwt=require('jsonwebtoken');
const router=express.Router();
const Role=require("./role_model");
const adminAuth=require("./admin_auth");
const checkPermission=require("./permisson_middleware");
router.post('/admin/roles', adminAuth, async (req, res) => {
    console.log("SSSSSSSSSSSSSSSSSSSSSs")
    
    try {
        const role = new Role(req.body);
        
        await role.save();
        res.status(201).send(role);
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: 'Error creating role' });
    }
});
router.patch('/admin/users/:userId/roles', adminAuth,checkPermission('manage_rooms'), async (req, res) => {
    
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        user.roles = req.body.roles; // Array of role IDs
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send({ error: 'Error updating user roles' });
    }
});

module.exports=router