import { SiteHeaderClient } from "@/components/SiteHeaderClient";
import { getSiteSettings } from "@/sanity/lib/content";

export async function SiteHeader() {
  const settings = await getSiteSettings();
  return <SiteHeaderClient settings={settings} />;
}
