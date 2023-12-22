require("dotenv").config();

const express=require("express");

const mongoose=require("mongoose");
const userRouter=require('./routes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL, {
    
    
   
});

app.use(express.json());
app.use(userRouter);
app.get('/',(req,res)=>{
    res.send("HOMEPage");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
