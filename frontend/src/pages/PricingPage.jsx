import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Basic",
      monthly: "₹0",
      yearly: "₹0",
      features: ["Limited AI Queries", "Basic Dashboard", "Community Support"],
      highlight: false,
    },
    {
      name: "Pro",
      monthly: "₹499",
      yearly: "₹399",
      features: [
        "Unlimited AI Queries",
        "Advanced Dashboard",
        "Priority Support",
        "Resume Analyzer AI",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      monthly: "₹999",
      yearly: "₹799",
      features: [
        "Team Access",
        "Full Analytics",
        "24/7 Support",
        "Custom AI Models",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover z-[-1]"
      >
        <source src="/pricingpage-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-[-1]" />

      {/* Navbar */}
      <Navbar />

      {/* Heading */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold mb-4">Pricing Plans</h1>
        <p className="text-gray-300">Choose your perfect plan</p>
      </div>

      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="bg-white/10 backdrop-blur-lg p-2 rounded-full flex gap-2">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-5 py-2 rounded-full transition ${
              !isYearly ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-5 py-2 rounded-full transition ${
              isYearly ? "bg-blue-500" : "bg-transparent"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-10 px-6 md:px-20 pb-20">
        {plans.map((plan, index) => {
          const price = isYearly ? plan.yearly : plan.monthly;

          return (
            <div
              key={index}
              className="relative group rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            >
              {/* Glass Card */}
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-8 h-full border border-white/20 transition duration-300 group-hover:scale-105 group-hover:bg-white/20">
                
                {/* Badge */}
                {plan.highlight && (
                  <span className="absolute top-4 right-4 bg-blue-500 text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <h2 className="text-2xl font-semibold mb-2">
                  {plan.name}
                </h2>

                <p className="text-3xl font-bold mb-4">
                  {price}
                  <span className="text-sm text-gray-300">
                    /{isYearly ? "yr" : "mo"}
                  </span>
                </p>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-green-400">✔</span> {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-2 rounded-lg font-medium transition ${
                    plan.highlight
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}