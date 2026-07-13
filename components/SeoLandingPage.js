import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function SeoLandingPage({ page }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: page.title,
        serviceType: page.title,
        areaServed: (page.areaServed || ["Nairobi"]).map((name) => ({ "@type": "Place", name })),
        provider: {
          "@type": "LocalBusiness",
          name: "The Neighbourhood Cocktails",
          url: "https://www.neighbourhoodcocktails.com",
          areaServed: "Nairobi, Kenya"
        },
        url: `https://www.neighbourhoodcocktails.com/${page.slug}`
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer }
        }))
      }
    ]
  };

  return (
    <>
      <SiteHeader />
      <main className="inner-page seo-landing-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <section className="page-hero compact">
          <p className="eyebrow">Nairobi event bar service</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <p>{page.audience}</p>
          <div className="hero-actions">
            <Link href="/booking" className="btn primary1">Request a Quote</Link>
            <Link href="/faq" className="btn">Read Booking FAQs</Link>
          </div>
        </section>

        {page.sections.map(([heading, content]) => (
          <section className="section seo-content-section" key={heading}>
            <div className="section-header">
              <h2>{heading}</h2>
            </div>
            {content.length > 1 ? (
              <ul className="seo-bullet-list">
                {content.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : <p className="section-intro">{content[0]}</p>}
          </section>
        ))}

        <section className="section faq-section" aria-label={`${page.title} frequently asked questions`}>
          <div className="faq-sidebar">
            <p className="eyebrow">Before you enquire</p>
            <h2>Useful answers before you plan the bar.</h2>
          </div>
          <div className="faq-groups">
            <div className="faq-list">
              {page.faqs.map(([question, answer]) => (
                <details className="faq-item" key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section seo-link-section">
          <p className="eyebrow">Next step</p>
          <h2>Tell us what you are planning.</h2>
          <p>Share the date, location, guest count, and the kind of experience you want. We will help shape the practical next step.</p>
          <div className="hero-actions">
            <Link href="/booking" className="btn primary1">Start a Booking Request</Link>
            {page.related.map((href) => <Link href={href} className="btn" key={href}>Explore {href.split("/").filter(Boolean).pop()}</Link>)}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
