# ❓ Frequently Asked Questions

Got questions? We've got answers! 🎯

## 📋 Table of Contents

- [General](#general)
- [Installation](#installation)
- [Usage](#usage)
- [AI & ML](#ai--ml)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🌟 General

### What is AI Dashboard Builder?

AI Dashboard Builder is a full-stack web application that transforms CSV files into interactive dashboards with AI-powered insights and forecasts. Upload your data, and instantly get charts, business insights, ML predictions, and natural language Q&A.

### Is it free to use?

Yes! The project is open-source under the MIT License. You can use, modify, and distribute it freely.

### Who is this for?

- 📊 **Data analysts** who want quick visualizations
- 💼 **Business users** exploring their data
- 🎓 **Students** learning ML and full-stack development
- 👨‍💻 **Developers** building analytics tools

### What technologies does it use?

- **Frontend:** React 19, Tailwind CSS, Framer Motion, Recharts
- **Backend:** FastAPI, Pandas, Scikit-learn
- **AI:** Ollama (local LLM with Phi-3 model)

See [ARCHITECTURE.md](ARCHITECTURE.md) for details.

---

## 📦 Installation

### What are the system requirements?

- **OS:** Windows 10+, macOS 10.15+, or Linux
- **RAM:** 4GB minimum (8GB recommended for AI features)
- **Storage:** 5GB free (for Ollama + Phi-3 model)
- **Python:** 3.10 or higher
- **Node.js:** 16 or higher

### Do I need to install Ollama?

Only if you want to use the **AI Chat** feature. The rest of the app (CSV upload, charts, ML forecast) works without Ollama.

### How big is the Phi-3 model?

Approximately 2.3GB. Make sure you have enough disk space.

### Can I use a different LLM?

Yes! Edit `backend/app/routes/ai_chat.py` and change the model name:

```python
"model": "llama2"  # or mistral, codellama, etc.
```

Then pull the model:
```bash
ollama pull llama2
```

---

## 💡 Usage

### What CSV format is supported?

Standard CSV with headers. Example:

```csv
Order Date,Item Type,Total Revenue,Region
2024-01-01,Cosmetics,1500.50,North
2024-01-02,Beverages,800.00,South
```

### Is there a file size limit?

The default FastAPI upload limit is ~10MB. For larger files, modify `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    # ...
)

# Increase upload size
from fastapi import FastAPI
app.router.max_upload_size = 100 * 1024 * 1024  # 100MB
```

### Can I upload Excel files?

Not yet. Only CSV is currently supported. Excel support is on the roadmap.

### How does the ML forecast work?

1. The app detects numeric columns in your CSV
2. The last numeric column is used as the **target variable**
3. A Linear Regression model is trained on the data
4. Future predictions are generated and returned

For better forecasts, ensure your CSV has a clear time-series structure.

### Why is my forecast not accurate?

Linear Regression is a simple model. For complex patterns, you need:
- More historical data
- Better features (multiple input variables)
- Advanced models (ARIMA, Prophet, LSTM)

These are planned for future releases.

### How do I customize the AI prompts?

Edit `backend/app/routes/ai_chat.py`:

```python
prompt = f"""
Dataset:
{sample_data}

Q: {query.question}
Answer briefly.
"""
```

Modify this template to your needs.

---

## 🤖 AI & ML

### Does the AI work offline?

Yes! Ollama runs locally, so all AI processing happens on your machine. No data is sent to external servers.

### Can I use OpenAI/Claude instead of Ollama?

Yes! Replace the Ollama client with OpenAI's API in `ai_chat.py`:

```python
import openai
openai.api_key = "sk-..."

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}]
)
```

### What is Phi-3?

Phi-3 is Microsoft's small language model (2.3GB). It's fast, efficient, and works well for Q&A tasks on local machines.

### Why is the AI slow on first use?

The first request loads the model into memory. Subsequent requests are much faster.

### Can the AI see my entire dataset?

Currently, only the **first 3 rows** are sent to the AI for context (to keep prompts small). We're working on smarter data sampling.

---

## 🚀 Deployment

### Can I deploy this to production?

Yes! See [ARCHITECTURE.md](ARCHITECTURE.md) for deployment recommendations. You'll need:

- Frontend: Vercel, Netlify, or AWS S3 + CloudFront
- Backend: Railway, Render, AWS EC2, or Docker
- AI: Self-hosted Ollama or cloud LLM API

### Do I need a database?

Not for the current MVP. Data is stored in memory. For multi-user support, add:
- **PostgreSQL** for user data
- **Redis** for caching
- **S3** for file storage

### Is it scalable?

The current architecture is suitable for small to medium workloads. For enterprise scale:
- Add load balancing
- Use async task queues (Celery)
- Implement caching
- Switch to a managed LLM API

### How do I add authentication?

We recommend **JWT tokens** with FastAPI:

```python
from fastapi_jwt_auth import AuthJWT

@AuthJWT.token_in_header
async def protected_route():
    return {"message": "You're authenticated!"}
```

For frontend, use libraries like `react-auth-kit` or build custom auth.

---

## 🐛 Troubleshooting

### ❌ "Port 8000 already in use"

Kill the process using the port:

```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:8000 | xargs kill -9
```

Or change the port:
```bash
uvicorn main:app --port 8001
```

### ❌ "Port 3000 already in use"

```bash
PORT=3001 npm start
```

### ❌ "Ollama connection refused"

Make sure Ollama is running:
```bash
ollama serve
```

Test it:
```bash
curl http://localhost:11434/api/tags
```

### ❌ "Module not found" (Python)

Activate your virtual environment:
```bash
# Windows
.\venv\Scripts\Activate.ps1

# macOS/Linux
source venv/bin/activate
```

Then reinstall:
```bash
pip install -r requirements.txt
```

### ❌ "Cannot find module" (React)

```bash
cd frontend
rm -rf node_modules
npm install
```

### ❌ CORS errors in browser

The backend already has CORS enabled. If you still see errors:
1. Check that the backend is running on port 8000
2. Verify the frontend is calling `http://localhost:8000`
3. Open browser DevTools → Network tab → check request headers

### ❌ Forecast returns empty array

This means your CSV has no numeric columns. Ensure your data includes:
- Numeric values (integers or floats)
- At least one column with measurable data (sales, revenue, count, etc.)

### ❌ AI returns "Please upload CSV first"

The `/ask` endpoint requires a prior `/upload` call. The DataFrame is stored in memory only for the current session.

---

## 📚 Additional Resources

- 📖 [Full Documentation](../README.md)
- 🛠️ [Setup Guide](SETUP.md)
- 🏗️ [Architecture](ARCHITECTURE.md)
- 📡 [API Reference](API.md)
- 🤝 [Contributing](CONTRIBUTING.md)

---

## 💬 Still have questions?

- 🐛 [Open an issue](https://github.com/yourusername/ai-dashboard-builder/issues)
- 💬 [Start a discussion](https://github.com/yourusername/ai-dashboard-builder/discussions)
- 📧 Email: support@example.com

---

**Don't see your question?** Open an issue and we'll add it here! ⭐
