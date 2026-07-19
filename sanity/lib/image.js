import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/sanity/lib/client";

const builder = createImageUrlBuilder(sanityClient);

export function imageUrl(source, options = {}) {
  if (!source) return options.fallback || "";
  if (typeof source === "string") return source;

  let image = builder.image(source).auto("format").fit("max");
  if (options.width) image = image.width(options.width);
  if (options.height) image = image.height(options.height);
  if (options.quality) image = image.quality(options.quality);
  return image.url();
}

export function imageAlt(source, fallback = "") {
  return source?.alt || fallback;
}
