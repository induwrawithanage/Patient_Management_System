# 🧠 MediSense AI - Dynamic Medical Model Analyzer

<div align="center">

![MediSense AI](https://img.shields.io/badge/MediSense-AI-blue?style=for-the-badge&logo=brain&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.8+-green?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.0+-red?style=for-the-badge&logo=flask&logoColor=white)
![HuggingFace](https://img.shields.io/badge/🤗-Transformers-yellow?style=for-the-badge)

**Advanced Medical Text Analysis & Sentiment Intelligence Platform**

*Dynamically load and test AI models for medical text analysis with a beautiful, modern interface*

</div>

---

## 🌟 Features

- 🚀 **Dynamic Model Loading** - Load any Hugging Face model on-the-fly
- 🏥 **Medical-Focused** - Pre-configured with medical AI models
- 🎨 **Modern UI** - Glassmorphism design with animations
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- ⚡ **Real-time Analysis** - Instant sentiment analysis results
- 🔒 **Secure** - HIPAA-ready processing capabilities
- 🌐 **Web-based** - No installation required for end users

---

## 🏗️ Project Structure

```
ml_dynamic_app/
├── app.py                 # Flask application server
├── utils.py               # Model loading utilities
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (you'll create this)
├── .env.example          # Environment template
├── README.md             # This file
├── templates/
│   └── index.html        # Modern UI interface
└── models/               # Downloaded models cache (auto-created)
```

---

## 🚀 Quick Start

### 1. Prerequisites

- **Python 3.8+** installed on your system
- **Git** for cloning the repository
- **Virtual environment** (recommended)

### 2. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/indunil-k/ML-webs.git
cd ML-webs/ml_dynamic_app

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate
```

### 3. Install Dependencies

```bash
# Install required packages
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your preferred settings:

```env
# Flask Configuration
FLASK_APP=app.py
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_HOST=127.0.0.1
FLASK_PORT=5000

# Hugging Face Configuration
HF_HUB_CACHE=./models
HF_HUB_DISABLE_SYMLINKS_WARNING=1

# Model Configuration
DEFAULT_MODEL=nlptown/bert-base-multilingual-uncased-sentiment
MAX_MODEL_SIZE=2GB

# Security (Change in production)
SECRET_KEY=your-secret-key-here

# Optional: Hugging Face Token (for private models)
# HUGGINGFACE_TOKEN=your_token_here
```

### 5. Run the Application

```bash
# Start the Flask server
python app.py
```

🎉 **Open your browser and go to:** `http://localhost:5000`

---

## 📋 Environment Variables Guide

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FLASK_APP` | Flask application entry point | `app.py` | ✅ |
| `FLASK_ENV` | Environment mode | `development` | ✅ |
| `FLASK_DEBUG` | Enable debug mode | `True` | ✅ |
| `FLASK_HOST` | Server host address | `127.0.0.1` | ✅ |
| `FLASK_PORT` | Server port number | `5000` | ✅ |
| `HF_HUB_CACHE` | Hugging Face cache directory | `./models` | ✅ |
| `HF_HUB_DISABLE_SYMLINKS_WARNING` | Disable symlink warnings | `1` | ✅ |
| `DEFAULT_MODEL` | Default model to load | `nlptown/bert-base-multilingual-uncased-sentiment` | ❌ |
| `SECRET_KEY` | Flask secret key | Random generated | ⚠️ |
| `HUGGINGFACE_TOKEN` | HF token for private models | None | ❌ |

---

## 🏥 Pre-configured Medical Models

The app comes with several medical AI models ready to use:

### 1. **Medical Sentiment Analysis**
```
nlptown/bert-base-multilingual-uncased-sentiment
```
- **Use case:** Patient feedback, medical reviews
- **Output:** 1-5 star sentiment rating
- **Example:** "The treatment was very effective" → ⭐⭐⭐⭐⭐

### 2. **Clinical BERT**
```
emilyalsentzer/Bio_ClinicalBERT
```
- **Use case:** Clinical notes, biomedical text
- **Trained on:** Clinical notes and biomedical literature
- **Best for:** Professional medical text analysis

### 3. **PubMed BERT**
```
microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract
```
- **Use case:** Research paper analysis
- **Trained on:** PubMed abstracts
- **Best for:** Scientific medical literature

### 4. **Social Health Analysis**
```
cardiffnlp/twitter-roberta-base-sentiment-latest
```
- **Use case:** Social media health discussions
- **Output:** POSITIVE/NEGATIVE/NEUTRAL
- **Best for:** Public health sentiment monitoring

---

## 🔧 Usage Examples

### Loading a Model via API

```python
import requests

# Load a medical model
response = requests.post('http://localhost:5000/load_model', 
    json={'model_name': 'emilyalsentzer/Bio_ClinicalBERT'})

print(response.json())
# Output: {'status': 'success', 'message': 'Hugging Face model loaded: emilyalsentzer/Bio_ClinicalBERT'}
```

### Making Predictions

```python
# Analyze medical text
response = requests.post('http://localhost:5000/predict', 
    json={'text': 'The patient is recovering well after surgery'})

result = response.json()
print(f"Sentiment: {result['prediction']['label']}")
print(f"Confidence: {result['prediction']['score']:.2%}")
```

### Sample Medical Texts for Testing

```text
✅ Positive Examples:
- "The surgery was successful and the patient is recovering well"
- "Excellent care provided by the medical team"
- "Treatment was very effective with minimal side effects"

❌ Negative Examples:
- "Patient experiencing severe complications post-surgery"
- "Medication caused adverse reactions"
- "Treatment was ineffective and caused more problems"

😐 Neutral Examples:
- "Patient scheduled for follow-up appointment next week"
- "Standard procedure completed as planned"
- "Medical records have been updated"
```

---

## 🛠️ Development Setup

### Running in Development Mode

```bash
# Set environment variables
export FLASK_ENV=development
export FLASK_DEBUG=True

# Run with auto-reload
python app.py
```

### Adding New Models

1. **Add model to the examples in `templates/index.html`:**

```html
<div class="example-item" onclick="quickLoad('your-model-name')">
    <div class="example-title"><i class="fas fa-icon"></i> Model Name</div>
    <div class="example-code">your-model-name</div>
    <div class="example-description">Description of what this model does</div>
</div>
```

2. **Test the model via the web interface**

3. **Update documentation**

---

## 🚀 Deployment

### Production Environment

1. **Create production `.env`:**

```env
FLASK_ENV=production
FLASK_DEBUG=False
SECRET_KEY=your-super-secret-production-key
FLASK_HOST=0.0.0.0
FLASK_PORT=8000
```

2. **Install production server:**

```bash
pip install gunicorn
```

3. **Run with Gunicorn:**

```bash
gunicorn --bind 0.0.0.0:8000 --workers 4 app:app
```

### Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["python", "app.py"]
```

---

## 🔍 Troubleshooting

### Common Issues

#### 1. **Model Loading Errors**
```
Error: Failed to load model 'model-name'
```
**Solution:** Check internet connection and model name spelling

#### 2. **Symlink Warnings**
```
UserWarning: huggingface_hub cache-system uses symlinks
```
**Solution:** Already handled in `.env` with `HF_HUB_DISABLE_SYMLINKS_WARNING=1`

#### 3. **Port Already in Use**
```
OSError: [Errno 48] Address already in use
```
**Solution:** Change port in `.env` or kill existing process

#### 4. **Memory Issues with Large Models**
```
OutOfMemoryError: CUDA out of memory
```
**Solution:** Use CPU-only models or reduce batch size

### Performance Tips

- 🚀 **First load is slow** - Models are downloaded and cached
- ⚡ **Subsequent loads are fast** - Uses local cache
- 💾 **Cache location:** Check `HF_HUB_CACHE` in `.env`
- 🔄 **Clear cache:** Delete the models folder if needed

---

## 📚 API Documentation

### Endpoints

#### `POST /load_model`
Load a Hugging Face model

**Request:**
```json
{
    "model_name": "nlptown/bert-base-multilingual-uncased-sentiment"
}
```

**Response:**
```json
{
    "status": "success",
    "message": "Hugging Face model loaded: nlptown/bert-base-multilingual-uncased-sentiment"
}
```

#### `POST /predict`
Make a prediction with the loaded model

**Request:**
```json
{
    "text": "The patient is recovering well"
}
```

**Response:**
```json
{
    "status": "success",
    "prediction": {
        "label": "4 stars",
        "score": 0.8945
    }
}
```

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Hugging Face** for the transformers library
- **Flask** for the web framework
- **Medical AI Community** for the specialized models
- **Contributors** who help improve this project

---

## 📞 Support

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/indunil-k/ML-webs/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/indunil-k/ML-webs/discussions)
- 📧 **Email:** [Contact maintainer](mailto:your-email@example.com)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ for the medical AI community

</div>
