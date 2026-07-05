from fastapi import APIRouter
from pydantic import BaseModel
import pandas as pd
import requests

router = APIRouter()

# 🔹 Store uploaded data
global_df = None


# 🔹 Request schema
class Query(BaseModel):
    question: str


# 🔹 Save dataframe from upload
def set_dataframe(df):
    global global_df
    global_df = df


# 🔥 MAIN AI ROUTE
@router.post("/ask")
def ask_ai(query: Query):
    global global_df

    try:
        # ❗ Check if data uploaded
        if global_df is None:
            return {"answer": "Please upload CSV first."}

        # ⚡ SMALL DATA → FAST RESPONSE
        sample_data = global_df.head(3).to_string()

        # ⚡ SHORT PROMPT
        prompt = f"""
Dataset:
{sample_data}

Q: {query.question}
Answer briefly.
"""

        # 🔥 OLLAMA API CALL (phi3)
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi3",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "num_predict": 100
                }
            }
        )

        result = response.json()

        return {
            "answer": result.get("response", "No response")
        }

    except Exception as e:
        print("ERROR:", str(e))
        return {
            "answer": f"Error: {str(e)}"
        }