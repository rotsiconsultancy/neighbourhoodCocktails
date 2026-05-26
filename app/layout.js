import "./globals.css";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

export const metadata = {
  metadataBase: new URL("https://neighbourhoodcocktails.com"),
  title: {
    default: "The Neighbourhood Cocktails | Event Bar Experiences",
    template: "%s | The Neighbourhood Cocktails"
  },
  description:
    "Cocktail-led experiences for weddings, private events, corporate gatherings, and masterclasses.",
  openGraph: {
    title: "The Neighbourhood Cocktails",
    description:
      "Warm, polished cocktail service for hosts who want the drinks, setup, and atmosphere handled with care.",
    images: ["/images/green-cream.jpg"]
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
