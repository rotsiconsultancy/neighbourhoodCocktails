import { defineArrayMember, defineField, defineType } from "sanity";

export const cocktail = defineType({
  name: "cocktail",
  title: "Cocktail",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name", maxLength: 80 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "type", type: "string", options: { list: [{ title: "Alcoholic", value: "alcoholic" }, { title: "Non-alcoholic", value: "non-alcoholic" }], layout: "radio" }, validation: (Rule) => Rule.required() }),
    defineField({ name: "vibes", type: "array", of: [{ type: "string" }], options: { list: ["sober", "high-energy", "moody", "garden", "floral"] } }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "description", type: "text", rows: 4, validation: (Rule) => Rule.required() }),
    defineField({ name: "longDescription", type: "text", rows: 8 }),
    defineField({ name: "images", type: "array", of: [{ type: "managedImage" }], validation: (Rule) => Rule.min(1).required() }),
    defineField({ name: "tastingNotes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "ingredients", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "method", type: "string" }),
    defineField({ name: "glass", type: "string" }),
    defineField({ name: "garnish", type: "string" }),
    defineField({
      name: "profile",
      title: "Taste profile (0–5)",
      type: "object",
      fields: ["sweet", "sour", "smoky", "strong"].map((name) => defineField({ name, type: "number", validation: (Rule) => Rule.min(0).max(5).integer() })),
    }),
    defineField({ name: "occasion", title: "Best for", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "pairsWell", title: "Pairs well with", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
    defineField({ name: "visible", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Display order", name: "displayOrder", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "type", media: "images.0" } },
});
