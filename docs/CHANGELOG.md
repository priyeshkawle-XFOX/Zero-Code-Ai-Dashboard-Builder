# 📝 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🚀 Planned
- Excel file upload support
- Multi-user authentication with JWT
- Database integration (PostgreSQL)
- Advanced ML models (Random Forest, XGBoost)
- Export dashboard as PDF
- Real-time collaboration features
- Dark mode toggle

---

## [1.0.0] - 2024-XX-XX

### 🎉 Initial Release

#### ✨ Added
- **Frontend**
  - Beautiful landing page with particle animations
  - User authentication (Login/Signup) with localStorage
  - Interactive dashboard with CSV upload
  - AI Chat interface for natural language Q&A
  - Insights page with auto-generated business metrics
  - History page for past queries
  - Settings page for user preferences
  - Pricing page with subscription tiers
  - Features page showcasing capabilities
  - Responsive design for mobile, tablet, and desktop
  - Smooth animations with Framer Motion and AOS

- **Backend**
  - FastAPI server with CORS enabled
  - `POST /upload` endpoint for CSV processing
  - `POST /ask` endpoint for AI queries via Ollama
  - `GET /` health check endpoint
  - Pandas-based data processing
  - Linear Regression ML model for forecasting
  - Auto-detection of target columns
  - Business insights generation
  - Chart data aggregation
  - Swagger UI documentation at `/docs`

- **AI Integration**
  - Ollama + Phi-3 local LLM integration
  - Natural language Q&A about uploaded data
  - Smart prompt engineering for concise answers

- **Documentation**
  - Comprehensive README.md
  - Setup guide (docs/SETUP.md)
  - Architecture documentation (docs/ARCHITECTURE.md)
  - API reference (docs/API.md)
  - Contributing guide (docs/CONTRIBUTING.md)
  - FAQ (docs/FAQ.md)
  - MIT License

#### 🛠️ Tech Stack
- **Frontend:** React 19, React Router 7, Tailwind CSS, Framer Motion, AOS, Recharts, Chart.js, Axios, PapaParse, TSParticles
- **Backend:** FastAPI, Uvicorn, Pandas, NumPy, Scikit-learn, Pydantic, Requests
- **AI:** Ollama (Phi-3)

#### 🔒 Security
- CORS middleware configured
- File upload validation
- Error handling for invalid inputs

---

## Version History

| Version | Date | Highlights |
|---------|------|------------|
| **1.0.0** | 2024-XX-XX | Initial public release |

---

## 📋 Types of Changes

- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now-removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes

---

**For older versions and detailed commits, see [GitHub Releases](https://github.com/yourusername/ai-dashboard-builder/releases).**
