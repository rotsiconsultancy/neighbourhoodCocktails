import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";

const page = getSeoLandingPage("private-party-bartenders-nairobi");
export const metadata = { title: page.metaTitle, description: page.description, alternates: { canonical: "/private-party-bartenders-nairobi" } };
export default function Page() { return <SeoLandingPage page={page} />; }
