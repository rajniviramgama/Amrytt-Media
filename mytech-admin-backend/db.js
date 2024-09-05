const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI; 
    console.log('mongoUri: ', mongoUri);

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in the .env file");
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
