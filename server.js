require("dotenv").config();

const express=require("express");

const mongoose=require("mongoose");
const userRouter=require('./routes');
const roomRouter=require('./room_routers');
const bookRouter=require('./booking_routes');
const inquiryRouter=require("./inquiry_routes");
const reportingRouter=require("./reporting_routes");
const reviewRouter=require("./review_routes");
const customerRouter=require("./customer_routes.js");
const promotionRouter=require("./promotion_routes.js");
const roleRouter=require("./role_routes.js");
const app = express();
const cors=require("cors");
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URL, {
    
    
   
});
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(roomRouter);
app.use(bookRouter);
app.use(reviewRouter);
app.use(reportingRouter);
app.use(promotionRouter);
app.use(customerRouter);
app.use(inquiryRouter);
app.use(roleRouter);
app.get('/',(req,res)=>{
    res.send("HOMEPage");
})
module.exports = app;
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

