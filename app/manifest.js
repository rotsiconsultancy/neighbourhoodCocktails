export default function manifest() {
  return {
    name: "The Neighbourhood Cocktails",
    short_name: "Neighbourhood",
    description: "Cocktail-led event bar experiences for gatherings, brands, and private celebrations.",
    start_url: "/",
    display: "standalone",
    background_color: "#10271e",
    theme_color: "#1f4d3a",
    icons: [
      {
        src: "/images/logo.svg",
        sizes: "any",
        type: "image/svg+xml"
      },
      {
        src: "/images/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable"
      }
    ]
  };
}
