const User = require('../models/User');
const Car = require('../models/Car');
const SellRequest = require('../models/SellRequest');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalCars = await Car.countDocuments();
        const pendingRequests = await SellRequest.countDocuments({ status: 'Pending' });

        // Recent listings (last 5 cars)
        const recentCars = await Car.find().sort({ createdAt: -1 }).limit(5);

        res.json({
            totalUsers,
            totalCars,
            pendingRequests,
            recentCars,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats,
    getUsers,
};
