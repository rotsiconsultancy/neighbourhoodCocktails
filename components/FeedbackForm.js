"use client";

import { useState } from "react";
import Link from "next/link";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [drinkName, setDrinkName] = useState("");
  const [drinkRating, setDrinkRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [improvements, setImprovements] = useState("");
  const [recommend, setRecommend] = useState(""); // "Yes" or "No"
  const [notifyPref, setNotifyPref] = useState([]); // Array: ['email', 'whatsapp', 'instagram']
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  const starLabels = {
    1: "Disappointing",
    2: "Could be better",
    3: "Good & balanced",
    4: "Absolutely delicious!",
    5: "Absolute masterpiece!",
  };

  const handleNotifyPrefChange = (pref) => {
    if (notifyPref.includes(pref)) {
      setNotifyPref(notifyPref.filter((p) => p !== pref));
    } else {
      setNotifyPref([...notifyPref, pref]);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (drinkRating === 0) {
      setStatus("Please rate your drink before submitting.");
      return;
    }

    if (!recommend) {
      setStatus("Please let us know if you would recommend us.");
      return;
    }

    setIsSubmitting(true);
    setStatus("Submitting your feedback...");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          drinkName,
          drinkRating,
          improvements,
          recommend,
          notifyPref,
          whatsappPhone: notifyPref.includes("whatsapp") ? whatsappPhone : "",
          instagramHandle: notifyPref.includes("instagram") ? instagramHandle : "",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || "We could not submit your feedback. Please try again.");
      }

      setSubmittedSuccessfully(true);
    } catch (error) {
      setStatus(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submittedSuccessfully) {
    return (
      <div className="feedback-panel success-card">
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
        <h2>Thank you, {name.split(" ")[0]}!</h2>
        <p>
          Your feedback has been successfully recorded in our system. We appreciate your thoughts
          and will use them to keep refining the neighbourhood experience.
        </p>
        <Link href="/" className="btn-home">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <form className="feedback-panel booking-panel" id="feedback-form" onSubmit={handleSubmit}>
      <div className="form-section">
        <h2>Share Your Experience</h2>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field full">
            <label htmlFor="drinkName">What drink did you drink today?</label>
            <input
              id="drinkName"
              name="drinkName"
              type="text"
              placeholder="e.g. Classic Old Fashioned, Spicy Margarita, Passion Mocktail..."
              value={drinkName}
              onChange={(e) => setDrinkName(e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>How would you rate it?</h2>
        <div className="rating-container">
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${(hoveredStar || drinkRating) >= star ? "active" : ""}`}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setDrinkRating(star)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
          </div>
          <div className="rating-label">{starLabels[hoveredStar || drinkRating] || "Select a rating"}</div>
        </div>
      </div>

      <div className="form-section">
        <h2>Would you recommend us to a friend?</h2>
        <div className="recommend-buttons">
          <button
            type="button"
            className={`recommend-btn ${recommend === "Yes" ? "active-yes" : ""}`}
            onClick={() => setRecommend("Yes")}
          >
            👍 Yes, absolutely!
          </button>
          <button
            type="button"
            className={`recommend-btn ${recommend === "No" ? "active-no" : ""}`}
            onClick={() => setRecommend("No")}
          >
            👎 No, room for improvement
          </button>
        </div>
      </div>

      <div className="form-section">
        <h2>What can we improve?</h2>
        <div className="field full">
          <textarea
            id="improvements"
            name="improvements"
            placeholder="Tell us what you loved, or how we can make your next glass even better..."
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Notify me about next popups</h2>
        <p className="form-note" style={{ color: "rgba(246, 239, 227, 0.7)", marginBottom: "12px" }}>
          Get exclusive invites to our upcoming secret pop-up bars and private masterclasses.
        </p>
        <div className="pref-grid">
          <label className={`pref-label ${notifyPref.includes("email") ? "checked" : ""}`}>
            <input
              type="checkbox"
              className="pref-checkbox"
              checked={notifyPref.includes("email")}
              onChange={() => handleNotifyPrefChange("email")}
            />
            ✉ Email
          </label>
          <label className={`pref-label ${notifyPref.includes("whatsapp") ? "checked" : ""}`}>
            <input
              type="checkbox"
              className="pref-checkbox"
              checked={notifyPref.includes("whatsapp")}
              onChange={() => handleNotifyPrefChange("whatsapp")}
            />
            <FaWhatsapp/> WhatsApp
          </label>
          <label className={`pref-label ${notifyPref.includes("instagram") ? "checked" : ""}`}>
            <input
              type="checkbox"
              className="pref-checkbox"
              checked={notifyPref.includes("instagram")}
              onChange={() => handleNotifyPrefChange("instagram")}
            />
            <FaInstagram/> Instagram
          </label>
        </div>

        <div className="subfields-container">
          <div className={`slide-down-field ${notifyPref.includes("whatsapp") ? "visible" : ""}`}>
            <div className="field">
              <label htmlFor="whatsappPhone">WhatsApp Number</label>
              <input
                id="whatsappPhone"
                name="whatsappPhone"
                type="tel"
                placeholder="+254 700 000 000"
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(e.target.value)}
                required={notifyPref.includes("whatsapp")}
              />
            </div>
          </div>

          <div className={`slide-down-field ${notifyPref.includes("instagram") ? "visible" : ""}`}>
            <div className="field">
              <label htmlFor="instagramHandle">Instagram Handle</label>
              <input
                id="instagramHandle"
                name="instagramHandle"
                type="text"
                placeholder="@username"
                value={instagramHandle}
                onChange={(e) => setInstagramHandle(e.target.value)}
                required={notifyPref.includes("instagram")}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="submit-row" style={{ marginTop: "24px" }}>
        <button className="button primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </button>
      </div>

      {status && (
        <p className="status-note" role="status" aria-live="polite" style={{ marginTop: "18px" }}>
          {status}
        </p>
      )}
    </form>
  );
}
