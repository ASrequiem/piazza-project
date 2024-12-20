const mongoose = require('mongoose'); 

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    console.error('Please ensure your MONGO_URI in the .env file is correct.');
    process.exit(1);
  }
};

module.exports = connectDB;
