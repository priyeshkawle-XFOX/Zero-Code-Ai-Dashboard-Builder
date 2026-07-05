import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { FaBell } from "react-icons/fa";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import Papa from "papaparse";


function Dashboard() {

  useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const savedData = localStorage.getItem(
    `dashboardData_${currentUser?.email}`
  );

  if (savedData) {
    setData(JSON.parse(savedData));
  }
}, []);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const email = user.email || "guest";
  const username = email.split("@")[0];

  const [data, setData] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");


  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        localStorage.setItem("csvData", JSON.stringify(results.data));
        window.dispatchEvent(new Event("storage"));
      },
    });

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://127.0.0.1:8000/upload", formData);

    console.log("API DATA:", res.data); // 👈 HE ADD KAR

    setData(res.data);

// 🔥 SAVE DATA
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    localStorage.setItem(
      `dashboardData_${currentUser.email}`,
      JSON.stringify(res.data)
    );
  };


    const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {

    const unique = [];
    const filteredPayload = payload.filter((item) => {
      if (unique.includes(item.dataKey)) return false;
      unique.push(item.dataKey);
      return true;
    });

    return (
      <div className="bg-black/80 text-white p-2 rounded shadow text-sm border border-white/10">
        {label && <p className="font-semibold mb-1">{label}</p>}

        {filteredPayload.map((item, index) => {
          if (item.value == null) return null;

          return (
            <p key={index} style={{ color: item.color }}>
              {item.dataKey}: {formatShort(item.value)}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#f59e0b"];

const formatINR = (num) => "₹ " + Number(num).toLocaleString("en-IN");

// ✅ NEW FUNCTION (ADDED)
const formatShort = (num) => {
  if (num >= 10000000) return (num / 10000000).toFixed(1) + "Cr";
  if (num >= 100000) return (num / 100000).toFixed(1) + "L";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num;
};

  // Ask AI
  const handleAsk = async () => {
    if (!question) return;

    setAnswer("");
    setLoading(true); // 🔥 start loading

    const res = await axios.post("http://127.0.0.1:8000/ask", {
      question
    });

    setLoading(false); // 🔥 stop loading

    let i = 0;
    let text = "";
    const full = res.data.answer;

    const interval = setInterval(() => {
      if (i < full.length) {
        text += full[i];
        setAnswer(text);
        i++;
      } else clearInterval(interval);
    }, 15);
  };
  // Chart Data
    const chartData = data?.charts?.line_chart?.dates?.map((d, i) => ({
      date: d,
      sales: data?.charts?.line_chart?.sales?.[i] || 0
    })) || [];

  const calculateGrowth = () => {
  if (!chartData || chartData.length < 2) return null;

  const mid = Math.floor(chartData.length / 2);

  const firstHalf = chartData.slice(0, mid);
  const secondHalf = chartData.slice(mid);

  const avg1 =
    firstHalf.reduce((sum, d) => sum + d.sales, 0) / firstHalf.length;

  const avg2 =
    secondHalf.reduce((sum, d) => sum + d.sales, 0) / secondHalf.length;

  const growth = avg1 ? ((avg2 - avg1) / avg1) * 100 : 0;

  return growth.toFixed(1);
};

  const forecastData = chartData.map((d, i) => {
    const split = Math.floor(chartData.length * 0.6);

    return {
      date: d.date,
      actual: i <= split ? d.sales : null,
      trend: i > split ? d.sales : null,
      forecast: i > split ? d.sales + Math.random() * 15000 : null
    };
  });

    const total = data?.charts?.pie_chart?.values?.length
    ? data.charts.pie_chart.values.reduce((a, b) => a + b, 0)
    : 0;

    const pieData = data?.charts?.pie_chart?.labels?.map((l, i) => {
    const value = data?.charts?.pie_chart?.values?.[i] || 0;

    return {
      name: l,
      value: value,
      percent: total ? ((value / total) * 100).toFixed(0) : 0
    };
    }) || [];

    const growth = calculateGrowth();

  return (
    <>
      {/* 🎥 VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        className="fixed top-0 left-0 w-full h-full object-cover -z-10 opacity-50"
      >
        <source src="/dashboard-bg.mp4" type="video/mp4" />
      </video>

      {/* 🌑 OVERLAY */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/70 -z-10"></div>

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-10 min-h-screen bg-transparent">

          {/* HEADER */}
        <div className="flex items-center justify-between mb-8 px-6 py-4 
          bg-gradient-to-r from-[#0f172a]/80 to-[#1e293b]/80 
          backdrop-blur-xl border border-white/10 
          rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">
            
            <div className="w-10 h-10 flex items-center justify-center 
              rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 
              shadow-lg">
              <span className="text-white font-bold text-lg">Z</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-semibold 
              bg-gradient-to-r from-indigo-400 to-purple-400 
              text-transparent bg-clip-text tracking-wide">
              Zero Code AI Builder
            </h1>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            
            {/* 🔔 Notification */}
            <div className="relative cursor-pointer group">
              <FaBell className="text-xl text-gray-300 group-hover:text-white transition" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 
                bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 
                bg-red-500 rounded-full"></span>
            </div>

            {/* 👤 Profile Dropdown */}
            <div className="relative group">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 
                rounded-lg border border-white/10 hover:bg-white/10 transition cursor-pointer">

                <img 
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=${email}`} 
                  alt="user"
                  className="w-8 h-8 rounded-full border border-white/20 hover:scale-110 transition"
                />

                <span className="text-sm text-gray-300 hidden md:block">
                  {username}
                </span>

              </div>
            </div>

          </div>
        </div>

          <div className="flex gap-6">

            {/* LEFT PANEL */}
            <div className="w-80 space-y-6">

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-white p-5 rounded-xl shadow">
                <h3 className="mb-2">Upload Data</h3>
              
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleUpload}
                />

                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg inline-block transition"
                >
                  Upload CSV
                </label>
              </div>

              <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/30 
                backdrop-blur-xl border border-white/10 p-5 rounded-2xl 
                text-white shadow-lg hover:shadow-blue-500/20 transition duration-300">

                {/* HEADER */}
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  🤖 Ask AI
                </h3>
              </div>
              
                {/* INPUT */}
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask anything about your data..."
                  className="w-full p-3 bg-black/40 text-white rounded-lg mt-3 
                  border border-white/10 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 placeholder-gray-400 resize-none"
                />

                {/* BUTTON */}
                <button
                  onClick={handleAsk}
                  disabled={loading}
                  className="bg-gradient-to-r from-green-400 to-emerald-500 
                  w-full mt-3 p-3 rounded-lg font-semibold 
                  hover:scale-105 transition transform duration-200 shadow-md 
                  disabled:opacity-50"
                >
                  {loading ? "Thinking..." : "Ask"}
                </button>

                {/* CHAT AREA */}
                <div className="mt-4 space-y-3 max-h-64 overflow-y-auto pr-1">

                  {/* USER MESSAGE */}
                  {question && (
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white px-3 py-2 
                        rounded-lg max-w-[80%] text-sm shadow">
                        {question}
                      </div>
                    </div>
                  )}

                  {/* AI LOADING DOTS */}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 px-4 py-3 rounded-lg 
                        border border-white/10 flex gap-1">

                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce shadow-[0_0_8px_#60a5fa]"></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s] shadow-[0_0_8px_#60a5fa]"></span>
                        <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s] shadow-[0_0_8px_#60a5fa]"></span>

                      </div>
                    </div>
                  )}

                  {/* AI ANSWER */}
                  {answer && !loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-800 text-gray-200 px-3 py-2 
                        rounded-lg max-w-[80%] text-sm border border-white/10 shadow">
                        {answer}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            {/* RIGHT PANEL */}
            <div className="flex-1">

              {data?.charts?.line_chart && data?.charts?.pie_chart && (
                <>
                  {/* CARDS */}
                  <div className="grid grid-cols-3 gap-6 mb-6">

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-white p-4 rounded-xl shadow">
                      <p className="text-sm text-gray-400">Total Sales</p>

                      <h2 className="text-xl font-bold">
                        {formatINR(data?.insights?.total_sales || 0)}
                      </h2>

                      {/* 🔥 Dynamic subtitle */}
                      <p
                        className={`text-sm mt-1 ${
                          growth >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {growth
                          ? `${growth >= 0 ? "+" : ""}${growth}% from last month`
                          : "Revenue generated from sales"}
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-white p-4 rounded-xl shadow">
                      <p className="text-sm text-gray-400">Top Product</p>

                      <h2 className="text-xl font-bold">
                        {data?.insights?.top_product || "N/A"}
                      </h2>

                      <p className="text-purple-400 text-sm mt-1">
                        +{Math.floor(Math.random() * 30)}% popularity
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-white p-4 rounded-xl shadow">
                      <p className="text-sm text-gray-400">Peak Day</p>

                      <h2 className="text-xl font-bold">
                        {data?.insights?.peak_day || "N/A"}
                      </h2>

                      <p className="text-yellow-600 text-sm mt-1">
                        Most orders & revenue
                      </p>
                    </div>

                  </div>

                  {/* ROW 1 */}
                  <div className="grid grid-cols-3 gap-6 mb-6">

                    <div className="col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 text-white p-5 rounded-xl shadow">
                      <h3 className="text-gray-300">Sales Overview</h3>

                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>

                          <XAxis 
                            dataKey="date" 
                            stroke="#9ca3af" 
                            tick={{ fill: "#9ca3af", fontSize: 12 }} 
                          />
                          {/* ✅ UPDATED */}
                          <YAxis tickFormatter={formatShort} stroke="#aaa" />
                          <Tooltip content={<CustomTooltip />} />
                          <CartesianGrid stroke="rgba(255,255,255,0.1)" />

                          <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            fill="url(#blue)"
                            strokeWidth={3}
                            style={{
                              filter: "drop-shadow(0px 0px 8px #3b82f6)"
                            }}
                          />

                          <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#3b82f6"
                            strokeWidth={6}
                            fill="transparent"
                            opacity={0.2}
                            isAnimationActive={false}
                            dot={false}
                            activeDot={false}
                            legendType="none"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-white p-5 rounded-xl shadow">
                     <h3 className="text-gray-300"> Revenue Breakdown</h3>

                      <div className="flex items-center justify-between">

                          {/* LEFT: PIE */}
                          <div className="w-1/2">
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>

                                <Pie
                                  data={pieData}
                                  dataKey="value"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={80}
                                >
                                  {pieData.map((_, i) => (
                                    <Cell
                                      key={i}
                                      fill={COLORS[i % COLORS.length]}
                                      style={{
                                        filter: "drop-shadow(0px 0px 10px " + COLORS[i % COLORS.length] + ")"
                                      }}
                                    />
                                  ))}
                                </Pie>

                                {/* 🔥 ADD THIS LINE */}
                                <Tooltip
                                  formatter={(value, name, props) => [
                                    `₹ ${formatShort(value)}`,
                                    props.payload.name
                                  ]}
                                  contentStyle={{
                                    backgroundColor: "#111827",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "8px",
                                    color: "#fff"
                                  }}
                                />

                              </PieChart>
                            </ResponsiveContainer>
                          </div>

                          {/* RIGHT: LEGEND */}
                          <div className="w-1/2 space-y-2">
                            {pieData.map((item, i) => (
                              <div key={i} className="flex justify-between items-center text-sm">

                                <div className="flex items-center gap-2">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                  ></div>

                                  <span className="text-gray-300">{item.name}</span>
                                </div>

                                <span className="text-gray-400">{item.percent}%</span>
                              </div>
                            ))}
                          </div>

                        </div>
                    </div>

                  </div>

                  {/* ROW 2 */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 text-white p-5 rounded-xl shadow mb-6">
                    <h3 className="text-gray-300">Sales Forecast</h3>

                    {/* 🔥 LEGEND */}
                    <div className="flex gap-4 text-sm mb-2 text-gray-300">

                      <span className="flex items-center gap-1">
                        <span className="w-3 h-1 bg-blue-500"></span> Actual
                      </span>

                      <span className="flex items-center gap-1">
                        <span className="w-3 h-1 border border-blue-400 border-dashed"></span> Trend
                      </span>

                      <span className="flex items-center gap-1">
                        <span className="w-3 h-1 border border-orange-400 border-dashed"></span> Forecast
                      </span>

                    </div>

                    {/* 🔥 CHART */}
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={forecastData}>

                        <defs>
                          <linearGradient id="blueF" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>

                          <linearGradient id="orangeF" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                        </defs>

                        <XAxis 
                          dataKey="date" 
                          stroke="#9ca3af" 
                          tick={{ fill: "#9ca3af", fontSize: 12 }} 
                        />
                        <YAxis tickFormatter={formatShort} stroke="#aaa" />
                        <Tooltip content={<CustomTooltip />} />

                        <Area
                          dataKey="actual"
                          stroke="#3b82f6"
                          fill="url(#blueF)"
                          strokeWidth={3}
                          style={{ filter: "drop-shadow(0px 0px 8px #3b82f6)" }}
                        />

                        <Area
                          dataKey="trend"
                          stroke="#38bdf8"
                          strokeDasharray="5 5"
                          fill="transparent"
                          strokeWidth={2}
                          style={{ filter: "drop-shadow(0px 0px 6px #38bdf8)" }}
                        />

                        <Area
                          dataKey="forecast"
                          stroke="#f59e0b"
                          fill="url(#orangeF)"
                          strokeDasharray="5 5"
                          strokeWidth={3}
                          style={{ filter: "drop-shadow(0px 0px 10px #f59e0b)" }}
                        />

                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                </>
              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );  
}

export default Dashboard;