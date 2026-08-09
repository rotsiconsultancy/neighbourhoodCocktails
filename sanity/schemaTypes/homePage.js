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

    // ── Hero Section ──────────────────────────────────────────────────
    defineField({ name: "heroHeading",    title: "Hero heading (plain text)",       description: "The bold part of the H1 — e.g. 'You make the memories.'",      type: "string" }),
    defineField({ name: "heroScriptSpan", title: "Hero script span (styled text)",  description: "The script-font part of the H1 — e.g. 'We bring the cocktails.'", type: "string" }),
    defineField({ name: "heroBody",       title: "Hero body paragraph",             type: "text",   rows: 3 }),

    // ── Events Section ────────────────────────────────────────────────
    defineField({ name: "eventsHeading", title: "Events section heading", type: "string" }),
    defineField({ name: "eventsIntro",   title: "Events section intro",   type: "text", rows: 3 }),

    // ── Experience / Story Section ────────────────────────────────────
    defineField({ name: "experienceEyebrow",  title: "Experience eyebrow",         type: "string" }),
    defineField({ name: "experienceHeading",  title: "Experience heading",         type: "string" }),
    defineField({ name: "experiencePara1",    title: "Experience paragraph 1",     type: "text", rows: 3 }),
    defineField({ name: "experiencePara2",    title: "Experience paragraph 2",     type: "text", rows: 3 }),
    defineField({ name: "experienceBadge",    title: "Experience badge text",      type: "string" }),

    // ── Gallery Section ───────────────────────────────────────────────
    defineField({ name: "galleryHeading", title: "Gallery section heading", type: "string" }),
    defineField({ name: "galleryIntro",   title: "Gallery section intro",   type: "text", rows: 2 }),

    // ── Substack / Articles Section ───────────────────────────────────
    defineField({ name: "substackHeading", title: "Articles section heading", type: "string" }),
    defineField({ name: "substackIntro",   title: "Articles section intro",   type: "text", rows: 2 }),

    // ── Booking CTA Section ───────────────────────────────────────────
    defineField({ name: "bookingEyebrow", title: "Booking CTA eyebrow", type: "string" }),
    defineField({ name: "bookingHeading", title: "Booking CTA heading", type: "string" }),
    defineField({ name: "bookingBody",    title: "Booking CTA body",    type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});
