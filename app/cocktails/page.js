import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CocktailsShowcase } from "@/components/CocktailsShowcase";

export const metadata = {
  title: "Cocktail Menus for Events in Nairobi",
  description: "Explore signature cocktails, premium classics, and thoughtful mocktails for weddings, corporate events, private parties, and masterclasses in Nairobi.",
  alternates: { canonical: "/cocktails" }
};


export default function CocktailsPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page services-page">
        {/* Page Hero */}
         <section className="page-hero compact">
          <p className="eyebrow">Our Cocktail Offerings</p>
          <h1>Bespoke Mobile Bar & Catering.</h1>
          <p>
            We bring a fully equipped craft cocktail bar, premium ingredients, and professional hospitality directly to your venue. Every detail is shaped around your event's vibe.
          </p>
          <div className="hero-actions">
            <Link href="/booking" className="btn primary1">
              Start Your Booking
            </Link>
            <a href="#cocktails" className="btn">
              Explore Drinks Menu
            </a>
          </div>
        </section>
        {/* Interactive Cocktails Showcase (Embed) */}
        <CocktailsShowcase />

        {/* Standard Inclusions Section */}
        <section className="section inclusions-section">
          <div className="inclusions-card">
            <div className="inclusions-copy">
              <span className="eyebrow">The Full Package</span>
              <h2>What is included in every setup?</h2>
              <p>
                We handle the logistics so you can focus on your guests. Every Neighbourhood bar hire includes these standard premium inclusions:
              </p>
              
              <div className="inclusions-grid">
                <div className="inclusion-item">
                  <h4>Menu Consultation</h4>
                  <p>Custom beverage menu curation matching your theme and preferences.</p>
                </div>
                <div className="inclusion-item">
                  <h4>Premium Glassware</h4>
                  <p>Proper glassware (coupes, collins, rocks) to suit each custom drink.</p>
                </div>
                <div className="inclusion-item">
                  <h4>Mixologists & Servers</h4>
                  <p>Experienced, friendly staff fully dedicated to hospitality.</p>
                </div>
                <div className="inclusion-item">
                  <h4>Bar Logistics</h4>
                  <p>We supply the ice, shakers, garnishes, custom syrups, and cleanup.</p>
                </div>
              </div>

              <div style={{ marginTop: 42 }}>
                <Link href="/booking" className="btn primary1">
                  Customize Your Package
                </Link>
              </div>
            </div>
            <div 
              className="inclusions-visual-panel" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80')" }} 
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
