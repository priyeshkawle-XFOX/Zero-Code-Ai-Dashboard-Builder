import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaUserPlus, FaSignOutAlt, FaTrash } from "react-icons/fa";

function Settings() {

  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  // 🔄 Load users from localStorage (CLEAN FORMAT)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users")) || [];

    // 🔥 convert old string users → object format
    const cleaned = stored.map((u) =>
      typeof u === "string" ? { email: u } : u
    );

    setUsers(cleaned);
    localStorage.setItem("users", JSON.stringify(cleaned));
  }, []);

  // ➕ Add User
  const handleAddUser = () => {
    if (!newUser.trim()) return;

    const updated = [...users, { email: newUser }]; // ✅ ALWAYS OBJECT

    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    setNewUser("");
  };

  // ❌ Delete User
  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
  };

  // 🚪 Logout
    const handleLogout = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // 🔥 Remove only that user's dashboard data
    if (currentUser?.email) {
        localStorage.removeItem(`dashboardData_${currentUser.email}`);
    }

    localStorage.removeItem("currentUser");
    localStorage.removeItem("csvData");

    window.location.href = "/auth";
    };

  return (
    <div className="flex min-h-screen text-white bg-black">

      <Sidebar />

      <div className="flex-1 p-10 space-y-8">

        {/* HEADER */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold">⚙️ Settings</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage users and account preferences
          </p>
        </div>

        {/* ADD USER */}
        <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/30 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaUserPlus /> Add User
          </h2>

          <div className="flex gap-3 mt-4">
            <input
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              placeholder="Enter email..."
              className="flex-1 p-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleAddUser}
              className="bg-gradient-to-r from-green-400 to-emerald-500 px-5 rounded-lg font-semibold hover:scale-105 transition"
            >
              Add
            </button>
          </div>

          {/* USER LIST */}
          <div className="mt-5 space-y-2">
            {users.length === 0 && (
              <p className="text-gray-400 text-sm">No users added</p>
            )}

            {users.map((u, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-black/40 px-4 py-2 rounded-lg border border-white/10"
              >
                <span>👤 {u.email}</span> {/* ✅ FIXED */}

                <button
                  onClick={() => handleDelete(i)}
                  className="text-red-400 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ACCOUNT */}
        <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FaSignOutAlt /> Account
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Logout will clear your session
          </p>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Settings;