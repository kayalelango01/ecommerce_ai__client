import React from "react";
import Navbar from "../components/Navbar";
import "./AboutPage.css";

// Feature items for the brand
const features = [
  {
    icon: "✦",
    title: "Curated Luxury",
    description:
      "Every piece on LUXE is hand-selected by our team of luxury editors. We partner only with heritage maisons and emerging designers who share our obsession with quality.",
  },
  {
    icon: "◈",
    title: "Authenticity Guaranteed",
    description:
      "Every product sold on LUXE comes with a Certificate of Authenticity. Our team verifies each item before it reaches your door.",
  },
  {
    icon: "◇",
    title: "White Glove Delivery",
    description:
      "Your order arrives in our signature black and gold packaging, handled with care from our vault to your home.",
  },
  {
    icon: "⬡",
    title: "Exclusive Access",
    description:
      "LUXE members enjoy first access to limited releases, private sales, and invitations to designer events worldwide.",
  },
  {
    icon: "◉",
    title: "Sustainable Luxury",
    description:
      "We champion timeless pieces over fast fashion. Every LUXE purchase supports artisan communities and sustainable production practices.",
  },
  {
    icon: "⬢",
    title: "Concierge Service",
    description:
      "Our luxury concierge team is available 24/7 to assist with personal shopping, gifting, and bespoke requests.",
  },
];

// Team / values section
const values = [
  { number: "200+", label: "Designer Brands" },
  { number: "50K+", label: "Happy Clients" },
  { number: "14", label: "Countries Served" },
  { number: "10+", label: "Years of Luxury" },
];

function AboutPage() {
  return (
    <div className="about-page">
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <p className="about-eyebrow">Our Story</p>
        <h1 className="about-title">The House of LUXE</h1>
        <div className="gold-divider" />
        <p className="about-tagline">
          Where the world's finest craftsmanship meets the art of living well.
        </p>
      </section>

      {/* Brand Story */}
      <section className="about-story">
        <div className="story-text">
          <h2 className="story-heading">A Vision Born from Passion</h2>
          <p>
            LUXE was founded on a singular belief: that true luxury is not merely about price — it is about provenance, permanence, and pride of ownership.
          </p>
          <p>
            We set out to create a destination where discerning individuals could discover the world's most extraordinary pieces — from Swiss-made tourbillons to Parisian couture gowns — without compromise. Every item in our collection is chosen not because it is expensive, but because it is exceptional.
          </p>
          <p>
            Our editors travel to the world's fashion capitals — Paris, Milan, London, Geneva — to source pieces that tell a story. When you wear LUXE, you wear history.
          </p>
        </div>
        <div className="story-quote">
          <blockquote>
            "Luxury is not about buying expensive things; it's about living in a space that is free of clutter and full of beauty."
          </blockquote>
          <cite>— The LUXE Manifesto</cite>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        {values.map((v) => (
          <div className="stat-item" key={v.label}>
            <span className="stat-number">{v.number}</span>
            <span className="stat-label">{v.label}</span>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="about-features">
        <p className="features-eyebrow">Why Choose LUXE</p>
        <h2 className="features-heading">The LUXE Difference</h2>
        <div className="gold-divider" />
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="about-cta">
        <p className="cta-eyebrow">Get In Touch</p>
        <h2 className="cta-heading">Experience LUXE</h2>
        <p className="cta-desc">
          For personal shopping, press enquiries, or partnership opportunities, our team is at your service.
        </p>
        <div className="cta-contacts">
          <div className="contact-item">
            <span className="contact-label">Email</span>
            <span className="contact-value">concierge@luxe.com</span>
          </div>
          <div className="contact-divider" />
          <div className="contact-item">
            <span className="contact-label">Phone</span>
            <span className="contact-value">+91 98765 43210</span>
          </div>
          <div className="contact-divider" />
          <div className="contact-item">
            <span className="contact-label">Location</span>
            <span className="contact-value">Chennai · Mumbai · Delhi</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;