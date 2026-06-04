"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaCheck,
  FaTimes,
  FaLock,
} from "react-icons/fa";
import { cocktailsData } from "@/lib/data";

const vibesData = [
  { id: "all", label: "All Vibes" },
  { id: "sober", label: "So Sober (Wellness)" },
  { id: "high-energy", label: "High-Energy Party" },
  { id: "moody", label: "Moody & Intimate Lounge" },
  { id: "garden", label: "Garden & Floral Spritz" },
];

export function CocktailsShowcase() {
  const [isAlcoholic, setIsAlcoholic] = useState(true);
  const [activeVibe, setActiveVibe] = useState("all");
  const [selectedCocktails, setSelectedCocktails] = useState([]);
  const [carouselIndices, setCarouselIndices] = useState({});

  // Fetch initial selected cocktails from sessionStorage if any
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("selected_cocktails");
      if (stored) {
        try {
          setSelectedCocktails(JSON.parse(stored));
        } catch (e) {
          console.error("Error parsing stored cocktails", e);
        }
      }
    }
  }, []);

  // Update sessionStorage whenever selectedCocktails changes
  const updateSelectedCocktails = (newSelected) => {
    setSelectedCocktails(newSelected);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "selected_cocktails",
        JSON.stringify(newSelected)
      );
    }
  };

  const handleToggleCocktail = (name) => {
    if (selectedCocktails.includes(name)) {
      updateSelectedCocktails(selectedCocktails.filter((item) => item !== name));
    } else {
      updateSelectedCocktails([...selectedCocktails, name]);
    }
  };

  const handleClearMenu = () => {
    updateSelectedCocktails([]);
  };

  // Filter logic
  const filteredCocktails = cocktailsData.filter((cocktail) => {
    const matchesType =
      cocktail.type === (isAlcoholic ? "alcoholic" : "non-alcoholic");
    const matchesVibe =
      activeVibe === "all" || cocktail.vibes.includes(activeVibe);
    return matchesType && matchesVibe;
  });

  const handleVibeChange = (vibeId) => {
    setActiveVibe(vibeId);
    if (vibeId === "sober") {
      setIsAlcoholic(false);
    }
  };

  const handleToggleAlcohol = (value) => {
    setIsAlcoholic(value);
    if (value && activeVibe === "sober") {
      setActiveVibe("all");
    }
  };

  const handlePrevImage = (id, length, e) => {
    e.stopPropagation();
    setCarouselIndices((prev) => {
      const currentIndex = prev[id] || 0;
      const nextIndex = currentIndex === 0 ? length - 1 : currentIndex - 1;
      return { ...prev, [id]: nextIndex };
    });
  };

  const handleNextImage = (id, length, e) => {
    e.stopPropagation();
    setCarouselIndices((prev) => {
      const currentIndex = prev[id] || 0;
      const nextIndex = currentIndex === length - 1 ? 0 : currentIndex + 1;
      return { ...prev, [id]: nextIndex };
    });
  };

  return (
    <>
      {/* Page Hero */}
      <section className="section cocktails-section" id="cocktails">
        <div className="section-header cocktails-header">
          <div className="header-text-block">
            <span className="eyebrow">Interactive Menu</span>
            <h2>Crafted Cocktails for Every Crowd</h2>
            <p className="section-intro">
              From moody, slow-sipping mezcal creation to vibrant, botanically
              infused zero-proof mocktails, select the menu that fits your
              event's soul.
            </p>
          </div>

          {/* Tactile Fluid Toggle Switch */}
          <div
            className={`pretty-toggle-bar ${
              isAlcoholic ? "spirits-active" : "mocktails-active"
            }`}
          >
            <button
              type="button"
              className={`toggle-btn ${isAlcoholic ? "active" : ""}`}
              onClick={() => handleToggleAlcohol(true)}
            >
              Spirits &amp; Signatures
            </button>
            <button
              type="button"
              className={`toggle-btn ${!isAlcoholic ? "active" : ""}`}
              onClick={() => handleToggleAlcohol(false)}
            >
              Botanicals &amp; Zero-Proof
            </button>
            <div className="toggle-slider-bubble" />
          </div>
        </div>

        {/* Vibe Selection Chips */}
        <div className="vibe-container" aria-label="Filter by Event Vibe">
          {vibesData.map((vibe) => (
            <button
              key={vibe.id}
              type="button"
              className={`vibe-chip ${activeVibe === vibe.id ? "active" : ""}`}
              onClick={() => handleVibeChange(vibe.id)}
            >
              {vibe.label}
            </button>
          ))}
        </div>

        {/* Cocktail Grid */}
        <div className="cocktail-grid-showcase">
          {filteredCocktails.length === 0 ? (
            <div className="no-results">
              <p>No cocktails match this exact combination. Try another vibe filter!</p>
              <button
                className="btn"
                onClick={() => {
                  setActiveVibe("all");
                  setIsAlcoholic(!isAlcoholic);
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredCocktails.map((cocktail) => {
              const activeImgIndex = carouselIndices[cocktail.id] || 0;
              const isSelected = selectedCocktails.includes(cocktail.name);

              return (
                <article
                  key={cocktail.id}
                  className={`cocktail-card-premium ${isSelected ? "selected" : ""}`}
                >
                  {/* Image Carousel */}
                  <div className="cocktail-media-carousel">
                    <img
                      src={cocktail.images[activeImgIndex]}
                      alt={`${cocktail.name} - View ${activeImgIndex + 1}`}
                    />
                    {cocktail.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="carousel-arrow prev"
                          aria-label="Previous image"
                          onClick={(e) =>
                            handlePrevImage(cocktail.id, cocktail.images.length, e)
                          }
                        >
                          <FaChevronLeft />
                        </button>
                        <button
                          type="button"
                          className="carousel-arrow next"
                          aria-label="Next image"
                          onClick={(e) =>
                            handleNextImage(cocktail.id, cocktail.images.length, e)
                          }
                        >
                          <FaChevronRight />
                        </button>
                        <div className="carousel-dots">
                          {cocktail.images.map((_, idx) => (
                            <span
                              key={idx}
                              className={`carousel-dot ${
                                idx === activeImgIndex ? "active" : ""
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="cocktail-card-body-premium">
                    <div className="tasting-notes-row">
                      {cocktail.tastingNotes.map((note) => (
                        <span key={note} className="tasting-note-badge">
                          {note}
                        </span>
                      ))}
                    </div>

                    <h3>
                      <Link href={`/cocktails/${cocktail.id}`}>
                        {cocktail.name}
                      </Link>
                    </h3>
                    <p className="cocktail-desc">{cocktail.description}</p>

                    <div className="ingredients-block">
                      <strong>Key ingredients:</strong>
                      <p>{cocktail.ingredients.join(", ")}</p>
                    </div>

                    {/* Taste Profile Bars */}
                    <div className="taste-profile-block">
                      <div className="flavor-row">
                        <span>Sweet</span>
                        <div className="flavor-progress-bar">
                          <div
                            className="bar-fill"
                            style={{ width: `${cocktail.profile.sweet * 20}%` }}
                          />
                        </div>
                      </div>
                      <div className="flavor-row">
                        <span>Sour</span>
                        <div className="flavor-progress-bar">
                          <div
                            className="bar-fill"
                            style={{ width: `${cocktail.profile.sour * 20}%` }}
                          />
                        </div>
                      </div>
                      {isAlcoholic ? (
                        <div className="flavor-row">
                          <span>Smoky</span>
                          <div className="flavor-progress-bar">
                            <div
                              className="bar-fill"
                              style={{
                                width: `${cocktail.profile.smoky * 20}%`,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flavor-row">
                          <span>Spicy</span>
                          <div className="flavor-progress-bar">
                            <div
                              className="bar-fill"
                              style={{
                                width: `${cocktail.profile.smoky * 20}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="flavor-row">
                        <span>{isAlcoholic ? "Strength" : "Freshness"}</span>
                        <div className="flavor-progress-bar">
                          <div
                            className="bar-fill"
                            style={{
                              width: `${
                                (isAlcoholic ? cocktail.profile.strong : 4) * 20
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="cocktail-card-actions">
                      <button
                        type="button"
                        className={`btn-select-drink ${isSelected ? "added" : ""}`}
                        onClick={() => handleToggleCocktail(cocktail.name)}
                      >
                        {isSelected ? (
                          <>
                            <FaCheck /> Added
                          </>
                        ) : (
                          <>
                            <FaPlus /> Add to Menu
                          </>
                        )}
                      </button>
                      <Link
                        href={`/cocktails/${cocktail.id}`}
                        className="btn-view-cocktail"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Floating Menu Builder Widget */}
        {selectedCocktails.length > 0 && (
          <div className="menu-builder-panel">
            <div className="menu-builder-content">
              <div className="panel-header">
                <h3>My Selected Event Menu</h3>
                <span className="badge-count">{selectedCocktails.length}</span>
              </div>
              <ul className="selected-drinks-list">
                {selectedCocktails.map((name) => (
                  <li key={name}>
                    <span>{name}</span>
                    <button
                      type="button"
                      className="btn-remove-drink"
                      aria-label={`Remove ${name}`}
                      onClick={() => handleToggleCocktail(name)}
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="panel-actions">
                <button
                  type="button"
                  className="btn-clear"
                  onClick={handleClearMenu}
                >
                  Clear
                </button>
                <a href="/booking" className="btn-book-with-menu">
                  <FaLock /> Lock Menu &amp; Request Quote
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
