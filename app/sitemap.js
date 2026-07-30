import { getCocktails, getServices } from "@/sanity/lib/content";
import { seoLandingPages } from "@/lib/seoLandingPages";
import { isCanonicalServiceRoute } from "@/lib/serviceUrls";

export default async function sitemap() {
  const [servicesData, cocktailsData] = await Promise.all([getServices(), getCocktails()]);
  const baseUrl = "https://www.neighbourhoodcocktails.com";

  const staticRoutes = [
    { url: baseUrl,                      changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/booking`,         changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services`,        changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cocktails`,       changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/gallery`,         changeFrequency: "weekly",  priority: 0.7 },
    { url: `${baseUrl}/faq`,             changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/feedback`,        changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`,         changeFrequency: "yearly",  priority: 0.3 },
  ].map((route) => ({ ...route, lastModified: new Date() }));

  const serviceRoutes = servicesData
    .filter((service) => isCanonicalServiceRoute(service.id))
    .map((service) => ({
      url: `${baseUrl}/services/${service.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  const cocktailRoutes = cocktailsData.map((c) => ({
    url: `${baseUrl}/cocktails/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const seoRoutes = seoLandingPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...cocktailRoutes, ...seoRoutes];
}
