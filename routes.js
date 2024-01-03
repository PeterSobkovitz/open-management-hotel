const express=require('express');
const User=require('./database_model');
const jwt=require('jsonwebtoken');
const router=express.Router();
const auth=require('./auth_middleware');

router.post('/register', async (req, res) => {
 
    try {
        const user = new User(req.body);
        await user.save();

        // Include the user ID in the JWT payload
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        user.tokens = user.tokens.concat({ token });
        await user.save();
       
        res.status(201).send({ user, token });
       
    } catch (error) {
        res.status(400).send(error);
    }
});
router.post('/register-admin', async (req, res) => {
    try {
        const user = new User({ ...req.body, isAdmin: true });
        await user.save();
        // Additional logic for token generation, etc.
        res.status(201).send({ user });
    } catch (error) {
        res.status(400).send(error);
    }
});
// User login
router.post('/login',async (req, res) => {
    
   
    try {
        const user = await User.findOne({ email: req.body.email });
     
        if (!user) {
            
            return res.status(400).send({ error: 'Unable to login' });
        }

        const isMatch = await user.comparePassword(req.body.password);
        
        if (!isMatch) {
            return res.status(400).send({ error: 'Unable to login' });
        }
       
        const token=jwt.sign({id:user._id.toString()},process.env.JWT_SECRET);
        
        user.tokens.push({token});
        await user.save();
        
        res.send({ user, token });
        
    } catch (error) {
        console.log("cant log");
        res.status(400).send(error);
    }
});
router.post('/logout', auth, async (req, res) => {
    try {
        // Remove the token used for this session
        req.user.tokens = req.user.tokens.filter(tokenObj => tokenObj.token !== req.token);

        await req.user.save();
        res.send({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).send({ error: 'Unable to logout' });
    }
});

module.exports = router;