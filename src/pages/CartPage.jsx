import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Format price in INR
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("luxe_cart") || "[]");
    setCartItems(stored);
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = (updatedCart) => {
    localStorage.setItem("luxe_cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase quantity
  const increaseQty = (index) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    saveCart(updated);
  };

  // Decrease quantity (remove if goes to 0)
  const decreaseQty = (index) => {
    const updated = [...cartItems];
    if (updated[index].quantity <= 1) {
      updated.splice(index, 1);
    } else {
      updated[index].quantity -= 1;
    }
    saveCart(updated);
  };

  // Remove item completely
  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    saveCart(updated);
  };

  // Clear entire cart
  const clearCart = () => {
    saveCart([]);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 500; // Free shipping above ₹10,000
  const total = subtotal + shipping;

  return (
    <div className="cart-page">
      <Navbar />

      {/* Header */}
      <div className="cart-header">
        <p className="cart-subtitle">Your Selection</p>
        <h1 className="cart-title">Shopping Bag</h1>
        <div className="gold-divider" />
      </div>

      {cartItems.length === 0 ? (
        /* Empty cart state */
        <div className="cart-empty">
          <div className="empty-icon">◻</div>
          <h2>Your bag is empty</h2>
          <p>Discover our curated collections and add pieces you love.</p>
          <button className="continue-btn" onClick={() => navigate("/collections")}>
            Explore Collections
          </button>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {/* Header row */}
            <div className="cart-items-header">
              <span>Product</span>
              <span>Size</span>
              <span>Qty</span>
              <span>Price</span>
              <span></span>
            </div>

            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                {/* Image */}
                <div className="item-image-wrap">
                  <img src={item.image} alt={item.name} className="item-image" />
                </div>

                {/* Name & Brand */}
                <div className="item-info">
                  <p className="item-brand">{item.brand}</p>
                  <p className="item-name">{item.name}</p>
                </div>

                {/* Size */}
                <div className="item-size">{item.size}</div>

                {/* Quantity controls */}
                <div className="item-qty">
                  <button className="qty-btn" onClick={() => decreaseQty(index)}>−</button>
                  <span>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increaseQty(index)}>+</button>
                </div>

                {/* Price */}
                <div className="item-price">{formatPrice(item.price * item.quantity)}</div>

                {/* Remove */}
                <button className="remove-btn" onClick={() => removeItem(index)}>✕</button>
              </div>
            ))}

            {/* Clear cart */}
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Bag
            </button>
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="gold-divider-left" />

            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="shipping-note">
                Free shipping on orders above ₹10,000
              </p>
            )}
            <div className="summary-divider" />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

            <button className="continue-shopping" onClick={() => navigate("/collections")}>
              ← Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;