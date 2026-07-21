import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cocktailsData, servicesData } from "../lib/data.js";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const client = createClient({ projectId, dataset, token, apiVersion: "2026-07-19", useCdn: false });
const cache = new Map();
const keyed = (items) => items.map((item, index) => ({ ...item, _key: `item-${index + 1}` }));

async function downloadRemoteImage(source, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`);
        if (response.status < 500 && response.status !== 408 && response.status !== 429) throw error;
        lastError = error;
      } else {
        return response;
      }
    } catch (error) {
      lastError = error;
    }

    if (attempt < attempts) {
      console.warn(`Image download attempt ${attempt}/${attempts} failed for ${source}. Retrying...`);
      await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
    }
  }

  throw new Error(`Unable to download ${source} after ${attempts} attempts`, { cause: lastError });
}

async function uploadImage(source, alt) {
  if (!source) throw new Error(`Missing image source for "${alt}".`);
  if (cache.has(source)) return { ...cache.get(source), alt };
  let body;
  let filename = path.basename(source);
  let contentType;
  if (/^https?:\/\//.test(source)) {
    const response = await downloadRemoteImage(source);
    body = Buffer.from(await response.arrayBuffer());
    contentType = response.headers.get("content-type") || undefined;
    filename = path.basename(new URL(source).pathname) || "remote-image.jpg";
  } else {
    body = await readFile(path.join(root, "public", source.replace(/^\//, "")));
  }
  const asset = await client.assets.upload("image", body, { filename, contentType });
  const image = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  cache.set(source, image);
  return { ...image, alt };
}

for (const [index, service] of servicesData.entries()) {
  await client.createOrReplace({
    ...service, _id: `service-${service.id}`, _type: "service",
    slug: { _type: "slug", current: service.id },
    image: await uploadImage(service.image, service.alt),
    heroImage: await uploadImage(service.heroImage, service.alt),
    galleryImages: keyed(await Promise.all(service.galleryImages.map((source, i) => uploadImage(source, `${service.title} gallery photo ${i + 1}`)))),
    faqs: keyed(service.faqs), order: (index + 1) * 10, visible: true,
  });
}

for (const [index, cocktail] of cocktailsData.entries()) {
  await client.createOrReplace({
    ...cocktail, _id: `cocktail-${cocktail.id}`, _type: "cocktail",
    slug: { _type: "slug", current: cocktail.id },
    images: keyed(await Promise.all(cocktail.images.map((source, i) => uploadImage(source, `${cocktail.name} image ${i + 1}`)))),
    order: (index + 1) * 10, visible: true,
  });
}

const gallery = [
  ["/images/gallery/1.png", "Cocktail event setup with branded details", "Event bar detail", "A polished setup for guests to gather around before the first round.", "Bar Setups", true],
  ["/images/gallery/2.jpg", "Guests enjoying a cocktail service moment", "Private celebration", "Warm, social service for private parties and intimate celebrations.", "Private Events", false],
  ["/images/gallery/3.png", "Cocktail preparation with garnish and glassware", "Cocktail craft", "Fresh garnish, balanced recipes, and drinks built for the occasion.", "Cocktails", false],
  ["/images/gallery/4.png", "Outdoor event cocktail bar service", "Open-air service", "Bar service shaped around the flow, venue, and guest experience.", "Bar Setups", false],
  ["/images/gallery/5.png", "Cocktail bar setup with warm lighting", "Evening bar", "A warm evening setup for brand nights, teams, and private hosts.", "Corporate", true],
  ["/images/gallery/6.png", "Corporate cocktail experience setup", "Brand gathering", "A professional bar experience for launches, socials, and client nights.", "Corporate", false],
];
for (const [index, [source, alt, title, caption, category, featured]] of gallery.entries()) {
  await client.createOrReplace({ _id: `gallery-${index + 1}`, _type: "galleryImage", image: await uploadImage(source, alt), title, caption, category, featured, order: (index + 1) * 10, visible: true });
}

const hero = [
  ["https://images.unsplash.com/photo-1617524455617-ce1e266aa810?auto=format&fit=crop&w=1800&q=80", "Cocktail bar service"],
  ["https://images.unsplash.com/photo-1654074517750-f854f7c27d62?w=1800&auto=format&fit=crop&q=80", "Cocktails prepared for an event"],
  ["/images/gallery/6.png", "Corporate cocktail bar"],
];
const eventCards = [
  ["Weddings", "Elegant cocktail bars, welcome drinks, signature couple menus, and service that keeps the celebration flowing.", "Request package", "https://images.unsplash.com/photo-1751814288253-53b10f9083d2?w=900&auto=format&fit=crop&q=75", "Wedding celebration"],
  ["Corporate Events", "Professional bar experiences for launches, team socials, client nights, end-year parties, and brand activations.", "Book consultation", "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=900&auto=format&fit=crop&q=75", "Corporate event"],
  ["Masterclasses", "Hands-on cocktail sessions for teams, friends, brands, and curious drink lovers who want the craft behind the glass.", "Plan a class", "https://images.unsplash.com/photo-1623408859815-22534357b3db?q=80&w=1172&auto=format&fit=crop", "Cocktail masterclass"],
];
const articles = [
  ["The Negroni: Italy's Most Uncompromising Cocktail", "Featured note", "What Nonna Lulu has been drinking since before you were born.", "By Flavia Diamante on Pasta Affair.", "https://pastaaffair.substack.com/p/the-negroni-italys-most-uncompromising", "/images/gallery/3.png", "Negroni cocktail with citrus garnish"],
  ["Today is going to be a hot one here,", "Cocktail note", "A triple recipe feature for outdoor sips and snacks.", "By Rachel Hardacre.", "https://substack.com/@ontheacre/note/c-264810988", "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80", "Refreshing cocktail with citrus and herbs"],
  ["The Mango Mussolini Martini by Slade Wentworth", "Cocktail note", "Tyranny is a sober subject. Tonight we drink.", "", "https://dadbriefs.com/p/the-mango-mussolini-martini", "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80", "Cocktail with herbs and citrus on a bar"],
];
await client.createOrReplace({
  _id: "homePage", _type: "homePage",
  heroSlides: keyed(await Promise.all(hero.map(async ([source, alt]) => ({ image: await uploadImage(source, alt) })))),
  eventCards: keyed(await Promise.all(eventCards.map(async ([title, description, ctaLabel, source, alt]) => ({ title, description, ctaLabel, href: "/booking", image: await uploadImage(source, alt) })))),
  galleryImages: keyed(await Promise.all(gallery.slice(0, 3).map(async ([source, alt]) => ({ image: await uploadImage(source, alt) })))),
  articlePosts: keyed(await Promise.all(articles.map(async ([title, source, text, byline, href, image, alt]) => ({ title, source, text, byline, href, image: await uploadImage(image, alt) })))),
  storyImage: await uploadImage("/images/gallery/4.png", "Neighbourhood Cocktails event experience"),
  bookingImage: await uploadImage("/images/gallery/5.png", "Cocktail service setup with warm lighting"),
});

await client.createOrReplace({
  _id: "siteSettings", _type: "siteSettings",
  primaryLogo: await uploadImage("/images/logo_transparent_trimmed.svg", "The Neighbourhood Cocktails"),
  partnerLogo: await uploadImage("/images/Qurative-black.png", "Qurative"), partnerUrl: "https://qurative.com",
  tagline: "Cocktail-led experiences for weddings, brands, teams, and private celebrations.",
  addressLines: ["Based at Hackhouse Africa", "124 Manyani East Road, Nairobi, Kenya", "Serving Westlands, Kilimani, Lavington & nearby Nairobi areas"],
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=Hackhouse+Africa%2C+124+Manyani+East+Road%2C+Nairobi",
  instagramUrl: "https://www.instagram.com/neighbourhood_cocktails", linkedinUrl: "https://www.linkedin.com/company/the-neighbourhood-cocktails", substackUrl: "https://substack.com/@theneighbourhoodc",
  defaultShareImages: keyed(await Promise.all([["/images/green-cream.jpg", "The Neighbourhood Cocktails brand artwork"], ["/images/black.jpg", "The Neighbourhood Cocktails logo on black"]].map(([source, alt]) => uploadImage(source, alt)))),
});

console.log(`Seeded The Neighbourhood Cocktails content into ${projectId}/${dataset}.`);
