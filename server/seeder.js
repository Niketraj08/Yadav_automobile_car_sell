const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Car = require('./models/Car');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: 'admin123',
        isAdmin: true,
    },
    {
        name: 'Niket Raj',
        email: 'niket@gmail.com',
        password: 'niket123',
        isAdmin: false,
    }
];

const cars = [
    {
        name: 'Audi Q7 Technology 55 TFSI',
        brand: 'Audi',
        price: 8500000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 12,
        description: 'The Audi Q7 is a premium 7-seater SUV that combines luxury, performance, and cutting-edge technology. Features include virtual cockpit, MMI navigation, and advanced driver assistance systems.',
        images: [
            'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/2127040/pexels-photo-2127040.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'Mercedes-Benz S-Class S 350d',
        brand: 'Mercedes-Benz',
        price: 16000000,
        year: 2024,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        mileage: 15,
        description: 'The epitome of luxury sedans. The S-Class features MBUX infotainment, 12.8-inch OLED display, Burmester sound system, and Level 3 autonomous driving capability.',
        images: [
            'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'BMW X7 xDrive40i M Sport',
        brand: 'BMW',
        price: 12000000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 11,
        description: 'BMWs flagship SUV offers unmatched presence and luxury. Features panoramic glass roof, Vernasca leather, and xDrive all-wheel drive system.',
        images: [
            'https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'Range Rover Vogue SE',
        brand: 'Land Rover',
        price: 22500000,
        year: 2024,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        mileage: 10,
        description: 'The ultimate luxury SUV with unparalleled off-road capability. Features Terrain Response 2, air suspension, and Touch Pro Duo infotainment system.',
        images: [
            'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'Porsche Cayenne Turbo',
        brand: 'Porsche',
        price: 19500000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 9,
        description: 'Sports car performance meets SUV practicality. 0-100 km/h in 3.9 seconds with active aerodynamics and sport exhaust system.',
        images: [
            'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'Volvo XC90 Recharge T8',
        brand: 'Volvo',
        price: 9800000,
        year: 2024,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        mileage: 42,
        description: 'Scandinavian luxury with plug-in hybrid technology. Features Bowers & Wilkins audio, Nappa leather, and advanced safety systems.',
        images: [
            'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'Jaguar F-PACE SVR',
        brand: 'Jaguar',
        price: 14500000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 8,
        description: 'British luxury meets sports car performance. Supercharged V8 engine delivering 550 PS with adaptive dynamics.',
        images: [
            'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'Lexus LX 500d',
        brand: 'Lexus',
        price: 25000000,
        year: 2024,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        mileage: 9,
        description: 'Japanese reliability meets ultimate luxury. Features Mark Levinson audio, executive seating, and multi-terrain select.',
        images: [
            'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'Maserati Levante Trofeo',
        brand: 'Maserati',
        price: 21000000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        mileage: 7,
        description: 'Italian luxury SUV with Ferrari-derived V8 engine. Features Harman Kardon audio and Pieno Fiore leather interior.',
        images: [
            'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'Tesla Model X Plaid',
        brand: 'Tesla',
        price: 13500000,
        year: 2024,
        fuelType: 'Electric',
        transmission: 'Automatic',
        mileage: 0,
        description: 'Fastest SUV in production. 0-100 km/h in 2.6 seconds with 1020 HP tri-motor setup and 547 km range.',
        images: [
            'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    },
    {
        name: 'Maruti Suzuki Swift VXI',
        brand: 'Maruti Suzuki',
        price: 750000,
        year: 2023,
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 23,
        description: 'Compact and reliable hatchback perfect for city driving. Exceptional fuel efficiency and low maintenance.',
        images: [
            'https://images.pexels.com/photos/11139552/pexels-photo-11139552.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/11139551/pexels-photo-11139551.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
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
        images: [
            'https://images.pexels.com/photos/12316432/pexels-photo-12316432.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
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
        images: [
            'https://images.pexels.com/photos/17208155/pexels-photo-17208155.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
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
        images: [
            'https://images.pexels.com/photos/16823325/pexels-photo-16823325.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
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
        images: [
            'https://images.pexels.com/photos/15112185/pexels-photo-15112185.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
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
        images: [
            'https://images.pexels.com/photos/14840487/pexels-photo-14840487.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
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
        images: [
            'https://images.pexels.com/photos/16913166/pexels-photo-16913166.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
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
        images: [
            'https://images.pexels.com/photos/13506169/pexels-photo-13506169.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
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
        images: [
            'https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
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
        images: [
            'https://images.pexels.com/photos/1402717/pexels-photo-1402717.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
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
        images: [
            'https://images.pexels.com/photos/13010481/pexels-photo-13010481.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        status: 'Available'
    }
];

const importData = async () => {
    try {
        await User.deleteMany();
        await Car.deleteMany();

        // Use create instead of insertMany to trigger pre('save') hooks for password hashing
        for (const user of users) {
            await User.create(user);
        }

        await Car.insertMany(cars);

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Car.deleteMany();

        console.log('Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error destroying data:', error);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
