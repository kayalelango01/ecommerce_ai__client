import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getNewProducts } from "../data/productData";
import "./NewInPage.css";

function NewInPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const newProducts = getNewProducts();

  // Filter by search
  const filtered = newProducts.filter(
    (p) =>
      searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="newin-page">
      <Navbar onSearch={(t) => setSearchTerm(t)} />

      {/* Header */}
      <div className="newin-header">
        <p className="newin-subtitle">Just Arrived</p>
        <h1 className="newin-title">New In</h1>
        <div className="gold-divider" />
        <p className="newin-desc">
          The latest additions to LUXE — handpicked pieces from the world's finest houses.
        </p>
      </div>

      {/* Search status */}
      {searchTerm && (
        <p className="search-status">
          Results for: <span>"{searchTerm}"</span>
          <button className="clear-search" onClick={() => setSearchTerm("")}>✕ Clear</button>
        </p>
      )}

      {/* Products */}
      {filtered.length > 0 ? (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results">No new arrivals found.</div>
      )}
    </div>
  );
}

export default NewInPage;