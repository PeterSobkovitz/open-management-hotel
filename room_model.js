const mongoose=require("mongoose");
const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    maxOccupancy: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: [String],
    description: String,
    images: [String] // URLs to images
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;