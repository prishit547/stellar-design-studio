# Socal Family Eye Care — Premium Redesign

A full visual rebuild of the existing 4 pages (Home, Services, Team, Contact). Content, brand name, and the existing logo image stay; everything else (layout, type system, color tokens, components, motion) is redesigned to feel like a high-end medical brand — calm, trustworthy, modern, with refined micro-interactions instead of generic AI-template patterns.

## Design direction

- **Mood**: clinical-luxe. Think a boutique optometry clinic — generous whitespace, soft depth, restrained motion. Not flat corporate, not playful.
- **Palette** (oklch tokens in `src/styles.css`):
  - Deep navy primary `#0A1D37`
  - Warm ivory background `#FBF9F4`
  - Soft sage accent `#D9E5DC`
  - Muted gold highlight for CTAs/details
  - High-contrast slate ink for text
- **Typography**:
  - Display/headlines: **Fraunces** (serif, optical-size, slight italic for accents) — premium editorial feel
  - Body/UI: **Inter** — clean, neutral
  - Tight letter-spacing on display sizes, generous line-height on body
- **Visual language**: thin hairline dividers, oversized serif headlines, asymmetric layouts, subtle grain/noise overlay, rounded-2xl cards with soft layered shadows, lots of breathing room.
- **Motion** (Framer Motion):
  - Page enter: stagger fade + slight y-translate
  - Scroll-reveal sections via `whileInView`
  - Hero: parallax on the eye-care imagery + subtle gradient drift
  - Nav: morphing underline indicator
  - Buttons: magnetic hover, ink-fill transition
  - Image cards: 3D tilt on hover, smooth scale
  - Smooth scroll (Lenis) for the whole site
- **No AI-slop patterns**: no triple-CTA hero, no "Trusted by" logo wall unless real, no generic Lucide icon grid, no fade-in-on-everything.

## Pages & routes

```
src/routes/
  __root.tsx          shared layout (nav + footer + smooth scroll)
  index.tsx           / — Home
  services.tsx        /services
  team.tsx            /team
  contact.tsx         /contact
```

Each route gets its own `head()` with unique title, description, og tags.

### Home (`/`)
- Hero: oversized serif headline ("Clarity, care, and a lifetime of vision."), eyebrow tag, single primary CTA + ghost secondary, hero image with parallax
- Trust strip: years in practice / patients served / insurance accepted (animated counters)
- Services preview: 4 featured services as editorial cards
- Doctor intro band: portrait + short bio + link to Team
- Patient testimonials: horizontal scroll with quote marks
- Insurance/CTA band before footer

### Services (`/services`)
- Editorial hero with section index
- Service detail cards (comprehensive exams, contact lens fitting, pediatric, eye disease management, optical/frames, emergency care) — each with icon-mark, description, "what to expect" detail
- Sticky side nav on desktop scrolling through categories

### Team (`/team`)
- Magazine-style hero
- Doctor + staff grid with hover-reveal bios (portrait flips to credentials)
- "Our philosophy" pull-quote section

### Contact (`/contact`)
- Split layout: form left, info + map right
- Form fields with floating labels, validation styling
- Office hours table, address with map embed, phone/email cards
- Appointment CTA

## Shared components

- `Nav` — sticky, transparent over hero, solid on scroll, animated underline, mobile drawer
- `Footer` — multi-column with hours, contact, quick links, fine print
- `Button` — variants: primary (navy fill), ghost, link-arrow
- `SectionHeader` — eyebrow + serif heading + lede
- `RevealOnScroll` — wrapper using Framer Motion
- `SmoothScrollProvider` — Lenis integration in `__root.tsx`

## Technical details

- Stack: existing TanStack Start + Tailwind v4. Add `framer-motion` and `lenis` via bun.
- Design tokens defined in `src/styles.css` as oklch CSS variables; mapped in `@theme inline`. No hardcoded hex in components.
- Fonts loaded via Google Fonts `<link>` in `__root.tsx` head.
- Logo: reuse the existing hosted logo URL from reference HTML.
- Images: hotlink the existing Google-hosted images referenced in the source HTML for doctor portraits / hero shots. Add subtle treatment (rounded, shadow, overlay) in CSS.
- All 4 routes set their own `head()` metadata (title, description, og).
- Accessibility: semantic landmarks, focus-visible rings using ring token, motion-reduce respected.
- No backend / Cloud needed — contact form is presentation-only with toast feedback.

## Build order

1. Install `framer-motion` + `lenis`; update `styles.css` tokens + fonts
2. Build shared `Nav`, `Footer`, `Button`, `RevealOnScroll`, smooth-scroll provider in `__root.tsx`
3. Build Home route
4. Build Services route
5. Build Team route
6. Build Contact route
7. QA pass: verify motion feels restrained, remove any slop patterns, check responsive
