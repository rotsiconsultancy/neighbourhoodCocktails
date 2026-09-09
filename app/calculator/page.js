import { CostCalculator } from "@/components/CostCalculator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPricingConfig } from "@/sanity/lib/content";

export const metadata = {
  title: "Event Drinks Cost Calculator | The Neighbourhood Cocktails",
  description: "Calculate an estimated budget for your mobile bar hire, cocktail catering, beer, wine, spirits, and mocktails for events in Nairobi.",
  alternates: { canonical: "/calculator" },
};

export default async function CalculatorPage() {
  const pricingConfig = await getPricingConfig();

  return (
    <>
      <SiteHeader />
      <main className="calculator-page" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
        <section className="calculator-hero" style={{ textAlign: "center", padding: "0 6vw 40px" }}>
          <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: "8px" }}>
            Event Budget Estimator
          </p>
          <h1 style={{ fontSize: "3.8rem", textTransform: "uppercase", justifyContent: "center" }}>Calculate Your Drinks Budget</h1>
          <p style={{ maxWidth: "640px", margin: "16px auto 0", opacity: 0.88, fontSize: "1.1rem", lineHeight: 1.6 }}>
            Customize your guest count, event duration, and preferred drink menus to get an instant estimate tailored for your Nairobi event.
          </p>
        </section>

        <section className="section" style={{ paddingTop: 0 }}>
          <CostCalculator pricingConfig={pricingConfig} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
