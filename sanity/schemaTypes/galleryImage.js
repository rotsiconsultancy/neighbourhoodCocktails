import { defineField, defineType } from "sanity";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery image",
  type: "document",
  fields: [
    defineField({ name: "image", type: "managedImage", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "caption", type: "text", rows: 3 }),
    defineField({ name: "category", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
    defineField({ name: "visible", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "image" } },
});
