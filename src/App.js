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

function App() {
  return (
    <Router>
      <Routes>
        {/* Default → go to Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Main Pages */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/new-in" element={<NewInPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/designers" element={<DesignersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* Catch unknown routes → back to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;




