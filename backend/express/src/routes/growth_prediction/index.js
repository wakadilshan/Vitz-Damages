const router = require("express").Router();
const upload = require("../../utils/multer");
const { predictController } = require("../../controllers/growth_prediction");

const flaskServerUri = "http://127.0.0.1:5000";

const {
  validatePredictionRequest,
} = require("../../validators/growth_prediction");
const fs = require("fs");
const { default: axios } = require("axios");
const { cloudinary } = require("../../services/cloudinary");
const { Readable } = require("stream");
const path = require("path");
const os = require("os");
const GrowthPrediction = require("../../models/GrowthPredictionJob");

// Single mushroom growth prediction route
// router.post(
//   "/:model",
//   [upload.single("file"), validatePredictionRequest],
//   predictController
// );

// Multiple mushroom growth prediction route
router.post("/multiple", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const { userId } = req.query;

    if (!file) return res.send({ message: "File not found" }).status(404);

    // Read the file buffer
    const fileBuffer = fs.readFileSync(file.path, {
      encoding: "base64",
    });

    const predicitionResponse = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/222-imybz/2",
      params: {
        api_key: "iYeiBuVEGPtUk8v1mzCT",
      },
      data: fileBuffer,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!predicitionResponse.status === 200)
      throw new Error("Error while prediction: ");

    // Save the original feed image to cloud storage
    const cloudinaryOpts = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: "shroom_originals",
    };

    const originalImageSaveResponse = await cloudinary.uploader.upload(
      file.path,
      cloudinaryOpts
    );

    console.log("Original image saved!");

    const imageUrl = originalImageSaveResponse.secure_url;
    const { predictions } = predicitionResponse.data;

    // Return an annotated image with the predicition
    const rawBody = {
      imageUrl,
      predictions,
    };

    const annotatedImageResponse = await axios({
      method: "POST",
      url: `${flaskServerUri}/annotate`,
      data: rawBody,
      responseType: "arraybuffer",
    });

    if (!annotatedImageResponse.status === 200)
      throw new Error("Error annotating image");

    // Save the image in cloud storage
    const cloudinaryOpts2 = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: "shroom_annotated",
    };

    // Convert the binary data to a base64 string
    const imageData = Buffer.from(annotatedImageResponse.data).toString(
      "base64"
    );

    const annotatedImageSaveResponse = await cloudinary.uploader.upload(
      "data:image/png;base64," + imageData,
      cloudinaryOpts2
    );

    if (!annotatedImageSaveResponse) {
      // Delete source image if annotated image failed to be uploaded
      await cloudinary.api.delete_resources([
        originalImageSaveResponse.public_id,
      ]);
      throw new Error("Error saving annotated image!");
    }

    console.log("Annotated image saved");
    const annotatedImageUrl = annotatedImageSaveResponse.secure_url;

    const growthPredictionJob = await GrowthPrediction.create({
      userId,
      annotatedImageUrl,
      sourceImageUrl: imageUrl,
      predictions,
    });

    // Save the growth prediction job in the database
    return res.send(growthPredictionJob);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err);
  }
});

router.get("/", (req, res) => res.send("Wokring"));

module.exports = router;
