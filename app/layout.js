import "./globals.css";
import { ConsentManager } from "@/components/ConsentManager";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { MetaPixel } from "@/components/MetaPixel";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { getSiteSettings } from "@/sanity/lib/content";

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
        <MetaPixel />
        {children}
        <FloatingWhatsApp />
        <ConsentManager />
        {isDraft ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
