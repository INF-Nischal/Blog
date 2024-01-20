const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const connectionString = process.env.CONNECTION_STRING;

  const connection = await mongoose.connect(connectionString);

  if (!connection) {
    console.log("Error connecting to MongoDB");
  } else {
    console.log("Connected to MongoDB");
  }
};

module.exports = connectDB;
