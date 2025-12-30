const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { createBooking, getBookings } = require('../controllers/bookingController');

router.route('/')
    .post(protect, createBooking)
    .get(protect, admin, getBookings);

module.exports = router;
