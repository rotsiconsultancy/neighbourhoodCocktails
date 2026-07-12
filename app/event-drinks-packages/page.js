import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";

const page = getSeoLandingPage("event-drinks-packages");
export const metadata = { title: page.metaTitle, description: page.description, alternates: { canonical: "/event-drinks-packages" } };
export default function Page() { return <SeoLandingPage page={page} />; }
