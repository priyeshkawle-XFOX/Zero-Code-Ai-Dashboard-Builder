import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis,
  AreaChart, Area, ResponsiveContainer
} from "recharts";

function Insights() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("csvData"));
    if (stored && stored.length > 0) {
      setData(stored);
    }
  }, []);

  const detectColumns = (data) => {
    const sample = data[0];
    const numeric = [];
    const categorical = [];
    const date = [];

    Object.keys(sample).forEach((key) => {
      const value = sample[key];

      if (!isNaN(value)) numeric.push(key);
      else if (!isNaN(Date.parse(value))) date.push(key);
      else categorical.push(key);
    });

    return { numeric, categorical, date };
  };

  if (data.length === 0) {
    return <h2 className="text-white p-6">Upload CSV to see insights</h2>;
  }

  const { numeric, categorical, date } = detectColumns(data);

  const pieData = Object.values(
    data.reduce((acc, item) => {
      const key = item[categorical[0]] || "Other";
      acc[key] = acc[key] || { name: key, value: 0 };
      acc[key].value += 1;
      return acc;
    }, {})
  );

  const barData = data.map((item) => ({
    name: item[categorical[0]],
    value: parseFloat(item[numeric[0]]) || 0,
  }));

  const areaData = data.map((item, i) => ({
    name: item[date[0]] || `Row ${i}`,
    value: parseFloat(item[numeric[0]]) || 0,
  }));

  const COLORS = ["#14b8a6", "#fde047", "#f97316", "#a855f7"];

  const darkTooltip = {
    contentStyle: {
      background: "linear-gradient(to right, #020617, #0f172a)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "12px",
      color: "#fff",
      backdropFilter: "blur(12px)",
      boxShadow: "0px 0px 20px rgba(0,0,0,0.5)"
    }
  };

  return (
    <div className="p-8 text-white space-y-8 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
         Advanced Insights
      </h1>

      {/* TOP ROW */}
      <div className="grid grid-cols-2 gap-6">

        {/* PIE */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5">
        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-lg">

            <h3 className="mb-4 text-gray-300 text-lg font-semibold tracking-wide 
            hover:text-white transition duration-300 
            hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
            Category Distribution
            </h3>

            <div className="flex items-center justify-between">

            {/* 🔥 LEFT CONTENT */}
            <div className="w-1/3 space-y-3 text-sm">

                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-gray-400">Top Category</p>
                <h4 className="text-white font-semibold">
                    {pieData[0]?.name}
                </h4>
                </div>

                <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-gray-400">Total Categories</p>
                <h4 className="text-white font-semibold">
                    {pieData.length}
                </h4>
                </div>

            </div>

            {/* 🔥 PIE CHART CENTER */}
            <div className="w-1/3">
                <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={100} dataKey="value">
                    {pieData.map((entry, index) => (
                        <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                        style={{
                            filter: `drop-shadow(0px 0px 12px ${COLORS[index % COLORS.length]})`
                        }}
                        />
                    ))}
                    </Pie>
                    <Tooltip {...darkTooltip} />
                </PieChart>
                </ResponsiveContainer>
            </div>

            {/* 🔥 RIGHT CONTENT */}
            <div className="w-1/3 space-y-2 text-sm">

                {pieData.slice(0, 4).map((item, i) => (
                <div key={i} className="flex justify-between items-center">

                    <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                    ></div>

                    <span className="text-gray-300">{item.name}</span>
                    </div>

                    <span className="text-gray-400">{item.value}</span>

                </div>
                ))}

            </div>

            </div>

        </div>
        </div>

        {/* TREND */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5">
          <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-lg hover:shadow-green-500/10 transition">

            <h3 className="mb-4 text-gray-300 text-lg font-semibold tracking-wide 
            hover:text-white transition duration-300 
            hover:drop-shadow-[0_0_12px_rgba(34,197,94,0.9)]">
            Trend Analysis
            </h3>

            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={areaData}>
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip {...darkTooltip} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  fill="url(#colorGradient)"
                  strokeWidth={3}
                  style={{ filter: "drop-shadow(0px 0px 12px #22c55e)" }}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>

          </div>
        </div>

      </div>

      {/* BAR */}
      <div className="p-[1px] rounded-2xl bg-gradient-to-br from-white/10 to-white/5">
        <div className="bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/10 shadow-lg hover:shadow-blue-500/10 transition">

          <h3 className="mb-4 text-gray-300 text-lg font-semibold tracking-wide 
            hover:text-white transition duration-300 
            hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">
            Value Comparison
            </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip {...darkTooltip} />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                style={{ filter: "drop-shadow(0px 0px 10px #3b82f6)" }}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>
      </div>

    </div>
  );
}

export default Insights;