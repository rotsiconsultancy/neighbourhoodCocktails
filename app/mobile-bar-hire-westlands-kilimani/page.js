import { SeoLandingPage } from "@/components/SeoLandingPage";
import { getSeoLandingPage } from "@/lib/seoLandingPages";

const page = getSeoLandingPage("mobile-bar-hire-westlands-kilimani");

export const metadata = {
  title: page.metaTitle,
  description: page.description,
  alternates: { canonical: "/mobile-bar-hire-westlands-kilimani" }
};

export default function Page() {
  return <SeoLandingPage page={page} />;
}
