import Link from "next/link";
import { GalleryLightbox } from "@/components/GalleryLightbox";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Mobile Bar Event Gallery",
  description: "Browse mobile bar setups, cocktail service, event styling, and hosting moments by The Neighbourhood Cocktails in Nairobi.",
  alternates: { canonical: "/gallery" }
};

const galleryImages = [
  {
    src: "/images/gallery/1.png",
    alt: "Cocktail event setup with branded details",
    title: "Event bar detail",
    caption: "A polished setup for guests to gather around before the first round.",
    category: "Bar Setups",
    width: 1200,
    height: 1600,
    featured: true
  },
  {
    src: "/images/gallery/2.jpg",
    alt: "Guests enjoying a cocktail service moment",
    title: "Private celebration",
    caption: "Warm, social service for private parties and intimate celebrations.",
    category: "Private Events",
    width: 1200,
    height: 900
  },
  {
    src: "/images/gallery/3.png",
    alt: "Cocktail preparation with garnish and glassware",
    title: "Cocktail craft",
    caption: "Fresh garnish, balanced recipes, and drinks built for the occasion.",
    category: "Cocktails",
    width: 1200,
    height: 900
  },
  {
    src: "/images/gallery/4.png",
    alt: "Outdoor event cocktail bar service",
    title: "Open-air service",
    caption: "Bar service shaped around the flow, venue, and guest experience.",
    category: "Bar Setups",
    width: 1200,
    height: 900
  },
  {
    src: "/images/gallery/5.png",
    alt: "Cocktail bar setup with warm lighting",
    title: "Evening bar",
    caption: "A warm evening setup for brand nights, teams, and private hosts.",
    category: "Corporate",
    width: 1200,
    height: 900,
    featured: true
  },
  {
    src: "/images/gallery/6.png",
    alt: "Corporate cocktail experience setup",
    title: "Brand gathering",
    caption: "A professional bar experience for launches, socials, and client nights.",
    category: "Corporate",
    width: 1200,
    height: 900
  }
];

export default function GalleryPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page gallery-page">
        <section className="page-hero compact">
          <p className="eyebrow">Gallery</p>
          <h1>Scenes from the neighbourhood.</h1>
          <p>
            A closer look at the bar setups, cocktail details, and event moments that shape
            The Neighbourhood experience.
          </p>
          <div className="hero-actions">
            <Link href="/booking" className="btn secondary">
              Plan Your Event
            </Link>
            <Link href="/faq" className="btn">
              Read FAQs
            </Link>
          </div>
        </section>

        <section className="section gallery-showcase" aria-label="Event gallery">
          <GalleryLightbox images={galleryImages} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
