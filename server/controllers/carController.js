const Car = require('../models/Car');

// @desc    Fetch all cars
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res) => {
    try {
        const { keyword, brand, fuelType, minPrice, maxPrice, type } = req.query; // type might mean something else, assuming Body Type or similar if I added it.

        let query = {};

        if (keyword) {
            query.name = { $regex: keyword, $options: 'i' };
        }
        if (brand) {
            query.brand = brand;
        }
        if (fuelType) {
            query.fuelType = fuelType;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const cars = await Car.find(query);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single car
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (car) {
            res.json(car);
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a car
// @route   POST /api/cars
// @access  Private/Admin
const createCar = async (req, res) => {
    try {
        const { name, brand, price, fuelType, transmission, year, mileage, description, images } = req.body;

        const car = new Car({
            name,
            brand,
            price,
            fuelType,
            transmission,
            year,
            mileage,
            description,
            images, // Assuming array of URLs
            // user: req.user._id, // If we want to track who added it
        });

        const createdCar = await car.save();
        res.status(201).json(createdCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
const deleteCar = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);

        if (car) {
            await car.deleteOne();
            res.json({ message: 'Car removed' });
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
const updateCar = async (req, res) => {
    try {
        const { name, brand, price, fuelType, transmission, year, mileage, description, images, status } = req.body;

        const car = await Car.findById(req.params.id);

        if (car) {
            car.name = name || car.name;
            car.brand = brand || car.brand;
            car.price = price || car.price;
            car.fuelType = fuelType || car.fuelType;
            car.transmission = transmission || car.transmission;
            car.year = year || car.year;
            car.mileage = mileage || car.mileage;
            car.description = description || car.description;
            car.images = images || car.images;
            car.status = status || car.status;

            const updatedCar = await car.save();
            res.json(updatedCar);
        } else {
            res.status(404).json({ message: 'Car not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getCars,
    getCarById,
    createCar,
    deleteCar,
    updateCar,
};
