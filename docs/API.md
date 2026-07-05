# 📡 API Reference

Complete API documentation for the AI Dashboard Builder backend.

**Base URL:** `http://localhost:8000`

**Interactive Docs:** [http://localhost:8000/docs](http://localhost:8000/docs) (Swagger UI)

---

## 📋 Table of Contents

- [Authentication](#authentication)
- [Endpoints](#endpoints)
  - [GET /](#get-)
  - [POST /upload](#post-upload)
  - [POST /ask](#post-ask)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Examples](#examples)

---

## 🔐 Authentication

> **Current Version:** No authentication required (MVP)
>
> **Future:** JWT-based authentication will be added

---

## 🔗 Endpoints

### `GET /`

Health check endpoint to verify the API is running.

#### Request
```http
GET / HTTP/1.1
Host: localhost:8000
```

#### Response
**Status:** `200 OK`
```json
{
  "message": "AI Dashboard Backend Running 🚀"
}
```

#### Example
```bash
curl http://localhost:8000/
```

---

### `POST /upload`

Uploads a CSV file, parses it, generates insights, charts, and ML forecast.

#### Request
**Content-Type:** `multipart/form-data`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | ✅ Yes | CSV file (max ~10MB) |

#### Response
**Status:** `200 OK`

```json
{
  "filename": "sales_data.csv",
  "columns": ["Order Date", "Item Type", "Total Revenue", "Region"],
  "rows": 500,
  "insights": {
    "total_sales": 1245000.50,
    "top_product": "Cosmetics",
    "peak_day": "Friday"
  },
  "charts": {
    "line_chart": {
      "dates": ["2024-01-01", "2024-01-02", "2024-01-03"],
      "sales": [1200.50, 1450.75, 1100.00]
    },
    "pie_chart": {
      "labels": ["Cosmetics", "Beverages", "Snacks"],
      "values": [45000, 32000, 28000]
    }
  },
  "forecast": [null, null, 12500.30, 12800.50, 13100.20],
  "ml_target": "Total Revenue"
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `filename` | string | Original filename |
| `columns` | array | List of column names in CSV |
| `rows` | integer | Number of data rows |
| `insights` | object | Auto-generated business metrics |
| `charts` | object | Pre-aggregated chart data |
| `forecast` | array | ML predictions (null for past, value for future) |
| `ml_target` | string | Column used for ML prediction |

#### Error Response
**Status:** `200 OK` (errors return 200 with error field)
```json
{
  "error": "Could not parse CSV file. Please check the format."
}
```

#### Example

**Using cURL:**
```bash
curl -X POST http://localhost:8000/upload \
  -F "file=@./sales_data.csv"
```

**Using JavaScript (Axios):**
```javascript
import axios from 'axios';

const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await axios.post('http://localhost:8000/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

**Using Python:**
```python
import requests

with open('sales_data.csv', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/upload',
        files={'file': f}
    )
print(response.json())
```

---

### `POST /ask`

Ask AI questions about the uploaded dataset using natural language.

> ⚠️ **Prerequisite:** A CSV file must be uploaded via `POST /upload` first.

#### Request
**Content-Type:** `application/json`

```json
{
  "question": "What is the total revenue?"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | string | ✅ Yes | Natural language question |

#### Response
**Status:** `200 OK`

```json
{
  "answer": "The total revenue is $1,245,000.50"
}
```

#### Error Responses

**No data uploaded:**
```json
{
  "answer": "Please upload CSV first."
}
```

**Ollama not running:**
```json
{
  "answer": "Error: Could not connect to Ollama at http://localhost:11434"
}
```

#### Example

**Using cURL:**
```bash
curl -X POST http://localhost:8000/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "What is the highest selling product?"}'
```

**Using JavaScript:**
```javascript
const response = await axios.post('http://localhost:8000/ask', {
  question: "What is the highest selling product?"
});
console.log(response.data.answer);
```

**Using Python:**
```python
import requests

response = requests.post(
    'http://localhost:8000/ask',
    json={'question': 'What is the highest selling product?'}
)
print(response.json()['answer'])
```

---

## 📊 Data Models

### Insights Object

| Field | Type | Description |
|-------|------|-------------|
| `total_sales` | float | Sum of all sales values |
| `top_product` | string | Most frequent product name |
| `peak_day` | string | Day with highest sales (e.g., "Friday") |

### Line Chart Object

| Field | Type | Description |
|-------|------|-------------|
| `dates` | array[string] | List of dates (YYYY-MM-DD) |
| `sales` | array[float] | Sales values per date |

### Pie Chart Object

| Field | Type | Description |
|-------|------|-------------|
| `labels` | array[string] | Category names |
| `values` | array[float] | Values per category |

### Forecast Array

- Length matches the original dataset
- First ~60% values are `null` (historical data)
- Remaining 40% contain predicted values (floats)

---

## ⚠️ Error Handling

All errors are returned with a 200 status code and an `error` field in the response body for graceful frontend handling.

### Common Error Scenarios

| Error | Cause | Solution |
|-------|-------|----------|
| `"Could not parse CSV"` | Invalid CSV format | Check file encoding & delimiters |
| `"Please upload CSV first"` | Called `/ask` before `/upload` | Upload a CSV first |
| `"Error: <message>"` | Ollama not running | Start Ollama: `ollama serve` |
| `"No numeric columns found"` | CSV has no numeric data | Add numeric columns to CSV |

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success (even for errors — check `error` field) |
| `422` | Validation error (FastAPI default) |
| `500` | Internal server error |

---

## 💡 Example Workflow

Here's a complete end-to-end example:

```python
import requests

BASE_URL = "http://localhost:8000"

# Step 1: Upload CSV
with open('sales_data.csv', 'rb') as f:
    upload_resp = requests.post(
        f"{BASE_URL}/upload",
        files={'file': f}
    )
data = upload_resp.json()

print(f"📊 Uploaded: {data['filename']}")
print(f"📈 Total Sales: ${data['insights']['total_sales']:,.2f}")
print(f"🏆 Top Product: {data['insights']['top_product']}")

# Step 2: Ask AI a question
questions = [
    "What is the total revenue?",
    "Which product sells the most?",
    "What is the peak sales day?",
]

for q in questions:
    ask_resp = requests.post(
        f"{BASE_URL}/ask",
        json={'question': q}
    )
    print(f"\n❓ {q}")
    print(f"🤖 {ask_resp.json()['answer']}")
```

---

## 🔧 Rate Limiting

> **Current:** No rate limiting (development only)
>
> **Production:** Implement using `slowapi` or API gateway

---

## 📝 Notes

- All endpoints are **CORS-enabled** (`allow_origins=["*"]`)
- The server uses **Pydantic** for request validation
- FastAPI automatically generates OpenAPI schema at `/openapi.json`
- For interactive API testing, use Swagger UI at `/docs`

---

**Questions or issues?** Open a ticket on [GitHub](https://github.com/yourusername/ai-dashboard-builder/issues) 🚀
