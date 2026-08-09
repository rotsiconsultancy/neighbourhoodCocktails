"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CONSENT_GRANTED,
  getMarketingConsent,
  MARKETING_CONSENT_EVENT,
} from "@/lib/marketingConsent";
import {
  META_PIXEL_ID,
  trackMetaCustomEvent,
  trackMetaEvent,
} from "@/lib/metaPixel";

const SERVICE_LANDING_PATHS = new Set([
  "/brand-activation-bar-service",
  "/cocktail-masterclass-nairobi",
  "/corporate-cocktail-catering-nairobi",
  "/event-drinks-packages",
  "/mobile-bar-hire-westlands-kilimani",
  "/mocktail-bar-events-nairobi",
  "/private-party-bartenders-nairobi",
  "/wedding-mobile-bar-nairobi",
]);

function titleFromPath(pathname) {
  const slug = pathname.split("/").filter(Boolean).at(-1) || "home";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function trackRouteEvents(pathname) {
  if (pathname.startsWith("/studio")) return;

  trackMetaEvent("PageView");

  if (pathname.startsWith("/services/")) {
    trackMetaEvent("ViewContent", {
      content_name: titleFromPath(pathname),
      content_category: "service",
      content_ids: [pathname.split("/").at(-1)],
      content_type: "product",
    });
  } else if (pathname.startsWith("/cocktails/")) {
    trackMetaEvent("ViewContent", {
      content_name: titleFromPath(pathname),
      content_category: "cocktail",
      content_ids: [pathname.split("/").at(-1)],
      content_type: "product",
    });
  } else if (SERVICE_LANDING_PATHS.has(pathname)) {
    trackMetaEvent("ViewContent", {
      content_name: titleFromPath(pathname),
      content_category: "service",
      content_ids: [pathname.slice(1)],
      content_type: "product",
    });
  }

  if (pathname === "/booking") {
    trackMetaCustomEvent("BookingIntent", {
      content_name: "Booking Request",
    });
  }
}

export function MetaPixel() {
  const pathname = usePathname();
  const [pixelReady, setPixelReady] = useState(false);
  const trackedPath = useRef(null);
  let [consent, setConsent] = useState(null);

  useEffect(() => {
    setConsent(getMarketingConsent() || CONSENT_GRANTED);

    const handleConsent = (event) => {
      setConsent(event.detail||CONSENT_GRANTED);
      if (event.detail !== CONSENT_GRANTED) {
        trackedPath.current = null;
      }
    };

    window.addEventListener(MARKETING_CONSENT_EVENT, handleConsent);
    return () =>
      window.removeEventListener(MARKETING_CONSENT_EVENT, handleConsent);
  }, []);

  useEffect(() => {
    if (
      consent !== CONSENT_GRANTED ||
      !pixelReady ||
      trackedPath.current === pathname
    ) {
      return;
    }

    trackRouteEvents(pathname);
    trackedPath.current = pathname;
  }, [consent, pathname, pixelReady]);

  if(consent !== CONSENT_GRANTED) {
    // return null;
    consent = CONSENT_GRANTED; // Force consent for testing purposes
  }

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      onLoad={() => setPixelReady(true)}
      onReady={() => setPixelReady(true)}
    >
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('consent', 'grant');
        fbq('init', '${META_PIXEL_ID}');
      `}
    </Script>
  );
}