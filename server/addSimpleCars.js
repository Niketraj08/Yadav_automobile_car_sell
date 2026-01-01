const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('./models/Car');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const simpleCars = [
    {
        name: 'Maruti Suzuki Swift VXI',
        brand: 'Maruti Suzuki',
        price: 750000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 23,
        description: 'Compact and reliable hatchback perfect for city driving. Exceptional fuel efficiency and low maintenance.',
        images: ['https://images.pexels.com/photos/11139552/pexels-photo-11139552.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },
    {
        name: 'Hyundai i20 Asta',
        brand: 'Hyundai',
        price: 950000,
        year: 2022,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 20,
        description: 'Premium hatchback with a stylish design and advanced features like sunroof and wireless charging.',
        images: ['https://images.pexels.com/photos/12316432/pexels-photo-12316432.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },
    {
        name: 'Tata Nexon XM',
        brand: 'Tata',
        price: 1100000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 18,
        description: 'Safest compact SUV with 5-star GNCAP rating. Robust build and great ground clearance.',
        images: ['https://images.pexels.com/photos/17208155/pexels-photo-17208155.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },

    {
        name : 'i20',
        brand : 'Hyundai',
        price : 900000,
        year : 2025,
        fuelType : 'petrol',
        transmission : 'manual',
        mileage : 18,
        description : 'A compact hatchback with modern features and stylish design, perfect for city driving.',
        images : ['https://images.pexels.com/photos/17081113/pexels-photo-17081113.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status : 'unAvailable'
    },
    {


        name: 'Honda City V',
        brand: 'Honda',
        price: 1300000,
        year: 2021,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 17,
        description: 'The preferred choice for sedan lovers. Comfortable interior and legendary i-VTEC engine.',
        images: ['https://images.pexels.com/photos/16823325/pexels-photo-16823325.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },
    {
        name: 'Maruti Suzuki Baleno Delta',
        brand: 'Maruti Suzuki',
        price: 820000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 22,
        description: 'Spacious premium hatchback with NEXA quality and impressive fuel economy.',
        images: ['https://images.pexels.com/photos/15112185/pexels-photo-15112185.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },
    {
        name: 'Kia Seltos HTK Plus',
        brand: 'Kia',
        price: 1400000,
        year: 2022,
        fuelType: 'Diesel',
        transmission: 'Manual',
        mileage: 21,
        description: 'Modern and tech-loaded SUV with a dominant road presence.',
        images: ['https://images.pexels.com/photos/14840487/pexels-photo-14840487.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },
    {
        name: 'Toyota Glanza G',
        brand: 'Toyota',
        price: 880000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 22,
        description: 'Toyota reliability in a premium hatchback form. Features a sleek design and comfortable ride.',
        images: ['https://images.pexels.com/photos/16913166/pexels-photo-16913166.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },
    {
        name: 'Mahindra Scorpio-N Z4',
        brand: 'Mahindra',
        price: 1600000,
        year: 2024,
        fuelType: 'Diesel',
        transmission: 'Manual',
        mileage: 15,
        description: 'The Big Daddy of SUVs. Tough, rugged, and built for all terrains.',
        images: ['https://images.pexels.com/photos/13506169/pexels-photo-13506169.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },
    {
        name: 'Hyundai Creta SX',
        brand: 'Hyundai',
        price: 1550000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 18,
        description: 'Indias most loved SUV. Packed with features and offers a smooth driving experience.',
        images: ['https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },
    {
        name: 'Tata Tiago XZ+',
        brand: 'Tata',
        price: 650000,
        year: 2022,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 20,
        description: 'Safe and stylish entry-level hatchback. Great value for money.',
        images: ['https://images.pexels.com/photos/1402717/pexels-photo-1402717.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    },
    {
        name: 'Maruti Suzuki Dzire ZXI',
        brand: 'Maruti Suzuki',
        price: 900000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 24,
        description: 'Indias favorite compact sedan. Efficient, comfortable, and easy to drive.',
        images: ['https://images.pexels.com/photos/13010481/pexels-photo-13010481.jpeg?auto=compress&cs=tinysrgb&w=800'],
        status: 'Available'
    }
];

const addSimpleCars = async () => {
    try {
        await Car.insertMany(simpleCars);
        console.log('11 Simple Cars Added Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error adding cars:', error);
        process.exit(1);
    }
};

addSimpleCars();
