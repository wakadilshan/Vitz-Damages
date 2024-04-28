const mongoose = require("mongoose");

const GrowthPredictionJobSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  sourceImageUrl: { type: String, required: true },
  annotatedImageUrl: { type: String, required: true },
  predictions: [
    {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      confidence: { type: Number, required: true },
      class: { type: String, required: true },
      class_id: { type: Number, required: true },
      detection_id: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const GrowthPrediction = mongoose.model(
  "GrowthPredictionJob",
  GrowthPredictionJobSchema
);

module.exports = GrowthPrediction;
