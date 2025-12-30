const express = require('express');
const router = express.Router();
const {
    getCars,
    getCarById,
    createCar,
    deleteCar,
    updateCar,
} = require('../controllers/carController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getCars).post(protect, admin, createCar);
router
    .route('/:id')
    .get(getCarById)
    .delete(protect, admin, deleteCar)
    .put(protect, admin, updateCar);

module.exports = router;
