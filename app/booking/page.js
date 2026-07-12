import Image from "next/image";
import { BookingForm } from "@/components/BookingForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Request a Mobile Cocktail Bar Quote in Nairobi",
  description: "Request a tailored quote for mobile bar hire, cocktail catering, bartenders, mocktails, or a cocktail masterclass in Nairobi.",
  alternates: { canonical: "/booking" }
};

export default function BookingPage() {
  return (
    <>
      <SiteHeader />
      <main className="booking-page">
        <section className="booking-hero">
          <p className="eyebrow">Booking request</p>
        </section>

        <section className="booking-layout" aria-label="Booking form and service promise">
          <BookingForm />

          <aside className="promise-panel">
            <Image
              className="promise-media"
              src="/images/gallery/5.png"
              width={900}
              height={520}
              alt="Cocktail service setup with warm lighting"
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
      </main>
      <SiteFooter />
    </>
  );
}
