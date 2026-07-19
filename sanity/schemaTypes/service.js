import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 80 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "description", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "longDescription", title: "Detail paragraphs", type: "array", of: [{ type: "text", rows: 4 }] }),
    defineField({ name: "highlights", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", title: "Card image", type: "managedImage", validation: (Rule) => Rule.required() }),
    defineField({ name: "heroImage", title: "Hero image", type: "managedImage", validation: (Rule) => Rule.required() }),
    defineField({ name: "accentColor", type: "string", initialValue: "#c8a96a" }),
    defineField({ name: "galleryImages", type: "array", of: [{ type: "managedImage" }] }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [defineArrayMember({
        name: "faq",
        type: "object",
        fields: [
          defineField({ name: "q", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "a", title: "Answer", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: "q", subtitle: "a" } },
      })],
    }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
    defineField({ name: "visible", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "eyebrow", media: "image" } },
});
