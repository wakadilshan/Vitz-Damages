from typing import Dict, Any
from flask import Blueprint, current_app, request, jsonify
# from app.services.growth_predict_services import predict_image
from app.services.annotator import annotator

growth_prediction_routes = Blueprint("growth_prediction", __name__)


# @growth_prediction_routes.route("/growth-prediction", methods=["POST"])
# def predict() -> Dict[str, Any]:
#     try:
#         # Get the JSON data from the request body
#         data = request.get_json()
#         source = data["source"]
#         model = data["model"]

#         if not source or not model:
#             return jsonify({"error": "Invalid input"}), 400

#         result = predict_image(source, model_option=model)

#         return jsonify({"prediction": result, "model": model})

#     except Exception as e:
#         current_app.logger.error(f"Prediction error: {str(e)}")
#         return jsonify({"error": "Internal Server Error"}), 500


@growth_prediction_routes.route("/annotate", methods=["POST"])
def annotate_image():
    try:
        data = request.get_json()

        image_url = data.get("imageUrl")
        predictions = data.get("predictions")

        print(image_url, predictions)

        if not image_url or not predictions:
            return jsonify({"error": "Missing imageUrl or predictions"}), 400

        # Calling annotation service method
        image_pred = annotator(image_url, predictions)
        if image_pred:
            print(image_pred)
            return image_pred, 200

        else:
            return jsonify({
                "message": "Annotation failed",

            }), 400

    except Exception as e:
        current_app.logger.error(f"Prediction error: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500
