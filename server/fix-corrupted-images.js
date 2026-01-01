const mongoose = require('mongoose');
const Car = require('./models/Car');

// Verified working placeholder images
const PLACEHOLDER_IMAGES = [
    'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/2127040/pexels-photo-2127040.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg?auto=compress&cs=tinysrgb&w=800'
];

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/singh-automobile');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

// Function to check if URL is corrupted/truncated
const isCorruptedUrl = (url) => {
    // Check for truncated URLs (contain ellipsis or are too short)
    if (url.includes('…') || url.length < 20) {
        return true;
    }

    // Check for URLs that end abruptly
    if (url.endsWith(':')) {
        return true;
    }

    // Check for incomplete Pexels URLs
    if (url.includes('pexels.com') && !url.includes('auto=compress')) {
        return true;
    }

    return false;
};

// Main function to fix corrupted images
const fixCorruptedImages = async () => {
    try {
        console.log('🔍 Checking for cars with corrupted image URLs...\n');

        const cars = await Car.find({});
        let fixedCount = 0;

        for (let i = 0; i < cars.length; i++) {
            const car = cars[i];

            if (car.images && car.images.length > 0) {
                const validImages = [];
                let needsUpdate = false;

                for (const imageUrl of car.images) {
                    if (isCorruptedUrl(imageUrl)) {
                        console.log(`⚠️  Found corrupted URL in car "${car.name}": ${imageUrl}`);
                        needsUpdate = true;
                        // Don't add corrupted URLs to validImages
                        continue;
                    }

                    // Keep valid URLs
                    validImages.push(imageUrl);
                }

                // If we removed corrupted URLs, add a placeholder
                if (needsUpdate && validImages.length === 0) {
                    const placeholderIndex = i % PLACEHOLDER_IMAGES.length;
                    validImages.push(PLACEHOLDER_IMAGES[placeholderIndex]);
                    console.log(`📝 Added placeholder image for car "${car.name}"`);
                }

                // Update the car if needed
                if (needsUpdate) {
                    car.images = validImages;
                    await car.save();
                    fixedCount++;
                    console.log(`✅ Fixed car "${car.name}": ${validImages.length} images remaining`);
                } else {
                    console.log(`⏭️  No corrupted URLs found for car "${car.name}"`);
                }
            } else {
                // Car has no images, add a placeholder
                const placeholderIndex = i % PLACEHOLDER_IMAGES.length;
                car.images = [PLACEHOLDER_IMAGES[placeholderIndex]];
                await car.save();
                fixedCount++;
                console.log(`📝 Added initial image for car "${car.name}"`);
            }
        }

        console.log(`\n🎉 Image cleanup complete!`);
        console.log(`📊 Fixed ${fixedCount} cars with corrupted or missing images`);

    } catch (error) {
        console.error('❌ Error fixing corrupted images:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

// Run the script
connectDB().then(() => {
    fixCorruptedImages();
});
