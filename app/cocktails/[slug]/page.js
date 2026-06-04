"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Link from "next/link";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { cocktailsData } from "@/lib/data";
import { FaCheck, FaPlus, FaLock } from "react-icons/fa";

function CocktailDetailClient({ cocktail, related }) {
  const [activeImg, setActiveImg] = useState(0);
  const [inMenu, setInMenu] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const stored = JSON.parse(sessionStorage.getItem("selected_cocktails") || "[]");
      return stored.includes(cocktail.name);
    } catch {
      return false;
    }
  });

  const isAlcoholic = cocktail.type === "alcoholic";

  const profileEntries = [
    { label: "Sweet", value: cocktail.profile.sweet },
    { label: "Sour", value: cocktail.profile.sour },
    { label: isAlcoholic ? "Smoky" : "Spicy", value: cocktail.profile.smoky },
    { label: isAlcoholic ? "Strength" : "Freshness", value: isAlcoholic ? cocktail.profile.strong : 4 },
  ];

  const handleToggleMenu = () => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(sessionStorage.getItem("selected_cocktails") || "[]");
      let updated;
      if (inMenu) {
        updated = stored.filter((n) => n !== cocktail.name);
      } else {
        updated = [...stored, cocktail.name];
      }
      sessionStorage.setItem("selected_cocktails", JSON.stringify(updated));
      setInMenu(!inMenu);
    } catch {
      setInMenu(!inMenu);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="inner-page cocktail-detail-page">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section className="cocktail-detail-hero">
          <div className="cocktail-detail-hero-media">
            <img
              src={cocktail.images[activeImg]}
              alt={`${cocktail.name} - Image ${activeImg + 1}`}
              className="cocktail-detail-hero-img"
            />
            <div className="cocktail-detail-hero-img-overlay" />

            {/* Thumbnail strip */}
            <div className="cocktail-thumb-strip">
              {cocktail.images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  className={`cocktail-thumb ${i === activeImg ? "active" : ""}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="cocktail-detail-hero-content">
            <Link href="/cocktails" className="service-back-link">
              ← All Cocktails
            </Link>
            <div className="cocktail-meta-badges">
              {cocktail.tastingNotes.map((note) => (
                <span key={note} className="tasting-note-badge">{note}</span>
              ))}
              <span className={`cocktail-type-badge ${cocktail.type}`}>
                {cocktail.type === "alcoholic" ? "Spirits" : "Zero-Proof"}
              </span>
            </div>
            <h1>{cocktail.name}</h1>
            <p className="cocktail-detail-tagline">{cocktail.tagline}</p>

            <button
              type="button"
              className={`btn-select-drink hero-size ${inMenu ? "added" : ""}`}
              onClick={handleToggleMenu}
            >
              {inMenu ? (
                <><FaCheck /> Added to Event Menu</>
              ) : (
                <><FaPlus /> Add to Event Menu</>
              )}
            </button>

            {inMenu && (
              <Link href="/booking" className="cocktail-lock-cta">
                <FaLock /> Lock Menu &amp; Request Quote →
              </Link>
            )}
          </div>
        </section>

        {/* ── Details Grid ─────────────────────────────────────────── */}
        <section className="section cocktail-details-section">
          <div className="cocktail-details-grid">

            {/* Left: Story */}
            <div className="cocktail-story-col">
              <span className="eyebrow">The Story</span>
              <h2>{cocktail.name}</h2>
              <p className="cocktail-full-description">{cocktail.longDescription}</p>

              <div className="cocktail-spec-row">
                <div className="cocktail-spec-item">
                  <span className="spec-label">Method</span>
                  <span className="spec-value">{cocktail.method}</span>
                </div>
                <div className="cocktail-spec-item">
                  <span className="spec-label">Glass</span>
                  <span className="spec-value">{cocktail.glass}</span>
                </div>
                <div className="cocktail-spec-item">
                  <span className="spec-label">Garnish</span>
                  <span className="spec-value">{cocktail.garnish}</span>
                </div>
              </div>
            </div>

            {/* Right: Profile + Ingredients */}
            <div className="cocktail-profile-col">

              {/* Taste Profile */}
              <div className="cocktail-profile-card">
                <h3>Taste Profile</h3>
                {profileEntries.map(({ label, value }) => (
                  <div key={label} className="flavor-row">
                    <span className="flavor-label">{label}</span>
                    <div className="flavor-progress-bar">
                      <div
                        className="bar-fill"
                        style={{ width: `${value * 20}%` }}
                      />
                    </div>
                    <span className="flavor-val">{value}/5</span>
                  </div>
                ))}
              </div>

              {/* Ingredients */}
              <div className="cocktail-ingredients-card">
                <h3>Key Ingredients</h3>
                <ul className="ingredients-list">
                  {cocktail.ingredients.map((ing) => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div className="cocktail-occasions-card">
                <h3>Best For</h3>
                <div className="occasions-chips">
                  {cocktail.occasion.map((occ) => (
                    <span key={occ} className="occasion-chip">{occ}</span>
                  ))}
                </div>
              </div>

              {/* Pairs Well With */}
              <div className="cocktail-pairings-card">
                <h3>Pairs Well With</h3>
                <div className="occasions-chips">
                  {cocktail.pairsWell.map((item) => (
                    <span key={item} className="occasion-chip pairing">{item}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Related Cocktails ─────────────────────────────────────── */}
        <section className="section cocktail-related-section">
          <div className="section-header center">
            <h2>More from the Menu</h2>
            <p className="section-intro center-intro">
              Explore other handcrafted serves from The Neighbourhood.
            </p>
          </div>
          <div className="cocktail-related-grid">
            {related.map((c) => (
              <Link key={c.id} href={`/cocktails/${c.id}`} className="cocktail-related-card">
                <div className="cocktail-related-img">
                  <img src={c.images[0]} alt={c.name} />
                </div>
                <div className="cocktail-related-copy">
                  <div className="cocktail-related-badges">
                    {c.tastingNotes.slice(0, 2).map((n) => (
                      <span key={n} className="tasting-note-badge sm">{n}</span>
                    ))}
                  </div>
                  <h3>{c.name}</h3>
                  <p>{c.description.slice(0, 80)}…</p>
                  <span className="service-related-arrow">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────── */}
        <section className="service-cta-banner cocktail-cta-variant">
          <div className="service-cta-inner">
            <span className="eyebrow">Love what you see?</span>
            <h2>Build Your Event Menu.</h2>
            <p>
              Select the cocktails you want, then lock your menu and request a
              personalised quote — all in one flow.
            </p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <Link href="/cocktails" className="btn secondary">
                Browse our cocktail offerings
              </Link>
              <Link href="/booking" className="btn">
                Request a Quote
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}

export default function CocktailDetailPage({ params }) {
  const { slug } = use(params);
  const cocktail = cocktailsData.find((c) => c.id === slug);
  if (!cocktail) notFound();

  const related = cocktailsData
    .filter((c) => c.id !== slug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return <CocktailDetailClient cocktail={cocktail} related={related} />;
}
