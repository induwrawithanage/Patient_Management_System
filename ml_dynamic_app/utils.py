import os
import joblib
import requests
from transformers import pipeline

MODEL_DIR = "models"

def extract_model_name(url_or_name):
    """Extract model name from URL or return the name as-is"""
    if url_or_name.startswith("https://huggingface.co/"):
        return url_or_name.replace("https://huggingface.co/", "").strip("/")
    return url_or_name

def load_huggingface_model(model_name: str, task: str = "sentiment-analysis"):
    """Load a Hugging Face model using transformers pipeline"""
    try:
        # Extract model name if URL is provided
        clean_model_name = extract_model_name(model_name)
        
        # Create pipeline with the model
        model_pipeline = pipeline(task, model=clean_model_name)
        return model_pipeline
    except Exception as e:
        raise Exception(f"Failed to load model '{model_name}': {str(e)}")

def download_model(url: str) -> str:
    """Download model file from URL (for .pkl files)"""
    os.makedirs(MODEL_DIR, exist_ok=True)
    filename = os.path.join(MODEL_DIR, os.path.basename(url))

    if not os.path.exists(filename):
        response = requests.get(url)
        with open(filename, "wb") as f:
            f.write(response.content)
    return filename

def load_model(model_path: str):
    """Load joblib model from file"""
    return joblib.load(model_path)