import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./DesignersPage.css";

// Designer data with brand info
const designers = [
  {
    id: 1,
    name: "Maison Élite",
    origin: "Paris, France",
    specialty: "Footwear & Evening Wear",
    founded: "1987",
    description:
      "Founded in the heart of Paris, Maison Élite has redefined luxury footwear for over three decades. Known for their signature gold-tipped stilettos and hand-sewn velvet pieces, each creation is a testament to French craftsmanship.",
    products: ["Velvet Noir Heels", "Satin Mule Slides", "Onyx Cocktail Dress"],
    color: "#c9a84c",
  },
  {
    id: 2,
    name: "Horologium",
    origin: "Geneva, Switzerland",
    specialty: "Haute Horlogerie",
    founded: "1962",
    description:
      "Switzerland's most secretive watchmaker. Horologium produces fewer than 500 timepieces annually, each assembled by a single master watchmaker. Their tourbillons are coveted by collectors worldwide.",
    products: ["Chronos Gold Edition", "Midnight Tourbillon", "Noir Chain Clutch"],
    color: "#a0a0a0",
  },
  {
    id: 3,
    name: "Versailles Atelier",
    origin: "Versailles, France",
    specialty: "Couture Gowns",
    founded: "2001",
    description:
      "Inspired by the grandeur of Versailles, this atelier creates gowns fit for royalty. Each piece features hand-embroidered detailing and custom-dyed silks. Worn by celebrities on red carpets globally.",
    products: ["Noir Gala Gown", "Velvet Wrap Dress"],
    color: "#9b59b6",
  },
  {
    id: 4,
    name: "Aurelio",
    origin: "Florence, Italy",
    specialty: "Leather Goods & Footwear",
    founded: "1975",
    description:
      "Three generations of Florentine leather artisans. Aurelio is celebrated for hand-stitched Italian leather goods with 24-karat gold hardware. Every piece is made in their family-run workshop in the Oltrarno district.",
    products: ["Gold Strap Sandals", "Gold Tote Luxe"],
    color: "#e67e22",
  },
  {
    id: 5,
    name: "Lumière",
    origin: "Milan, Italy",
    specialty: "Jewellery & Watches",
    founded: "1993",
    description:
      "Where light meets luxury. Lumière is renowned for diamond-set timepieces and evening dresses that catch the light magnificently. Their signature diamond-set bezels are hand-placed by master gem-setters in Milan.",
    products: ["Rose Dusk Ladies Watch", "Golden Hour Midi"],
    color: "#f1c40f",
  },
  {
    id: 6,
    name: "Noir Atelier",
    origin: "London, England",
    specialty: "Men's Luxury & Timepieces",
    founded: "2009",
    description:
      "Born from London's avant-garde fashion scene, Noir Atelier combines British tailoring heritage with contemporary dark aesthetics. Their obsidian oxfords and stealth pilot chronographs have become icons of modern luxury.",
    products: ["Obsidian Oxford Shoes", "Stealth Pilot Chrono"],
    color: "#c9a84c",
  },
];

function DesignersPage() {
  const navigate = useNavigate();

  return (
    <div className="designers-page">
      <Navbar />

      {/* Header */}
      <div className="designers-header">
        <p className="designers-subtitle">World's Finest</p>
        <h1 className="designers-title">Our Designers</h1>
        <div className="gold-divider" />
        <p className="designers-desc">
          LUXE partners exclusively with the world's most prestigious houses — each selected for uncompromising standards of craft, heritage, and artistry.
        </p>
      </div>

      {/* Designers Grid */}
      <div className="designers-grid">
        {designers.map((designer) => (
          <div className="designer-card" key={designer.id}>
            {/* Accent line with brand color */}
            <div className="designer-accent" style={{ background: designer.color }} />

            <div className="designer-body">
              <div className="designer-meta">
                <span className="designer-origin">{designer.origin}</span>
                <span className="designer-year">Est. {designer.founded}</span>
              </div>

              <h2 className="designer-name">{designer.name}</h2>
              <p className="designer-specialty">{designer.specialty}</p>
              <p className="designer-description">{designer.description}</p>

              {/* Pieces available */}
              <div className="designer-pieces">
                <p className="pieces-label">Available at LUXE:</p>
                <ul className="pieces-list">
                  {designer.products.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>

              <button
                className="designer-btn"
                onClick={() => navigate("/collections")}
              >
                Shop This Designer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignersPage;