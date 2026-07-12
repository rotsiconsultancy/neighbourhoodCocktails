import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";

const page = getSeoLandingPage("cocktail-masterclass-nairobi");
export const metadata = { title: page.metaTitle, description: page.description, alternates: { canonical: "/cocktail-masterclass-nairobi" } };
export default function Page() { return <SeoLandingPage page={page} />; }
