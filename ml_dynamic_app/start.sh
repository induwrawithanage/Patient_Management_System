#!/bin/bash

# 🧠 MediSense AI - Quick Start Script

echo "🧠 MediSense AI - Medical Text Analysis Platform"
echo "=============================================="

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check if virtual environment exists
if [ ! -d ".venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv .venv
fi

# Activate virtual environment
echo "⚡ Activating virtual environment..."
source .venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️ Creating .env file from template..."
    cp .env.example .env
    echo "✅ Please edit .env file with your preferred settings"
fi

# Start the application
echo "🚀 Starting MediSense AI..."
python app.py
