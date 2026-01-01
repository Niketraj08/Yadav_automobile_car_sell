const mongoose = require('mongoose');
const Car = require('./models/Car');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/singh-automobile');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

// Check current image status
const checkImages = async () => {
    try {
        console.log('🔍 Checking current image status in database...\n');

        const cars = await Car.find({});
        let totalCars = 0;
        let carsWithPexels = 0;
        let carsWithPlaceholders = 0;

        for (const car of cars) {
            totalCars++;
            console.log(`🚗 ${car.name}:`);

            if (car.images && car.images.length > 0) {
                car.images.forEach((image, index) => {
                    console.log(`   ${index + 1}. ${image}`);

                    if (image.includes('pexels.com')) {
                        carsWithPexels++;
                        console.log(`      ⚠️  STILL HAS PEXELS URL!`);
                    }

                    if (image.includes('placeholder')) {
                        carsWithPlaceholders++;
                        console.log(`      📝 HAS PLACEHOLDER IMAGE`);
                    }
                });
            } else {
                console.log(`   ❌ NO IMAGES`);
            }
            console.log('');
        }

        console.log('📊 SUMMARY:');
        console.log(`   Total cars: ${totalCars}`);
        console.log(`   Cars with Pexels URLs: ${carsWithPexels}`);
        console.log(`   Cars with placeholders: ${carsWithPlaceholders}`);

        if (carsWithPexels === 0) {
            console.log('\n🎉 SUCCESS: No Pexels URLs remaining in database!');
        }

    } catch (error) {
        console.error('❌ Error checking images:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

// Run the check
connectDB().then(() => {
    checkImages();
});
