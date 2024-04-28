from flask import Blueprint, request, jsonify
from app.utils.image_det_test import predict__image

image_detection_routes = Blueprint("image_detection", __name__)


@image_detection_routes.route("/", methods=["POST"])
def predict():
    # Get the JSON data from the request body
    data = request.get_json()
    url = data["url"]

    try:
        array_predictions = predict__image(url)
        return jsonify({"prediction": array_predictions})

    except Exception as e:
        return jsonify({"error": f"Error processing the image: {str(e)}"})
