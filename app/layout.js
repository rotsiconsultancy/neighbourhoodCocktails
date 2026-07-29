import "./globals.css";
import Script from "next/script";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { getSiteSettings } from "@/sanity/lib/content";

const META_PIXEL_ID = "2277689509707110";

const baseMetadata = {
  metadataBase: new URL("https://www.neighbourhoodcocktails.com"),
  title: {
    default: "The Neighbourhood Cocktails",
    template: "%s | The Neighbourhood Cocktails"
  },
  description:
    "Cocktail-led experiences for weddings, private events, corporate gatherings, and masterclasses.",
  openGraph: {
    title: "The Neighbourhood Cocktails",
    description:
      "Warm, polished cocktail service for hosts who want the drinks, setup, and atmosphere handled with care.",
    images: ["/images/green-cream.jpg","/images/black.jpg"],
    url: "https://www.neighbourhoodcocktails.com",
    siteName: "The Neighbourhood Cocktails",
    type: "website"
  },
  icons: {
    icon: [{ url: "/images/logo.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/images/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/logo.svg", type: "image/svg+xml" }]
  }
};

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      images: settings.defaultShareImages?.length ? settings.defaultShareImages : baseMetadata.openGraph.images,
    },
  };
}

export default async function RootLayout({ children }) {
  const isDraft = (await draftMode()).isEnabled;
  return (
    <html lang="en">
      <body>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        {children}
        <FloatingWhatsApp />
        {isDraft ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
