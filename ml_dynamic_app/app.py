import os
from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from utils import download_model, load_model, load_huggingface_model

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration from environment variables
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'fallback-secret-key')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Enable CORS if specified
if os.getenv('ENABLE_CORS', 'True').lower() == 'true':
    CORS(app)

loaded_model = None
model_type = None  # Track whether it's 'huggingface' or 'joblib'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/load_model', methods=['POST'])
def load():
    global loaded_model, model_type
    
    # Check if it's a model name/URL or file URL
    model_input = request.form.get('model_url') or request.json.get('model_name')
    
    if not model_input:
        return jsonify({'status': 'error', 'message': 'No model specified'})

    try:
        # Check if it's a Hugging Face model (name or URL)
        if not model_input.startswith('http') or 'huggingface.co' in model_input:
            # It's a Hugging Face model
            loaded_model = load_huggingface_model(model_input)
            model_type = 'huggingface'
            return jsonify({'status': 'success', 'message': f'Hugging Face model loaded: {model_input}'})
        else:
            # It's a file URL (for .pkl files)
            path = download_model(model_input)
            loaded_model = load_model(path)
            model_type = 'joblib'
            return jsonify({'status': 'success', 'message': 'Model file loaded'})
            
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

@app.route('/predict', methods=['POST'])
def predict():
    global loaded_model, model_type
    
    if loaded_model is None:
        return jsonify({'status': 'error', 'message': 'No model loaded'})

    try:
        # Get input text
        if request.json:
            input_text = request.json.get('input') or request.json.get('text')
        else:
            input_text = request.form.get('text')
            
        if not input_text:
            return jsonify({'status': 'error', 'message': 'No input text provided'})

        # Check text length limit
        max_length = int(os.getenv('MAX_TEXT_LENGTH', 5000))
        if len(input_text) > max_length:
            return jsonify({'status': 'error', 'message': f'Text too long. Maximum {max_length} characters allowed.'})

        # Make prediction based on model type
        if model_type == 'huggingface':
            # Hugging Face pipeline expects text input
            result = loaded_model(input_text)
            # Extract the result (it returns a list with dict)
            prediction = result[0] if isinstance(result, list) else result
            return jsonify({'status': 'success', 'prediction': prediction})
        else:
            # Joblib model expects preprocessed input
            prediction = loaded_model.predict([input_text])
            return jsonify({'status': 'success', 'prediction': prediction[0]})
            
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    # Get configuration from environment variables
    host = os.getenv('FLASK_HOST', '127.0.0.1')
    port = int(os.getenv('FLASK_PORT', 5000))
    debug = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    print(f"🧠 MediSense AI starting on http://{host}:{port}")
    print(f"📁 Model cache directory: {os.getenv('HF_HUB_CACHE', './models')}")
    print(f"🔑 Debug mode: {debug}")
    
    app.run(host=host, port=port, debug=debug)
