import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getServices } from "@/sanity/lib/content";
import { getServiceUrl } from "@/lib/serviceUrls";

export const metadata = {
  title: "Mobile Bar Hire for Events in Nairobi",
  description:
    "Explore mobile bar catering for weddings, corporate activations, private parties, and mixology classes across Westlands, Kilimani, Lavington, and Nairobi.",
  alternates: { canonical: "/services" },
};

const barAesthetics = [
  {
    name: "The Rustic Oak Bar",
    desc: "Warm wood grains and ambient lighting. Perfect for rustic weddings, outdoor events, and cozy private gatherings.",
    image: "/images/gallery/1.png",
  },
  {
    name: "The Minimalist Cream Bar",
    desc: "Clean lines and bright, neutral aesthetics. Fits beautifully into modern indoor spaces, art studios, and contemporary parties.",
    image: "/images/gallery/5.png",
  },
  {
    name: "The Custom Corporate Bar",
    desc: "A sleek black panel bar designed for custom branding overlays, logos, and high-visibility corporate socials.",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
  },
];

export default async function ServicesPage() {
  const servicesData = await getServices();
  return (
    <>
      <SiteHeader />
      <main className="inner-page services-page">
        {/* Page Hero */}
        <section className="page-hero compact">
          <p className="eyebrow">Our Services</p>
          <h1>Bespoke Mobile Bar &amp; Catering.</h1>
          <p>
            We bring a fully equipped craft cocktail bar, premium ingredients,
            and professional hospitality directly to your venue. Every detail is
            shaped around your event's vibe.
          </p>
          <div className="hero-actions">
            <Link href="/booking" className="btn secondary">
              Start Your Booking
            </Link>
            <a href="#cocktails" className="btn">
              Explore Drinks Menu
            </a>
          </div>
        </section>

        {/* Core Services Pillars (Alternating Layout) */}
        <section
          className="section services-pillars-section"
          aria-label="Event catering packages"
        >
          <div className="pillars-list">
            {servicesData.map((pillar, idx) => (
              <div
                key={pillar.id}
                className={`pillar-row ${idx % 2 !== 0 ? "reverse" : ""}`}
              >
                <Link
                  href={getServiceUrl(pillar.id)}
                  className="pillar-image-container"
                >
                  <img src={pillar.image} alt={pillar.alt} />
                </Link>
                <div className="pillar-copy-container">
                  <span className="eyebrow">{pillar.eyebrow}</span>
                  <h2>
                    <Link href={getServiceUrl(pillar.id)} className="pillar-title-link">
                      {pillar.title}
                    </Link>
                  </h2>
                  <p>{pillar.description}</p>
                  <div className="pillar-actions">
                    <Link
                      href={getServiceUrl(pillar.id)}
                      className="btn secondary"
                    >
                      Learn More
                    </Link>
                    <Link href="/booking" className="btn-service-action">
                      Book {pillar.title} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bar Aesthetics Gallery */}
        <section className="section bar-aesthetics-section">
          <div className="section-header center">
            <h2>Mobile Bars That Fit The Room</h2>
            <p className="section-intro center-intro">
              Our mobile bar counters are designed to complement your venue's
              styling, not compromise it. Choose from our curated catalog of
              physical bar setups.
            </p>
          </div>

          <div className="aesthetics-grid">
            {barAesthetics.map((bar) => (
              <div key={bar.name} className="aesthetic-card">
                <div className="aesthetic-img-wrapper">
                  <img src={bar.image} alt={bar.name} />
                </div>
                <div className="aesthetic-copy">
                  <h3>{bar.name}</h3>
                  <p>{bar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Standard Inclusions Section */}
        <section className="section inclusions-section">
          <div className="inclusions-card">
            <div className="inclusions-copy">
              <span className="eyebrow">The Full Package</span>
              <h2>What is included in every setup?</h2>
              <p>
                We handle the logistics so you can focus on your guests. Every
                Neighbourhood bar hire includes these standard premium
                inclusions:
              </p>

              <div className="inclusions-grid">
                <div className="inclusion-item">
                  <h4>Menu Consultation</h4>
                  <p>
                    Custom beverage menu curation matching your theme and
                    preferences.
                  </p>
                </div>
                <div className="inclusion-item">
                  <h4>Premium Glassware</h4>
                  <p>
                    Proper glassware (coupes, collins, rocks) to suit each
                    custom drink.
                  </p>
                </div>
                <div className="inclusion-item">
                  <h4>Mixologists &amp; Servers</h4>
                  <p>
                    Experienced, friendly staff fully dedicated to hospitality.
                  </p>
                </div>
                <div className="inclusion-item">
                  <h4>Bar Logistics</h4>
                  <p>
                    We supply the ice, shakers, garnishes, custom syrups, and
                    cleanup.
                  </p>
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
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80')",
              }}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
