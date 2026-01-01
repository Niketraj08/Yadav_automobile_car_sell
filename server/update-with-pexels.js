const mongoose = require('mongoose');
const Car = require('./models/Car');
require('dotenv').config();

// Verified working Pexels car images (free for commercial use)
const PEXELS_CAR_IMAGES = [
    'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2127040/pexels-photo-2127040.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1029243/pexels-photo-1029243.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/1429775/pexels-photo-1429775.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800'
];

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

// Update cars with verified Pexels car images
const updateWithPexels = async () => {
    try {
        console.log('🖼️  Updating cars with high-quality Pexels car images...\n');

        const cars = await Car.find({});
        let updatedCount = 0;

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];

            // Get images for this car (rotate through available images)
            const imageIndex = i % PEXELS_CAR_IMAGES.length;
            const nextImageIndex = (i + 1) % PEXELS_CAR_IMAGES.length;

            const selectedImages = [
                PEXELS_CAR_IMAGES[imageIndex]
            ];

            // Add second image for some cars for variety
            if (i % 3 === 0 && nextImageIndex !== imageIndex) {
                selectedImages.push(PEXELS_CAR_IMAGES[nextImageIndex]);
            }

            // Update car with Pexels images
            car.images = selectedImages;
            await car.save();

            updatedCount++;
            console.log(`✅ Updated "${car.name}" with ${selectedImages.length} Pexels image(s)`);
        }

        console.log(`\n🎉 Update complete!`);
        console.log(`📊 Updated ${updatedCount} cars with Pexels images`);
        console.log(`🔗 Images sourced from: https://pexels.com/`);
        console.log(`📄 License: Free for personal and commercial use`);

    } catch (error) {
        console.error('❌ Error updating car images:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

// Main execution
const main = async () => {
    console.log('🚗 Car Image Updater - Pexels Edition');
    console.log('=====================================');
    console.log('This script updates all cars with beautiful car images from Pexels.com');
    console.log('All images are free for personal and commercial use.\n');

    await connectDB();
    await updateWithPexels();
};

// Run the script
main();
