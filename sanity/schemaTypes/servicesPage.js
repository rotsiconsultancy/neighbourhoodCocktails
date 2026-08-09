import { defineArrayMember, defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  fields: [
    // ── Page Hero ──────────────────────────────────────────────────────
    defineField({ name: "heroEyebrow", title: "Page hero eyebrow", type: "string" }),
    defineField({ name: "heroHeading", title: "Page hero heading", type: "string" }),
    defineField({ name: "heroBody",    title: "Page hero body",    type: "text", rows: 3 }),

    // ── Bar Aesthetics Section ─────────────────────────────────────────
    defineField({ name: "aestheticsHeading", title: "Bar aesthetics heading", type: "string" }),
    defineField({ name: "aestheticsIntro",   title: "Bar aesthetics intro",   type: "text", rows: 2 }),
    defineField({
      name: "barAesthetics",
      title: "Bar aesthetic cards",
      type: "array",
      of: [defineArrayMember({
        name: "barAesthetic",
        type: "object",
        fields: [
          defineField({ name: "name",  title: "Bar name",         type: "string",       validation: (Rule) => Rule.required() }),
          defineField({ name: "desc",  title: "Description",      type: "text", rows: 3, validation: (Rule) => Rule.required() }),
          defineField({ name: "image", title: "Bar photo",        type: "managedImage", validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: "name", media: "image" } },
      })],
    }),

    // ── Standard Inclusions Section ────────────────────────────────────
    defineField({ name: "inclusionsEyebrow", title: "Inclusions eyebrow", type: "string" }),
    defineField({ name: "inclusionsHeading", title: "Inclusions heading", type: "string" }),
    defineField({ name: "inclusionsBody",    title: "Inclusions intro",   type: "text", rows: 3 }),
    defineField({
      name: "inclusionItems",
      title: "Inclusion items",
      type: "array",
      of: [defineArrayMember({
        name: "inclusionItem",
        type: "object",
        fields: [
          defineField({ name: "title", title: "Item title", type: "string", validation: (Rule) => Rule.required() }),
          defineField({ name: "body",  title: "Item body",  type: "text", rows: 2, validation: (Rule) => Rule.required() }),
        ],
        preview: { select: { title: "title" } },
      })],
    }),
    defineField({ name: "inclusionsImage", title: "Inclusions panel image", type: "managedImage" }),
  ],
  preview: { prepare: () => ({ title: "Services page" }) },
});
