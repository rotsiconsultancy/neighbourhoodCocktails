import { defineArrayMember, defineField, defineType } from "sanity";

const orderedImage = defineArrayMember({
  name: "orderedImage",
  title: "Image",
  type: "object",
  fields: [defineField({ name: "image", type: "managedImage", validation: (Rule) => Rule.required() })],
  preview: { select: { media: "image", title: "image.alt" } },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    defineField({ name: "heroSlides", title: "Hero slides", type: "array", of: [orderedImage], validation: (Rule) => Rule.min(1).max(3) }),
    defineField({
      name: "eventCards",
      title: "Event cards",
      type: "array",
      of: [defineArrayMember({
        name: "eventCard",
        type: "object",
        fields: [
          defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          defineField({ name: "ctaLabel", title: "Link label", type: "string" }),
          defineField({ name: "href", title: "Link destination", type: "string", initialValue: "/booking" }),
          defineField({ name: "image", type: "managedImage", validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: "title", media: "image" } },
      })],
    }),
    defineField({ name: "storyImage", title: "Experience section image", type: "managedImage" }),
    defineField({ name: "galleryImages", title: "Homepage gallery", description: "Images render as three equal columns on desktop.", type: "array", of: [orderedImage], validation: (Rule) => Rule.min(3).max(12) }),
    defineField({
      name: "articlePosts",
      title: "Featured articles",
      type: "array",
      of: [defineArrayMember({
        name: "articlePost",
        type: "object",
        fields: [
          defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "source", type: "string" }),
          defineField({ name: "text", type: "text", rows: 3 }),
          defineField({ name: "byline", type: "string" }),
          defineField({ name: "href", type: "url", validation: (Rule) => Rule.required() }),
          defineField({ name: "image", type: "managedImage", validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: "title", media: "image", subtitle: "source" } },
      })],
    }),
    defineField({ name: "bookingImage", title: "Booking page promise image", type: "managedImage" }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
