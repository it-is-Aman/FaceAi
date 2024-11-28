import os
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS
from fastai.vision.all import *
import pathlib
from dotenv import load_dotenv
import platform

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Load environment variables
load_dotenv()
# openai.api_key = os.getenv("OPENAI_API_KEY_FACECARE")    # fetch API from .env file
openai.api_key = os.getenv("OPENAI_API_KEY")    # fetch API from environment variable

# Print the OpenAI API key to verify it's loaded correctly
print("Loaded OpenAI API Key:", openai.api_key)

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
    print("Received prediction request")
    
    if "file" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["file"]
    if image.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if not image or not allowed_file(image.filename):
        return jsonify({"error": "Invalid file type. Please upload a JPG or PNG image"}), 400

    try:
        # Save and process image
        filename = secure_filename(image.filename)
        image_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        image.save(image_path)

        # Get predictions
        predictions = predict(image_path)
        
        # Get treatment suggestions
        suggestions = get_suggestions_from_chatgpt(predictions) if predictions else ""

        # Cleanup
        if os.path.exists(image_path):
            os.remove(image_path)

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
    app.run(host="0.0.0.0", port=8000, debug=True)
