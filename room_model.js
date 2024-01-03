const mongoose=require("mongoose");
const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    maxOccupancy: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: [String],
    description: String,
    images: [String], // URLs to images
    size:Number,
    floor:Number,
    view:String,
    specialAmenities:[String],
    status:{type:String,default:'available',enum:['available','under_maintenance','occupied']},
    
    bookings:[{type:mongoose.Schema.Types.ObjectId,ref:'Booking'}],
    rating: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    specialOffers: [{
        description: String,
        validFrom: Date,
        validTo: Date
    }],

});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;