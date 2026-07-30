const serviceUrlOverrides = {
  masterclasses: "/cocktail-masterclass-nairobi",
};

export function getServiceUrl(slug) {
  return serviceUrlOverrides[slug] || `/services/${slug}`;
}

export function isCanonicalServiceRoute(slug) {
  return !serviceUrlOverrides[slug];
}
