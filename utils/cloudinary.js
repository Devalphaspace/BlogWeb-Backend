const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

//config env file:
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});

module.exports = cloudinary;
