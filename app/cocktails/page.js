import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CocktailsShowcase } from "@/components/CocktailsShowcase";

export const metadata = {
  title: "Services & Cocktails | Bespoke Mobile Bar Hire",
  description: "Explore our professional mobile bar catering services for weddings, corporate activations, private parties, and mixology classes. Curate your event menu from our signature craft cocktails and premium mocktails."
};


export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page services-page">
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
                <Link href="/booking" className="btn secondary">
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
