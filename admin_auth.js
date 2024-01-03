const jwt = require('jsonwebtoken');
const User = require('./database_model'); // Adjust the path as necessary

const adminAuth = async (req, res, next) => {
    console.log('try Admin')
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });
        
        if (!user || !user.isAdmin) {
            console.log("error");
            throw new Error();
        }

        req.token = token;
        req.user = user;
        console.log("loged admin");
        next();
       
    } catch (e) {
        console.log("error in admin auth")
        res.status(403).send({ error: 'Access denied' });
    }
};

module.exports=adminAuth