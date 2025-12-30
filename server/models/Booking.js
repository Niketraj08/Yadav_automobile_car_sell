const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Car',
    },
    type: {
        type: String,
        required: true,
        enum: ['buy', 'test-drive'],
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Confirmed', // Since payment is "simulated" but successful
    },
    customerDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
    },
    testDriveDetails: {
        date: { type: String },
        time: { type: String },
    },
    paymentDetails: {
        method: { type: String, required: true },
        transactionId: { type: String },
        paymentDate: { type: Date, default: Date.now }
    }
}, {
    timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
