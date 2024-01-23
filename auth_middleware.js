const jwt=require('jsonwebtoken');


const User=require('./database_model');
const mongoose=require("mongoose");
const ObjectId=mongoose.Types.ObjectId;
const auth = async (req, res, next) => {
    console.log("starting authentic")
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findOne({ _id:new ObjectId(decoded.id), 'tokens.token': token });
        console.log("isit?");
        if (!user) {
            
            console.log("Not found")
            return res.status(401).send({ error: 'Authentication failed. User not found.' });
        }
        
        req.token = token;
        req.user = user;
        
        next();
        console.log("IN HERE")
     
       
    } catch (e) {
        console.log("NOT WORKING");
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports=auth;