const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Defining port and environment
const PORT = process.env.PORT || 3000;
const MODE = process.env.ENVIRONMENT;
const MONGO_URI = process.env.MONGO_URI;

// Connecting MongoDB to server
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("error connecting to MongoDB" + err));

// Middlewares
app.use(express.json());

// Routes directory
const growthPredictRoutes = require("./src/routes/growth_prediction");

// Routes
app.use("/predict-growth", growthPredictRoutes);

// Start the server
app.listen(PORT, () =>
  console.log(`listening on port: ${PORT}, mode: ${MODE}`)
);
