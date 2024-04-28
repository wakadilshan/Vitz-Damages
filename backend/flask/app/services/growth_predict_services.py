from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

# Load the saved model
loaded_model = load_model(
    "app/models/growth_prediction/pink_oyster_growth_stage_classifier_model.h5"
)


def predict_image(source, model_option):
    # if model_option == "pink_oyster":
    #     model_path = (
    #         "app/models/growth_prediction/pink_oyster_growth_stage_classifier_model.h5"
    #     )
    # else:
    #     model_path = None

    # if model_path is None:
    #     raise Exception("Model not found")

    # # Load the model
    # loaded_model = load_model(model_path)

    image_path = f"../express/uploads/{source['filename']}"

    # Load and preprocess a single image
    img = image.load_img(image_path, target_size=(224, 224))
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize pixel values to [0, 1]

    # Make predictions
    predictions = loaded_model.predict(img)

    # Convert predictions to class labels (assuming one-hot encoding)
    class_labels = [
        "immature",
        "matured",
        "overmatured",
    ]  # Replace with your actual class labels
    predicted_class = class_labels[np.argmax(predictions)]

    return predicted_class
