import { servicesData, cocktailsData } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://www.neighbourhoodcocktails.com";

  const staticRoutes = [
    { url: baseUrl,                      changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/booking`,         changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/services`,        changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cocktails`,       changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/gallery`,         changeFrequency: "weekly",  priority: 0.7 },
    { url: `${baseUrl}/faq`,             changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/feedback`,        changeFrequency: "monthly", priority: 0.5 },
  ].map((route) => ({ ...route, lastModified: new Date() }));

  const serviceRoutes = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.id}`,
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

  return [...staticRoutes, ...serviceRoutes, ...cocktailRoutes];
}
