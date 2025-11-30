const mongoose = require("mongoose");
require('dotenv').config();

// Use environment variable for MongoDB URI, with fallback to original URI
const uri = process.env.MONGO_URI || 
  "mongodb+srv://ismail-1104:shaikh786@todo.y3zrjlb.mongodb.net/?appName=Todo";

const connectDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully.");
  } catch (error) {
    console.log("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
