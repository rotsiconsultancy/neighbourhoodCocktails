import {
  CONSENT_GRANTED,
  getMarketingConsent,
} from "@/lib/marketingConsent";

export const META_PIXEL_ID = "2277689509707110";

function canTrack() {
  return (
    typeof window !== "undefined" &&
    getMarketingConsent() === CONSENT_GRANTED &&
    typeof window.fbq === "function"
  );
}

export function trackMetaEvent(eventName, parameters = {}, eventId) {
  if (!canTrack()) return false;

  if (eventId) {
    window.fbq("track", eventName, parameters, { eventID: eventId });
  } else {
    window.fbq("track", eventName, parameters);
  }
  return true;
}

export function trackMetaCustomEvent(eventName, parameters = {}) {
  if (!canTrack()) return false;

  window.fbq("trackCustom", eventName, parameters);
  return true;
}

export function readMetaCookie(name) {
  if (typeof document === "undefined") return "";

  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : "";
}
