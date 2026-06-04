import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { servicesData } from "@/lib/data";

export async function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: `${service.title} | The Neighbourhood Cocktails`,
    description: service.description,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.id === slug);
  if (!service) notFound();

  const otherServices = servicesData.filter((s) => s.id !== slug);

  return (
    <>
      <SiteHeader />
      <main className="inner-page service-detail-page">

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          className="service-detail-hero"
          style={{ backgroundImage: `url('${service.heroImage}')` }}
          aria-label={`${service.title} hero`}
        >
          <div className="service-detail-hero-overlay" />
          <div className="service-detail-hero-content">
            <Link href="/services" className="service-back-link">
              ← All Services
            </Link>
            <p className="eyebrow">{service.eyebrow}</p>
            <h1>{service.title}</h1>
            <p className="service-hero-tagline">{service.tagline}</p>
            <div className="hero-actions">
              <Link href="/booking" className="btn secondary">
                Book This Service
              </Link>
              <a href="#details" className="btn">
                See What's Included
              </a>
            </div>
          </div>
        </section>

        {/* ── Overview ─────────────────────────────────────────────── */}
        <section className="section service-overview-section" id="details">
          <div className="service-overview-grid">
            <div className="service-overview-text">
              <span className="eyebrow" style={{ color: service.accentColor }}>
                The Experience
              </span>
              <h2>{service.title}</h2>
              {service.longDescription.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="service-overview-aside">
              <div className="service-highlights-card">
                <h3>What's Included</h3>
                <ul className="service-highlights-list">
                  {service.highlights.map((h) => (
                    <li key={h}>
                      <span className="highlight-check" style={{ color: service.accentColor }}>✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <Link href="/booking" className="btn secondary" style={{ marginTop: 32, width: "100%", justifyContent: "center" }}>
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Gallery Strip ─────────────────────────────────────────── */}
        <section className="service-gallery-strip" aria-label="Service photo gallery">
          {service.galleryImages.map((src, i) => (
            <div key={i} className="service-gallery-img">
              <img src={src} alt={`${service.title} gallery photo ${i + 1}`} />
            </div>
          ))}
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <section className="section service-faq-section">
          <div className="service-faq-inner">
            <div className="service-faq-header">
              <span className="eyebrow" style={{ color: service.accentColor }}>
                Common Questions
              </span>
              <h2>Frequently Asked</h2>
            </div>
            <div className="service-faq-list">
              {service.faqs.map((faq, i) => (
                <div key={i} className="service-faq-item">
                  <h4>{faq.q}</h4>
                  <p>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Other Services ───────────────────────────────────────── */}
        <section className="section service-related-section">
          <div className="section-header center">
            <h2>Explore Other Services</h2>
            <p className="section-intro center-intro">
              Every event is different. See the other experiences we offer.
            </p>
          </div>
          <div className="service-related-grid">
            {otherServices.map((s) => (
              <Link key={s.id} href={`/services/${s.id}`} className="service-related-card">
                <div
                  className="service-related-img"
                  style={{ backgroundImage: `url('${s.image}')` }}
                />
                <div className="service-related-copy">
                  <span className="eyebrow" style={{ color: "var(--gold)" }}>{s.eyebrow}</span>
                  <h3>{s.title}</h3>
                  <span className="service-related-arrow">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA Banner ───────────────────────────────────────────── */}
        <section className="service-cta-banner">
          <div className="service-cta-inner">
            <span className="eyebrow">Ready to get started?</span>
            <h2>Let's Build Your Event.</h2>
            <p>Tell us the basics and we'll shape the right experience around your occasion.</p>
            <div className="hero-actions" style={{ justifyContent: "center" }}>
              <Link href="/booking" className="btn secondary">
                Start Your Booking
              </Link>
              <Link href="/cocktails" className="btn">
                Browse Our Cocktails
              </Link>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
