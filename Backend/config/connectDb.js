const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Set `strictQuery` option before connecting to MongoDB
mongoose.set('strictQuery', false);

const connectDb = async () => {
  try {
    // Connect to MongoDB with updated options
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.error(`${error}`.bgRed.white);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDb;
