from flask import Blueprint, request, jsonify
from app.models.disease_prediction.yolov7_inference import YOLOv7Inference

disease_prediction_routes = Blueprint('disease_prediction_routes', __name__)

@disease_prediction_routes.route("/predict", methods=["POST"])
def predict_disease():
    if 'file' not in request.files:
        return jsonify({"error": "No file found"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Perform inference using YOLOv7 model
        yolo_inference = YOLOv7Inference("app/models/disease_prediction/yolov7_model.pt")
        # Implement logic to process the uploaded image and return predictions
        predictions = yolo_inference.predict(file)
        return jsonify({"predictions": predictions}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
