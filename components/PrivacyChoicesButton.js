"use client";

import { openPrivacyChoices } from "@/lib/marketingConsent";

export function PrivacyChoicesButton() {
  return (
    <button
      className="footer-privacy-button"
      type="button"
      onClick={openPrivacyChoices}
    >
      Privacy choices
    </button>
  );
}

