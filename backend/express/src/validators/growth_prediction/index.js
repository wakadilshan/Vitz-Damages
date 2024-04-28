const validatePredictionRequest = (req, res, next) => {
  if (!req.file) {
    return res.status(404).json({ message: "Please upload a file" });
  }

  next();
};

module.exports = { validatePredictionRequest };
