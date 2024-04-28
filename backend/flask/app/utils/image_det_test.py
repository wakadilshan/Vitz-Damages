import requests
import numpy as np
from PIL import Image
from io import BytesIO

import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet import preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image


def predict__image(url):
    # Fetch the image from the URL
    response = requests.get(url)
    response.raise_for_status()

    # Read the image data and load it with PIL
    img = Image.open(BytesIO(response.content))
    img = img.resize((224, 224))  # Resize to the desired input size

    # Convert the image to a NumPy array
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)

    # Load the pre-trained model
    model = MobileNetV2(weights="imagenet")

    # Make predictions
    predictions = model.predict(img)

    decoded_predictions = decode_predictions(predictions, top=5)[0]
    array_predictions = []

    for label, description, score in decoded_predictions:
        array_predictions.append(f"{description} ({label}): {score*100:.2f}%")

    return array_predictions
