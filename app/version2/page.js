import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getHomePage } from "@/sanity/lib/content";

export const metadata = {
  title: "Mobile Bar Hire & Cocktail Catering in Nairobi",
  description: "Mobile bar hire and cocktail catering in Westlands, Kilimani, Lavington, and across Nairobi for weddings, corporate events, private parties, mocktail service, and cocktail masterclasses.",
  alternates: { canonical: "/" }
};

export default async function HomePage() {
  const pageData = await getHomePage();
  const articles = pageData.articlePosts;
  return (
    <>
      <SiteHeader />

      <header className="hero">
        <div className="hero-slideshow" aria-hidden="true">
          {pageData.heroSlides.map((slide) => (
            <div key={slide.image} className="hero-slide" style={{ backgroundImage: `url('${slide.image}')` }} />
          ))}
        </div>
        <div className="hero-content">
          {/* <div className="eyebrow">Private events &bull; Weddings &bull; Corporate experiences &bull; Masterclasses</div> */}
          {/* <h1>
            Host your next <span className="script">unforgettable</span> event.
          </h1> */}
          <h1>
            {pageData.heroHeading || "You make the memories."} <span className="script">{pageData.heroScriptSpan || "We bring the cocktails."}</span>
          </h1>
          <p>{pageData.heroBody || "From intimate celebrations in Kilimani to polished corporate gatherings in Westlands, The Neighbourhood creates cocktail-led experiences that feel warm, stylish, and genuinely memorable."}</p>
          <div className="hero-actions">
            <Link href="/booking" className="btn secondary">
              Book Our Bar
            </Link>
            <Link href="/services" className="btn">
              Explore Our Other Services
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="events">
          <div className="section-header">
            <h2 style={{ color: "var(--orange)" }}>{pageData.eventsHeading || "Events made to feel personal."}</h2>
            <p className="section-intro">{pageData.eventsIntro || "Whether you need full-service cocktail catering, a curated drinks experience, or an interactive class, we shape the setup around your people, your space, and your occasion."}</p>
          </div>

          <div className="cocktail-grid">
            {pageData.eventCards.map((card) => (
              <article className="cocktail-card" key={card.title}>
                <img src={card.image} alt={card.alt || card.title} />
                <div className="cocktail-copy">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link href={card.href || "/booking"} className="price">{card.ctaLabel || "Learn more"}</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section story" id="experience">
          <div className="story-wrap">
            <div className="story-img" style={pageData.storyImage ? { backgroundImage: `url('${pageData.storyImage}')` } : undefined}>
              <div className="story-badge">{pageData.experienceBadge || "We bring the bar."}</div>
            </div>
            <div>
              <div className="eyebrow">{pageData.experienceEyebrow || "The Neighbourhood Experience"}</div>
              <h2>{pageData.experienceHeading || "Not just drinks. A full hosting experience."}</h2>
              <p>{pageData.experiencePara1 || "The Neighbourhood is built for moments where people gather - weddings, brand events, intimate dinners, team celebrations, and private parties that need a little more soul."}</p>
              <p>{pageData.experiencePara2 || "We handle the cocktail experience with style: menu planning, bar setup, drink service, presentation, and the kind of atmosphere that makes guests remember the night."}</p>
              <div className="hero-actions" style={{ marginTop: 32 }}>
                <Link href="/booking" className="btn primary1">
                  Get an Event Quote  
                </Link>
                <Link href="/gallery" className="btn">
                  See The Vibe
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="gallery">
          <div className="section-header">
            <h2>{pageData.galleryHeading || "Built for beautiful gatherings."}</h2>
            <p className="section-intro">{pageData.galleryIntro || "A taste of the setups, details, drinks, and atmosphere that shape every Neighbourhood experience."}</p>
          </div>

          <div className="gallery-grid">
            {pageData.galleryImages.map((item) => <div key={item.image} role="img" aria-label={item.alt || "Neighbourhood Cocktails event"} style={{ backgroundImage: `url('${item.image}')` }} />)}
          </div>
        </section>

        <section className="section notes-section" id="substack">
          <div className="section-header">
            <h2>{pageData.substackHeading || "Tales from the neighbourhood"}</h2>
            <p className="section-intro">{pageData.substackIntro || "Actual Substack reads, hosting ideas, cocktail culture, event guides, and behind-the-scenes thoughts from the people behind the bar."}</p>
          </div>

          <div className="substack-layout">
            <div className="substack-posts">
              {articles.map((post) => (
                <article className="substack-post-card" key={post.title}>
                  <Link className="substack-media" href={post.href} target="_blank" rel="noopener noreferrer" aria-label={`Read ${post.title} on Substack`}>
                    <img src={post.image} alt={post.alt} />
                  </Link>
                  <div className="substack-card-body">
                    <div className="substack-source">{post.source}</div>
                    <div>
                      <h3>{post.title}</h3>
                      <p>{post.text}</p>
                      {post.byline ? <p className="substack-post-embed">{post.byline}</p> : null}
                    </div>
                    <Link className="substack-link" href={post.href} target="_blank" rel="noopener noreferrer">
                      Read on Substack &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section booking" id="book">
          <div className="eyebrow">{pageData.bookingEyebrow || "Plan your event"}</div>
          <h2>{pageData.bookingHeading || "Tell us what you're hosting."}</h2>
          <p>{pageData.bookingBody || "Share the basics and we'll help shape the right cocktail experience - whether it's a wedding, corporate event, masterclass, private dinner, or full-on celebration."}</p>

          <form className="booking-form">
            <input type="text" placeholder="Your name" aria-label="Your name" />
            <select aria-label="Event type" defaultValue="Wedding">
              <option>Wedding</option>
              <option>Corporate event</option>
              <option>Masterclass</option>
              <option>Private party</option>
              <option>Brand activation</option>
            </select>
            <input type="date" aria-label="Event date" />
            <Link className="booking-form-link-secondary" href="/booking">
              Request Quote
            </Link>
          </form>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
