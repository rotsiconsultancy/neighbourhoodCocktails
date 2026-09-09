export const testimonial = {
  name: "testimonial",
  title: "Customer Feedback & Testimonials",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Client Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "eventType",
      title: "Event Type / Location",
      type: "string",
      placeholder: "e.g. Wedding Reception in Kilimani",
    },
    {
      name: "quote",
      title: "Feedback Quote / Review",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      title: "Rating (1 to 5)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    },
    {
      name: "socialPlatform",
      title: "Social Media Platform",
      type: "string",
      options: {
        list: [
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "Twitter / X", value: "twitter" },
          { title: "Facebook", value: "facebook" },
          { title: "Google Review", value: "google" },
        ],
      },
      initialValue: "instagram",
    },
    {
      name: "socialHandle",
      title: "Social Handle / Tag",
      type: "string",
      placeholder: "@client_handle or Company Name",
    },
    {
      name: "socialUrl",
      title: "Social Media Link URL",
      type: "url",
    },
    {
      name: "avatar",
      title: "Client Avatar / Event Photo",
      type: "managedImage",
    },
    {
      name: "featured",
      title: "Featured on Homepage / v2",
      type: "boolean",
      initialValue: true,
    },
  ],
};
