import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "FAQ",
  description: "Common questions about booking The Neighbourhood Cocktails for events."
};

const faqGroups = [
  {
    title: "Booking & Availability",
    questions: [
      {
        question: "How early should I book?",
        answer:
          "For weddings and larger corporate events, reach out as early as possible so we can plan staffing, setup, and drinks properly. Smaller private events can often be handled with a shorter lead time, depending on availability."
      },
      {
        question: "What details do you need before quoting?",
        answer:
          "We usually need the event date, location, guest count, event type, preferred service style, and any drink preferences. If some details are still pending, we can start with estimates."
      },
      {
        question: "Do you handle events outside Nairobi?",
        answer:
          "Yes, subject to availability and logistics. Travel, setup time, and transport requirements are factored into the final quote."
      }
    ]
  },
  {
    title: "Packages & Pricing",
    questions: [
      {
        question: "Do you have fixed packages?",
        answer:
          "We can shape packages around the event format, guest count, and service style. The final quote depends on drinks, staffing, setup, duration, and location."
      },
      {
        question: "Can you work with a specific budget?",
        answer:
          "Yes. Share the budget range and priorities, then we can recommend a setup that keeps the experience polished without overbuilding the bar."
      },
      {
        question: "Do you offer mocktails?",
        answer:
          "Yes. Alcohol-free drinks can be included as a dedicated mocktail menu or as part of a balanced mixed menu."
      }
    ]
  },
  {
    title: "Event Setup",
    questions: [
      {
        question: "Do you bring the bar setup?",
        answer:
          "Yes. We can bring the bar tools, service setup, menu guidance, and staffing needed for the agreed package. Venue-specific needs are confirmed during planning."
      },
      {
        question: "How much space do you need?",
        answer:
          "That depends on the guest count and service style. For most events, we need a stable service area with enough room for bartenders, glassware, ingredients, and guest flow."
      },
      {
        question: "Can the menu match our event theme?",
        answer:
          "Yes. Signature cocktails, garnish choices, naming, and non-alcoholic options can be adapted to the event tone."
      }
    ]
  },
  {
    title: "Payments & Logistics",
    questions: [
      {
        question: "Is a deposit required?",
        answer:
          "A deposit is typically required to secure the date. Payment terms are shared with the quote so both sides are clear before planning begins."
      },
      {
        question: "What happens after I submit the booking form?",
        answer:
          "We review the details, ask any follow-up questions, then recommend the most suitable service setup and quote."
      },
      {
        question: "Can I speak to someone directly?",
        answer:
          "Yes. You can use the WhatsApp button on the site or start with the booking form if you prefer to share details first."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page faq-page">
        <section className="page-hero compact">
          <p className="eyebrow">FAQ</p>
          <h1>Questions before we bring the bar?</h1>
          <p>
            Clear answers on booking, packages, event setup, drinks, and what happens after
            you send a request.
          </p>
          <div className="hero-actions">
            <Link href="/booking" className="btn primary">
              Start a Booking Request
            </Link>
            <Link href="/gallery" className="btn">
              View Gallery
            </Link>
          </div>
        </section>

        <section className="section faq-section" aria-label="Frequently asked questions">
          <aside className="faq-sidebar">
            <p className="eyebrow">Quick guide</p>
            <h2>Find the detail you need.</h2>
            <p>
              The FAQ is grouped around the questions hosts usually ask before confirming a
              cocktail experience.
            </p>
          </aside>

          <div className="faq-groups">
            {faqGroups.map((group) => (
              <section className="faq-group" key={group.title}>
                <h2>{group.title}</h2>
                <div className="faq-list">
                  {group.questions.map((item) => (
                    <details className="faq-item" key={item.question}>
                      <summary>{item.question}</summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <section className="section faq-cta">
          <p className="eyebrow">Still planning?</p>
          <h2>Tell us the event details and we will shape the right setup.</h2>
          <Link href="/booking" className="btn primary">
            Request a Quote
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
