# 🛠️ Setup Guide

This guide will walk you through setting up the AI Dashboard Builder on your local machine.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Ollama AI Setup](#ollama-ai-setup)
- [Running the Application](#running-the-application)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v16+ | [nodejs.org](https://nodejs.org/) |
| **npm** | v8+ | Comes with Node.js |
| **Python** | v3.10+ | [python.org](https://www.python.org/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **Ollama** | Latest | [ollama.com](https://ollama.com/) |

### Verify Installations

```bash
node --version
npm --version
python --version
git --version
ollama --version
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Create Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

**Windows (CMD):**
```cmd
python -m venv venv
.\venv\Scripts\activate.bat
```

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 4: Verify Installation

```bash
python -c "import fastapi, pandas, sklearn; print('✅ All dependencies installed!')"
```

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd ../frontend
```

### Step 2: Install npm Packages

```bash
npm install
```

### Step 3: Verify Installation

```bash
npm list --depth=0
```

---

## Ollama AI Setup

The AI Chat feature requires Ollama with the Phi-3 model.

### Step 1: Install Ollama

Download and install from [ollama.com](https://ollama.com/download)

### Step 2: Pull the Phi-3 Model

```bash
ollama pull phi3
```

### Step 3: Start Ollama Service

Ollama runs automatically as a service after installation. To verify:

```bash
ollama list
```

You should see `phi3` in the list.

### Step 4: Test Ollama

```bash
ollama run phi3 "Hello, how are you?"
```

---

## Running the Application

You'll need **three terminals** to run everything:

### Terminal 1: Ollama Service
```bash
ollama serve
```

### Terminal 2: Backend Server
```bash
cd backend
.\venv\Scripts\Activate.ps1   # Activate venv
python -m uvicorn main:app --reload
```
> Backend runs on: http://localhost:8000

### Terminal 3: Frontend Server
```bash
cd frontend
npm start
```
> Frontend runs on: http://localhost:3000

---

## Troubleshooting

### ❌ Port Already in Use

**Backend (port 8000):**
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

**Frontend (port 3000):**
```bash
# Set a different port
PORT=3001 npm start
```

### ❌ Ollama Connection Error

Make sure Ollama is running:
```bash
curl http://localhost:11434/api/tags
```

If not running, start it:
```bash
ollama serve
```

### ❌ Python Module Not Found

Make sure your virtual environment is activated:
```bash
# You should see (venv) in your terminal prompt
# If not, activate it again
```

### ❌ npm Install Fails

Try clearing the cache:
```bash
npm cache clean --force
rm -rf node_modules
npm install
```

### ❌ CORS Issues

The backend already has CORS enabled for all origins. If you still face issues, check `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📝 Environment Variables (Optional)

Create a `.env` file in the `backend` directory:

```env
# AI Model Configuration
OLLAMA_MODEL=phi3
OLLAMA_URL=http://localhost:11434

# Server Configuration
HOST=0.0.0.0
PORT=8000

# CORS (comma-separated origins)
ALLOWED_ORIGINS=http://localhost:3000
```

---

## ✅ Verify Everything Works

1. **Backend Health Check:** Visit http://localhost:8000/
   - Should return: `{"message": "AI Dashboard Backend Running 🚀"}`

2. **API Docs:** Visit http://localhost:8000/docs
   - Should show Swagger UI with all endpoints

3. **Frontend:** Visit http://localhost:3000
   - Should show the landing page

4. **End-to-End Test:**
   - Sign up / Login
   - Upload a CSV file
   - Check that charts and insights appear
   - Try the AI Chat

---

**Need more help?** Open an issue on [GitHub](https://github.com/yourusername/ai-dashboard-builder/issues) 🚀
