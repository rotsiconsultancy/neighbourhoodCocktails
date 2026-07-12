import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";

const page = getSeoLandingPage("mocktail-bar-events-nairobi");
export const metadata = { title: page.metaTitle, description: page.description, alternates: { canonical: "/mocktail-bar-events-nairobi" } };
export default function Page() { return <SeoLandingPage page={page} />; }
