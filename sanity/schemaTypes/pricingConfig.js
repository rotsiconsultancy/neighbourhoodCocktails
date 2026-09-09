export const pricingConfig = {
  name: "pricingConfig",
  title: "Calculator Pricing Configuration",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Configuration Title",
      type: "string",
      initialValue: "Default Pricing Rates",
    },
    {
      name: "baseServiceFee",
      title: "Base Service Fee (KES per hour)",
      type: "number",
      initialValue: 3500,
      description: "Base fee for bartender & bar equipment logistics per hour",
    },
    {
      name: "beerPricePerServing",
      title: "Beer & Cider (KES per serving)",
      type: "number",
      initialValue: 400,
    },
    {
      name: "winePricePerGlass",
      title: "Wine (KES per glass)",
      type: "number",
      initialValue: 600,
    },
    {
      name: "spiritsPricePerServing",
      title: "Premium Spirits (KES per serving)",
      type: "number",
      initialValue: 750,
    },
    {
      name: "cocktailPricePerServing",
      title: "Craft Cocktails (KES per serving)",
      type: "number",
      initialValue: 900,
    },
    {
      name: "mocktailPricePerServing",
      title: "Non-Alcoholic Mocktails (KES per serving)",
      type: "number",
      initialValue: 500,
    },
    {
      name: "glasswarePerGuest",
      title: "Premium Glassware Add-on (KES per guest)",
      type: "number",
      initialValue: 200,
    },
    {
      name: "customBrandingFee",
      title: "Custom Bar Branding Add-on (KES flat)",
      type: "number",
      initialValue: 12000,
    },
  ],
};
