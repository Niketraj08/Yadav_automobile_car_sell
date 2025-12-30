const express = require('express');
const router = express.Router();
const { getDashboardStats, getUsers } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const {
    createSellRequest,
    getSellRequests,
    updateSellRequestStatus,
} = require('../controllers/sellRequestController');

// Admin Dashboard Stats
router.get('/dashboard-stats', protect, admin, getDashboardStats);

// Admin Stats & Users
router.get('/users', protect, admin, getUsers);

// Sell Requests
// User creates request:
router.post('/sell-requests', protect, createSellRequest);
// Admin views/manages:
router.get('/sell-requests', protect, admin, getSellRequests);
router.put('/sell-requests/:id', protect, admin, updateSellRequestStatus);

module.exports = router;
