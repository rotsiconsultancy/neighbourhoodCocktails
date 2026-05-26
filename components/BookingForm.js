"use client";

import { useState } from "react";

export function BookingForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setStatus(
      "Your request outline is ready. Send these details through Instagram, LinkedIn, or your preferred contact channel to complete the booking request."
    );
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
        {/* <button className="button primary" type="submit">
          Prepare Request */}
        {/* </button> */}
          {/* <a className="button primary" href="https://www.instagram.com/neighbourhood_cocktails" target="_blank" rel="noopener noreferrer">
            Contact Us
          </a> */}
          <p className="contact-note">Prepare your request and we will get back to you within 24 hours.</p>
        <p className="form-note">Use this outline to start the conversation, then we will shape the right package around your event.</p>
      </div>
      <p className="status-note" role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
// }
//         <p className="form-note">Use this outline to start the conversation, then we will shape the right package around your event.</p>
//       </div>
//       <p className="status-note" role="status" aria-live="polite">
//         {status}
//       </p>
//     </form>
//   );
}
