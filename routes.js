const express=require('express');
const User=require('./database_model');
const jwt=require('jsonwebtoken');
const router=express.Router();

router.post('/register', async (req, res) => {
    console.log(1)
    try {
        const user = new User(req.body);
        await user.save();
        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({ error: 'Unable to login' });
        }

        const isMatch = await user.comparePassword(req.body.password);

        if (!isMatch) {
            return res.status(400).send({ error: 'Unable to login' });
        }

        const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;