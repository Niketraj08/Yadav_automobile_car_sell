const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/singh-automobile');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('Falling back to local MongoDB...');

        try {
            const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/singh-automobile');
            console.log(`Local MongoDB Connected: ${localConn.connection.host}`);
        } catch (localError) {
            console.error(`Local MongoDB Connection Error: ${localError.message}`);
            console.log('Warning: Database not available. Some features may not work.');
            // Don't exit - allow server to start without database
        }
    }
};

module.exports = connectDB;
