"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FaBeer, FaCocktail, FaGlassMartiniAlt, FaLeaf, FaWineGlassAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";

const costFaqs = [
  {
    q: "What is included in the estimated budget?",
    a: "Our estimates include full mobile bar setup & breakdown, certified mixologists & bar staff, fresh garnishes & house-made syrups, ice logistics, standard bar tools, and beverage service throughout your event days.",
  },
  {
    q: "How are cocktail and mocktail quantities calculated?",
    a: "We estimate an average of 3–4 drinks per guest per event day. If your crowd loves signature cocktails or zero-proof mocktails, we adjust the ratio so no glass runs empty while keeping waste to a minimum.",
  },
  {
    q: "Are glassware and custom bar branding included?",
    a: "Standard glassware planning is included in our service quote. Custom bar fascia branding (such as co-branded panels or custom menu cards) can be added during your formal booking consultation.",
  },
  {
    q: "Do you cater for multi-day events outside Nairobi?",
    a: "Yes! We cater for multi-day weddings, festivals, and corporate retreats across Kenya (Nairobi, Naivasha, Nanyuki, Coast). Travel and overnight logistics are calculated based on venue location.",
  },
  {
    q: "Can I bring my own alcohol or spirits?",
    a: "Absolutely. We offer both full-service (where we supply spirits & mixers) and service-only packages (where you supply spirits and we bring shakers, mixologists, garnishes, and craft syrups).",
  },
];

export function CostCalculator({ pricingConfig }) {
  const rates = useMemo(() => ({
    baseServiceFeePerDay: pricingConfig?.baseServiceFee ? pricingConfig.baseServiceFee * 4 : 14000,
    beer: pricingConfig?.beerPricePerServing || 400,
    wine: pricingConfig?.winePricePerGlass || 600,
    spirits: pricingConfig?.spiritsPricePerServing || 750,
    cocktails: pricingConfig?.cocktailPricePerServing || 900,
    mocktail: pricingConfig?.mocktailPricePerServing || 500,
  }), [pricingConfig]);

  const [guests, setGuests] = useState(50);
  const [eventDays, setEventDays] = useState(1);
  const [selectedDrinks, setSelectedDrinks] = useState({
    cocktails: true,
    mocktail: true,
    beer: false,
    wine: false,
    spirits: false,
  });

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleDrink = (key) => {
    setSelectedDrinks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Ensure at least one drink is selected
      if (!Object.values(next).some(Boolean)) return prev;
      return next;
    });
  };

  const calculation = useMemo(() => {
    // Average 3.5 drinks per guest per day
    const drinksPerGuestPerDay = 3.5;
    const totalDrinks = Math.round(guests * drinksPerGuestPerDay * eventDays);

    const activeKeys = Object.keys(selectedDrinks).filter((k) => selectedDrinks[k]);
    const numCategories = activeKeys.length || 1;
    const drinksPerCategory = Math.round(totalDrinks / numCategories);

    let drinkCostTotal = 0;
    activeKeys.forEach((key) => {
      const unitRate = rates[key] || 600;
      drinkCostTotal += unitRate * drinksPerCategory;
    });

    const staffAndLogisticsFee = rates.baseServiceFeePerDay * eventDays * Math.ceil(guests / 40);
    const baseEstimate = drinkCostTotal + staffAndLogisticsFee;
    const lowEstimate = Math.round(baseEstimate * 0.9);
    const highEstimate = Math.round(baseEstimate * 1.1);

    return {
      totalDrinks,
      lowEstimate,
      highEstimate,
      avgPerGuest: Math.round(baseEstimate / guests),
    };
  }, [guests, eventDays, selectedDrinks, rates]);

  return (
    <div className="calculator-container-wrap">
      <div className="calculator-card" id="calculator">
        <div className="calculator-header centered-header">
          <div className="eyebrow" style={{ color: "var(--gold)", textAlign: "center" }}>
            Event Budget Estimator
          </div>
          <h2 className="calc-title-compact" style={{ textAlign: "center" }}>
            Calculate Your Drinks Budget
          </h2>
          <p className="calculator-subtitle" style={{ textAlign: "center" }}>
            Select guest count, event days, and drink categories to receive an instant estimate for your celebration.
          </p>
        </div>

        <div className="calculator-body">
          {/* Step 1: Guest Count & Event Days */}
          <div className="calc-step">
            <div className="step-badge">Step 1</div>
            <h3>Event Size & Duration</h3>
            
            <div className="input-group">
              <div className="label-row">
                <label htmlFor="guest-slider">Number of Guests</label>
                <span className="value-tag">{guests} Guests</span>
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
                <label htmlFor="days-slider">Event Duration (Days)</label>
                <span className="value-tag">{eventDays} {eventDays === 1 ? "Day" : "Days"}</span>
              </div>
              <input
                id="days-slider"
                type="range"
                min={1}
                max={5}
                step={1}
                value={eventDays}
                onChange={(e) => setEventDays(Number(e.target.value))}
                className="calc-range"
              />
              <div className="range-presets">
                {[1, 2, 3, 4, 5].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`preset-btn ${eventDays === d ? "active" : ""}`}
                    onClick={() => setEventDays(d)}
                  >
                    {d} {d === 1 ? "Day" : "Days"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Drinks Selection */}
          <div className="calc-step">
            <div className="step-badge">Step 2</div>
            <h3>Select Included Drink Styles</h3>
            <p className="step-hint">Choose which drink menus to feature on your bar:</p>
            
            <div className="drinks-toggle-grid">
              <button
                type="button"
                className={`drink-toggle-card ${selectedDrinks.cocktails ? "selected" : ""}`}
                onClick={() => toggleDrink("cocktails")}
              >
                <FaCocktail className="drink-icon" />
                <div>
                  <strong>Craft Cocktails</strong>
                  <span>Bespoke signature mixes</span>
                </div>
              </button>

              <button
                type="button"
                className={`drink-toggle-card ${selectedDrinks.mocktail ? "selected" : ""}`}
                onClick={() => toggleDrink("mocktail")}
              >
                <FaLeaf className="drink-icon" />
                <div>
                  <strong>Zero-Proof Mocktails</strong>
                  <span>Botanical non-alcoholic serves</span>
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
                  <span>Chilled craft & local options</span>
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
                  <span>Red, white & sparkling</span>
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
        </div>

        {/* Results Box */}
        <div className="calculator-results">
          <div className="result-headline">
            <span>Estimated Event Budget Range</span>
            <div className="total-amount">
              KES {calculation.lowEstimate.toLocaleString()} – KES {calculation.highEstimate.toLocaleString()}
            </div>
            <p className="approx-note">
              Approx. KES {calculation.avgPerGuest.toLocaleString()} per guest &bull; Covers ~{calculation.totalDrinks} drinks across {eventDays} {eventDays === 1 ? "day" : "days"}, shakers, ice & bar staff.
            </p>
          </div>

          <div className="calc-actions">
            <Link href="/booking" className="btn primary1">
              Request Official Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Cost FAQ Section below the calculator */}
      <div className="cost-faq-section">
        <div className="cost-faq-header">
          <div className="eyebrow" style={{ color: "var(--gold)", textAlign: "center" }}>FAQ</div>
          <h3>Frequently Asked Questions About Event Pricing</h3>
        </div>

        <div className="cost-faq-list">
          {costFaqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.q}
                className={`cost-faq-item ${isOpen ? "open" : ""}`}
                onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
              >
                <div className="cost-faq-question">
                  <h4>{faq.q}</h4>
                  <span className="faq-toggle-icon">
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>
                {isOpen && <p className="cost-faq-answer">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
