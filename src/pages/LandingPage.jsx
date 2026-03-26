// LandingPage.jsx - LUXE Homepage with fully working navbar
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Update cart count from localStorage
  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem("luxe_cart") || "[]");
      const total = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(total);
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  // Sign out handler
  const handleSignOut = () => {
    localStorage.removeItem("luxe_user");
    navigate("/login");
  };

  // Search handler - go to collections with search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate("/collections");
    }
    setShowSearch(false);
  };

  return (
    <div className="landing-page">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/landing")}>
          LUXE
        </div>

        {/* Nav Links - each navigates to its page */}
        <ul className="navbar-links">
          <li onClick={() => navigate("/collections")}>Collections</li>
          <li onClick={() => navigate("/new-in")}>New In</li>
          <li onClick={() => navigate("/sale")}>Sale</li>
          <li onClick={() => navigate("/designers")}>Designers</li>
          <li onClick={() => navigate("/about")}>About</li>
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

          {/* Cart with badge */}
          <div className="icon-btn cart-icon" onClick={() => navigate("/cart")} title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
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

        {/* Search Dropdown */}
        {showSearch && (
          <div className="search-bar-dropdown">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search shoes, watches, dresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <button type="submit">Search</button>
            </form>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">The New Collection</p>
          <h1 className="hero-title">LUXE</h1>
          <p className="hero-subtitle">
            Where the world's finest craftsmanship meets the art of living well.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/collections")}>
              Explore Collections
            </button>
            <button className="btn-secondary" onClick={() => navigate("/new-in")}>
              New Arrivals
            </button>
          </div>
        </div>
      </section>

      {/* ── CATEGORY TILES ── */}
      <section className="categories-section">
        <p className="section-eyebrow">Browse By</p>
        <h2 className="section-title">Shop Categories</h2>
        <div className="gold-divider" />
        <div className="categories-grid">
          <div className="category-tile" onClick={() => navigate("/collections")}>
            <div className="tile-overlay">
              <span>Shoes</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80"
              alt="Shoes"
            />
          </div>
          <div className="category-tile" onClick={() => navigate("/collections")}>
            <div className="tile-overlay">
              <span>Watches</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80"
              alt="Watches"
            />
          </div>
          <div className="category-tile" onClick={() => navigate("/collections")}>
            <div className="tile-overlay">
              <span>Dresses</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1566479179817-9a44dbf88b06?w=600&q=80"
              alt="Dresses"
            />
          </div>
          <div className="category-tile" onClick={() => navigate("/collections")}>
            <div className="tile-overlay">
              <span>Bags</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80"
              alt="Bags"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section className="features-strip">
        <div className="feature-item">
          <span className="feature-icon">✦</span>
          <span className="feature-text">Authenticity Guaranteed</span>
        </div>
        <div className="feature-divider" />
        <div className="feature-item">
          <span className="feature-icon">◈</span>
          <span className="feature-text">White Glove Delivery</span>
        </div>
        <div className="feature-divider" />
        <div className="feature-item">
          <span className="feature-icon">◇</span>
          <span className="feature-text">Exclusive Access</span>
        </div>
        <div className="feature-divider" />
        <div className="feature-item">
          <span className="feature-icon">⬡</span>
          <span className="feature-text">24/7 Concierge</span>
        </div>
      </section>

      {/* ── SALE BANNER ── */}
      <section className="sale-banner" onClick={() => navigate("/sale")}>
        <p className="sale-banner-tag">Limited Time</p>
        <h2 className="sale-banner-title">The LUXE Sale — Up to 40% Off</h2>
        <button className="btn-primary">Shop Sale</button>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-logo">LUXE</div>
        <p className="footer-tagline">The Art of Living Well</p>
        <div className="footer-links">
          <span onClick={() => navigate("/collections")}>Collections</span>
          <span onClick={() => navigate("/designers")}>Designers</span>
          <span onClick={() => navigate("/about")}>About</span>
          <span onClick={() => navigate("/cart")}>Cart</span>
        </div>
        <p className="footer-copy">© 2025 LUXE. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default LandingPage;