import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [loginError, setLoginError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1500));

    const savedData = JSON.parse(localStorage.getItem("signupData") || "{}");
    if (
      savedData.email === formData.email &&
      savedData.password === formData.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      setIsSubmitting(false);
      navigate("/landing");
    } else {
      setLoginError("Invalid email or password. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-root">
      {/* Animated Background */}
      <div className="login-bg">
        <div className="login-orb orb-a" />
        <div className="login-orb orb-b" />
        <div className="login-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{ "--i": i }} />
          ))}
        </div>
      </div>

      {/* Split Layout */}
      <div className="login-split">
        {/* Left Panel */}
        <div className="login-panel left-panel">
          <div className="left-inner">
            <div className="login-logo" onClick={() => navigate("/")}>
              <span className="logo-diamond">◈</span>
              <span className="logo-word">LUXE</span>
            </div>

            <div className="left-content">
              <h2 className="left-heading">Welcome<br />Back.</h2>
              <p className="left-text">
                Your curated world of premium fashion, accessories, and exclusive drops awaits.
              </p>
              <div className="left-stats">
                <div className="stat">
                  <span className="stat-num">50K+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <span className="stat-num">2M+</span>
                  <span className="stat-label">Customers</span>
                </div>
                <div className="stat-divider" />
                <div className="stat">
                  <span className="stat-num">4.9★</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>

            <div className="left-deco">
              <div className="deco-circle c1" />
              <div className="deco-circle c2" />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="login-panel right-panel">
          <div className="login-form-wrap">
            <div className="form-header">
              <h1 className="form-title">Sign In</h1>
              <p className="form-subtitle">Access your account to continue shopping</p>
            </div>

            {loginError && (
              <div className="login-error-banner">
                <span>⚠️</span>
                <span>{loginError}</span>
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className={`lfield-group ${focusedField === "email" ? "lfocused" : ""} ${errors.email ? "lhas-error" : ""}`}>
                <label className="lfield-label">Email Address</label>
                <div className="lfield-wrapper">
                  <span className="lfield-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField("")}
                    placeholder="your@email.com"
                    className="lfield-input"
                    autoComplete="email"
                  />
                </div>
                {errors.email && <span className="lfield-error">{errors.email}</span>}
              </div>

              {/* Password */}
              <div className={`lfield-group ${focusedField === "password" ? "lfocused" : ""} ${errors.password ? "lhas-error" : ""}`}>
                <label className="lfield-label">Password</label>
                <div className="lfield-wrapper">
                  <span className="lfield-icon">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField("")}
                    placeholder="Enter your password"
                    className="lfield-input"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="leye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <span className="lfield-error">{errors.password}</span>}
              </div>

              <div className="forgot-row">
                <button
                    type="button"
                    className="forgot-btn"
                    onClick={() => navigate("/signup")}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className={`lsubmit-btn ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="lloader">
                    <div className="lspinner" />
                    <span>Signing you in…</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </>
                )}
              </button>

              <div className="divider"><span>or</span></div>

              <div className="social-row">
                <button type="button" className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type="button" className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </form>

            <p className="signup-link">
              New to LUXE?{" "}
              <button className="llink-btn" onClick={() => navigate("/signup")}>
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

