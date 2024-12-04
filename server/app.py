import os
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
from fastai.vision.all import *
import pathlib
from dotenv import load_dotenv
import platform
import cv2
import numpy as np

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load environment variables
load_dotenv()
# openai.api_key = os.getenv("OPENAI_API_KEY_FACECARE")    # fetch API from .env file
openai.api_key = os.getenv("OPENAI_API_KEY")    # fetch API from environment variable

# # Print the OpenAI API key to verify it's loaded correctly
# print("Loaded OpenAI API Key:", openai.api_key)

# Configure platform-specific path handling
plt = platform.system()
if plt == "Linux":
    pathlib.WindowsPath = pathlib.PosixPath

# Load the pre-trained model
learn = load_learner("export.pkl")
labels = learn.dls.vocab

# Directory for temporary image uploads
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Face detection configuration
FACE_DETECTION_ENABLED = os.getenv('FACE_DETECTION_ENABLED', 'true').lower() == 'true'
MIN_FACE_CONFIDENCE = float(os.getenv('MIN_FACE_CONFIDENCE', '0.8'))

# Initialize face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def detect_face(image_path):
    """
    Detect if there is a face in the image and return True if found
    """
    try:
        # Read the image
        img = cv2.imread(image_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30)
        )
        
        # Return True if at least one face is detected
        return len(faces) > 0
    except Exception as e:
        print(f"Error in face detection: {str(e)}")
        return False

# Prediction function
def predict(image_path):
    try:
        # Load and process the image
        img = PILImage.create(image_path)

        # Make prediction
        pred, pred_idx, probs = learn.predict(img)

        # Get predictions with confidence scores
        predictions = []
        for i, (label, prob) in enumerate(zip(labels, probs)):
            if prob > 0.1:  # Only include predictions with >10% confidence
                predictions.append({
                    "disease": str(label),
                    "confidence": float(prob),
                    "description": get_disease_description(str(label))
                })
        
        # Sort by confidence
        predictions.sort(key=lambda x: x["confidence"], reverse=True)
        return predictions[:3]  # Return top 3 predictions

    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return []

def get_disease_description(disease_name):
    # Add basic descriptions for each disease
    descriptions = {
        "Acne": "A skin condition characterized by red pimples on the skin, especially on the face, due to inflamed or infected sebaceous glands.",
        "Eczema": "A medical condition in which patches of skin become rough and inflamed with blisters causing itching and bleeding.",
        "Rosacea": "A condition that causes redness and visible blood vessels in your face, sometimes with small, red, pus-filled bumps.",
        "Psoriasis": "A skin disorder that causes skin cells to multiply up to 10 times faster than normal, resulting in bumpy red patches covered with white scales.",
        # Add more descriptions as needed
    }
    return descriptions.get(disease_name, "No description available.")

# ChatGPT function to get suggestions
def get_suggestions_from_chatgpt(predictions):
    try:
        if not predictions:
            return "No conditions detected to provide suggestions for."

        conditions = ", ".join([p["disease"] for p in predictions])
        prompt = f"""The following skin conditions were detected: {conditions}. 
        For each condition, please provide:
        1. Detailed description
        2. Common causes
        3. Treatment options
        4. Prevention tips
        Please format the response in a clear, organized way."""

        client = openai.OpenAI()
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

    except Exception as e:
        print(f"ChatGPT error: {str(e)}")
        return "Unable to generate suggestions at this time."

@app.route("/predict", methods=["POST"])
def handle_predict():
    try:
        if "file" not in request.files:
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No file selected"}), 400

        if not allowed_file(file.filename):
            return jsonify({"error": "Invalid file type"}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(filepath)

        # Check for face in image if enabled
        if FACE_DETECTION_ENABLED:
            has_face = detect_face(filepath)
            if not has_face:
                os.remove(filepath)  # Clean up the uploaded file
                return jsonify({
                    "error": "No face detected in the image. Please upload a clear image of a face."
                }), 400

        # Continue with existing prediction logic
        predictions = predict(filepath)
        
        # Get treatment suggestions
        suggestions = get_suggestions_from_chatgpt(predictions) if predictions else ""

        # Cleanup
        if os.path.exists(filepath):
            os.remove(filepath)

        return jsonify({
            "success": True,
            "predictions": predictions,
            "suggestions": suggestions
        })

    except Exception as e:
        print(f"Error in handle_predict: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route("/chat", methods=["POST"])
def handle_chat():
    try:
        data = request.json
        if not data or 'question' not in data or 'predictions' not in data:
            return jsonify({"error": "Missing required fields"}), 400

        question = data['question']
        predictions = data['predictions']
        
        # Format the context from predictions
        conditions = ", ".join([p["disease"] for p in predictions])
        descriptions = "\n".join([f"{p['disease']}: {p['description']}" for p in predictions])
        
        # Create a detailed prompt for ChatGPT
        prompt = f"""Context: The following skin conditions were detected:
{descriptions}

User Question: {question}

Please provide a detailed, medically-informed response addressing the user's question about these conditions. 
Include relevant medical information, but remind the user to consult a healthcare professional for proper diagnosis and treatment."""

        # Get response from ChatGPT
        client = openai.OpenAI()
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}]
        )
        
        return jsonify({
            "success": True,
            "response": response.choices[0].message.content
        })

    except Exception as e:
        print(f"Error in handle_chat: {str(e)}")
        return jsonify({
            "success": False,
            "error": "Failed to process your question. Please try again."
        }), 500

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def secure_filename(filename):
    return filename

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8000)