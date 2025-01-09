const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB;

// Function for connecting database
const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);
    if (connection) {
      console.log("Connected Successfully.");
    } else {
      console.error("Failed to connect to Database.");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = initializeDatabase;
