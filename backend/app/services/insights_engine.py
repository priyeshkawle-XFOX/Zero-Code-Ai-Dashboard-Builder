import pandas as pd

def generate_insights(df):
    insights = {}

    # 🔥 safer rename (case insensitive)
    df.columns = [col.strip().lower() for col in df.columns]

    rename_map = {
        "total revenue": "sales",
        "item type": "product",
        "order date": "date"
    }

    df = df.rename(columns=rename_map)

    # ✅ TOTAL SALES
    if "sales" in df.columns:
        df["sales"] = pd.to_numeric(df["sales"], errors="coerce").fillna(0)
        insights["total_sales"] = float(df["sales"].sum())
    else:
        insights["total_sales"] = 0

    # ✅ TOP PRODUCT
    if "product" in df.columns:
        if not df["product"].dropna().empty:
            insights["top_product"] = df["product"].mode()[0]
        else:
            insights["top_product"] = "N/A"
    else:
        insights["top_product"] = "N/A"

    # ✅ PEAK DAY (SAFE VERSION)
    if "date" in df.columns and "sales" in df.columns:
        try:
            df["date"] = pd.to_datetime(df["date"], errors="coerce")
            df = df.dropna(subset=["date"])

            if not df.empty:
                df["day"] = df["date"].dt.day_name()
                peak = df.groupby("day")["sales"].sum()

                if not peak.empty:
                    insights["peak_day"] = peak.idxmax()
                else:
                    insights["peak_day"] = "N/A"
            else:
                insights["peak_day"] = "N/A"

        except:
            insights["peak_day"] = "N/A"
    else:
        insights["peak_day"] = "N/A"

    return insights