import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getServices, getServicesPage } from "@/sanity/lib/content";
import { getServiceUrl } from "@/lib/serviceUrls";

export const metadata = {
  title: "Mobile Bar Hire for Events in Nairobi",
  description:
    "Explore mobile bar catering for weddings, corporate activations, private parties, and mixology classes across Westlands, Kilimani, Lavington, and Nairobi.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const servicesData = await getServices();
  const pageContent = await getServicesPage();
  return (
    <>
      <SiteHeader />
      <main className="inner-page services-page">
        {/* Page Hero */}
        <section className="page-hero compact">
          <p className="eyebrow">{pageContent.heroEyebrow || "Our Services"}</p>
          <h1>{pageContent.heroHeading || "Bespoke Mobile Bar & Catering."}</h1>
          <p>
            {pageContent.heroBody || "We bring a fully equipped craft cocktail bar, premium ingredients, and professional hospitality directly to your venue. Every detail is shaped around your event's vibe."}
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
            <h2>{pageContent.aestheticsHeading || "Mobile Bars That Fit The Room"}</h2>
            <p className="section-intro center-intro">
              {pageContent.aestheticsIntro || "Our mobile bar counters are designed to complement your venue's styling, not compromise it. Choose from our curated catalog of physical bar setups."}
            </p>
          </div>

          <div className="aesthetics-grid">
            {pageContent.barAesthetics?.map((bar) => (
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
              <span className="eyebrow">{pageContent.inclusionsEyebrow || "The Full Package"}</span>
              <h2>{pageContent.inclusionsHeading || "What is included in every setup?"}</h2>
              <p>
                {pageContent.inclusionsBody || "We handle the logistics so you can focus on your guests. Every Neighbourhood bar hire includes these standard premium inclusions:"}
              </p>

              <div className="inclusions-grid">
                {pageContent.inclusionItems?.map((item) => (
                  <div className="inclusion-item" key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.body}</p>
                  </div>
                ))}
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
                backgroundImage: `url('${pageContent.inclusionsImage || "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80"}')`,
              }}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
