const axios = require("axios");
const { validationResult } = require("express-validator");
const config = require("../../../config");
const { loadPresets } = require("./utils");

async function predictController(req, res) {
  // Validate user inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { model } = req.params;
    const source = req.file;

    // Make the HTTP request to the prediction service
    const response = await axios.post(`${config.baseURL}/growth-prediction`, {
      source,
      model,
    });

    // Verify the response and send it to the client
    if (response.status === 200) {
      res.status(200).json(response.data);
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    // Log detailed error information for debugging
    // console.error(error);
    console.log(config.baseURL);

    // Send a user-friendly error response
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const predictMultiple = async (req, res) => {
  const isLoaded = await loadPresets(req);
  if (isLoaded) {
    return res.send(isLoaded);
  }
};

module.exports = { predictController };
