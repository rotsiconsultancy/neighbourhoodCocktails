"use client";

import { useState } from "react";
import Link from "next/link";

export function BookingForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);

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

      const customerName = formData.get("name") || "";
      setSubmittedName(customerName);
      form.reset();
      setSubmittedSuccessfully(true);
      setStatus("Your booking request has been sent. We will get back to you within 24 hours.");
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submittedSuccessfully) {
    return (
      <div className="booking-panel success-card">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h2>Thank you, {submittedName.split(" ")[0]}!</h2>
        <p>
          Your booking request has been successfully sent. We've received your details and our team will get back to you within 24 hours to shape the perfect experience for your event.
        </p>
        <Link href="/" className="btn-home">
          Back to home
        </Link>
      </div>
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
        <div className="form-grid">
          <div className="field">
            <label htmlFor="service-style">Service style</label>
            <select id="service-style" name="service-style" defaultValue="open-bar">
              <option value="open-bar">Open bar</option>
              <option value="cash-bar">Cash bar</option>
              <option value="vouchers">Vouchers</option>
              <option value="hosted-bar">Hosted bar</option>
              <option value="consultation-needed">Help me choose</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="preferences">Drink preferences</label>
            <select id="preferences" name="preferences" defaultValue="classic-cocktails">
              <option value="classic-cocktails">Classic cocktails</option>
              <option value="botanical">Botanical infusions</option>
              <option value="mocktails">Alcohol-free options</option>
              <option value="spirits">Artisanal spirits</option>
              <option value="signature-menu">Custom signature menu</option>
            </select>
          </div>
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
