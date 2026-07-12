import { FeedbackForm } from "@/components/FeedbackForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata = {
  title: "Your Experience",
  description: "Leave feedback on your cocktail experience with The Neighbourhood Cocktails. We appreciate your insights.",
  alternates: {
    canonical: "/feedback",
  },
  openGraph: {
    title: "Your Experience | The Neighbourhood Cocktails",
    description: "Leave feedback on your cocktail experience with The Neighbourhood Cocktails. We appreciate your insights.",
    url: "/feedback",
  },
};

export default function FeedbackPage() {
  return (
    <>
      <SiteHeader />
      <main className="feedback-page">
        <section className="feedback-hero">
          <p className="eyebrow" style={{ color: "var(--gold)", textAlign: "center", marginBottom: "8px" }}>
            The Neighbourhood Cocktails
          </p>
          <h1 style={{ textAlign: "center" }}>Raise a Glass & Tell Us</h1>
          <p style={{ textAlign: "center", maxWidth: "600px", margin: "16px auto 0" }}>
            We craft drinks to bring people together. Tell us how your cocktail tasted, what you loved, and where we can improve.
          </p>
        </section>

        <section className="feedback-container" aria-label="Guest feedback form">
          <FeedbackForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
