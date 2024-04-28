import supervision as sv
import numpy as np
from PIL import Image
import requests
from io import BytesIO
import matplotlib

matplotlib.use('Agg')  # Use the Agg backend
import matplotlib.pyplot as plt


def annotator(image_url, predictions):
    try:
        # Send a GET request to fetch the image data
        response = requests.get(image_url)

        if response.status_code != 200:
            print("Failed to get image data")
            return None

        # Read the image data into a BytesIO object
        image_bytes = BytesIO(response.content)

        # Open the image using PIL
        image = Image.open(image_bytes)

        # Extract bounding box coordinates and class_id from predictions
        xyxy = np.array(
            [[pred["x"], pred["y"], pred["x"] + pred["width"], pred["y"] + pred["height"]] for pred in predictions])
        class_ids = np.array([pred["class_id"] for pred in predictions])
        confidence = np.array([pred["confidence"] for pred in predictions])

        # Create a Detections object with class_id
        detections = sv.Detections(xyxy, class_id=class_ids, confidence=confidence)

        # Custom colors
        color_palette = sv.ColorPalette.LEGACY

        # Create a ColorAnnotator and annotate the image with predictions
        percentage_bar_annotator = sv.PercentageBarAnnotator(color=color_palette)
        annotated_frame = percentage_bar_annotator.annotate(
            scene=image.copy(),
            detections=detections
        )

        # Plot the annotated frame
        plt.imshow(annotated_frame)
        plt.axis('off')  # Turn off axis

        # Save the plot to a file
        output_path = "annotated_frame.png"
        plt.savefig(output_path, bbox_inches='tight', pad_inches=0.0)
        plt.close()  # Close the Matplotlib figure

        # Read the saved image file into a BytesIO object
        with open(output_path, "rb") as f:
            img_buffer = BytesIO(f.read())

        return img_buffer

    except Exception as e:
        print(f"Annotation error: {str(e)}")
        return None
