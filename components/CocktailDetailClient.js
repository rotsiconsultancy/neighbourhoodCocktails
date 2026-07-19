"use client";

import Link from "next/link";
import { useState } from "react";
import { FaCheck, FaLock, FaPlus } from "react-icons/fa";

export function CocktailDetailClient({ cocktail, related }) {
  const [activeImg, setActiveImg] = useState(0);
  const [inMenu, setInMenu] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return JSON.parse(sessionStorage.getItem("selected_cocktails") || "[]").includes(cocktail.name);
    } catch {
      return false;
    }
  });

  const isAlcoholic = cocktail.type === "alcoholic";
  const profileEntries = [
    { label: "Sweet", value: cocktail.profile?.sweet || 0 },
    { label: "Sour", value: cocktail.profile?.sour || 0 },
    { label: isAlcoholic ? "Smoky" : "Spicy", value: cocktail.profile?.smoky || 0 },
    { label: isAlcoholic ? "Strength" : "Freshness", value: isAlcoholic ? cocktail.profile?.strong || 0 : 4 },
  ];

  function toggleMenu() {
    try {
      const stored = JSON.parse(sessionStorage.getItem("selected_cocktails") || "[]");
      const updated = inMenu ? stored.filter((name) => name !== cocktail.name) : [...new Set([...stored, cocktail.name])];
      sessionStorage.setItem("selected_cocktails", JSON.stringify(updated));
    } finally {
      setInMenu((current) => !current);
    }
  }

  return (
    <main className="inner-page cocktail-detail-page">
      <section className="cocktail-detail-hero">
        <div className="cocktail-detail-hero-media">
          <img src={cocktail.images[activeImg]} alt={`${cocktail.name} - Image ${activeImg + 1}`} className="cocktail-detail-hero-img" />
          <div className="cocktail-detail-hero-img-overlay" />
          <div className="cocktail-thumb-strip">
            {cocktail.images.map((src, index) => (
              <button key={src} type="button" className={`cocktail-thumb ${index === activeImg ? "active" : ""}`} onClick={() => setActiveImg(index)} aria-label={`View image ${index + 1}`}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        </div>
        <div className="cocktail-detail-hero-content">
          <Link href="/cocktails" className="service-back-link">← All Cocktails</Link>
          <div className="cocktail-meta-badges">
            {(cocktail.tastingNotes || []).map((note) => <span key={note} className="tasting-note-badge">{note}</span>)}
            <span className={`cocktail-type-badge ${cocktail.type}`}>{isAlcoholic ? "Spirits" : "Zero-Proof"}</span>
          </div>
          <h1>{cocktail.name}</h1>
          <p className="cocktail-detail-tagline">{cocktail.tagline}</p>
          <button type="button" className={`btn-select-drink hero-size ${inMenu ? "added" : ""}`} onClick={toggleMenu}>
            {inMenu ? <><FaCheck /> Added to Event Menu</> : <><FaPlus /> Add to Event Menu</>}
          </button>
          {inMenu && <Link href="/booking" className="cocktail-lock-cta"><FaLock /> Lock Menu &amp; Request Quote →</Link>}
        </div>
      </section>

      <section className="section cocktail-details-section">
        <div className="cocktail-details-grid">
          <div className="cocktail-story-col">
            <span className="eyebrow">The Story</span>
            <h2>{cocktail.name}</h2>
            <p className="cocktail-full-description">{cocktail.longDescription}</p>
            <div className="cocktail-spec-row">
              {[{ label: "Method", value: cocktail.method }, { label: "Glass", value: cocktail.glass }, { label: "Garnish", value: cocktail.garnish }].map((item) => (
                <div className="cocktail-spec-item" key={item.label}><span className="spec-label">{item.label}</span><span className="spec-value">{item.value}</span></div>
              ))}
            </div>
          </div>
          <div className="cocktail-profile-col">
            <div className="cocktail-profile-card">
              <h3>Taste Profile</h3>
              {profileEntries.map(({ label, value }) => (
                <div key={label} className="flavor-row">
                  <span className="flavor-label">{label}</span>
                  <div className="flavor-progress-bar"><div className="bar-fill" style={{ width: `${value * 20}%` }} /></div>
                  <span className="flavor-val">{value}/5</span>
                </div>
              ))}
            </div>
            <div className="cocktail-ingredients-card"><h3>Key Ingredients</h3><ul className="ingredients-list">{(cocktail.ingredients || []).map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="cocktail-occasions-card"><h3>Best For</h3><div className="occasions-chips">{(cocktail.occasion || []).map((item) => <span key={item} className="occasion-chip">{item}</span>)}</div></div>
            <div className="cocktail-pairings-card"><h3>Pairs Well With</h3><div className="occasions-chips">{(cocktail.pairsWell || []).map((item) => <span key={item} className="occasion-chip pairing">{item}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section className="section cocktail-related-section">
        <div className="section-header center"><h2>More from the Menu</h2><p className="section-intro center-intro">Explore other handcrafted serves from The Neighbourhood.</p></div>
        <div className="cocktail-related-grid">
          {related.map((item) => (
            <Link key={item.id} href={`/cocktails/${item.id}`} className="cocktail-related-card">
              <div className="cocktail-related-img"><img src={item.images[0]} alt={item.name} /></div>
              <div className="cocktail-related-copy">
                <div className="cocktail-related-badges">{(item.tastingNotes || []).slice(0, 2).map((note) => <span key={note} className="tasting-note-badge sm">{note}</span>)}</div>
                <h3>{item.name}</h3><p>{item.description.slice(0, 80)}…</p><span className="service-related-arrow">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="service-cta-banner cocktail-cta-variant">
        <div className="service-cta-inner">
          <span className="eyebrow">Love what you see?</span><h2>Build Your Event Menu.</h2>
          <p>Select the cocktails you want, then lock your menu and request a personalised quote — all in one flow.</p>
          <div className="hero-actions" style={{ justifyContent: "center" }}><Link href="/cocktails" className="btn secondary">Browse our cocktail offerings</Link><Link href="/booking" className="btn">Request a Quote</Link></div>
        </div>
      </section>
    </main>
  );
}
