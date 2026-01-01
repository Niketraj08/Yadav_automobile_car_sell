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

// Function to check if URL is accessible
const checkImageUrl = async (url) => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false;
    }
};

// Main function to fix broken images
const fixBrokenImages = async () => {
    try {
        console.log('🔍 Checking for cars with broken image URLs...');

        const cars = await Car.find({});
        let fixedCount = 0;

        for (const car of cars) {
            if (car.images && car.images.length > 0) {
                const validImages = [];

                for (const imageUrl of car.images) {
                    // Check if it's a Pexels URL with potential issues
                    if (imageUrl.includes('pexels.com')) {
                        console.log(`⚠️  Found Pexels URL in car "${car.name}": ${imageUrl}`);
                        console.log(`   Removing broken Pexels image from database`);

                        // Don't add this image to validImages (effectively removing it)
                        continue;
                    }

                    // Check if it's a failing placeholder service
                    if (imageUrl.includes('via.placeholder.com')) {
                        console.log(`⚠️  Found failing placeholder URL in car "${car.name}": ${imageUrl}`);
                        console.log(`   Replacing with reliable data URL`);

                        // Don't add this image to validImages (will be replaced with data URL)
                        continue;
                    }

                    // For other URLs, you could add validation here
                    // For now, we'll keep them as they might be local uploads
                    validImages.push(imageUrl);
                }

                // If no valid images remain, add a placeholder
                if (validImages.length === 0) {
                    console.log(`📝 Adding placeholder image for car "${car.name}"`);
                    validImages.push('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTBlMGUwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlIEF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=');
                }

                // Update the car if images changed (compare content, not just length)
                const imagesChanged = validImages.length !== car.images.length ||
                    !validImages.every((img, index) => img === car.images[index]);

                if (imagesChanged) {
                    console.log(`🔄 Updating car "${car.name}" - replacing ${car.images.length} images with ${validImages.length} new ones`);
                    try {
                        car.images = validImages;
                        const savedCar = await car.save();
                        fixedCount++;
                        console.log(`✅ Fixed car "${car.name}": ${savedCar.images.length} images remaining`);
                    } catch (saveError) {
                        console.log(`❌ Error saving car "${car.name}": ${saveError.message}`);
                    }
                } else {
                    console.log(`⏭️  No changes needed for car "${car.name}"`);
                }
            }
        }

        console.log(`\n🎉 Database cleanup complete!`);
        console.log(`📊 Fixed ${fixedCount} cars with broken images`);
        console.log(`💡 Tip: Upload proper car images through the admin panel to replace placeholders`);

    } catch (error) {
        console.error('❌ Error fixing broken images:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

// Run the script
connectDB().then(() => {
    fixBrokenImages();
});
