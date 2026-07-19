import { defineField, defineType } from "sanity";

export const managedImage = defineType({
  name: "managedImage",
  title: "Managed image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image for visitors using screen readers.",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
