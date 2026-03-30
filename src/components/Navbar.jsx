// Navbar.jsx - Shared navbar for all LUXE pages
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../utils/api";
import "./Navbar.css";

function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Cart count from localStorage
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Update cart count whenever component mounts or storage changes
  useEffect(() => {
    const updateCartCount = async () => {
      try {
        const token = localStorage.getItem('luxe_token');
        if (token) {
          const response = await api.get('/cart');
          if (response.data.success) {
            const total = response.data.cart.items.reduce((sum, item) => sum + item.quantity, 0);
            setCartCount(total);
            return;
          }
        }
      } catch (error) {
        // Fallback to localStorage
      }
      const cart = JSON.parse(localStorage.getItem("luxe_cart") || "[]");
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount); // custom event
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // Active nav link check
  const isActive = (path) => location.pathname === path;

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchTerm);
    setShowSearch(false);
  };

  // Sign out - clear storage and go to login
  const handleSignOut = () => {
    localStorage.removeItem("luxe_token");
    localStorage.removeItem("luxe_user");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <div className="navbar-logo" onClick={() => navigate("/landing")}>
        LUXE
      </div>

      {/* Nav Links */}
      <ul className="navbar-links">
        <li
          className={isActive("/collections") ? "active" : ""}
          onClick={() => navigate("/collections")}
        >
          Collections
        </li>
        <li
          className={isActive("/new-in") ? "active" : ""}
          onClick={() => navigate("/new-in")}
        >
          New In
        </li>
        <li
          className={isActive("/sale") ? "active" : ""}
          onClick={() => navigate("/sale")}
        >
          Sale
        </li>
        <li
          className={isActive("/designers") ? "active" : ""}
          onClick={() => navigate("/designers")}
        >
          Designers
        </li>
        <li
          className={isActive("/about") ? "active" : ""}
          onClick={() => navigate("/about")}
        >
          About
        </li>
      </ul>

      {/* Right Icons */}
      <div className="navbar-icons">
        {/* Search */}
        <div className="icon-btn" onClick={() => setShowSearch(!showSearch)} title="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Cart */}
        <div className="icon-btn cart-icon" onClick={() => navigate("/cart")} title="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {/* Cart badge */}
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>

        {/* Sign Out */}
        <div className="icon-btn signout-btn" onClick={handleSignOut} title="Sign Out">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      {showSearch && (
        <div className="search-bar-dropdown">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for shoes, watches, dresses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
    </nav>
  );
}

export default Navbar;