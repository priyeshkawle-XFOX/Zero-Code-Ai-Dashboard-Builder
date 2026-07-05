import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FeaturePage from "./pages/FeaturePage";
import PricingPage from "./pages/PricingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Insights from "./pages/Insights";
import Settings from "./pages/Settings";

// 🔒 Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("currentUser");
  return user ? children : <AuthPage />;
};

function App() {
  const user = localStorage.getItem("currentUser");

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/features" element={<FeaturePage />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* AUTH */}
      <Route
        path="/auth"
        element={user ? <Dashboard /> : <AuthPage />}
      />

      {/* PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />

      <Route
        path="/insights"
        element={
          <ProtectedRoute>
            <Insights />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;