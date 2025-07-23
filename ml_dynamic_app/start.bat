@echo off

REM 🧠 MediSense AI - Quick Start Script for Windows

echo 🧠 MediSense AI - Medical Text Analysis Platform
echo ==============================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist ".venv" (
    echo 📦 Creating virtual environment...
    python -m venv .venv
)

REM Activate virtual environment
echo ⚡ Activating virtual environment...
call .venv\Scripts\activate.bat

REM Install dependencies
echo 📥 Installing dependencies...
pip install -r requirements.txt

REM Check if .env exists
if not exist ".env" (
    echo ⚙️ Creating .env file from template...
    copy .env.example .env
    echo ✅ Please edit .env file with your preferred settings
)

REM Start the application
echo 🚀 Starting MediSense AI...
python app.py

pause
