import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaChartBar,
  FaUpload,
  FaCog,
  FaLightbulb
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const email = user.email || "guest";
  const username = email.split("@")[0];

  return (
    <div className="w-64 h-screen p-5 flex flex-col
      bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#020617]
      text-white border-r border-white/10 backdrop-blur-xl">

      {/* 🔥 PROFILE */}
      <div className="flex flex-col items-center mb-10">

        <div className="relative">
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${email}`}
            alt="user"
            className="w-16 h-16 rounded-full border-2 border-purple-500 
            shadow-[0_0_25px_rgba(168,85,247,0.7)] hover:scale-110 transition duration-300"
          />

          {/* glow ring */}
          <div className="absolute inset-0 rounded-full 
            border-2 border-purple-500 blur-md opacity-50"></div>
        </div>

        <h2 className="mt-3 text-lg font-semibold tracking-wide capitalize">
          {username}
        </h2>
      </div>

      {/* ⚡ MENU */}
      <ul className="flex flex-col gap-3 text-sm">

        {[
          { path: "/dashboard", icon: <FaChartBar />, label: "Dashboard" },
          { path: "/history", icon: <FaUpload />, label: "Upload History" },
          { path: "/insights", icon: <FaLightbulb />, label: "Insights" },
          { path: "/settings", icon: <FaCog />, label: "Settings" }
        ].map((item, i) => (
          <Link to={item.path} key={i}>
            <li
              className={`flex items-center gap-3 px-4 py-3 rounded-xl 
              transition-all duration-300 cursor-pointer group
              ${
                location.pathname === item.path
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
                  : "hover:bg-white/10"
              }`}
            >
              <span className="text-lg group-hover:scale-110 transition">
                {item.icon}
              </span>

              <span className="tracking-wide">{item.label}</span>

              {/* glow line */}
              <span className="ml-auto w-0 group-hover:w-2 h-2 bg-purple-400 rounded-full transition-all duration-300"></span>
            </li>
          </Link>
        ))}

      </ul>

      {/* 🚀 BOTTOM CARD */}
<div className="mt-auto pt-4 border-t border-white/10">

  <div className="flex items-center justify-center gap-2 
    text-xs text-gray-400 tracking-wide">

    <span className="opacity-70"> Powered by 🐍 </span>

    <span className="bg-gradient-to-r from-blue-400 to-purple-400 
      text-transparent bg-clip-text font-semibold">
      Python
    </span>

  </div>
</div>
</div>
  );
}

export default Sidebar;