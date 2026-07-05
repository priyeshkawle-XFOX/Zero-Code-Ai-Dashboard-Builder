# 🚀 AI Dashboard Builder

<div align="center">

![AI Dashboard](https://img.shields.io/badge/AI-Dashboard-blueviolet?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

**An AI-powered dashboard builder that transforms your CSV files into beautiful, interactive visualizations with smart insights and forecasts.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [API Docs](#-api-documentation) • [Project Structure](#-project-structure)

</div>

---

## 📖 Overview

**AI Dashboard Builder** is a full-stack web application that empowers users to upload CSV data and instantly receive a comprehensive analytics dashboard. The platform combines machine learning forecasting, AI-driven natural language querying, and beautiful data visualizations to help users understand their data without writing a single line of code.

### ✨ What Makes It Special?

- 📊 **One-Click Analytics** — Upload a CSV, get instant dashboards
- 🤖 **AI-Powered Q&A** — Ask questions about your data in plain English
- 📈 **ML Forecasting** — Linear regression-based sales predictions
- 🎨 **Modern UI** — Sleek, animated, and fully responsive design
- 🔒 **Authentication** — Secure user login & protected routes
- 💬 **AI Chat Assistant** — Local LLM (Phi-3) integration via Ollama

---

## 🎯 Features

### 🎨 Frontend

- 🌟 **Landing Page** — Beautiful hero section with particle animations
- 🔐 **Auth System** — Login/Signup with localStorage persistence
- 📊 **Interactive Dashboard** — Line charts, pie charts, and metric cards
- 💬 **AI Chat Interface** — Ask natural language questions about your data
- 📜 **History Page** — View past queries and analyses
- 💡 **Insights Engine** — Auto-generated business insights
- ⚙️ **Settings Page** — User preferences and configuration
- 💎 **Pricing Page** — Subscription tiers display
- 🎭 **Animations** — Framer Motion + AOS for smooth transitions
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

### ⚙️ Backend

- 📤 **CSV Upload API** — Accepts and parses CSV files
- 🧠 **Smart ML Logic** — Automatic target column detection
- 📈 **Linear Regression Forecast** — Time-series prediction
- 🤖 **Ollama AI Integration** — Local LLM for natural language Q&A
- 🔄 **CORS Enabled** — Frontend-backend communication
- 📊 **Data Aggregation** — Pandas-powered data processing
- 🛡️ **Error Handling** — Robust exception management

---

## 🛠️ Tech Stack

### Frontend

| Technology              | Purpose               |
| ----------------------- | --------------------- |
| **React 19**            | UI framework          |
| **React Router 7**      | Client-side routing   |
| **Tailwind CSS**        | Utility-first styling |
| **Framer Motion**       | Advanced animations   |
| **AOS**                 | Scroll animations     |
| **Chart.js / Recharts** | Data visualization    |
| **Axios**               | HTTP client           |
| **PapaParse**           | CSV parsing           |
| **TSParticles**         | Particle effects      |

### Backend

| Technology         | Purpose                              |
| ------------------ | ------------------------------------ |
| **FastAPI**        | High-performance async API           |
| **Uvicorn**        | ASGI server                          |
| **Pandas**         | Data manipulation                    |
| **NumPy**          | Numerical computing                  |
| **Scikit-learn**   | Machine learning (Linear Regression) |
| **Pydantic**       | Data validation                      |
| **Ollama (Phi-3)** | Local LLM for AI chat                |
| **Python 3.10+**   | Core language                        |

---

## 📦 Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or higher) & **npm**
- **Python** (v3.10 or higher)
- **Ollama** (for AI chat functionality) — [Download here](https://ollama.com/)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/ai-dashboard-builder.git
cd ai-dashboard-builder
```

### 2️⃣ Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# Windows (CMD):
.\venv\Scripts\activate.bat
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn pandas numpy scikit-learn pydantic requests

# Install Ollama and pull the Phi-3 model
# (Download Ollama from https://ollama.com/)
ollama pull phi3
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

---

## 🚀 Usage

### Start the Backend Server

```bash
cd backend
.\venv\Scripts\Activate.ps1          # Activate venv
python -m uvicorn main:app --reload  # Start FastAPI on port 8000
```

Backend will be available at: **http://localhost:8000**
API docs (Swagger UI): **http://localhost:8000/docs**

### Start the Frontend

```bash
cd frontend
npm start
```

Frontend will open at: **http://localhost:3000**

### Using the Application

1. 🌐 Open **http://localhost:3000** in your browser
2. 📝 Sign up / Log in
3. 📤 Upload a CSV file from the Dashboard
4. 📊 View auto-generated charts, metrics, and forecasts
5. 💬 Use the AI Chat to ask questions about your data
6. 💡 Check the Insights page for key findings

---

## 📡 API Documentation

### Base URL: `http://localhost:8000`

#### 🔹 `POST /upload`

Uploads a CSV file and returns analytics + ML forecast.

**Request:** `multipart/form-data` with a `file` field

**Response:**

```json
{
  "filename": "sales_data.csv",
  "columns": ["Order Date", "Item Type", "Total Revenue"],
  "rows": 500,
  "insights": {
    "total_sales": 1245000.50,
    "top_product": "Cosmetics",
    "peak_day": "Friday"
  },
  "charts": {
    "line_chart": { "dates": [...], "sales": [...] },
    "pie_chart": { "labels": [...], "values": [...] }
  },
  "forecast": [null, null, ..., 12000.5, 12500.3],
  "ml_target": "Total Revenue"
}
```

#### 🔹 `POST /ask`

Ask AI questions about uploaded data (requires data to be uploaded first).

**Request:**

```json
{
  "question": "What is the total revenue?"
}
```

**Response:**

```json
{
  "answer": "The total revenue is $1,245,000.50"
}
```

#### 🔹 `GET /`

Health check endpoint.

**Response:**

```json
{
  "message": "AI Dashboard Backend Running 🚀"
}
```

---

## 📁 Project Structure

```
ai-dashboard-builder/
├── 📂 backend/
│   ├── 📂 app/
│   │   ├── 📂 routes/
│   │   │   ├── 📄 upload.py        # CSV upload & ML forecast
│   │   │   └── 📄 ai_chat.py       # AI chat endpoints
│   │   ├── 📂 services/
│   │   │   └── 📄 insights_engine.py  # Business insights
│   │   └── 📂 utils/
│   │       └── 📄 charts.py        # Chart data generation
│   ├── 📄 main.py                  # FastAPI entry point
│   ├── 📄 requirements.txt         # Python dependencies
│   └── 📂 venv/                    # Virtual environment
│
├── 📂 frontend/
│   ├── 📂 public/                  # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📄 Navbar.jsx
│   │   │   ├── 📄 Sidebar.jsx
│   │   │   └── 📄 ParticlesBackground.jsx
│   │   ├── 📂 pages/
│   │   │   ├── 📄 LandingPage.jsx
│   │   │   ├── 📄 AuthPage.jsx
│   │   │   ├── 📄 Dashboard.jsx
│   │   │   ├── 📄 Insights.jsx
│   │   │   ├── 📄 History.jsx
│   │   │   ├── 📄 Settings.jsx
│   │   │   ├── 📄 FeaturePage.jsx
│   │   │   └── 📄 PricingPage.jsx
│   │   ├── 📄 App.js               # Main app & routes
│   │   └── 📄 index.js             # Entry point
│   ├── 📄 package.json
│   ├── 📄 tailwind.config.js
│   └── 📄 README.md
│
└── 📄 README.md                    # You are here 📍
```

---

## 🤖 How the AI Works

### Machine Learning Forecast

1. Detects numeric columns in uploaded CSV
2. Selects the last numeric column as the **target variable**
3. Trains a **Linear Regression** model on the data
4. Generates future predictions using the trained model
5. Returns forecast values aligned with the original dataset length

### Natural Language AI Chat

1. Sends the uploaded dataset (first 3 rows as sample) to **Ollama**
2. Uses the **Phi-3** model for fast, local inference
3. Returns concise answers via the `/ask` endpoint
4. CORS-enabled for seamless frontend communication

---

## 🎨 Screenshots

> 📸 _Add your application screenshots here to showcase the UI!_

| Landing Page  |   Dashboard   |    AI Chat    |
| :-----------: | :-----------: | :-----------: |
| _Coming soon_ | _Coming soon_ | _Coming soon_ |

---

## 🔮 Future Enhancements

- [ ] 🗄️ **Database Integration** — Store user history with PostgreSQL/MongoDB
- [ ] 📁 **Multi-File Support** — Compare multiple CSVs
- [ ] 📤 **Export to PDF** — Download dashboards as reports
- [ ] 🔐 **OAuth Login** — Google/GitHub authentication
- [ ] 🎨 **Custom Themes** — Dark/light mode toggle
- [ ] 📊 **More Chart Types** — Bar, scatter, heatmap
- [ ] 🧠 **Advanced ML Models** — Random Forest, XGBoost
- [ ] 🌐 **Cloud Deployment** — Docker + AWS/Vercel
- [ ] 🔔 **Real-time Notifications** — WebSocket-based alerts
- [ ] 📱 **Mobile App** — React Native version

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Author

**YOUR_NAME**

- 🐙 GitHub: [@YOUR_GITHUB_USERNAME](https://github.com/YOUR_GITHUB_USERNAME)
- 💼 LinkedIn: [Your Profile](https://linkedin.com/in/YOUR_LINKEDIN_PROFILE)
- 📧 Email: YOUR_EMAIL@example.com

---

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) for the amazing backend framework
- [React](https://react.dev/) for the powerful UI library
- [Ollama](https://ollama.com/) for local LLM inference
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [Framer Motion](https://www.framer.com/motion/) for silky-smooth animations

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star! ⭐

Made with ❤️ and lots of ☕

</div>

### ⭐ "Screenshots : " ⭐

> 📸 Screenshots are located in the `screenshots/` directory at the root of this repository.

![Screenshot 1](screenshots/image.png)
![Screenshot 2](screenshots/image-1.png)
![Screenshot 3](screenshots/image-2.png)
![Screenshot 4](screenshots/image-3.png)
![Screenshot 5](screenshots/image-4.png)
![Screenshot 6](screenshots/image-5.png)
![Screenshot 7](screenshots/image-6.png)
![Screenshot 8](screenshots/image-7.png)
![Screenshot 9](screenshots/image-8.png)
![Screenshot 10](screenshots/image-9.png)
![Screenshot 11](screenshots/image-10.png)
![Screenshot 12](screenshots/image-11.png)
![Screenshot 13](screenshots/image-12.png)
![Screenshot 14](screenshots/image-13.png)
![Screenshot 15](screenshots/image-14.png)
![Screenshot 16](screenshots/image-15.png)
![Screenshot 17](screenshots/image-16.png)
![Screenshot 18](screenshots/image-17.png)
![Screenshot 19](screenshots/image-18.png)
![Screenshot 20](screenshots/image-19.png)
![Screenshot 21](screenshots/image-20.png)
![Screenshot 22](screenshots/image-21.png)
![Screenshot 23](screenshots/image-22.png)
