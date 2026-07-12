import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";

const page = getSeoLandingPage("corporate-cocktail-catering-nairobi");
export const metadata = { title: page.metaTitle, description: page.description, alternates: { canonical: "/corporate-cocktail-catering-nairobi" } };
export default function Page() { return <SeoLandingPage page={page} />; }
