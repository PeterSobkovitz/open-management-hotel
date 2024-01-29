const Booking = require('./booking_model');
async function isRoomAvailable(roomId, startDate, endDate) {
    const existingBooking = await Booking.findOne({
        room: roomId,
        endDate: { $gte: startDate },
        startDate: { $lte: endDate },
        status: 'booked'
    });
    console.log(existingBooking);
    return !existingBooking;
}
module.exports=isRoomAvailable;