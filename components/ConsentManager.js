"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONSENT_DENIED,
  CONSENT_GRANTED,
  getMarketingConsent,
  OPEN_PRIVACY_CHOICES_EVENT,
  saveMarketingConsent,
} from "@/lib/marketingConsent";

export function ConsentManager() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(getMarketingConsent() === null);

    const openChoices = () => setIsOpen(true);
    window.addEventListener(OPEN_PRIVACY_CHOICES_EVENT, openChoices);
    return () =>
      window.removeEventListener(OPEN_PRIVACY_CHOICES_EVENT, openChoices);
  }, []);

  function choose(value) {
    saveMarketingConsent(value);

    if (typeof window.fbq === "function") {
      window.fbq("consent", value === CONSENT_GRANTED ? "grant" : "revoke");
    }

    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <section
      className="privacy-consent"
      role="dialog"
      aria-modal="false"
      aria-labelledby="privacy-consent-title"
      aria-describedby="privacy-consent-description"
    >
      <div className="privacy-consent-copy">
        <p className="privacy-consent-label">Your privacy</p>
        <h2 id="privacy-consent-title">Help us understand what works.</h2>
        <p id="privacy-consent-description">
          With your permission, we would like to measure visits and booking
          enquiries, inorder to improve our offerings and services. We will also use this information to provide you with relevant offers and updates. You can change your mind at any time by clicking the privacy link in the footer.
          Rejecting marketing tracking will not affect the website or your ability
          to make a booking.
        </p>
        <Link href="/privacy">Read our privacy notice</Link>
      </div>
      <div className="privacy-consent-actions">
        <button
          className="privacy-consent-button secondary"
          type="button"
          onClick={() => choose(CONSENT_DENIED)}
        >
          Reject marketing
        </button>
        <button
          className="privacy-consent-button primary"
          type="button"
          onClick={() => choose(CONSENT_GRANTED)}
        >
          Accept marketing
        </button>
      </div>
    </section>
  );
}