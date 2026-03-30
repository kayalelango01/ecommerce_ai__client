import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getSaleProducts } from "../data/productData";
import api from "../utils/api";
import "./SalePage.css";

function SalePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [saleProducts, setSaleProducts] = useState(getSaleProducts());

  // Fetch sale products from API on mount
  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const response = await api.get('/products?onSale=true');
        if (response.data.success && response.data.products.length > 0) {
          setSaleProducts(response.data.products);
        }
      } catch (error) {
        console.error('Failed to fetch sale products, using local data:', error);
        // fallback to imported local data already set in state
      }
    };
    fetchSaleProducts();
  }, []);

  const filtered = saleProducts.filter(
    (p) =>
      searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sale-page">
      <Navbar onSearch={(t) => setSearchTerm(t)} />

      {/* Hero Banner */}
      <div className="sale-hero">
        <p className="sale-tag">Limited Time</p>
        <h1 className="sale-title">The LUXE Sale</h1>
        <div className="gold-divider" />
        <p className="sale-desc">
          Exclusive reductions on hand-selected pieces. Luxury, now within reach.
        </p>
      </div>

      {/* Search status */}
      {searchTerm && (
        <p className="search-status">
          Results for: <span>"{searchTerm}"</span>
          <button className="clear-search" onClick={() => setSearchTerm("")}>✕ Clear</button>
        </p>
      )}

      {/* Sale Products */}
      {filtered.length > 0 ? (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results">No sale items match your search.</div>
      )}
    </div>
  );
}

export default SalePage;