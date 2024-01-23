const mongoose=require("mongoose");
const serviceRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestDetails: String,
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    response: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
    
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
module.exports =ServiceRequest;