/**
 * Shared data for The Neighbourhood Cocktails.
 * Single source of truth for services and cocktails — used by listing pages
 * and individual dynamic route pages.
 */

// ─── SERVICES ────────────────────────────────────────────────────────────────

export const servicesData = [
  {
    id: "weddings",
    title: "Signature Weddings",
    eyebrow: "Your Special Day",
    tagline: "A bar experience as unforgettable as your vows.",
    description:
      "We translate your love story into a bespoke drinks experience. From elegant welcome trays and custom husband-and-wife signature menus to hand-built wood bars and champagne tower coordination, we keep the service warm, professional, and perfectly timed.",
    longDescription: [
      "Your wedding bar should feel like an extension of who you are — intimate, considered, and full of personality. We work closely with couples in the months before the event to build a drinks menu that tells your story, from the welcome tray guests receive on arrival to the final late-night cocktail of the evening.",
      "Our team handles every logistical detail: bar fabrication and transportation, premium spirits sourcing, fresh garnish prep, glassware, and a dedicated front-of-house service team trained in gracious, unhurried hospitality. You plan the vows; we handle the bar.",
      "Past couples have loved our his-and-hers signature serves, our non-alcoholic mocktail menus designed for all guests, and the subtle touches — hand-written menu cards, edible flowers in ice, custom citrus oils — that make the difference between a bar and a memory.",
    ],
    highlights: [
      "Bespoke his-and-hers cocktail menus",
      "Elegant welcome tray & reception service",
      "Champagne tower coordination",
      "Custom-built mobile wood bar",
      "Non-alcoholic wellness mocktail menu",
      "Dedicated bar hospitality team",
      "Hand-written menu cards & garnish display",
      "Full setup, service & cleanup included",
    ],
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=80",
    alt: "Elegantly set wedding table and guests holding cocktail glasses",
    accentColor: "#c8a96a",
    galleryImages: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
    ],
    faqs: [
      {
        q: "How far in advance should we book for a wedding?",
        a: "We recommend booking at least 3–4 months in advance to secure your date and allow enough time for menu consultation and planning.",
      },
      {
        q: "Can we create custom cocktail names for our wedding?",
        a: "Absolutely. Personalized cocktail names are one of our most popular additions — many couples name signature drinks after inside jokes, first-date locations, or meaningful moments.",
      },
      {
        q: "Do you cater to guests who don't drink alcohol?",
        a: "Yes. We always build a full non-alcoholic menu alongside our spirits selection so every guest has something special to enjoy.",
      },
    ],
  },
  {
    id: "corporate",
    title: "Polished Corporate Events",
    eyebrow: "Brand Activations & Socials",
    tagline: "Brand-forward hospitality that leaves an impression.",
    description:
      "Sleek, high-volume mobile bars built for corporate launches, brand activations, annual dinners, and team socials. We coordinate custom drink coloring, branded menus, fast-pour mixology setups, and white-glove service to reflect your brand's standards.",
    longDescription: [
      "Corporate events demand precision. Whether you're launching a product, hosting a client dinner, or celebrating an end-year milestone, your bar experience should match the professionalism you bring to everything else. We arrive prepared, set up seamlessly, and deliver consistent quality at volume.",
      "Our corporate packages include custom branded cocktail menus, branded bar signage and fascia, high-volume rapid-service configurations for large crowds, and the option for co-branded garnishes, custom glassware, and colour-matched drink presentations.",
      "We've worked with agencies, tech companies, financial firms, hospitality brands, and NGOs across Nairobi. Every event is pre-briefed with your team, and our mixologists adapt the pace and presentation to the room throughout the event.",
    ],
    highlights: [
      "Custom branded drink menus & bar signage",
      "High-volume rapid-service configuration",
      "Co-branded garnishes & glassware options",
      "Colour-matched drink presentations",
      "Professional, uniformed bar staff",
      "Pre-event client briefing included",
      "Spirits, ice, glassware & setup handled",
      "Available for 50 to 1000+ guests",
    ],
    image: "/images/gallery/6.png",
    heroImage: "/images/gallery/6.png",
    alt: "Illuminated corporate bar activation with bartenders serving drinks",
    accentColor: "#1f4d3a",
    galleryImages: [
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    ],
    faqs: [
      {
        q: "What's the minimum guest count for a corporate event?",
        a: "We comfortably serve events from 50 guests upward and scale our team and bar setup accordingly.",
      },
      {
        q: "Can you brand the bar with our company logo?",
        a: "Yes. We offer custom bar fascia panels with printed branding, as well as branded menu cards and co-branded cocktail napkins.",
      },
      {
        q: "Do you handle permits or venue liaison?",
        a: "We can assist with venue coordination and provide all necessary documentation for alcohol service. Let us know your venue and we'll advise.",
      },
    ],
  },
  {
    id: "masterclasses",
    title: "Interactive Masterclasses",
    eyebrow: "Hands-On Mixology",
    tagline: "Learn the craft. Shake something extraordinary.",
    description:
      "We set up individual mixology stations complete with premium spirits, custom syrups, garnishes, and professional shakers. Led by our head mixologists, it's a social, tactile, and highly memorable experience for teams and private gatherings.",
    longDescription: [
      "Our masterclasses are less lecture and more experience. Guests take their place at their own dedicated station — stocked with premium spirits or zero-proof bases, house-made syrups, fresh citrus, garnishes, a jigger, and a shaker — and learn by doing.",
      "Sessions are led by our head mixologists who guide guests through 2–3 signature cocktail builds, exploring the theory of balance (sweet, sour, spirit, dilution) in a way that's approachable and immediately practical. Everyone leaves with a new skill and a full glass.",
      "Masterclasses are available for private groups from 8 to 60 guests and can be customized around a theme: rum-centric, zero-proof wellness, whisky appreciation, or a bespoke menu built around your group's tastes. They're a hit for team-building events, bachelorette parties, birthdays, and client entertaining.",
    ],
    highlights: [
      "Individual mixology stations per guest",
      "2–3 cocktail builds per session",
      "Guided by head mixologists",
      "Premium spirits or zero-proof options",
      "Available for 8 to 60 guests",
      "Custom themes & spirit focuses",
      "All equipment, syrups & garnishes supplied",
      "Certificate of participation available",
    ],
    image:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1800&q=80",
    alt: "Mixologist demonstrating cocktail shaking during a masterclass",
    accentColor: "#c96a3d",
    galleryImages: [
      "https://images.unsplash.com/photo-1516997121675-4c2d1684aa3e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    ],
    faqs: [
      {
        q: "How long does a masterclass session run?",
        a: "Sessions typically run 90 minutes to 2.5 hours depending on the number of builds and group size.",
      },
      {
        q: "Is the masterclass suitable for complete beginners?",
        a: "Absolutely. We design sessions to be accessible and fun regardless of experience level. No prior knowledge required.",
      },
      {
        q: "Can you run a zero-proof masterclass?",
        a: "Yes. Our botanical and zero-proof sessions are incredibly popular and cover the same craft principles — just without the alcohol.",
      },
    ],
  },
  {
    id: "private",
    title: "Intimate Dinner Pairings & Parties",
    eyebrow: "Private Celebrations",
    tagline: "Host with confidence. We handle the bar.",
    description:
      "Whether it's an anniversary, a milestone birthday, or a private dinner pairing in Nairobi, we design a drinks menu that complements the cuisine. We handle all bar setup, glassware, premium spirits, ice, and cleanup so you can focus on being the host.",
    longDescription: [
      "There's something particular about hosting well. The confidence of knowing every detail is considered — the right glass for each drink, the garnish placed just so, a bar that doesn't look like it was hastily assembled. That's what we bring to private events.",
      "Our intimate dinner and party packages are designed for hosts who want the cocktail experience without the work of running it themselves. We arrive early, set up quietly, and integrate into your event. Our team can work with your caterer to create drink pairings that complement each course, or build a standalone cocktail menu around your guest list's preferences.",
      "We've hosted intimate dinners for ten, garden parties for 80, and everything between. Every setup is bespoke — we visit your venue in advance for larger events and do a detailed phone consultation for every booking to understand your space, style, and vision.",
    ],
    highlights: [
      "Bespoke drinks menu to match cuisine",
      "Course-by-course pairing available",
      "Discreet, professional setup & service",
      "Suitable for 10 to 100 guests",
      "All glassware, spirits & ice included",
      "Pre-event venue consultation",
      "Full cleanup post-event",
      "Dietary & preference accommodations",
    ],
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1800&q=80",
    alt: "A group of friends toast at a warm cozy dinner party table",
    accentColor: "#b64646",
    galleryImages: [
      "https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    ],
    faqs: [
      {
        q: "Do you offer a course-by-course cocktail pairing?",
        a: "Yes. We work with your menu and caterer to design drinks that complement each course — from aperitif to digestif.",
      },
      {
        q: "What's the minimum guest count for a private event?",
        a: "We take private bookings from as few as 10 guests. For very small gatherings, we also offer a curated drop-off package.",
      },
      {
        q: "Do you clean up after the event?",
        a: "Always. We handle full bar breakdown and cleanup as part of every package. You just host; we handle the rest.",
      },
    ],
  },
];

// ─── COCKTAILS ────────────────────────────────────────────────────────────────

export const cocktailsData = [
  {
    id: "smoked-mezcalita",
    name: "Smoked Mezcalita",
    type: "alcoholic",
    vibes: ["moody", "high-energy"],
    tagline: "Complexity in every sip. Smoke, citrus, soul.",
    description:
      "A rich, smoky twist on the classic margarita. Crafted with artisanal mezcal, fresh lime juice, organic agave nectar, and finished with a wild hibiscus salt rim.",
    longDescription:
      "The Smoked Mezcalita begins where the classic margarita ends. We source an artisanal joven mezcal that carries an honest, earthy smoke — not a performative one. It's balanced with hand-squeezed fresh lime juice and a touch of organic agave nectar to soften the edges, then poured over hand-chipped ice into a coupe rimmed with our house-ground hibiscus salt. The result is a drink with genuine complexity: the smoke arrives first, the citrus cuts through the middle, and the floral salt lingers on the finish. Served straight up for the full experience.",
    images: [
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    ],
    tastingNotes: ["Smoky", "Citrusy", "Bold"],
    ingredients: [
      "Artisanal Mezcal",
      "Fresh Lime Juice",
      "Agave Nectar",
      "Hibiscus Salt Rim",
    ],
    method: "Shaken",
    glass: "Coupe",
    garnish: "Hibiscus Salt Rim & Lime Wheel",
    profile: { sweet: 2, sour: 4, smoky: 5, strong: 4 },
    occasion: ["Cocktail Hours", "Moody Lounges", "After-Dinner Serves"],
    pairsWell: ["Spiced Meats", "Dark Chocolate", "Aged Cheeses"],
  },
  {
    id: "rosemary-gin-spritz",
    name: "Rosemary Gin Spritz",
    type: "alcoholic",
    vibes: ["garden", "floral"],
    tagline: "An afternoon in a glass. Herbaceous, crisp, alive.",
    description:
      "Crisp and herbaceous. Premium dry gin combined with house-infused wild rosemary syrup, freshly squeezed lemon juice, topped with sparkling tonic and a charred rosemary sprig.",
    longDescription:
      "The Rosemary Gin Spritz was born from a simple conviction: gin is most beautiful when it's given room to breathe. We start with a London dry gin selected for its juniper-forward backbone, then add our house-made wild rosemary syrup — steeped slowly to capture the herb's aromatic oils without bitterness. Fresh lemon juice provides the lift, and premium tonic water adds the effervescence that makes this a truly refreshing drink. The charred rosemary sprig garnish is more than decoration — it releases fragrant smoke that perfumes each sip before the glass even reaches your lips.",
    images: [
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
    ],
    tastingNotes: ["Herbaceous", "Crisp", "Botanical"],
    ingredients: [
      "London Dry Gin",
      "Wild Rosemary Syrup",
      "Fresh Lemon",
      "Premium Tonic",
      "Charred Rosemary",
    ],
    method: "Built",
    glass: "Collins",
    garnish: "Charred Rosemary Sprig",
    profile: { sweet: 3, sour: 3, smoky: 1, strong: 3 },
    occasion: ["Garden Parties", "Wedding Receptions", "Afternoon Events"],
    pairsWell: ["Grilled Fish", "Soft Cheeses", "Light Canapés"],
  },
  {
    id: "hibiscus-ginger-zero",
    name: "Hibiscus & Ginger Zero",
    type: "non-alcoholic",
    vibes: ["sober", "garden", "floral"],
    tagline: "Bold, floral, unapologetically zero-proof.",
    description:
      "Vibrant and spicy. An aromatic blend of cold-steeped organic hibiscus flower tea, freshly muddled spicy ginger root, fresh lime, and topped with club soda for a refreshing finish.",
    longDescription:
      "The Hibiscus & Ginger Zero challenges the notion that a non-alcoholic drink is somehow lesser. We cold-steep organic hibiscus flowers for 12 hours to extract a deep, vivid crimson tea that carries floral depth without bitterness. Fresh ginger root is muddled to order — releasing its peppery heat — and balanced with hand-squeezed lime and a touch of simple syrup. Club soda adds effervescence and length. The result is a drink with genuine presence and complexity: striking in the glass, exciting on the palate, and completely alcohol-free.",
    images: [
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
    ],
    tastingNotes: ["Floral", "Spicy", "Tangy"],
    ingredients: [
      "Cold-Steeped Hibiscus Tea",
      "Spicy Ginger Reduction",
      "Fresh Lime",
      "Club Soda",
    ],
    method: "Muddled & Built",
    glass: "Highball",
    garnish: "Dried Hibiscus Flower & Lime Wheel",
    profile: { sweet: 3, sour: 4, smoky: 1, strong: 0 },
    occasion: ["Wellness Events", "All-Inclusive Menus", "Daytime Gatherings"],
    pairsWell: ["Tropical Fruits", "Light Salads", "Spiced Canapés"],
  },
  {
    id: "spiced-apple-mule",
    name: "Spiced Apple Mule",
    type: "non-alcoholic",
    vibes: ["sober", "moody"],
    tagline: "Warm, spiced comfort — zero degrees of regret.",
    description:
      "Warm and inviting. Pressed orchard apple cider mixed with a spiced cinnamon-clove simple syrup, fresh lime juice, and topped with sparkling ginger beer in a copper mug.",
    longDescription:
      "The Spiced Apple Mule reinterprets a classic format without the vodka and loses nothing in the translation. We start with pressed orchard apple cider — not filtered, not sweetened — and combine it with a house-made spiced simple syrup that steeps cinnamon sticks and whole cloves until deeply aromatic. Fresh lime provides the necessary brightness, and the whole thing is topped with a premium ginger beer that carries a genuine ginger heat. Served in a traditional copper mug, the drink stays cold and the aromas are amplified beautifully. It's a drink for guests who want something considered and warming in their hand.",
    images: [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80",
    ],
    tastingNotes: ["Warm", "Spiced", "Sweet"],
    ingredients: [
      "Orchard Apple Cider",
      "Cinnamon-Clove Syrup",
      "Fresh Lime",
      "Spicy Ginger Beer",
    ],
    method: "Built",
    glass: "Copper Mug",
    garnish: "Cinnamon Stick, Apple Fan & Lime Wedge",
    profile: { sweet: 4, sour: 2, smoky: 2, strong: 0 },
    occasion: ["Autumn Gatherings", "Intimate Dinners", "All-Inclusive Menus"],
    pairsWell: ["Pastry & Desserts", "Roasted Foods", "Cheese Boards"],
  },
  {
    id: "sunset-passion-highball",
    name: "Sunset Passion Highball",
    type: "alcoholic",
    vibes: ["high-energy", "garden"],
    tagline: "Tropical, vivid, and built for celebration.",
    description:
      "Bold and tropical. Premium triple-distilled vodka, fresh passion fruit pulp, house-made vanilla pod syrup, freshly squeezed lime, and sparkling soda. Served tall with a mint crown.",
    longDescription:
      "The Sunset Passion Highball is unabashedly joyful. It's a drink built for warm evenings, big crowds, and the kind of event where people are genuinely glad to be there. We use a premium triple-distilled vodka as the neutral backbone, then load it with the flavours that do the heavy lifting: real passion fruit pulp scooped to order, a house vanilla pod syrup that adds roundness and warmth, hand-squeezed lime for brightness, and sparkling soda that makes the whole thing sing. It's served tall over ice with a crown of garden mint. Visually striking, easy to love, and impossible to put down.",
    images: [
      "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=800&q=80",
    ],
    tastingNotes: ["Tropical", "Fruity", "Bright"],
    ingredients: [
      "Triple-Distilled Vodka",
      "Fresh Passion Fruit Pulp",
      "Vanilla Syrup",
      "Fresh Lime",
      "Club Soda",
    ],
    method: "Shaken & Built",
    glass: "Collins",
    garnish: "Passion Fruit Half, Mint Crown & Lime Wheel",
    profile: { sweet: 4, sour: 3, smoky: 1, strong: 3 },
    occasion: ["Outdoor Parties", "Wedding Receptions", "Brand Activations"],
    pairsWell: ["Tropical Fruit Platters", "Light Canapés", "Grilled Prawns"],
  },
  {
    id: "bramble-zero",
    name: "Bramble Zero",
    type: "non-alcoholic",
    vibes: ["sober", "high-energy", "garden"],
    tagline: "Rich, fruity, layered. Proof that zero-proof has depth.",
    description:
      "Rich and fruity. A refreshing zero-proof cocktail with fresh muddled wild blackberries, freshly squeezed lemon juice, simple syrup, club soda, and a sprig of garden mint.",
    longDescription:
      "The Bramble Zero takes its inspiration from the classic British bramble — all dark fruit and citrus brightness — and strips it of the gin without losing a drop of character. Fresh wild blackberries are muddled to order, releasing deep purple colour and intense berry flavour. Lemon juice provides acidity and freshness, simple syrup balances the tartness, and crushed ice gives the drink its characteristic layered look as the muddled fruit settles into the glass. A crown of garden mint adds aromatic complexity on the nose. It's a drink that looks as good as it tastes and earns its place on any menu alongside the most complex spirit cocktails.",
    images: [
      "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80",
    ],
    tastingNotes: ["Fruity", "Citrusy", "Refreshing"],
    ingredients: [
      "Muddled Blackberries",
      "Fresh Lemon Juice",
      "Simple Syrup",
      "Club Soda",
      "Fresh Garden Mint",
    ],
    method: "Muddled & Built",
    glass: "Rocks",
    garnish: "Fresh Blackberries & Garden Mint Sprig",
    profile: { sweet: 4, sour: 3, smoky: 1, strong: 0 },
    occasion: ["Garden Parties", "Bridal Showers", "All-Inclusive Menus"],
    pairsWell: ["Berry Desserts", "Soft Cheeses", "Summer Canapés"],
  },
];
