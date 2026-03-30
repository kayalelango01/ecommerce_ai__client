import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Enter a valid 10-digit phone number";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      console.log('Attempting signup...', { name, email, phoneNumber });
      const response = await api.post('/auth/signup', {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      });
      console.log('Signup response:', response.data);
      localStorage.setItem('luxe_token', response.data.token);
      localStorage.setItem('luxe_user', JSON.stringify(response.data.user));
      localStorage.setItem('isLoggedIn', 'true');
      setIsSubmitting(false);
      navigate("/login");
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      setIsSubmitting(false);
      setErrors({ 
        submit: error.response?.data?.message || error.message || 'Signup failed. Please try again.' 
      });
    }
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text", icon: "👤", placeholder: "John Doe" },
    { name: "email", label: "Email Address", type: "email", icon: "✉️", placeholder: "john@example.com" },
    { name: "phoneNumber", label: "Phone Number", type: "tel", icon: "📱", placeholder: "9876543210" },
  ];

  return (
    <div className="signup-root">
      <div className="signup-bg">
        <div className="signup-orb orb1" />
        <div className="signup-orb orb2" />
        <div className="signup-orb orb3" />
        <div className="signup-grid" />
      </div>

      <div className="signup-container">
        <div className="signup-brand">
          <div className="signup-logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">LUXE</span>
          </div>
          <p className="signup-tagline">Premium Shopping Experience</p>
        </div>

        <div className="signup-card">
          <div className="card-header">
            <h1 className="card-title">Create Account</h1>
            <p className="card-subtitle">Join thousands of satisfied customers</p>
          </div>

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            {errors.submit && (
              <div className="submit-error-banner">
                <span>⚠️</span>
                <span>{errors.submit}</span>
              </div>
            )}
            {fields.map(({ name, label, type, icon, placeholder }) => (
              <div
                key={name}
                className={`field-group ${focusedField === name ? "focused" : ""} ${errors[name] ? "has-error" : ""} ${formData[name] ? "has-value" : ""}`}
              >
                <label className="field-label">{label}</label>
                <div className="field-wrapper">
                  <span className="field-icon">{icon}</span>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField("")}
                    placeholder={placeholder}
                    className="field-input"
                  />
                  <span className="field-line" />
                </div>
                {errors[name] && <span className="field-error">{errors[name]}</span>}
              </div>
            ))}

            {/* Password */}
            <div className={`field-group ${focusedField === "password" ? "focused" : ""} ${errors.password ? "has-error" : ""} ${formData.password ? "has-value" : ""}`}>
              <label className="field-label">Password</label>
              <div className="field-wrapper">
                <span className="field-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Min. 8 characters"
                  className="field-input"
                />
                <button type="button" className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"}
                </button>
                <span className="field-line" />
              </div>
              {errors.password && <span className="field-error">{errors.password}</span>}
              {formData.password && (
                <div className="password-strength">
                  <div className={`strength-bar ${formData.password.length >= 12 ? "strong" : formData.password.length >= 8 ? "medium" : "weak"}`} />
                  <span className="strength-label">
                    {formData.password.length >= 12 ? "Strong" : formData.password.length >= 8 ? "Medium" : "Weak"}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className={`field-group ${focusedField === "confirmPassword" ? "focused" : ""} ${errors.confirmPassword ? "has-error" : ""} ${formData.confirmPassword ? "has-value" : ""}`}>
              <label className="field-label">Confirm Password</label>
              <div className="field-wrapper">
                <span className="field-icon">🔐</span>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField("")}
                  placeholder="Re-enter password"
                  className="field-input"
                />
                <button type="button" className="toggle-eye" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "🙈" : "👁️"}
                </button>
                <span className="field-line" />
              </div>
              {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className={`submit-btn ${isSubmitting ? "loading" : ""}`} disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="btn-loader">
                  <span className="dot" /><span className="dot" /><span className="dot" />
                </span>
              ) : (
                <>
                  <span>Create Account</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          <p className="login-redirect">
            Already have an account?{" "}
            <button className="link-btn" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;