# 🏗️ Architecture

This document describes the high-level architecture of the **AI Dashboard Builder**.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                   (React 19 + Tailwind CSS)                  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/REST
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    FastAPI BACKEND (Port 8000)               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ /upload      │  │ /ask (AI)    │  │ / (health)   │      │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘      │
│         │                  │                                  │
│  ┌──────▼───────┐  ┌──────▼───────┐                          │
│  │ Pandas + ML  │  │ Ollama Client│                          │
│  │ (Scikit)     │  │ (Phi-3 LLM)  │                          │
│  └──────┬───────┘  └──────┬───────┘                          │
└─────────┼──────────────────┼─────────────────────────────────┘
          │                  │
          ▼                  ▼
   ┌─────────────┐    ┌─────────────┐
   │   CSV Data  │    │   Ollama    │
   │  (In-Memory)│    │  (Local LLM)│
   └─────────────┘    └─────────────┘
```

---

## 🧩 Component Breakdown

### Frontend Layer (React)

| Component | Responsibility |
|-----------|---------------|
| **LandingPage** | Marketing page, hero section, CTAs |
| **AuthPage** | Login/Signup with localStorage |
| **Dashboard** | Main analytics view, CSV upload, charts |
| **Insights** | AI-generated business insights |
| **History** | Past queries and uploads |
| **Settings** | User preferences |
| **Navbar/Sidebar** | Navigation |

**Key Libraries:**
- **React Router 7** → Client-side routing
- **Axios** → HTTP client for API calls
- **Recharts/Chart.js** → Data visualization
- **Framer Motion** → UI animations
- **TSParticles** → Background effects

### Backend Layer (FastAPI)

| Module | Responsibility |
|--------|---------------|
| **main.py** | App initialization, CORS, routing |
| **routes/upload.py** | CSV upload, ML forecast |
| **routes/ai_chat.py** | AI chat via Ollama |
| **services/insights_engine** | Business insights generation |
| **utils/charts** | Chart data aggregation |

**Key Libraries:**
- **FastAPI** → Async web framework
- **Pandas** → CSV parsing & data manipulation
- **Scikit-learn** → Linear Regression model
- **NumPy** → Numerical computations
- **Requests** → Ollama API client

### AI Layer (Ollama)

- **Model:** Phi-3 (Microsoft's small language model)
- **Runtime:** Local via Ollama
- **Endpoint:** `http://localhost:11434/api/generate`
- **Use Case:** Natural language Q&A about uploaded data

---

## 🔄 Data Flow

### 1. CSV Upload Flow

```
User → Frontend (File Input)
  ↓ POST /upload (multipart/form-data)
FastAPI Route (upload.py)
  ↓ pd.read_csv()
Pandas DataFrame
  ↓ generate_insights() + generate_chart_data()
Insights & Charts
  ↓ LinearRegression().fit()
ML Forecast
  ↓ JSON Response
Frontend Dashboard (charts rendered)
```

### 2. AI Chat Flow

```
User → Frontend (Chat Input)
  ↓ POST /ask { question: "..." }
FastAPI Route (ai_chat.py)
  ↓ Load global DataFrame
Build prompt (data sample + question)
  ↓ HTTP POST to Ollama
Ollama (Phi-3 model)
  ↓ Generate response
Return answer to frontend
  ↓ Display in chat UI
```

---

## 🗄️ Data Storage

> ⚠️ **Note:** This MVP uses **in-memory storage** for the uploaded DataFrame. For production, consider adding a database.

| Storage Type | Use Case |
|--------------|----------|
| **In-Memory (Pandas DF)** | Current session data |
| **localStorage (Frontend)** | User auth state |
| **Future: PostgreSQL/MongoDB** | Persistent user history |

---

## 🔒 Security Considerations

| Layer | Current | Recommended for Production |
|-------|---------|---------------------------|
| **CORS** | Open (`*`) | Whitelist specific domains |
| **Auth** | localStorage (demo) | JWT + OAuth2 |
| **File Upload** | No validation | Type & size checks |
| **API Rate Limit** | None | Add slowapi/rate-limiter |
| **HTTPS** | Dev only | Required in production |
| **Secrets** | Hardcoded | Use `.env` files |

---

## 🚀 Deployment Architecture

For production deployment, here's the recommended architecture:

```
                    ┌──────────────────┐
                    │   Cloudflare     │
                    │   (CDN + WAF)    │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                ▼                         ▼
        ┌──────────────┐         ┌──────────────┐
        │   Vercel     │         │   Railway    │
        │  (Frontend)  │         │  (Backend)   │
        │  React Build │         │   FastAPI    │
        └──────────────┘         └──────┬───────┘
                                        │
                                ┌───────┴───────┐
                                ▼               ▼
                        ┌──────────────┐  ┌──────────────┐
                        │  PostgreSQL  │  │   Ollama     │
                        │   (Data)     │  │   Cloud /    │
                        │              │  │   Self-host  │
                        └──────────────┘  └──────────────┘
```

---

## 📦 Tech Stack Summary

### Frontend
- React 19, React Router 7, Tailwind CSS, Framer Motion, AOS, Recharts, Chart.js, Axios, PapaParse, TSParticles

### Backend
- FastAPI, Uvicorn, Pandas, NumPy, Scikit-learn, Pydantic, Requests

### AI
- Ollama + Phi-3 (local LLM)

### DevOps (Future)
- Docker, GitHub Actions, Vercel, Railway, PostgreSQL

---

## 🔮 Scalability Notes

| Aspect | Current | Future |
|--------|---------|--------|
| **Users** | Single user demo | Multi-tenant with auth |
| **Data Size** | Small CSVs (<10MB) | Streaming with chunked upload |
| **ML Models** | Linear Regression | Ensemble models (XGBoost, Neural Nets) |
| **AI** | Local Ollama | Cloud LLM APIs (GPT, Claude) |
| **Caching** | None | Redis for predictions |
| **Queue** | None | Celery for async tasks |

---

**Have questions about the architecture?** Open a discussion on GitHub! 💬
