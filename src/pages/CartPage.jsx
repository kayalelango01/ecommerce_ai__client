import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Format price in INR
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  // Load cart from API or localStorage on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('luxe_token');
        if (token) {
          const response = await api.get('/cart');
          if (response.data.success) {
            setCartItems(response.data.cart.items);
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch cart from API:', error);
      }
      // Fallback to localStorage
      const stored = JSON.parse(localStorage.getItem("luxe_cart") || "[]");
      setCartItems(stored);
    };
    fetchCart();
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = (updatedCart) => {
    localStorage.setItem("luxe_cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Increase quantity
  const increaseQty = async (index) => {
    const item = cartItems[index];
    const newQty = item.quantity + 1;
    
    try {
      const token = localStorage.getItem('luxe_token');
      if (token && item._id) {
        await api.put(`/cart/${item._id}`, { quantity: newQty });
        const updated = [...cartItems];
        updated[index].quantity = newQty;
        setCartItems(updated);
        return;
      }
    } catch (error) {
      console.error('Failed to update quantity via API:', error);
    }
    
    // Fallback to localStorage
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    saveCart(updated);
  };

  // Decrease quantity (remove if goes to 0)
  const decreaseQty = async (index) => {
    const item = cartItems[index];
    
    if (item.quantity <= 1) {
      await removeItem(index);
      return;
    }
    
    const newQty = item.quantity - 1;
    
    try {
      const token = localStorage.getItem('luxe_token');
      if (token && item._id) {
        await api.put(`/cart/${item._id}`, { quantity: newQty });
        const updated = [...cartItems];
        updated[index].quantity = newQty;
        setCartItems(updated);
        return;
      }
    } catch (error) {
      console.error('Failed to update quantity via API:', error);
    }
    
    // Fallback to localStorage
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    saveCart(updated);
  };

  // Remove item completely
  const removeItem = async (index) => {
    const item = cartItems[index];
    
    try {
      const token = localStorage.getItem('luxe_token');
      if (token && item._id) {
        await api.delete(`/cart/${item._id}`);
        const updated = [...cartItems];
        updated.splice(index, 1);
        setCartItems(updated);
        return;
      }
    } catch (error) {
      console.error('Failed to remove item via API:', error);
    }
    
    // Fallback to localStorage
    const updated = [...cartItems];
    updated.splice(index, 1);
    saveCart(updated);
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      const token = localStorage.getItem('luxe_token');
      if (token) {
        await api.delete('/cart');
        setCartItems([]);
        return;
      }
    } catch (error) {
      console.error('Failed to clear cart via API:', error);
    }
    
    // Fallback to localStorage
    saveCart([]);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal < 10000 ? 500 : 0; // Free shipping above ₹10,000
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
              <div className="cart-item" key={item._id || item.productId || item.id || index}>
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