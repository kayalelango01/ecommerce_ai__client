// ProductCard.jsx - Reusable product card for LUXE
import React, { useState } from "react";
import api from "../utils/api";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  // Format price in Indian Rupees
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);

  // Add to cart logic - tries API first, falls back to localStorage
  const handleAddToCart = async () => {
    // If product has multiple sizes, require selection
    if (product.sizes.length > 1 && !selectedSize) {
      alert("Please select a size first.");
      return;
    }

    const size = selectedSize || product.sizes[0] || '';

    try {
      const token = localStorage.getItem('luxe_token');
      if (token) {
        await api.post('/cart', {
          productId: product._id || product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          image: product.image,
          size: size,
          quantity: 1,
        });
        // Trigger custom event to update navbar cart count
        window.dispatchEvent(new Event("cartUpdated"));
        // Show feedback
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
        return;
      }
    } catch (error) {
      console.error('API cart error, falling back to localStorage:', error);
    }

    // Fallback to localStorage for unauthenticated users or API errors
    const cart = JSON.parse(localStorage.getItem("luxe_cart") || "[]");
    const productKey = product._id || product.id;

    // Check if same product + size already in cart
    const existingIndex = cart.findIndex(
      (item) => (item.productId === productKey || item.id === productKey) && item.size === size
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        productId: product._id || product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
        size: size,
        quantity: 1,
      });
    }

    localStorage.setItem("luxe_cart", JSON.stringify(cart));

    // Trigger custom event to update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));

    // Show feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-card">
      {/* Badges */}
      <div className="product-badges">
        {product.isNew && <span className="badge badge-new">New</span>}
        {product.onSale && (
          <span className="badge badge-sale">
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.stock <= 3 && (
          <div className="low-stock">Only {product.stock} left</div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <p className="product-brand">{product.brand}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        {/* Price */}
        <div className="product-price">
          <span className="current-price">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="original-price">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Size Selector (only if multiple sizes) */}
        {product.sizes.length > 1 && (
          <div className="size-selector">
            <p className="size-label">Size:</p>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "selected" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          className={`add-to-cart-btn ${added ? "added" : ""}`}
          onClick={handleAddToCart}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;