import "./globals.css";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export const metadata = {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
