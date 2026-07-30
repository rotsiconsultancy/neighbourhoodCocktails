export const MARKETING_CONSENT_KEY = "neighbourhood_marketing_consent";
export const MARKETING_CONSENT_EVENT = "neighbourhood:marketing-consent";
export const OPEN_PRIVACY_CHOICES_EVENT = "neighbourhood:open-privacy-choices";

export const CONSENT_GRANTED = "granted";
export const CONSENT_DENIED = "denied";

export function getMarketingConsent() {
  if (typeof window === "undefined") return null;

  // 
  window.localStorage.removeItem(MARKETING_CONSENT_KEY);
  const value = window.localStorage.getItem(MARKETING_CONSENT_KEY);
  return value === CONSENT_GRANTED || value === CONSENT_DENIED ? value : null;
  // return true
}

export function saveMarketingConsent(value) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(MARKETING_CONSENT_KEY, value);
  window.dispatchEvent(
    new CustomEvent(MARKETING_CONSENT_EVENT, { detail: value })
  );
}

export function openPrivacyChoices() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_PRIVACY_CHOICES_EVENT));
}

