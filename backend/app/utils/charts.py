import pandas as pd

def generate_chart_data(df):
    charts = {}

    # 🔥 safer column handling
    df.columns = [col.strip().lower() for col in df.columns]

    rename_map = {
        "total revenue": "sales",
        "item type": "product",
        "order date": "date"
    }

    df = df.rename(columns=rename_map)

    # ✅ LINE CHART
    if "date" in df.columns and "sales" in df.columns:
        try:
            df["date"] = pd.to_datetime(df["date"], errors="coerce")
            df["sales"] = pd.to_numeric(df["sales"], errors="coerce").fillna(0)

            df = df.dropna(subset=["date"])
            df = df.sort_values("date")

            sales_trend = df.groupby("date")["sales"].sum().reset_index()

            charts["line_chart"] = {
                "dates": sales_trend["date"].astype(str).tolist(),
                "sales": sales_trend["sales"].tolist()
            }

        except:
            charts["line_chart"] = {"dates": [], "sales": []}
    else:
        charts["line_chart"] = {"dates": [], "sales": []}

    # ✅ PIE CHART
    if "product" in df.columns and "sales" in df.columns:
        try:
            product_dist = df.groupby("product")["sales"].sum().reset_index()

            charts["pie_chart"] = {
                "labels": product_dist["product"].tolist(),
                "values": product_dist["sales"].tolist()
            }

        except:
            charts["pie_chart"] = {"labels": [], "values": []}
    else:
        charts["pie_chart"] = {"labels": [], "values": []}

    return charts