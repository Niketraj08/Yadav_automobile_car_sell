const mongoose = require('mongoose');
const User = require('./models/User');
const Car = require('./models/Car');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/singh-automobile');
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error('❌ Database connection error:', error.message);
        return false;
    }
};

const testDB = async () => {
    console.log('🧪 Testing database connection and data...\n');

    const connected = await connectDB();
    if (!connected) {
        console.log('❌ Cannot proceed without database connection');
        process.exit(1);
    }

    try {
        // Check users
        const userCount = await User.countDocuments();
        console.log(`👥 Total users: ${userCount}`);

        if (userCount > 0) {
            const users = await User.find({}, 'name email isAdmin');
            console.log('📋 Users:');
            users.forEach(user => {
                console.log(`   - ${user.name} (${user.email}) ${user.isAdmin ? '[ADMIN]' : ''}`);
            });
        } else {
            console.log('⚠️  No users found in database');
        }

        // Check cars
        const carCount = await Car.countDocuments();
        console.log(`\n🚗 Total cars: ${carCount}`);

        if (carCount > 0) {
            const cars = await Car.find({}, 'name brand images');
            console.log('📋 Cars and their images:');
            cars.forEach(car => {
                console.log(`   - ${car.name} (${car.brand})`);
                if (car.images && car.images.length > 0) {
                    car.images.forEach((img, idx) => {
                        const status = img.includes('…') || img.length < 20 || img.endsWith(':') ? '❌ CORRUPTED' : '✅ OK';
                        console.log(`     Image ${idx + 1}: ${img.substring(0, 50)}... ${status}`);
                    });
                } else {
                    console.log(`     No images ❌`);
                }
            });
        } else {
            console.log('⚠️  No cars found in database');
        }

        console.log('\n🎉 Database test complete!');

    } catch (error) {
        console.error('❌ Error during database test:', error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
};

// Run the test
testDB();
