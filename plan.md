# Plan: Services Page & Pretty Cocktail Showcase

This plan details the design, interactivity, UX/UI layouts, and SEO considerations for a standalone **Services Page** and a highly aesthetic, filterable **Cocktails Showcase**.

---

## 1. Services Page (`/services`)

### 🎨 Design & Layout
* **Hero Section**: Full-screen header with a dark forest green gradient overlay. Features a clear `<h1>` (e.g., `Bespoke Mobile Bar & Cocktail Catering`) and a prominent CTA linking to `/booking`.
* **Services Grid**: Alternating layout featuring four event packages:
  - **Weddings**: Tailored menus, custom signage, champagne tower management.
  - **Corporate**: Brand activation menus, rapid high-volume mixology.
  - **Masterclasses**: Hands-on mixology classes with individual bar stations.
  - **Private Events**: Anniversaries, intimate dinner pairings, backyard garden parties.
* **The Bar Aesthetics**: Gallery highlighting different physical bar setups (e.g., *Rustic Oak Wood*, *Minimalist Sleek White*, *Illuminated Brand Bar*).

---

## 2. Pretty Cocktails Showcase (Filterable & Multi-Image)

To make the showcase beautiful and practical, we will build a dedicated cocktail browser that supports dynamic filtering and multiple images per drink.

### 🌟 1. "Pretty" Filter Controls (Alcoholic vs. Non-Alcoholic)
Instead of standard form checkboxes, the filter controls will use:
* **Tactile Fluid Toggle**: A smooth, capsule-shaped slide control with a sliding pill background.
  * **Option A**: *Alcoholic (Classic & Signature Spirits)*
  * **Option B**: *Non-Alcoholic (Temperate Botanicals & Craft Mocktails)*
* **Color Shifting States**: The slide control transitions colors based on the mode:
  * Alcoholic mode: Warm amber and gold hues.
  * Non-Alcoholic mode: Soft, fresh botanical sage green and sunset orange tones.

### 📸 2. Multi-Image Carousel Card
Each cocktail card will support multiple views to show off the drink's presentation, preparation, and live setting:
* **Inline Mini-Carousel**:
  - The card image is an interactive slider with sleek, low-profile pagination indicators (dots) at the bottom.
  - Hovering on the left/right edges of the card reveals elegant arrows to cycle through images:
    1. *The Close-Up*: A high-detail studio shot of the glass, garnish, and texture.
    2. *The Preparation*: Action shot showing the ingredients (e.g. smoke infusion, citrus zest).
    3. *The Event Vibe*: The drink held by a guest or placed on the bar top at a real event.
* **Smooth Transitions**: Images fade and slide seamlessly using hardware-accelerated CSS transitions.

### 🎭 3. Vibe-Based Filtering (Adapting to the Party's Vibe)
Parties are not one-size-fits-all. We will include a **Vibe Selector** (using organic chip tabs) to match the drink menu to different event types:
* **🍹 Sober Sophistication (100% Non-Alcoholic)**: Highlights cold-pressed juices, house-made botanical syrups, and zero-proof distillates. 
* **✨ High-Energy Party**: Highlights colorful, fast-flowing, punchy drinks (e.g., Margaritas, highballs).
* **🕯️ Intimate & Moody**: Highlights dark, slow-sipping, rich, or smoked cocktails (e.g., Smoked Mezcalita, Spiced Rum pairings).
* **🌿 Garden & Floral**: Highlights light, herbaceous, sparkling, and floral drinks (e.g., Rosemary Gin fizzes, Elderflower spritzes).

---

## 3. SEO & Schema Integration

* **Schema.org Recipe Markup**: For each drink, we will write structured metadata so search engine bots index ingredients, prep style, and photos, surfacing them directly in search results.
* **Sensory Keyphrase Copywriting**: Descriptions will target high-intent search queries such as `"sober wedding bar catering"`, `"premium mocktails for corporate events"`, and `"custom craft cocktail bars"`.
