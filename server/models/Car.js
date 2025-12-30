const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    fuelType: { type: String, required: true }, // Petrol, Diesel, Electric, Hybrid
    transmission: { type: String, required: true }, // Manual, Automatic
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    status: { type: String, default: 'Available' }, // Available, Sold
}, {
    timestamps: true,
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
