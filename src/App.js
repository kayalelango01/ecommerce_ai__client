// App.js - LUXE Ecommerce - All Routes Configured
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ── Existing Pages (DO NOT change these files) ──
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LandingPage from "./pages/LandingPage";

// ── New Pages ──
import CollectionsPage from "./pages/CollectionsPage";
import NewInPage from "./pages/NewInPage";
import SalePage from "./pages/SalePage";
import DesignersPage from "./pages/DesignersPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || localStorage.getItem('luxe_token');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Default → go to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Main Pages - Protected */}
        <Route path="/landing" element={<ProtectedRoute><LandingPage /></ProtectedRoute>} />
        <Route path="/collections" element={<ProtectedRoute><CollectionsPage /></ProtectedRoute>} />
        <Route path="/new-in" element={<ProtectedRoute><NewInPage /></ProtectedRoute>} />
        <Route path="/sale" element={<ProtectedRoute><SalePage /></ProtectedRoute>} />
        <Route path="/designers" element={<ProtectedRoute><DesignersPage /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />

        {/* Catch unknown routes → back to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;




