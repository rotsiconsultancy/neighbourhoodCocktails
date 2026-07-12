# SEO & Conversion Strategy

## Executive Summary

The current site is visually polished, but it behaves more like a brand brochure than a decision engine. The biggest growth opportunity is not another decorative design pass. It is making the site answer the questions serious event buyers ask before they trust a mobile bar vendor with a wedding, corporate activation, private party, or masterclass.

The strategy is to move from mood-led copy to intent-led pages backed by operational proof: who the service is for, what is included, what it costs or typically depends on, how setup works, how many guests can be served, what the client provides, and why the team is reliable.

## What Searchers Actually Want

### Wedding Buyers

They are not only looking for cocktails. They are trying to protect the guest experience and the look of the event.

Key questions:

- Can you serve cocktail hour without queues?
- Do you bring the bar, glassware, ice planning, garnishes, and staff?
- Can you create signature couple drinks and mocktails?
- Can you coordinate with the planner, venue, and caterer?
- What does this cost for 80, 150, or 300 guests?
- Have you done weddings that feel like mine?

### Corporate & Brand Buyers

They are trying to avoid operational risk and brand embarrassment.

Key questions:

- Can you serve high guest counts quickly?
- Can you brand the bar, menu, garnish, or drink colors?
- Can you work with procurement, invoicing, and event schedules?
- Can you provide alcohol-service documentation if the venue asks?
- Can you do zero-proof options for mixed audiences?
- Can you support launches, end-year parties, team socials, and activations?

### Private Hosts

They want to look like excellent hosts without personally managing drinks.

Key questions:

- Can the bar fit in a garden, apartment, rooftop, or home setup?
- What is the minimum guest count or minimum spend?
- How early do you arrive?
- Can you work with my caterer or chef?
- Can I choose the drinks?
- Do you clean up after the event?

### Masterclass Buyers

They are buying a social experience, not a lecture.

Key questions:

- Is it beginner-friendly?
- How long does it run?
- What do guests make?
- Is it suitable for team-building, birthdays, bridal showers, or client entertaining?
- Can it be zero-proof?
- Do guests receive recipes, certificates, or take-home materials?

## Phase 1: Foundation Fixes

Goal: remove technical ambiguity and give Google consistent crawl/index signals.

Deliverables:

- Deploy the canonical host alignment already prepared locally:
  - `metadataBase` uses `https://www.neighbourhoodcocktails.com`.
  - sitemap URLs use `https://www.neighbourhoodcocktails.com`.
  - `robots.txt` points to the `www` sitemap.
  - `/feedback` declares `https://www.neighbourhoodcocktails.com/feedback` as canonical.
- Add explicit canonical URLs to the major public pages: home, booking, services, cocktails, gallery, FAQ, feedback, and each service detail page.
- Rewrite page titles and descriptions around high-intent service language:
  - Home: `Mobile Bar Hire & Cocktail Catering in Nairobi | The Neighbourhood Cocktails`
  - Services: `Mobile Bar Hire for Weddings, Corporate Events & Private Parties in Nairobi`
  - Booking: `Request a Mobile Cocktail Bar Quote in Nairobi`
  - Masterclasses: `Cocktail Masterclasses in Nairobi for Teams & Private Groups`
- Confirm live deployment with `curl -I`, rendered HTML checks, and Search Console URL inspection.

Acceptance criteria:

- Live `/feedback` returns `200` and includes a canonical tag for `/feedback`.
- Live sitemap and robots use the same preferred host.
- Search Console no longer reports `User-declared canonical: None` after recrawl.

## Phase 2: Search Intent Mapping

Goal: build the page architecture around how buyers search, not only how the business categorizes services.

Primary keyword clusters:

- Mobile bar hire Nairobi
- Cocktail catering Nairobi
- Wedding cocktail bar Nairobi
- Corporate cocktail catering Nairobi
- Private party bartender Nairobi
- Cocktail masterclass Nairobi
- Mocktail bar for events Nairobi
- Brand activation bar service Kenya
- Mobile bar hire Kenya
- Event drinks service Nairobi

Recommended landing pages:

- `/wedding-mobile-bar-nairobi`
- `/corporate-cocktail-catering-nairobi`
- `/private-party-bartenders-nairobi`
- `/cocktail-masterclass-nairobi`
- `/mocktail-bar-events-nairobi`
- `/brand-activation-bar-service`
- `/event-drinks-packages`

Each landing page must answer:

- Who this is for.
- What is included.
- Guest-count fit.
- Setup requirements.
- Sample drinks/menu options.
- Pricing drivers or starting-point context.
- CTA to request a quote.
- Relevant FAQs.

Acceptance criteria:

- Each page targets one primary intent and no more than two secondary intents.
- Each page has one clear H1 using the service, occasion, and location where appropriate.
- Each page internally links to booking, gallery, FAQ, and at least one related service.

## Phase 3: Conversion Content

Goal: turn visitors from interested browsers into confident inquiries.

Add these sections across home, services, and booking flows:

- `How it works`
  - Inquiry.
  - Consultation.
  - Menu and setup recommendation.
  - Quote and deposit.
  - Event-day setup.
  - Service and cleanup.
- `What we bring`
  - Bar setup.
  - Bartenders.
  - Bar tools.
  - Glassware planning.
  - Ice planning.
  - Garnishes.
  - Syrups and mixers.
  - Menu cards.
  - Cleanup.
- `What you provide`
  - Venue access.
  - Service area.
  - Power or water if needed.
  - Guest count.
  - Event schedule.
  - Alcohol preferences or package choice.
- `Package starting points`
  - Cocktail bar only.
  - Full-service mobile bar.
  - Wedding signature bar.
  - Corporate activation bar.
  - Masterclass.
  - Zero-proof/mocktail bar.
- `Service capacity guide`
  - Suggested staffing by guest-count bands.
  - Recommended bar setup by event size.
  - Typical setup time.
- `Sample menus`
  - Wedding signature menu.
  - Corporate launch menu.
  - Garden party menu.
  - Zero-proof menu.
  - Premium classics menu.

Acceptance criteria:

- A visitor can understand what is included without submitting the form.
- A visitor can estimate whether the service fits their guest count and event type.
- Booking CTA appears after each major decision-support section.

## Phase 4: Local & Authority SEO

Goal: strengthen trust signals for Nairobi and Kenya service-area searches.

Deliverables:

- Create or optimize Google Business Profile:
  - Business category aligned to bar/event/catering service.
  - Service areas listed accurately.
  - Photos from real events.
  - Booking/website link.
  - WhatsApp or phone contact.
  - Weekly posts for events, menus, or masterclasses.
- Add local language naturally to site copy:
  - Nairobi.
  - Karen.
  - Westlands.
  - Kilimani.
  - Lavington.
  - Gigiri.
  - Runda.
  - Tigoni.
  - Naivasha.
  - Other real service areas only if accurate.
- Add structured data:
  - `Organization`.
  - `LocalBusiness` or service-area business equivalent.
  - `Service`.
  - `FAQPage`.
  - `BreadcrumbList`.
- Build citations and profiles where relevant:
  - Google Business Profile.
  - Instagram.
  - LinkedIn.
  - Event/wedding directories if reputable.
  - Partner/vendor pages from venues, planners, caterers, and photographers.

Acceptance criteria:

- Google Business Profile is complete and linked to the site.
- Every major public page has appropriate structured data.
- Business name, phone, website, and service area are consistent across profiles.

## Phase 5: Trust, Proof & Differentiation

Goal: reduce buyer hesitation and make the site feel more bespoke and less generic.

Add proof assets:

- Case studies:
  - `150-guest garden wedding in Karen`
  - `300-person product launch in Westlands`
  - `24-person team-building cocktail masterclass`
  - Use real examples only; anonymize clients if needed.
- Real event galleries:
  - Bar setup.
  - Bartenders in service.
  - Drink closeups.
  - Menu cards.
  - Guest interaction.
  - Before/after setup if available.
- Testimonials:
  - Couple or planner.
  - Corporate event lead.
  - Private host.
  - Masterclass participant.
- Operational proof:
  - Staff uniforming.
  - Setup timeline.
  - Bar footprint.
  - Cleanup process.
  - Mocktail inclusion.
  - Guest-count ranges.

AI-generic-score reduction:

- Replace vague phrases like `warm, polished, memorable` with concrete claims where possible.
- Use real Nairobi/event details instead of universal hospitality language.
- Replace stock-like imagery with owned or client-approved event images.
- Vary page structure so every service page does not read like the same template.
- Keep brand voice, but lead each page with searchable service clarity before poetic copy.

Acceptance criteria:

- At least three real proof modules are visible before the booking CTA.
- Each key service page includes one concrete scenario, one operational detail, and one trust signal.
- AI-generated feel should drop below 30/100 in a follow-up visual/copy audit.

## Priority Matrix

### High Impact / Low Effort

- Deploy canonical and sitemap fixes.
- Rewrite title tags and meta descriptions.
- Add explicit H1s with service + location.
- Add deeper FAQs.
- Add `What we bring` and `How it works`.
- Add WhatsApp click tracking.

### High Impact / High Effort

- Create occasion-specific landing pages.
- Add package/starting-point content.
- Produce real case studies.
- Replace stock images with real event photography.
- Add structured data across all major pages.
- Build Google Business Profile review pipeline.

### Lower Priority / Later

- Blog content about cocktail culture.
- Recipe markup for individual cocktails.
- Advanced event quote calculator.
- Downloadable event drinks planning guide.
- Newsletter/pop-up content strategy.

## Success Metrics

Track weekly after deployment:

- Indexed pages in Search Console.
- Organic impressions for service and location queries.
- Clicks for mobile bar, cocktail catering, wedding, corporate, and masterclass terms.
- Average position for long-tail pages.
- Booking form submissions.
- WhatsApp clicks.
- Phone/email clicks if added.
- Google Business Profile calls, messages, and direction requests.
- Conversion rate from landing pages to booking/WhatsApp.

## Implementation Checklist

- [ ] Deploy technical SEO fixes.
- [ ] Confirm live canonical and sitemap consistency.
- [ ] Rewrite homepage title, description, H1 support copy, and first paragraph.
- [ ] Add `How it works` and `What we bring` sections.
- [ ] Add package/starting-point section.
- [ ] Expand FAQ around price, guest count, setup, alcohol, mocktails, travel, and venue requirements.
- [ ] Add structured data.
- [ ] Build the first two landing pages: wedding and corporate.
- [ ] Add at least one real case study.
- [ ] Optimize Google Business Profile.
- [ ] Re-audit SEO and AI-generated feel after changes.

