import React, { useState } from "react";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 SIGNUP
  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email.toLowerCase());
    if (exists) {
      alert("User already exists!");
      return;
    }

    users.push({ email: email.toLowerCase(), password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    setIsLogin(true);
  };

  // 🔓 LOGIN
  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (!user) {
      alert("Invalid credentials!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.removeItem(`dashboardData_${user.email}`);

    window.location.href = "/dashboard";
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* 🎥 BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="registerpage-bg.mp4" type="video/mp4" />
      </video>

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/70 backdrop-blur-sm"></div>

      {/* 🔐 AUTH BOX */}
      <div className="relative flex h-full items-center justify-center text-white">

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-96 border border-white/20 shadow-2xl">

          <h2 className="text-3xl mb-6 font-semibold text-center">
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-black/40 border border-white/20 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-black/40 border border-white/20 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={isLogin ? handleLogin : handleSignup}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 rounded-lg font-semibold hover:scale-105 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>

          <p
            className="mt-5 text-sm text-center cursor-pointer text-gray-300 hover:text-white transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Create account"
              : "Already have account?"}
          </p>

        </div>

      </div>
    </div>
  );
}

export default AuthPage;