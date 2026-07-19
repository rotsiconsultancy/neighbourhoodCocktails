import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "primaryLogo", title: "Primary logo", type: "managedImage" }),
    defineField({ name: "partnerLogo", title: "Partner logo", type: "managedImage" }),
    defineField({ name: "partnerUrl", title: "Partner website", type: "url" }),
    defineField({ name: "tagline", title: "Footer tagline", type: "text", rows: 2 }),
    defineField({ name: "addressLines", title: "Address lines", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "directionsUrl", title: "Directions URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "substackUrl", title: "Substack URL", type: "url" }),
    defineField({ name: "defaultShareImages", title: "Default social-sharing images", type: "array", of: [{ type: "managedImage" }], validation: (Rule) => Rule.max(4) }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
