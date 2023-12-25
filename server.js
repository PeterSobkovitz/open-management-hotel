require("dotenv").config();

const express=require("express");

const mongoose=require("mongoose");
const userRouter=require('./routes');
const roomRouter=require('./room_routers');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL, {
    
    
   
});

app.use(express.json());
app.use(userRouter);
app.use(roomRouter);
app.get('/',(req,res)=>{
    res.send("HOMEPage");
})
module.exports = app;
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

