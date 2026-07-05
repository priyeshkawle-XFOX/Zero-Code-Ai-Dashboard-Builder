from fastapi import APIRouter, UploadFile, File
import pandas as pd
from app.services.insights_engine import generate_insights
from app.utils.charts import generate_chart_data
from app.routes.ai_chat import set_dataframe

from sklearn.linear_model import LinearRegression
import numpy as np

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        df = pd.read_csv(file.file)

        set_dataframe(df)

        insights = generate_insights(df)
        charts = generate_chart_data(df)

        # 🔥 =========================
        # ✅ SMART ML LOGIC (NO FRONTEND CHANGE)
        # 🔥 =========================

        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        numeric_cols = [col for col in numeric_cols if col.lower() not in ["id", "index"]]

        if len(numeric_cols) > 0:

            target_col = numeric_cols[-1]

            df = df.dropna(subset=[target_col])

            df['day'] = np.arange(len(df))

            X = df[['day']]
            y = df[target_col]

            model = LinearRegression()
            model.fit(X, y)

            # 🔥 predictions (future nahi — same length mapping)
            future_days = np.arange(len(df), len(df) + len(df)).reshape(-1, 1)
            predictions = model.predict(future_days)

            sales_data = df[target_col].tolist()
            split = int(len(sales_data) * 0.6)

            forecast_full = []

            for i in range(len(sales_data)):
                if i <= split:
                    forecast_full.append(None)   # past madhe forecast nahi
                else:
                    idx = i - split
                    if idx < len(predictions):
                        forecast_full.append(float(predictions[idx]))
                    else:
                        forecast_full.append(None)

        else:
            forecast_full = []
            target_col = None

        return {
            "filename": file.filename,
            "columns": list(df.columns),
            "rows": len(df),
            "insights": insights,
            "charts": charts,
            "forecast": forecast_full,   # 🔥 SAME FORMAT (IMPORTANT)
            "ml_target": target_col
        }

    except Exception as e:
        return {"error": str(e)}