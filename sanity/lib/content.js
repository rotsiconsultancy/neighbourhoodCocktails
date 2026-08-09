import { cocktailsData, servicesData } from "@/lib/data";
import { draftMode } from "next/headers";
import { isSanityConfigured } from "@/sanity/env";
import { sanityClient } from "@/sanity/lib/client";
import { imageUrl } from "@/sanity/lib/image";
import {
  cocktailBySlugQuery,
  cocktailsQuery,
  galleryQuery,
  homePageQuery,
  serviceBySlugQuery,
  servicesQuery,
  servicesPageQuery,
  siteSettingsQuery,
} from "@/sanity/lib/queries";

const fallbackGallery = [
  { src: "/images/gallery/1.png", alt: "Cocktail event setup with branded details", title: "Event bar detail", caption: "A polished setup for guests to gather around before the first round.", category: "Bar Setups", width: 1200, height: 1600, featured: true },
  { src: "/images/gallery/2.jpg", alt: "Guests enjoying a cocktail service moment", title: "Private celebration", caption: "Warm, social service for private parties and intimate celebrations.", category: "Private Events", width: 1200, height: 900 },
  { src: "/images/gallery/3.png", alt: "Cocktail preparation with garnish and glassware", title: "Cocktail craft", caption: "Fresh garnish, balanced recipes, and drinks built for the occasion.", category: "Cocktails", width: 1200, height: 900 },
  { src: "/images/gallery/4.png", alt: "Outdoor event cocktail bar service", title: "Open-air service", caption: "Bar service shaped around the flow, venue, and guest experience.", category: "Bar Setups", width: 1200, height: 900 },
  { src: "/images/gallery/5.png", alt: "Cocktail bar setup with warm lighting", title: "Evening bar", caption: "A warm evening setup for brand nights, teams, and private hosts.", category: "Corporate", width: 1200, height: 900, featured: true },
  { src: "/images/gallery/6.png", alt: "Corporate cocktail experience setup", title: "Brand gathering", caption: "A professional bar experience for launches, socials, and client nights.", category: "Corporate", width: 1200, height: 900 },
];

const fallbackHomePage = {
  heroSlides: [
    { image: "https://images.unsplash.com/photo-1617524455617-ce1e266aa810?auto=format&fit=crop&w=1800&q=80", alt: "Cocktail bar service" },
    { image: "https://images.unsplash.com/photo-1654074517750-f854f7c27d62?w=1800&auto=format&fit=crop&q=80", alt: "Cocktails prepared for an event" },
    { image: "/images/gallery/6.png", alt: "Corporate cocktail bar" },
  ],
  eventCards: [
    { title: "Weddings", description: "Elegant cocktail bars, welcome drinks, signature couple menus, and service that keeps the celebration flowing.", ctaLabel: "Request package", href: "/services/weddings", image: "https://images.unsplash.com/photo-1751814288253-53b10f9083d2?w=900&auto=format&fit=crop&q=75", alt: "Wedding celebration" },
    { title: "Corporate Events", description: "Professional bar experiences for launches, team socials, client nights, end-year parties, and brand activations.", ctaLabel: "Book consultation", href: "/services/corporate-events", image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=900&auto=format&fit=crop&q=75", alt: "Corporate event" },
    { title: "Masterclasses", description: "Hands-on cocktail sessions for teams, friends, brands, and curious drink lovers who want the craft behind the glass.", ctaLabel: "Plan a class", href: "/services/masterclasses", image: "https://images.unsplash.com/photo-1623408859815-22534357b3db?q=80&w=1172&auto=format&fit=crop", alt: "Cocktail masterclass" },
  ],
  galleryImages: [
    { image: "/images/gallery/1.png", alt: "Cocktail event setup" },
    { image: "/images/gallery/2.jpg", alt: "Guests enjoying cocktail service" },
    { image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80", alt: "Cocktail with citrus and herbs" },
  ],
  articlePosts: [
    {
      title: "The Negroni: Italy's Most Uncompromising Cocktail",
      source: "Featured note",
      text: "What Nonna Lulu has been drinking since before you were born.",
      byline: "By Flavia Diamante on Pasta Affair.",
      href: "https://pastaaffair.substack.com/p/the-negroni-italys-most-uncompromising",
      image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?auto=format&fit=crop&w=900&q=80",
      alt: "Negroni cocktail with citrus garnish",
    },
    {
      title: "Today is going to be a hot one here,",
      source: "Cocktail note",
      text: "A triple recipe feature for Maggie Hoffman's Batch Cocktails, plus herbal ice cubes and a smoked salmon dip.",
      byline: "By Rachel Hardacre.",
      href: "https://substack.com/@ontheacre/note/c-264810988",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
      alt: "Refreshing cocktail with citrus and herbs",
    },
    {
      title: "The Mango Mussolini Martini by Slade Wentworth",
      source: "Cocktail note",
      text: "Tyranny is a sober subject. Tonight we drink.",
      byline: "",
      href: "https://dadbriefs.com/p/the-mango-mussolini-martini",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
      alt: "Cocktail with herbs and citrus on a bar",
    },
  ],
  bookingImage: "/images/gallery/5.png",
};

const fallbackHomePageText = {
  heroHeading: "You make the memories.",
  heroScriptSpan: "We bring the cocktails.",
  heroBody: "From intimate celebrations in Kilimani to polished corporate gatherings in Westlands...",
  eventsHeading: "Events made to feel personal.",
  eventsIntro: "Whether you need full-service cocktail catering...",
  experienceEyebrow: "The Neighbourhood Experience",
  experienceHeading: "Not just drinks. A full hosting experience.",
  experiencePara1: "The Neighbourhood is built for moments where people gather...",
  experiencePara2: "We handle the cocktail experience with style...",
  experienceBadge: "We bring the bar.",
  galleryHeading: "Built for beautiful gatherings.",
  galleryIntro: "A taste of the setups, details, drinks, and atmosphere...",
  substackHeading: "Tales from the neighbourhood",
  substackIntro: "Actual Substack reads, hosting ideas, cocktail culture...",
  bookingEyebrow: "Plan your event",
  bookingHeading: "Tell us what you're hosting.",
  bookingBody: "Share the basics and we'll help shape the right cocktail experience...",
};

const fallbackServicesPage = {
  heroEyebrow: "Our Services",
  heroHeading: "Bespoke Mobile Bar & Catering.",
  heroBody: "We bring a fully equipped craft cocktail bar...",
  aestheticsHeading: "Mobile Bars That Fit The Room",
  aestheticsIntro: "Our mobile bar counters are designed to complement your venue...",
  barAesthetics: [
    { name: "The Rustic Oak Bar", desc: "Warm wood grains and ambient lighting...", image: "/images/gallery/1.png" },
    { name: "The Minimalist Cream Bar", desc: "Clean lines and bright, neutral aesthetics...", image: "/images/gallery/5.png" },
    { name: "The Custom Corporate Bar", desc: "A sleek black panel bar designed for custom branding...", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80" },
  ],
  inclusionsEyebrow: "The Full Package",
  inclusionsHeading: "What is included in every setup?",
  inclusionsBody: "We handle the logistics so you can focus on your guests...",
  inclusionItems: [
    { title: "Menu Consultation", body: "Custom beverage menu curation matching your theme and preferences." },
    { title: "Premium Glassware",  body: "Proper glassware (coupes, collins, rocks) to suit each custom drink." },
    { title: "Mixologists & Servers", body: "Experienced, friendly staff fully dedicated to hospitality." },
    { title: "Bar Logistics", body: "We supply the ice, shakers, garnishes, custom syrups, and cleanup." },
  ],
  inclusionsImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
};

const fallbackSettings = {
  primaryLogo: "/images/logo_transparent_trimmed.svg",
  partnerLogo: "/images/Qurative-black.png",
  partnerUrl: "https://qurative.com",
  tagline: "Cocktail-led experiences for weddings, brands, teams, and private celebrations.",
  addressLines: ["Based at Hackhouse Africa", "124 Manyani East Road, Nairobi, Kenya", "Serving Westlands, Kilimani, Lavington & nearby Nairobi areas"],
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=Hackhouse+Africa%2C+124+Manyani+East+Road%2C+Nairobi",
  instagramUrl: "https://www.instagram.com/neighbourhood_cocktails",
  linkedinUrl: "https://www.linkedin.com/company/the-neighbourhood-cocktails",
  substackUrl: "https://substack.com/@theneighbourhoodc",
};

async function fetchContent(query, params, fallback, tag, { allowNull = false } = {}) {
  if (!isSanityConfigured) return fallback;
  try {
    const isDraft = (await draftMode()).isEnabled;
    const client = isDraft
      ? sanityClient.withConfig({ token: process.env.SANITY_API_READ_TOKEN, useCdn: false, perspective: "drafts" })
      : sanityClient;
    const result = await client.fetch(
      query,
      params || {},
      isDraft ? { cache: "no-store" } : { next: { revalidate: 3600, tags: [tag] } }
    );
    if (result === null && allowNull) return null;
    return result ?? fallback;
  } catch (error) {
    console.error(`Sanity ${tag} fetch failed; using local content.`, error);
    return fallback;
  }
}

function normalizeService(service) {
  return {
    ...service,
    image: imageUrl(service.image),
    heroImage: imageUrl(service.heroImage),
    galleryImages: (service.galleryImages || []).map((image) => imageUrl(image)),
    faqs: (service.faqs || []).map((faq) => ({ q: faq.q, a: faq.a })),
  };
}

function normalizeCocktail(cocktail) {
  return { ...cocktail, images: (cocktail.images || []).map((image) => imageUrl(image)) };
}

export async function getServices() {
  const records = await fetchContent(servicesQuery, {}, servicesData, "services");
  return records.map(normalizeService);
}

export async function getService(slug) {
  const fallback = servicesData.find((service) => service.id === slug) || null;
  const record = await fetchContent(serviceBySlugQuery, { slug }, fallback, `service-${slug}`, { allowNull: true });
  return record ? normalizeService(record) : null;
}

export async function getCocktails() {
  const records = await fetchContent(cocktailsQuery, {}, cocktailsData, "cocktails");
  return records.map(normalizeCocktail);
}

export async function getCocktail(slug) {
  const fallback = cocktailsData.find((cocktail) => cocktail.id === slug) || null;
  const record = await fetchContent(cocktailBySlugQuery, { slug }, fallback, `cocktail-${slug}`, { allowNull: true });
  return record ? normalizeCocktail(record) : null;
}

export async function getGalleryImages() {
  const records = await fetchContent(galleryQuery, {}, fallbackGallery, "gallery");
  return records.map((record) => record.src ? record : {
    ...record,
    src: imageUrl(record.image),
    alt: record.alt || record.image?.alt || "Neighbourhood Cocktails event",
    width: record.image?.asset?.metadata?.dimensions?.width || 1200,
    height: record.image?.asset?.metadata?.dimensions?.height || 900,
  });
}

export async function getHomePage() {
  const page = await fetchContent(
    homePageQuery,
    {},
    { ...fallbackHomePage, ...fallbackHomePageText },
    "home-page"
  );
  const mapImages = (items = []) => items.map((item) => ({ ...item, image: imageUrl(item.image) }));
  return {
    ...fallbackHomePage,
    ...fallbackHomePageText,
    ...page,
    heroSlides: mapImages(page.heroSlides || fallbackHomePage.heroSlides),
    eventCards: mapImages(page.eventCards || fallbackHomePage.eventCards),
    galleryImages: mapImages(page.galleryImages || fallbackHomePage.galleryImages),
    articlePosts: mapImages(page.articlePosts?.length ? page.articlePosts : fallbackHomePage.articlePosts),
    storyImage: imageUrl(page.storyImage, { fallback: "" }),
    bookingImage: imageUrl(page.bookingImage, { fallback: fallbackHomePage.bookingImage }),
  };
}

export async function getServicesPage() {
  const page = await fetchContent(servicesPageQuery, {}, fallbackServicesPage, "services-page");
  return {
    ...fallbackServicesPage,
    ...page,
    barAesthetics: (page.barAesthetics || fallbackServicesPage.barAesthetics).map((bar) => ({
      ...bar,
      image: imageUrl(bar.image, { fallback: bar.image }),
    })),
    inclusionsImage: imageUrl(page.inclusionsImage, { fallback: fallbackServicesPage.inclusionsImage }),
  };
}

export async function getSiteSettings() {
  const settings = await fetchContent(siteSettingsQuery, {}, fallbackSettings, "site-settings");
  return {
    ...fallbackSettings,
    ...settings,
    primaryLogo: imageUrl(settings.primaryLogo, { fallback: fallbackSettings.primaryLogo }),
    partnerLogo: imageUrl(settings.partnerLogo, { fallback: fallbackSettings.partnerLogo }),
    defaultShareImages: (settings.defaultShareImages || []).map((image) => imageUrl(image)),
  };
}
