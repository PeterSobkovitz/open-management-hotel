const mongoose = require('mongoose');


const inquirySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    response: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
