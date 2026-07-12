import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";

const page = getSeoLandingPage("brand-activation-bar-service");
export const metadata = { title: page.metaTitle, description: page.description, alternates: { canonical: "/brand-activation-bar-service" } };
export default function Page() { return <SeoLandingPage page={page} />; }
