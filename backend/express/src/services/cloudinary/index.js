// Require the cloudinary library
const cloudinary = require("cloudinary").v2;

const apiSecret = process.env.CLOUDINARY_SECRET;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  api_secret: apiSecret,
  api_key: "346319968945489",
  cloud_name: "dndeqrhfq",
});

module.exports = { cloudinary };
