import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-hidden relative">
        <Navbar />  
      {/* 🔷 Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-5 z-30 text-white">
        <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent transition duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(168,85,247,1)]">
        Zero Code AI Dashboard Builder
        </h1>

        <div className="flex gap-6 items-center">
          <button
        onClick={() => navigate("/")}
        className="relative text-white group transition duration-300 hover:text-purple-400"
        >
        Home
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#a855f7]"></span>
        </button>
        
           <button
        onClick={() => navigate("/features")}
        className="relative text-white group transition duration-300 hover:text-purple-400"
        >
        Features
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#a855f7]"></span>
       </button>
       
        <button
        onClick={() => navigate("/pricing")}
        className="relative text-white group transition duration-300 hover:text-purple-400"
        >
        Pricing
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-purple-400 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#a855f7]"></span>
        </button>

          <button
            onClick={() => navigate("/auth")}
            className="bg-purple-600 px-5 py-2 rounded-full shadow-md hover:bg-purple-700 transition"
            >
            Sign Up
            </button>
        </div>
      </nav>

      {/* 🚀 Hero Section */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-10">

        {/* 🎬 Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/landingpage-bg.mp4" type="video/mp4" />
        </video>

        {/* 🌑 Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

        {/* Left Content */}
        <div className="relative z-20 max-w-xl">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Turn Your Data into <span className="text-purple-400">AI Insights Instantly</span>
          </h1>

          <p className="mt-4 text-gray-200 text-lg">
            Upload your CSV file and get charts, insights, and predictions in seconds.
          </p>

          <button
            onClick={() => navigate("/auth")}
            className="mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-full shadow-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.9)]"
          >
            Get Started
          </button>
        </div>

        {/* Right Content */}
        <div className="relative z-20 hidden md:block">
          <div className="group relative w-[350px] h-[220px] rounded-xl overflow-hidden border border-white/20 shadow-xl transition duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.7)]">

        {/* 🌐 Online Dashboard Image */}
        <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Dashboard Preview"
            className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* 🌑 Overlay */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
            <p className="text-white text-lg font-semibold tracking-wide">
            </p>
        </div>

        </div>
        </div>

      </div>

      {/* ⭐ Steps Section */}
      <div className="absolute bottom-10 w-full text-center z-20 px-10">
        <h2 className="text-3xl font-bold text-gray-800">
          3 Simple Steps to Get Started
        </h2>

        <p className="text-gray-500 mt-2">
          Our powerful AI-driven analytics platform is simple and easy to use.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-white rounded-xl p-6 shadow-md transition duration-300 transform hover:-translate-y-3 hover:scale-105 hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)] hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50">
            <h3 className="text-xl font-semibold text-purple-600 transition duration-300 group-hover:text-purple-700">1. Upload CSV</h3>
            <p className="text-gray-500 mt-2">
              Easily upload your CSV data file to our platform
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md transition duration-300 transform hover:-translate-y-3 hover:scale-105 hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)] hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50">
            <h3 className="text-xl font-semibold text-purple-600 transition duration-300 group-hover:text-purple-700">2. Analyze Data</h3>
            <p className="text-gray-500 mt-2">
              Our AI processes the data to generate insights
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md transition duration-300 transform hover:-translate-y-3 hover:scale-105 hover:shadow-[0_10px_40px_rgba(168,85,247,0.4)] hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50">
            <h3 className="text-xl font-semibold text-purple-600 transition duration-300 group-hover:text-purple-700">3. Get Insights</h3>
            <p className="text-gray-500 mt-2">
              View charts, stats, and predictions instantly
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}