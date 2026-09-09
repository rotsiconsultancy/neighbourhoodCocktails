"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FaBeer, FaGlassWine, FaCocktail, FaGlassMartiniAlt, FaLeaf, FaWineGlassAlt, FaCrown } from "react-icons/fa";

export function CostCalculator({ pricingConfig }) {
  const rates = useMemo(() => ({
    baseServiceFee: pricingConfig?.baseServiceFee || 3500,
    beer: pricingConfig?.beerPricePerServing || 400,
    wine: pricingConfig?.winePricePerGlass || 600,
    spirits: pricingConfig?.spiritsPricePerServing || 750,
    cocktails: pricingConfig?.cocktailPricePerServing || 900,
    mocktails: pricingConfig?.mocktailPricePerServing || 500,
    glassware: pricingConfig?.glasswarePerGuest || 200,
    customBranding: pricingConfig?.customBrandingFee || 12000,
  }), [pricingConfig]);

  const [guests, setGuests] = useState(50);
  const [durationHours, setDurationHours] = useState(4);
  const [selectedDrinks, setSelectedDrinks] = useState({
    cocktails: true,
    mocktails: true,
    beer: false,
    wine: false,
    spirits: false,
  });
  const [includeGlassware, setIncludeGlassware] = useState(true);
  const [includeBranding, setIncludeBranding] = useState(false);

  const toggleDrink = (key) => {
    setSelectedDrinks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Ensure at least one drink is selected
      if (!Object.values(next).some(Boolean)) return prev;
      return next;
    });
  };

  const calculation = useMemo(() => {
    // Average 2 drinks per guest for first 2 hours, 1 drink per hour thereafter
    const estimatedDrinksPerGuest = Math.max(2, Math.round(1.5 * durationHours));
    const totalDrinks = guests * estimatedDrinksPerGuest;

    const activeKeys = Object.keys(selectedDrinks).filter((k) => selectedDrinks[k]);
    const numCategories = activeKeys.length || 1;
    const drinksPerCategory = Math.round(totalDrinks / numCategories);

    let drinksTotal = 0;
    activeKeys.forEach((key) => {
      drinksTotal += (rates[key] || 500) * drinksPerCategory;
    });

    const staffFee = rates.baseServiceFee * durationHours * Math.ceil(guests / 40);
    const glasswareFee = includeGlassware ? rates.glassware * guests : 0;
    const brandingFee = includeBranding ? rates.customBranding : 0;

    const baseEstimate = drinksTotal + staffFee + glasswareFee + brandingFee;
    const lowEstimate = Math.round(baseEstimate * 0.9);
    const highEstimate = Math.round(baseEstimate * 1.1);

    return {
      totalDrinks,
      drinksTotal,
      staffFee,
      glasswareFee,
      brandingFee,
      lowEstimate,
      highEstimate,
      avgPerGuest: Math.round(baseEstimate / guests),
    };
  }, [guests, durationHours, selectedDrinks, includeGlassware, includeBranding, rates]);

  return (
    <div className="calculator-card" id="calculator">
      <div className="calculator-header">
        <div className="eyebrow" style={{ color: "var(--gold)" }}>Interactive Estimator</div>
        <h2>Estimate Your Event Drinks Budget</h2>
        <p className="calculator-subtitle">
          Select your guest count, event length, and favorite drink categories to get a quick estimate for your event.
        </p>
      </div>

      <div className="calculator-body">
        {/* Step 1: Guest Count & Duration */}
        <div className="calc-step">
          <div className="step-badge">Step 1</div>
          <h3>The Event Details</h3>
          
          <div className="input-group">
            <div className="label-row">
              <label htmlFor="guest-slider">Number of Guests</label>
              <span className="value-tag">{guests} guests</span>
            </div>
            <input
              id="guest-slider"
              type="range"
              min={15}
              max={350}
              step={5}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="calc-range"
            />
            <div className="range-presets">
              {[20, 50, 100, 200, 300].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  className={`preset-btn ${guests === preset ? "active" : ""}`}
                  onClick={() => setGuests(preset)}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="input-group">
            <div className="label-row">
              <label htmlFor="duration-slider">Event Duration</label>
              <span className="value-tag">{durationHours} Hours</span>
            </div>
            <input
              id="duration-slider"
              type="range"
              min={2}
              max={8}
              step={1}
              value={durationHours}
              onChange={(e) => setDurationHours(Number(e.target.value))}
              className="calc-range"
            />
          </div>
        </div>

        {/* Step 2: Drinks Selection */}
        <div className="calc-step">
          <div className="step-badge">Step 2</div>
          <h3>Select Included Drinks</h3>
          <p className="step-hint">Choose which drink styles you want available on the bar:</p>
          
          <div className="drinks-toggle-grid">
            <button
              type="button"
              className={`drink-toggle-card ${selectedDrinks.cocktails ? "selected" : ""}`}
              onClick={() => toggleDrink("cocktails")}
            >
              <FaCocktail className="drink-icon" />
              <div>
                <strong>Craft Cocktails</strong>
                <span>Signature mixes & garnishes</span>
              </div>
            </button>

            <button
              type="button"
              className={`drink-toggle-card ${selectedDrinks.mocktails ? "selected" : ""}`}
              onClick={() => toggleDrink("mocktails")}
            >
              <FaLeaf className="drink-icon" />
              <div>
                <strong>Non-Alcoholic Mocktails</strong>
                <span>Zero-proof botanical serves</span>
              </div>
            </button>

            <button
              type="button"
              className={`drink-toggle-card ${selectedDrinks.beer ? "selected" : ""}`}
              onClick={() => toggleDrink("beer")}
            >
              <FaBeer className="drink-icon" />
              <div>
                <strong>Beer & Cider</strong>
                <span>Chilled local & import selections</span>
              </div>
            </button>

            <button
              type="button"
              className={`drink-toggle-card ${selectedDrinks.wine ? "selected" : ""}`}
              onClick={() => toggleDrink("wine")}
            >
              <FaWineGlassAlt className="drink-icon" />
              <div>
                <strong>Fine Wine</strong>
                <span>Red, white & sparkling selections</span>
              </div>
            </button>

            <button
              type="button"
              className={`drink-toggle-card ${selectedDrinks.spirits ? "selected" : ""}`}
              onClick={() => toggleDrink("spirits")}
            >
              <FaGlassMartiniAlt className="drink-icon" />
              <div>
                <strong>Premium Spirits</strong>
                <span>Highball & neat pours</span>
              </div>
            </button>
          </div>
        </div>

        {/* Step 3: Service & Add-ons */}
        <div className="calc-step">
          <div className="step-badge">Step 3</div>
          <h3>Hospitality Add-ons</h3>
          
          <div className="addons-row">
            <label className="checkbox-card">
              <input
                type="checkbox"
                checked={includeGlassware}
                onChange={(e) => setIncludeGlassware(e.target.checked)}
              />
              <div>
                <strong>Premium Glassware Service</strong>
                <span>Proper coupe, rocks, & collins glasses included</span>
              </div>
            </label>

            <label className="checkbox-card">
              <input
                type="checkbox"
                checked={includeBranding}
                onChange={(e) => setIncludeBranding(e.target.checked)}
              />
              <div>
                <strong>Custom Bar Branding</strong>
                <span>Co-branded front bar fascia & menu cards</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Results Box */}
      <div className="calculator-results">
        <div className="result-headline">
          <span>Estimated Budget Range</span>
          <div className="total-amount">
            KES {calculation.lowEstimate.toLocaleString()} – KES {calculation.highEstimate.toLocaleString()}
          </div>
          <p className="approx-note">
            Approx. KES {calculation.avgPerGuest.toLocaleString()} per guest &bull; Covers ~{calculation.totalDrinks} total drinks, shakers, ice, & service staff.
          </p>
        </div>

        <div className="calc-actions">
          <Link href="/booking" className="btn primary1">
            Request Official Quote
          </Link>
        </div>
      </div>
    </div>
  );
}
