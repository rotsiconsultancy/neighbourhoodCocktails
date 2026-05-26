"use client";

import { useState } from "react";

export function BookingForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);
    setStatus("Sending your booking request...");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          date: formData.get("date"),
          location: formData.get("location"),
          guests: formData.get("guests"),
          eventType: formData.get("event-type"),
          serviceStyle: formData.get("service-style"),
          preferences: formData.getAll("preferences"),
          notes: formData.get("notes")
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "We could not send your request. Please try again.");
      }

      event.currentTarget.reset();
      setStatus("Your booking request has been sent. We will get back to you within 24 hours.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="booking-panel" id="booking-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Event details</h2>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" autoComplete="name" placeholder="Full name" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </div>
          <div className="field">
            <label htmlFor="date">Event date</label>
            <input id="date" name="date" type="date" required />
          </div>
          <div className="field">
            <label htmlFor="location">Location</label>
            <input id="location" name="location" type="text" placeholder="Nairobi, Karen, Westlands..." />
          </div>
          <div className="field">
            <label htmlFor="guests">Guest count</label>
            <input id="guests" name="guests" type="number" min="1" placeholder="Estimated attendance" />
          </div>
          <div className="field">
            <label htmlFor="event-type">Event type</label>
            <select id="event-type" name="event-type">
              <option>Wedding</option>
              <option>Corporate event</option>
              <option>Private party</option>
              <option>Brand activation</option>
              <option>Cocktail masterclass</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Bar configuration</h2>
        <p className="option-title">Service style</p>
        <div className="choice-grid">
          <label className="choice">
            <input type="radio" name="service-style" value="open-bar" defaultChecked />
            <span>Open bar</span>
          </label>
          <label className="choice">
            <input type="radio" name="service-style" value="cash-bar" />
            <span>Cash bar</span>
          </label>
          <label className="choice">
            <input type="radio" name="service-style" value="vouchers" />
            <span>Vouchers</span>
          </label>
        </div>
      </div>

      <div className="form-section">
        <h2>Drink preferences</h2>
        <div className="check-grid">
          <label className="check">
            <input type="checkbox" name="preferences" value="classic-cocktails" />
            <span>Classic cocktails</span>
          </label>
          <label className="check">
            <input type="checkbox" name="preferences" value="botanical" />
            <span>Botanical infusions</span>
          </label>
          <label className="check">
            <input type="checkbox" name="preferences" value="mocktails" />
            <span>Alcohol-free options</span>
          </label>
          <label className="check">
            <input type="checkbox" name="preferences" value="spirits" />
            <span>Artisanal spirits</span>
          </label>
        </div>
        <div className="field full" style={{ marginTop: 18 }}>
          <label htmlFor="notes">Special requests</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Allergies, preferred spirits, event theme, or anything else we should know."
          />
        </div>
      </div>

      <div className="submit-row">
        <button className="button primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Booking Request"}
        </button>
        <p className="form-note">Use this outline to start the conversation, then we will shape the right package around your event.</p>
      </div>
      <p className="status-note" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
