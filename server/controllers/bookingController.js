const Booking = require('../models/Booking');

// @desc    Create new booking (buy or test drive)
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const {
            car,
            bookingType,
            amount,
            customerDetails,
            paymentMethod,
            testDriveDetails
        } = req.body;

        const booking = new Booking({
            user: req.user._id,
            car: car,
            type: bookingType,
            amount: amount,
            customerDetails: customerDetails,
            testDriveDetails: testDriveDetails,
            paymentDetails: {
                method: paymentMethod,
                transactionId: `TXN${Date.now()}`, // Simulated Transaction ID
            }
        });

        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate('user', 'name email')
            .populate('car', 'name brand price images')
            .sort({ createdAt: -1 }); // Newest first
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createBooking,
    getBookings
};
