import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { products } from "../data/productData";
import "./CollectionsPage.css";

function CollectionsPage() {
  // State for active category filter
  const [activeCategory, setActiveCategory] = useState("all");
  // State for search term (set via navbar search)
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { key: "all",     label: "All" },
    { key: "shoes",   label: "Shoes" },
    { key: "watches", label: "Watches" },
    { key: "dresses", label: "Dresses" },
    { key: "bags",    label: "Bags" },
  ];

  // Filter products by category and search
  const filtered = products.filter((p) => {
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    const matchSearch =
      searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="collections-page">
      <Navbar onSearch={(term) => setSearchTerm(term)} />

      {/* Page Header */}
      <div className="collections-header">
        <p className="collections-subtitle">Curated For You</p>
        <h1 className="collections-title">Our Collections</h1>
        <div className="gold-divider" />
      </div>

      {/* Category Filter Bar */}
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat.key}
            className={`filter-btn ${activeCategory === cat.key ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search status */}
      {searchTerm && (
        <p className="search-status">
          Showing results for: <span>"{searchTerm}"</span>
          <button className="clear-search" onClick={() => setSearchTerm("")}>✕ Clear</button>
        </p>
      )}

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="products-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No products found.</p>
        </div>
      )}
    </div>
  );
}

export default CollectionsPage; 