export const servicesQuery = `*[_type == "service" && visible != false] | order(order asc, title asc) {
  _id, "id": slug.current, title, eyebrow, tagline, description, longDescription,
  highlights, image, heroImage, alt, accentColor, galleryImages, faqs,
  order, visible, _updatedAt
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug && visible != false][0] {
  _id, "id": slug.current, title, eyebrow, tagline, description, longDescription,
  highlights, image, heroImage, alt, accentColor, galleryImages, faqs,
  order, visible, _updatedAt
}`;

export const cocktailsQuery = `*[_type == "cocktail" && visible != false] | order(order asc, name asc) {
  _id, "id": slug.current, name, type, vibes, tagline, description, longDescription,
  images, tastingNotes, ingredients, method, glass, garnish, profile, occasion,
  pairsWell, order, visible, _updatedAt
}`;

export const cocktailBySlugQuery = `*[_type == "cocktail" && slug.current == $slug && visible != false][0] {
  _id, "id": slug.current, name, type, vibes, tagline, description, longDescription,
  images, tastingNotes, ingredients, method, glass, garnish, profile, occasion,
  pairsWell, order, visible, _updatedAt
}`;

export const galleryQuery = `*[_type == "galleryImage" && visible != false] | order(order asc, title asc) {
  _id, image, alt, title, caption, category, featured, order, visible, _updatedAt
}`;

export const homePageQuery = `*[_type == "homePage"][0] {
  heroSlides, eventCards, storyImage, galleryImages, articlePosts, bookingImage,
  heroHeading, heroScriptSpan, heroBody,
  eventsHeading, eventsIntro,
  experienceEyebrow, experienceHeading, experiencePara1, experiencePara2, experienceBadge,
  galleryHeading, galleryIntro,
  substackHeading, substackIntro,
  bookingEyebrow, bookingHeading, bookingBody,
  _updatedAt
}`;

export const servicesPageQuery = `*[_type == "servicesPage"][0] {
  heroEyebrow, heroHeading, heroBody,
  aestheticsHeading, aestheticsIntro,
  barAesthetics[]{ name, desc, "image": image },
  inclusionsEyebrow, inclusionsHeading, inclusionsBody,
  inclusionItems[]{ title, body },
  "inclusionsImage": inclusionsImage,
  _updatedAt
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  primaryLogo, partnerLogo, partnerUrl, tagline, addressLines, directionsUrl,
  instagramUrl, linkedinUrl, substackUrl, defaultShareImages, _updatedAt
}`;
