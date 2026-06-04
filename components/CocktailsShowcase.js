"use client";

import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus, FaCheck, FaTimes, FaLock } from "react-icons/fa";

const cocktailsData = [
  {
    id: "smoked-mezcalita",
    name: "Smoked Mezcalita",
    type: "alcoholic",
    vibes: ["moody", "high-energy"],
    description: "A rich, smoky twist on the classic margarita. Crafted with artisanal mezcal, fresh lime juice, organic agave nectar, and finished with a wild hibiscus salt rim.",
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
    ],
    tastingNotes: ["Smoky", "Citrusy", "Bold"],
    ingredients: ["Artisanal Mezcal", "Fresh Lime Juice", "Agave Nectar", "Hibiscus Salt Rim"],
    profile: { sweet: 2, sour: 4, smoky: 5, strong: 4 }
  },
  {
    id: "rosemary-gin-spritz",
    name: "Rosemary Gin Spritz",
    type: "alcoholic",
    vibes: ["garden", "floral"],
    description: "Crisp and herbaceous. Premium dry gin combined with house-infused wild rosemary syrup, freshly squeezed lemon juice, topped with sparkling tonic and a charred rosemary sprig.",
    images: [
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80"
    ],
    tastingNotes: ["Herbaceous", "Crisp", "Botanical"],
    ingredients: ["London Dry Gin", "Wild Rosemary Syrup", "Fresh Lemon", "Premium Tonic", "Charred Rosemary"],
    profile: { sweet: 3, sour: 3, smoky: 1, strong: 3 }
  },
  {
    id: "hibiscus-ginger-zero",
    name: "Hibiscus & Ginger Zero",
    type: "non-alcoholic",
    vibes: ["sober", "garden", "floral"],
    description: "Vibrant and spicy. An aromatic blend of cold-steeped organic hibiscus flower tea, freshly muddled spicy ginger root, fresh lime, and topped with club soda for a refreshing finish.",
    images: [
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80"
    ],
    tastingNotes: ["Floral", "Spicy", "Tangy"],
    ingredients: ["Steeped Hibiscus Tea", "Spicy Ginger Reduction", "Fresh Lime", "Club Soda"],
    profile: { sweet: 3, sour: 4, smoky: 1, strong: 0 }
  },
  {
    id: "spiced-apple-mule",
    name: "Spiced Apple Mule",
    type: "non-alcoholic",
    vibes: ["sober", "moody"],
    description: "Warm and inviting. Pressed orchard apple cider mixed with a spiced cinnamon-clove simple syrup, fresh lime juice, and topped with sparkling ginger beer in a copper mug.",
    images: [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80"
    ],
    tastingNotes: ["Warm", "Spiced", "Sweet"],
    ingredients: ["Orchard Apple Cider", "Cinnamon-Clove Syrup", "Fresh Lime", "Spicy Ginger Beer"],
    profile: { sweet: 4, sour: 2, smoky: 2, strong: 0 }
  },
  {
    id: "sunset-passion-highball",
    name: "Sunset Passion Highball",
    type: "alcoholic",
    vibes: ["high-energy", "garden"],
    description: "Bold and tropical. Premium triple-distilled vodka, fresh passion fruit pulp, house-made vanilla pod syrup, freshly squeezed lime, and sparkling soda. Served tall with a mint crown.",
    images: [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80"
    ],
    tastingNotes: ["Tropical", "Fruity", "Bright"],
    ingredients: ["Triple-Distilled Vodka", "Fresh Passion Fruit Pulp", "Vanilla Syrup", "Fresh Lime", "Club Soda"],
    profile: { sweet: 4, sour: 3, smoky: 1, strong: 3 }
  },
  {
    id: "bramble-zero",
    name: "Bramble Zero",
    type: "non-alcoholic",
    vibes: ["sober", "high-energy", "garden"],
    description: "Rich and fruity. A refreshing zero-proof cocktail with fresh muddled wild blackberries, freshly squeezed lemon juice, simple syrup, club soda, and a sprig of garden mint.",
    images: [
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80"
    ],
    tastingNotes: ["Fruity", "Citrusy", "Refreshing"],
    ingredients: ["Muddled Blackberries", "Fresh Lemon Juice", "Simple Syrup", "Club Soda", "Fresh Garden Mint"],
    profile: { sweet: 4, sour: 3, smoky: 1, strong: 0 }
  }
];

const vibesData = [
  { id: "all", label: "All Vibes" },
  { id: "sober", label: "So Sober (Wellness)" },
  { id: "high-energy", label: "High-Energy Party" },
  { id: "moody", label: "Moody & Intimate Lounge" },
  { id: "garden", label: "Garden & Floral Spritz" }
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
      sessionStorage.setItem("selected_cocktails", JSON.stringify(newSelected));
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
    const matchesType = cocktail.type === (isAlcoholic ? "alcoholic" : "non-alcoholic");
    const matchesVibe = activeVibe === "all" || cocktail.vibes.includes(activeVibe);
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
              From moody, slow-sipping mezcal creation to vibrant, botanically infused zero-proof mocktails, select the menu that fits your event's soul.
            </p>
          </div>

          {/* Tactile Fluid Toggle Switch */}
          <div className={`pretty-toggle-bar ${isAlcoholic ? "spirits-active" : "mocktails-active"}`}>
            <button
              type="button"
              className={`toggle-btn ${isAlcoholic ? "active" : ""}`}
              onClick={() => handleToggleAlcohol(true)}
            >
              Spirits & Signatures
            </button>
            <button
              type="button"
              className={`toggle-btn ${!isAlcoholic ? "active" : ""}`}
              onClick={() => handleToggleAlcohol(false)}
            >
              Botanicals & Zero-Proof
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
              className={`vibe-chip ${activeVibe === tribeIdHelper(vibe.id) ? "active" : ""}`}
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
                <article key={cocktail.id} className={`cocktail-card-premium ${isSelected ? "selected" : ""}`}>
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
                          onClick={(e) => handlePrevImage(cocktail.id, cocktail.images.length, e)}
                        >
                          <FaChevronLeft />
                        </button>
                        <button
                          type="button"
                          className="carousel-arrow next"
                          aria-label="Next image"
                          onClick={(e) => handleNextImage(cocktail.id, cocktail.images.length, e)}
                        >
                          <FaChevronRight />
                        </button>
                        <div className="carousel-dots">
                          {cocktail.images.map((_, idx) => (
                            <span
                              key={idx}
                              className={`carousel-dot ${idx === activeImgIndex ? "active" : ""}`}
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

                    <h3>{cocktail.name}</h3>
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
                          <div className="bar-fill" style={{ width: `${cocktail.profile.sweet * 20}%` }} />
                        </div>
                      </div>
                      <div className="flavor-row">
                        <span>Sour</span>
                        <div className="flavor-progress-bar">
                          <div className="bar-fill" style={{ width: `${cocktail.profile.sour * 20}%` }} />
                        </div>
                      </div>
                      {isAlcoholic ? (
                        <div className="flavor-row">
                          <span>Smoky</span>
                          <div className="flavor-progress-bar">
                            <div className="bar-fill" style={{ width: `${cocktail.profile.smoky * 20}%` }} />
                          </div>
                        </div>
                      ) : (
                        <div className="flavor-row">
                          <span>Spicy</span>
                          <div className="flavor-progress-bar">
                            <div className="bar-fill" style={{ width: `${cocktail.profile.smoky * 20}%` }} />
                          </div>
                        </div>
                      )}
                      <div className="flavor-row">
                        <span>{isAlcoholic ? "Strength" : "Freshness"}</span>
                        <div className="flavor-progress-bar">
                          <div className="bar-fill" style={{ width: `${(isAlcoholic ? cocktail.profile.strong : 4) * 20}%` }} />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`btn-select-drink ${isSelected ? "added" : ""}`}
                      onClick={() => handleToggleCocktail(cocktail.name)}
                    >
                      {isSelected ? (
                        <>
                          <FaCheck /> Added to Event Menu
                        </>
                      ) : (
                        <>
                          <FaPlus /> Add to Event Menu
                        </>
                      )}
                    </button>
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
                <button type="button" className="btn-clear" onClick={handleClearMenu}>
                  Clear
                </button>
                <a href="/booking" className="btn-book-with-menu">
                  <FaLock /> Lock Menu & Request Quote
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

// Helper to keep chip comparisons clean
function tribeIdHelper(id) {
  return id;
}
