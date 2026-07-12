import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";

const page = getSeoLandingPage("wedding-mobile-bar-nairobi");
export const metadata = { title: page.metaTitle, description: page.description, alternates: { canonical: "/wedding-mobile-bar-nairobi" } };
export default function Page() { return <SeoLandingPage page={page} />; }
