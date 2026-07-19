import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getHomePage } from "@/sanity/lib/content";

export const metadata = {
  title: "Request a Mobile Cocktail Bar Quote in Nairobi",
  description: "Request a tailored quote for mobile bar hire, cocktail catering, bartenders, mocktails, or a cocktail masterclass in Nairobi.",
  alternates: { canonical: "/booking" }
};

const locationMapUrl = "https://www.google.com/maps/search/?api=1&query=Hackhouse+Africa%2C+124+Manyani+East+Road%2C+Nairobi";

const locationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "The Neighbourhood Cocktails",
  url: "https://www.neighbourhoodcocktails.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "124 Manyani East Road",
    addressLocality: "Nairobi",
    addressCountry: "KE"
  },
  location: {
    "@type": "Place",
    name: "Hackhouse Africa",
    address: {
      "@type": "PostalAddress",
      streetAddress: "124 Manyani East Road",
      addressLocality: "Nairobi",
      addressCountry: "KE"
    }
  }
};

export default async function BookingPage() {
  const pageData = await getHomePage();
  return (
    <>
      <SiteHeader />
      <main className="booking-page">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }} />
        <section className="booking-hero">
          <p className="eyebrow">Booking request</p>
        </section>

        <section className="booking-layout" aria-label="Booking form and service promise">
          <BookingForm />

          <aside className="promise-panel">
            <Image
              className="promise-media"
              src={pageData.bookingImage}
              width={900}
              height={520}
              alt="Cocktail service setup with warm lighting"
              unoptimized={pageData.bookingImage.startsWith("http")}
            />
            <p className="eyebrow">Our promise</p>
            <h2>A bar that fits the room.</h2>
            <p>We help translate the event into a drinks experience: polished enough for the occasion, relaxed enough for guests to enjoy.</p>
            <div className="promise-list">
              <div>
                <h3>Certified mixologists</h3>
                <p>Experienced bartenders with a warm service style.</p>
              </div>
              <div>
                <h3>Fresh ingredients</h3>
                <p>Balanced drinks, thoughtful garnish, and alcohol-free options.</p>
              </div>
              <div>
                <h3>Event-ready setup</h3>
                <p>Menu guidance, bar tools, glassware planning, and service flow.</p>
              </div>
            </div>
          </aside>
        </section>

        <section className="booking-location" aria-labelledby="location-heading">
          <div className="booking-location-copy">
            <p className="eyebrow">Find the bar</p>
            <h2 id="location-heading">Meet us at Hackhouse Africa.</h2>
            <p>
              Our current bar is based at Hackhouse Africa on Manyani East Road in Nairobi. Visit for a conversation, a tasting, or to discuss the practical details of your event.
            </p>
            <address>
              Hackhouse Africa<br />
              124 Manyani East Road<br />
              Nairobi, Kenya
            </address>
            <a className="btn secondary" href={locationMapUrl} target="_blank" rel="noopener noreferrer">
              Get directions
            </a>
          </div>
          <div className="booking-location-map">
            <iframe
              title="Map showing Hackhouse Africa at 124 Manyani East Road, Nairobi"
              src="https://www.google.com/maps?q=Hackhouse+Africa%2C+124+Manyani+East+Road%2C+Nairobi&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
