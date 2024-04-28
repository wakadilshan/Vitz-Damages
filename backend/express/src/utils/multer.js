const multer = require("multer");
const os = require("os");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Define the directory where files should be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Define the file name
//   },
// });

//const upload = multer({ storage: storage });
const upload = multer({ dest: os.tmpdir() });

module.exports = upload;
