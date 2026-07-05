import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
const features = [
  {
    title: "Smart Dashboard",
    desc: "Gain complete visibility into your business with a centralized dashboard designed for real-time performance tracking and intelligent insights.",
    extra:
      "The dashboard integrates multiple data sources into one unified interface, allowing you to visualize trends, track KPIs, and manage operations efficiently.",
    deep:
      "This feature simplifies complex workflows and enhances productivity with a clean and intuitive user experience, helping teams focus on growth.",
    overlay:
      "View live analytics, monitor performance metrics, and control your business from a single smart dashboard.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    title: "Sales Overview",
    desc: "Understand your business performance with detailed sales analytics and interactive visualizations.",
    extra:
      "Track revenue streams, monitor growth patterns, and compare performance across different time periods easily.",
    deep:
      "This feature transforms raw sales data into meaningful insights that help businesses optimize strategies and improve outcomes.",
    overlay:
      "Analyze revenue trends, identify top-performing products, and make data-driven decisions instantly.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
  },
  {
    title: "Sales Forecast",
    desc: "Leverage AI-powered forecasting to predict future trends and plan your business strategy effectively.",
    extra:
      "Our models analyze historical data to generate accurate predictions and help optimize planning.",
    deep:
      "With predictive analytics, businesses can reduce uncertainty, allocate resources efficiently, and stay ahead of competitors.",
    overlay:
      "Predict future growth, identify opportunities, and prepare your business with AI-driven forecasting.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
  },
  {
    title: "AI Assistant",
    desc: "Interact with your data using a smart AI assistant that understands natural language.",
    extra:
      "Ask questions, generate reports, and receive insights instantly without technical expertise.",
    deep:
      "This feature bridges the gap between users and complex data systems, making analytics accessible to everyone.",
    overlay:
      "Ask anything, get instant answers, and unlock powerful insights using AI assistance.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
];

export default function FeaturePage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="relative">
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-6">

      {/* Heading */}
      <div className="text-center mb-20" data-aos="fade-up">
        <h1 className="text-5xl font-bold mb-4">Powerful Features</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Experience next-generation analytics with AI-powered tools, interactive dashboards, 
          and intelligent automation designed to help your business grow faster and smarter.
        </p>
      </div>

      {/* Features */}
      <div className="space-y-28 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center gap-12 p-6 rounded-2xl transition duration-500 hover:scale-[1.02] hover:bg-white/5"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >

            {/* TEXT */}
            <div className="flex-1 group">

              <h2 className="text-3xl font-semibold mb-4 transition duration-300 group-hover:text-blue-400">
                {feature.title}
              </h2>

              <p className="text-gray-300 mb-4 leading-relaxed transition duration-300 group-hover:text-gray-200">
                {feature.desc}
              </p>

              <p className="text-gray-500 text-sm mb-4 leading-relaxed transition duration-300 group-hover:text-gray-300">
                {feature.extra}
              </p>

              <p className="text-gray-600 text-sm leading-relaxed transition duration-300 group-hover:text-gray-300">
                {feature.deep}
              </p>

            </div>

            {/* IMAGE */}
            <div className="flex-1 relative group">
              
              <div className="rounded-2xl overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500 rounded-2xl">
                <p className="text-center px-6 text-lg text-white">
                  {feature.overlay}
                </p>
              </div>

            </div>

          </div>
          
        ))}
      </div>

      {/* Bottom Section */}
      <div className="mt-32 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center" data-aos="fade-up">

        <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">⚡ Fast Performance</h3>
          <p className="text-gray-400 text-sm">
            Optimized architecture ensures smooth, fast, and lag-free experience across all devices.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">🔒 Secure Data</h3>
          <p className="text-gray-400 text-sm">
            Enterprise-grade security and encryption keep your business data safe and protected.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">🤖 AI Powered</h3>
          <p className="text-gray-400 text-sm">
            Advanced AI models deliver smart insights and automate complex processes effortlessly.
          </p>
        </div>

      </div>

    </div>
      </div>

  );
}