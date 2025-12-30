const mongoose = require('mongoose');

const sellRequestSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carDetails: {
        name: { type: String, required: true },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        fuelType: { type: String, required: true },
        transmission: { type: String, required: true },
        year: { type: Number, required: true },
        mileage: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String }, // Single image for request
    },
    status: { type: String, default: 'Pending' }, // Pending, Approved, Rejected
}, {
    timestamps: true,
});

const SellRequest = mongoose.model('SellRequest', sellRequestSchema);
module.exports = SellRequest;
