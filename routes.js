const express=require('express');
const User=require('./database_model');
const jwt=require('jsonwebtoken');
const router=express.Router();
const auth=require('./auth_middleware');
const mongoose=require("mongoose");
const Role=require("./role_model");
router.post('/register', async (req, res) => {
    console.log("register endpoint");
    try {
        const user = new User(req.body);
        await user.save();

        // Include the user ID in the JWT payload
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        user.tokens = user.tokens.concat({ token });
        await user.save();
     
        res.status(201).send({ user, token });
       
    } catch (error) {
     
        res.status(400).send(error);}
 
});
router.post('/register-admin', async (req, res) => {
    
    try {
        const user = new User({ ...req.body, isAdmin: true });
        await user.save();
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        user.tokens = user.tokens.concat({ token });
        await user.save();
     
        res.status(201).send({ user, token });
    } catch (error) {
       
        res.status(400).send(error);
    }
});
// User login
router.post('/login',async (req, res) => {
    console.log("logging in");
    try {
        const user = await User.findOne({ email: req.body.email });
      
        if (!user) {
            
            return res.status(400).send({ error: 'Unable to login' });
        }
        
        const isMatch = await user.comparePassword(req.body.password);
        console.log(isMatch);
        
        if (!isMatch) {
            return res.status(400).send({ error: 'Unable to login' });
        }

        const token=jwt.sign({id:user._id.toString()},process.env.JWT_SECRET);
        
    
        
        user.tokens.push({token});
        
        await user.save();
        console.log(
            "done"
        )
        if (user.roles.length===0){
            console.log("no roles");
            res.send({user,token})
        }
        else{
            const role=await Role.findById(user.roles[0]);
            let rolename=role.name;
            console.log(rolename);
            res.send({ user, token, rolename});

        }
        
        
    } catch (error) {
        console.log(error);
        
        res.status(400).send(error);
    }
});
router.post('/logout', auth, async (req, res) => {
    
    try {
        // Remove the token used for this session
        req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token);
        console.log(req.user.tokens);
        await req.user.save();
      
        res.send({ message: 'Logout successful' });
    } catch (error) {
        
        res.status(500).send({ error: 'Unable to logout' });
    }
});

module.exports = router;