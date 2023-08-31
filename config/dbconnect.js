// import mongoose from "mongoose";
// import colors from "colors";
const mongoose = require("mongoose")
const colors = require("colors")


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo server run on ${mongoose.connection.host}`.bgGreen);
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDB
// export default connectDB;
