# Luxury Yacht — Design System (v1.0 Draft)

> A clean, premium, modern, trustworthy design system with **Ocean + Sky** DNA.
> Built for two priority surfaces: **Landing Page** and **Yacht Detail Pages**.
> Positioned beside luxury automotive, private aviation, and premium maritime brands.

---

## 0. Source of Truth & Inspiration Mapping


| Inspiration                                                 | What we took         | How it shaped the system                                                                                                       |
| ----------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **"Monsoon Glow" gradient** (`#305282 → #98AFC7 → #E9ECEF`) | The core palette     | Entire color system is built by expanding these three stops. Vertical ocean→sky gradient = brand motif.                        |
| **DUOMO devotional app**                                    | Execution language   | Airy gradients, frosted-glass cards, generous whitespace, restrained sans type, calm/trustworthy mood.                         |
| **EMM brand deck / Meanfor brochure**                       | Editorial rigor      | Big confident wordmarks, monochrome + single accent, tracked all-caps labels, soft spherical gradient texture, breathing room. |
| **Webflow yacht reference**                                 | Category conventions | Cinematic full-bleed hero, horizontal fleet showcase, spec-heavy detail pages, **enquiry-led** (not e-commerce) conversion.    |


**Deliberate improvements over the inspiration (not blind copies):**

1. **Warm Champagne/Brass accent added** — the references are entirely cool-blue and risk reading *wellness/clinical*. A restrained metallic warm accent pushes the brand toward *superyacht luxury* (mirrors how automotive/aviation warm cool metallics with gold/leather).
2. **Serif + grotesque type pairing** — inspirations are sans-only; adding a high-contrast display serif for storytelling moments creates editorial luxury depth.
3. **Mono typeface for specs** — gives technical figures (LOA, beam, knots) precision and craft.

---

## 1. Brand Direction

**Personality:** Refined · Serene · Confident · Trustworthy · Quietly powerful.
The calm authority of a captain — never the loudness of a salesman.

**Luxury positioning:** Acquisition of a rare asset, not e-commerce. The website is a *private viewing room*. Peers: Feadship, Riva, NetJets, Aston Martin.

**Visual principles**

1. **Horizon-first** — layouts breathe around a calm horizontal line; the ocean→sky gradient recurs as the brand signature.
2. **Quiet luxury** — whitespace and photography carry the message; UI chrome recedes.
3. **Material honesty** — frosted glass, soft natural light, real photography. No gimmicks.
4. **Cinematic restraint** — one focal point per view; motion slow and intentional.

**Emotional experience:** Stepping onto a sunlit deck — calm, spacious, effortless, expensive. The user feels *trusted and unhurried*, never sold to.

---

## 2. Color System

### 2.1 Primary — Ocean Blue (from `#305282`)


| Token         | Hex           | Use                                             |
| ------------- | ------------- | ----------------------------------------------- |
| ocean-900     | `#0E1B2C`     | Darkest backgrounds, footer, immersive sections |
| ocean-800     | `#14233A`     | Dark surfaces, primary text on light            |
| ocean-700     | `#1E3654`     | Dark gradient stop                              |
| ocean-600     | `#274869`     | Hover for primary fills                         |
| **ocean-500** | `**#305282`** | **Brand core / primary buttons**                |
| ocean-400     | `#5A739B`     | Secondary emphasis                              |
| ocean-300     | `#8497B5`     | Muted text, icons                               |


### 2.2 Secondary — Sky Haze (from `#98AFC7`)


| Token   | Hex       | Use                             |
| ------- | --------- | ------------------------------- |
| sky-300 | `#98AFC7` | Gradient mid-stop, soft accents |
| sky-200 | `#B7C7D8` | Subtle backgrounds, borders     |
| sky-100 | `#D4DEE8` | Tints, hover surfaces           |


### 2.3 Neutrals — Sea Mist (from `#E9ECEF`)


| Token    | Hex       | Use                          |
| -------- | --------- | ---------------------------- |
| white    | `#FFFFFF` | Cards, max contrast surfaces |
| mist-50  | `#F6F8FA` | Light page background        |
| mist-100 | `#E9ECEF` | Section background, dividers |
| mist-200 | `#D9DEE3` | Borders                      |
| mist-300 | `#C2C9D1` | Disabled, hairlines          |


### 2.4 Accent — Champagne Brass *(luxury warmth)*


| Token       | Hex       | Use                                          |
| ----------- | --------- | -------------------------------------------- |
| brass       | `#C8A86B` | Active states, premium badges, key hairlines |
| brass-light | `#D9C290` | Hover/highlight                              |
| brass-dark  | `#A8884E` | Pressed, text on light                       |


> **Rule:** Champagne is the rarest element — ≤5% of any screen. Never large fills. It marks the single most important action or detail.

### 2.5 Signature Gradients

- **Ocean Gradient (hero):** `linear-gradient(180deg, #305282 0%, #98AFC7 55%, #E9ECEF 100%)`
- **Dark Immersive:** `linear-gradient(180deg, #0E1B2C 0%, #14233A 100%)`
- **Glass Scrim (text legibility over photo):** `linear-gradient(180deg, rgba(14,27,44,0) 0%, rgba(14,27,44,0.55) 100%)`

### 2.6 Surfaces (Glassmorphism — formalized from DUOMO)

- **Glass card:** bg `rgba(255,255,255,0.65)`, backdrop-blur `24px`, border `1px rgba(255,255,255,0.5)`.
- **Glass card (on dark):** bg `rgba(20,35,58,0.45)`, backdrop-blur `24px`, border `1px rgba(255,255,255,0.12)`.

### 2.7 Text Colors


| Context                   | Token             | Value                    |
| ------------------------- | ----------------- | ------------------------ |
| On light — primary        | text-strong       | `#14233A`                |
| On light — secondary      | text-muted        | `#4A5A6E`                |
| On light — disabled       | text-subtle       | `#8497B5`                |
| On dark/photo — primary   | text-invert       | `#FFFFFF`                |
| On dark/photo — secondary | text-invert-muted | `rgba(255,255,255,0.72)` |


### 2.8 Status Colors (desaturated — no neon)


| Status  | Hex       |
| ------- | --------- |
| success | `#3E8E7E` |
| warning | `#C8923E` |
| error   | `#B5483C` |
| info    | `#305282` |


### 2.9 Light/Dark Usage & Hierarchy

- **Lead light, punctuate dark.** Light (mist) dominates listings and specs; deep Ocean-900 powers footer + immersive storytelling bands.
- Champagne is always the highest-attention, lowest-frequency element.
- Default mode is **light**; dark is used sectionally for cinematic contrast (a full dark theme can be derived later from the ocean scale).

---

## 3. Typography System

### 3.1 Typefaces


| Role                           | Premium                         | Free alternative               | Notes                                           |
| ------------------------------ | ------------------------------- | ------------------------------ | ----------------------------------------------- |
| Display / Storytelling (serif) | Canela, GT Sectra               | **Fraunces**                   | High-contrast. Hero & editorial headlines ONLY. |
| Headings & UI (grotesque)      | Suisse Int'l, Neue Haas Grotesk | **Geist / Inter Tight**        | The everyday voice.                             |
| Body (grotesque)               | Suisse Int'l                    | **Geist / Inter**              | Regular weight, airy.                           |
| Spec figures (mono)            | —                               | **Geist Mono / IBM Plex Mono** | LOA, beam, speed, price.                        |


### 3.2 Scale (Major Third, 1.25 — desktop)


| Token   | Size | Line height | Weight      | Use                    |
| ------- | ---- | ----------- | ----------- | ---------------------- |
| display | 76px | 1.05        | 300 (serif) | Hero statement         |
| h1      | 61px | 1.08        | 600         | Page title             |
| h2      | 49px | 1.12        | 600         | Section title          |
| h3      | 39px | 1.15        | 600         | Sub-section            |
| h4      | 31px | 1.2         | 500         | Card title             |
| h5      | 25px | 1.3         | 500         | Small heading          |
| body-lg | 20px | 1.6         | 400         | Lead paragraph         |
| body    | 16px | 1.6         | 400         | Default                |
| small   | 14px | 1.5         | 400         | Captions/meta          |
| caption | 12px | 1.4         | 500         | Labels                 |
| eyebrow | 12px | 1.4         | 500         | ALL-CAPS, +8% tracking |


**Mobile:** scale down ~20% (display ~48px, h1 ~40px, h2 ~32px).

### 3.3 Rules

- Tracking: headings −1% to −2%; eyebrows/labels +8% (EMM-deck label treatment).
- **No weights above 600** — luxury whispers; no black/heavy.
- Serif used sparingly; grotesque is the workhorse; mono only for technical figures.

---

## 4. Layout System

- **Grid:** 12-col desktop / 8-col tablet / 4-col mobile; gutter 24px.
- **Containers:** wide `1440` · standard `1200` · reading `720` · full-bleed (hero/gallery).
- **Spacing scale (4px base):** `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160`.
- **Section spacing:** 96–160px desktop / 64px mobile between major sections (generous = premium).
- **Vertical rhythm:** 8px baseline grid; 24px paragraph spacing.
- **Breakpoints:** `360 · 768 · 1024 · 1280 · 1440 · 1920`.
- **Responsive behavior:** hero stays cinematic on mobile; spec tables collapse to accordions; carousels become swipe.

---

## 5. Component Design Language


| Component        | Direction                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Navigation**   | Transparent over hero → frosted glass on scroll. Thin wide-tracked links. Single champagne-outlined "Enquire" CTA.                                                        |
| **Mega menu**    | Full-width frosted panel; fleet categories as image tiles (Motor / Sailing / Explorer / Catamaran) + one featured yacht.                                                  |
| **Hero**         | Full-bleed drone video/photo; ocean gradient scrim at base; serif statement + one CTA.                                                                                    |
| **Yacht card**   | Large 16:9 / 4:5 image, minimal chrome. Name (grotesque) + key specs (mono: LOA · Year · Cabins) + price / "Price on application." Hover: slow zoom + champagne hairline. |
| **Galleries**    | Edge-to-edge large thumbs; fullscreen lightbox; Exterior / Interior / Deck tabs.                                                                                          |
| **Carousels**    | Horizontal scroll-snap with momentum; thin progress line (node motif), not dots.                                                                                          |
| **Filters**      | Calm bar/sidebar: range sliders (length/price/year), pill toggles (type). Frosted surfaces, instant results.                                                              |
| **CTA buttons**  | Primary: solid ocean-500 → champagne hairline on hover. Secondary: ghost + hairline border. Tertiary: text + arrow. Radius 4–8px, generous padding.                       |
| **Forms**        | Floating labels, hairline-underline inputs (not boxy), single column, lots of space. Concierge feel.                                                                      |
| **Contact**      | "Speak with a specialist" — broker photo, direct line, frosted card over ocean image.                                                                                     |
| **Testimonials** | Large serif pull-quote, owner name + yacht owned. Quiet credibility.                                                                                                      |
| **Statistics**   | Big mono numerals + small tracked labels (yachts sold, $ brokered, years, countries).                                                                                     |
| **Footer**       | Deep ocean-900, spacious, large wordmark, refined link columns, fine champagne top hairline.                                                                              |


---

## 6. Landing Page Direction

**Flow: emotion → desire → proof → action.**

1. **Hero** — drone footage, serif statement, one CTA, gradient scrim.
2. **Featured fleet** — horizontal showcase of 3–4 hero yachts, large imagery.
3. **Story band** — dark immersive section: editorial serif + craft/heritage lifestyle imagery.
4. **Browse by type** — category image tiles.
5. **Trust band** — statistics + brokerage credentials + desaturated partner logos.
6. **Testimonial** — single owner quote.
7. **Conversion** — concierge/contact band before footer.

---

## 7. Yacht Detail Page Direction

1. **Cinematic hero** of the specific yacht + name + headline specs overlaid.
2. **Sticky spec rail** — LOA, beam, draft, year, builder, guests, cabins, crew, cruising speed, price (mono). Sticky "Enquire."
3. **Gallery** — fullscreen, Exterior / Interior / Deck tabs, optional 360° / deck-plan.
4. **Feature storytelling** — alternating image/text scroll sections (master suite, flybridge, engineering). Show, don't list.
5. **Full specifications** — clean two-column table, mono figures, downloadable PDF spec sheet.
6. **Inquiry flow** — concise concierge form + assigned specialist; persistent CTA. Never "add to cart."
7. **Related yachts** — subtle, end of page.

---

## 8. Imagery Guidelines

- **Style:** Cinematic, editorial, true-to-life.
- **Lighting:** Soft natural light; golden hour preferred; bright airy interiors; no harsh flash.
- **Composition:** Strong horizon lines, generous negative space (sky/water), rule of thirds.
- **Drone:** Essential — aerial wake shots & top-downs convey scale and freedom; use as hero/section breaks.
- **Lifestyle:** Aspirational but tasteful — relaxed people, golden light, never staged/stocky.
- **Grade:** Apply a consistent cool-to-warm LUT across all imagery for an authored feel (ties to champagne accent).

---

## 9. Motion & Interaction Guidelines

- **Philosophy:** Slow, weighted, intentional — like a large vessel moving. Never snappy or bouncy.
- **Hover:** Slow image zoom (1.0→1.05, 600ms), champagne hairline reveals, gentle card elevation.
- **Transitions:** 300–600ms, ease `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Scroll:** Subtle hero parallax; fade-and-rise reveals (24px, staggered); optional smooth scroll.
- **Premium patterns:** Cinematic page transitions, lazy-revealed galleries, sticky spec rail, momentum carousels.
- **Accessibility:** Always honor `prefers-reduced-motion`.

---

## 10. Design Tokens

### Colors

```
--ocean-900:#0E1B2C; --ocean-800:#14233A; --ocean-700:#1E3654;
--ocean-600:#274869; --ocean-500:#305282; --ocean-400:#5A739B; --ocean-300:#8497B5;
--sky-300:#98AFC7;  --sky-200:#B7C7D8;  --sky-100:#D4DEE8;
--white:#FFFFFF; --mist-50:#F6F8FA; --mist-100:#E9ECEF; --mist-200:#D9DEE3; --mist-300:#C2C9D1;
--brass:#C8A86B; --brass-light:#D9C290; --brass-dark:#A8884E;
--text-strong:#14233A; --text-muted:#4A5A6E; --text-subtle:#8497B5;
--text-invert:#FFFFFF; --text-invert-muted:rgba(255,255,255,0.72);
--success:#3E8E7E; --warning:#C8923E; --error:#B5483C; --info:#305282;
--grad-ocean:linear-gradient(180deg,#305282 0%,#98AFC7 55%,#E9ECEF 100%);
--grad-dark:linear-gradient(180deg,#0E1B2C 0%,#14233A 100%);
--glass:rgba(255,255,255,0.65);
```

### Typography

```
--font-display:"Canela","Fraunces",serif;
--font-sans:"Suisse Int'l","Geist","Inter",sans-serif;
--font-mono:"Geist Mono","IBM Plex Mono",monospace;
--fs-display:76px; --fs-h1:61px; --fs-h2:49px; --fs-h3:39px; --fs-h4:31px;
--fs-h5:25px; --fs-body-lg:20px; --fs-body:16px; --fs-small:14px; --fs-caption:12px;
--lh-tight:1.1; --lh-heading:1.15; --lh-body:1.6;
--fw-light:300; --fw-regular:400; --fw-medium:500; --fw-semibold:600;
--track-tight:-0.02em; --track-eyebrow:0.08em;
```

### Spacing

```
--space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-5:24px;
--space-6:32px; --space-7:48px; --space-8:64px; --space-9:96px; --space-10:128px; --space-11:160px;
```

### Radius

```
--radius-sm:4px; --radius-md:8px; --radius-lg:16px; --radius-xl:24px; --radius-pill:999px;
```

### Shadows / Elevation (soft, blue-tinted)

```
--elev-0:none;
--elev-1:0 1px 2px rgba(20,35,58,0.06);
--elev-2:0 4px 12px rgba(20,35,58,0.08);
--elev-3:0 8px 24px rgba(20,35,58,0.10);
--elev-4:0 16px 48px rgba(20,35,58,0.14);
/* Glass surfaces favor backdrop-blur(24px) over heavy shadow */
```

### Motion

```
--dur-fast:200ms; --dur-base:400ms; --dur-slow:600ms;
--ease-luxury:cubic-bezier(0.22,1,0.36,1);
--ease-in-out:cubic-bezier(0.65,0,0.35,1);
```

### Layout

```
--container-wide:1440px; --container-standard:1200px; --container-reading:720px;
--grid-cols:12; --grid-gutter:24px;
--bp-sm:360px; --bp-md:768px; --bp-lg:1024px; --bp-xl:1280px; --bp-2xl:1440px;
```

---

## 11. Reasoning Summary (Why these decisions)

- **Palette from Monsoon Glow** = the literal ocean→sky horizon, the most authentic yacht-industry metaphor available, and it's the user's strongest provided signal.
- **Champagne accent** prevents the cool palette from reading clinical and aligns with luxury automotive/aviation warmth.
- **Glassmorphism** is lifted directly from the DUOMO references but constrained to cards/nav so it stays premium, not trendy.
- **Serif + grotesque + mono trio** gives three distinct voices: emotion (serif), clarity (grotesque), precision (mono) — exactly what landing + detail pages need.
- **Generous spacing & slow motion** encode "expensive and unhurried," the core emotional goal.
- **Enquiry-led conversion** (no cart) respects how high-value yacht sales actually work.

---

*v1.0 — first draft (Part I). Part II below upgrades this into a production-ready, single-source-of-truth specification.*

---

---

# PART II — PRODUCTION SPECIFICATION (v2.0)

> **How to read this document.** Part I (sections 0–11) defines brand strategy and foundations. Part II (sections 12–26) is the implementation contract. Every value here references a token from §10. **If a value is not in this document, it does not exist** — see §24 Design-to-Code Rules and §25 AI Generation Rules. This document is binding for designers, frontend developers, and AI coding agents (Claude, Cursor, v0, Lovable).

## Table of Contents — Part II

1. Component Library
2. Interaction States
3. Accessibility System
4. Iconography System
5. Border & Elevation System
6. Layering & Z-Index Architecture
7. Forms & Validation
8. Data Display System
9. Content & Copywriting Guidelines
10. Responsive Design Rules
11. Motion System (Expanded)
12. Page Templates
13. Design-to-Code Rules
14. AI Generation Rules
15. Design Governance

### Token additions introduced in Part II

These extend §10. Use them as named tokens.

```
/* Borders */
--border-width-hairline:1px; --border-width-default:1px; --border-width-strong:2px;
--border-subtle:rgba(20,35,58,0.08); --border-default:#D9DEE3; --border-strong:#C2C9D1;
--border-focus:#305282; --border-brass:#C8A86B;
--border-invert:rgba(255,255,255,0.16);

/* Focus ring */
--focus-ring:0 0 0 2px #FFFFFF, 0 0 0 4px #305282;
--focus-ring-invert:0 0 0 2px #0E1B2C, 0 0 0 4px #98AFC7;

/* Z-index scale */
--z-base:0; --z-content:10; --z-sticky:100; --z-nav:200; --z-dropdown:300;
--z-tooltip:400; --z-overlay:500; --z-drawer:600; --z-modal:700; --z-toast:800; --z-max:9999;

/* Component sizing (control heights) */
--control-sm:36px; --control-md:44px; --control-lg:52px;

/* Motion (additive to §10) */
--dur-instant:120ms; --dur-fast:200ms; --dur-base:400ms; --dur-slow:600ms; --dur-cinematic:900ms;
--ease-luxury:cubic-bezier(0.22,1,0.36,1);
--ease-standard:cubic-bezier(0.4,0,0.2,1);
--ease-decelerate:cubic-bezier(0,0,0.2,1);
--ease-accelerate:cubic-bezier(0.4,0,1,1);

/* Touch */
--touch-min:44px;
```

> **Minimum touch target is 44×44px** everywhere. `--control-sm` (36px) is the *visual* height; it must still carry a 44px hit area via padding/pseudo-element on touch devices.

---

## 12. Component Library

> **Global conventions for every component**
>
> - All radii from `--radius-*`; all spacing from `--space-*`; all color from §2 tokens. No raw hex/px in usage.
> - Default transition: `all var(--dur-fast) var(--ease-luxury)` (exceptions noted per component).
> - Every interactive component must implement all applicable states in §13 and all a11y rules in §14.
> - Focus ring is always `--focus-ring` (`--focus-ring-invert` on dark/photo).
> - Control heights: sm `36px`, md `44px` (default), lg `52px`.

---

### 12.1 Buttons

**Purpose:** Trigger an action. Primary actions on yacht pages are almost always *Enquire / Request details / Download spec*.

**Anatomy:** `[ optional leading icon ] [ label ] [ optional trailing icon ]` inside a padded container with radius `--radius-md`.

**Sizes**


| Size | Height | Padding X        | Font                  | Icon |
| ---- | ------ | ---------------- | --------------------- | ---- |
| sm   | 36px   | `--space-4` (16) | `--fs-small` 14 / 500 | 16px |
| md   | 44px   | `--space-5` (24) | `--fs-body` 16 / 500  | 18px |
| lg   | 52px   | `--space-6` (32) | `--fs-body` 16 / 500  | 20px |


**Variants**


| Variant           | Default                                                   | Hover                                           | Notes                     |
| ----------------- | --------------------------------------------------------- | ----------------------------------------------- | ------------------------- |
| Primary           | bg `--ocean-500`, text `--white`                          | bg `--ocean-600` + 1px `--brass` inset hairline | Main conversion CTA       |
| Secondary (ghost) | transparent, 1px `--border-default`, text `--text-strong` | border `--ocean-500`, bg `--sky-100`            | Lower-priority actions    |
| Tertiary (text)   | text `--ocean-500`, no bg                                 | underline offset + arrow nudges 4px             | Inline / "Learn more →"   |
| Brass (premium)   | bg `--brass`, text `--ocean-900`                          | bg `--brass-light`                              | Rare; single hero CTA max |
| Invert            | bg `rgba(255,255,255,0.9)`, text `--ocean-800`            | bg `--white`                                    | On photos/dark            |
| Destructive       | bg `--error`, text `--white`                              | darken 8%                                       | Settings/account only     |


**Spacing:** Icon-to-label gap `--space-2` (8px). Min width 96px. Adjacent buttons gap `--space-3` (12px).

**States:** See §13. Loading replaces label with spinner (icon 18px), keeps width, sets `aria-busy`. Disabled: `opacity .45`, `cursor not-allowed`, no hover.

**Accessibility:** Real `<button>`/`<a>`; `aria-label` if icon-only; 44px min hit area; focus ring required; loading sets `aria-busy="true"` and disables pointer.

**Usage:** One primary per view/section. Verbs, not nouns. Icon-only buttons need tooltips (§12.11).

**Do / Don't**

- ✅ "Enquire about this yacht" / ✅ one primary CTA per section.
- ❌ Two primary buttons competing. ❌ Brass on more than one element per screen. ❌ Drop-shadows on buttons (use color/state, not elevation).

---

### 12.2 Inputs (text)

**Purpose:** Single-line data entry.

**Anatomy:** Floating label + input field + optional leading icon + optional trailing affix/clear + helper/error text below.

**Style (signature):** Hairline-underline, not boxed. bg transparent (or `--mist-50`), bottom border `1px --border-default`, radius `0` on underline style **or** `--radius-md` for the boxed variant used in dashboards.

**Sizes:** sm 36 / md 44 / lg 52 height; padding X `--space-4`; font `--fs-body`.

**Variants:** Underline (marketing/inquiry forms) · Boxed (`1px --border-default`, radius `--radius-md`, dashboards/settings) · With leading icon · With trailing affix (units like "ft", "kn").

**Spacing:** Label-to-field 4px; field-to-helper `--space-2` (8); fields stacked gap `--space-5` (24).

**States:** Default border `--border-default`; Hover border `--border-strong`; Focus border `--border-focus` + `--focus-ring`, label floats; Filled label stays floated; Disabled `opacity .45`; Error border `--error` + error text; Success border `--success` + check icon.

**Accessibility:** `<label for>` always (visually floating, semantically present); `aria-invalid` + `aria-describedby` to error; placeholder ≠ label.

**Usage:** One concept per field. Show units as affixes. Validate on blur, not on keystroke.

**Do/Don't:** ✅ floating label persists. ❌ placeholder-only labels. ❌ red asterisk as the *only* required signal (see §18).

---

### 12.3 Textareas

**Purpose:** Multi-line input (inquiry message, notes).
**Anatomy:** Same as boxed input + resize handle (vertical only).
**Sizes:** min-height 96px (3 rows) / 144px comfortable; padding `--space-4`.
**Variants:** Boxed (default) · With character counter (bottom-right `--fs-caption --text-subtle`).
**Spacing:** Counter gap `--space-2` above helper line.
**States:** Same as inputs; auto-grow optional to max 320px then scroll.
**Accessibility:** Label required; counter announced via `aria-live="polite"` only near limit.
**Do/Don't:** ✅ vertical resize. ❌ horizontal resize. ❌ fixed tiny height for long messages.

---

### 12.4 Select Menus

**Purpose:** Choose one (or many) from a known list (yacht type, builder, year).
**Anatomy:** Trigger (looks like input + chevron) → floating listbox panel → options (with optional check for selected).
**Sizes:** Trigger matches input sizes; panel max-height 320px then scroll; option height 40px.
**Variants:** Single-select · Multi-select (checkbox options + count chip) · Searchable (filter field pinned top) · Native `<select>` fallback on mobile.
**Spacing:** Option padding X `--space-4`, panel padding Y `--space-2`; panel offset 4px from trigger.
**States:** Trigger = input states. Option: hover bg `--sky-100`; selected bg `--sky-100` + `--brass` check; focused (keyboard) 2px inset `--border-focus`.
**Accessibility:** ARIA `combobox`/`listbox`/`option`; full keyboard (↑↓ Home End, type-ahead, Enter select, Esc close); `aria-selected`; focus returns to trigger on close.
**Usage:** ≤7 options → consider radio/segmented instead. >10 → make searchable.
**Do/Don't:** ✅ searchable for builders/models. ❌ native dropdown for >15 unstyled options on desktop. ❌ select for boolean (use Switch).

---

### 12.5 Checkboxes

**Purpose:** Multiple independent selections / single consent.
**Anatomy:** Box (18px) + check glyph + label + optional helper.
**Sizes:** Box 18px; touch area 44px; label `--fs-body`.
**Variants:** Single · Group · Indeterminate (parent of partial group).
**Spacing:** Box-to-label `--space-3` (12); stacked items gap `--space-3`.
**States:** Unchecked border `1px --border-strong`; Hover border `--ocean-500`; Checked bg `--ocean-500` + white check; Focus `--focus-ring`; Disabled `opacity .45`; Error border `--error`.
**Accessibility:** Native `<input type=checkbox>`; clicking label toggles; `aria-checked="mixed"` for indeterminate.
**Do/Don't:** ✅ checkbox for "I agree". ❌ checkbox for mutually exclusive options (use radio). ❌ checkbox to perform an instant action (use Switch).

---

### 12.6 Radio Buttons

**Purpose:** Exactly one from a small mutually-exclusive set.
**Anatomy:** Circle (18px) + inner dot + label.
**Sizes:** Circle 18px, dot 8px; touch 44px.
**Variants:** Vertical list · Segmented/card radios (selectable cards, used for yacht-type filters).
**Spacing:** Circle-to-label `--space-3`; items gap `--space-3` (list) / `--space-4` (cards).
**States:** Same family as checkbox; Selected = `--ocean-500` ring + filled dot. Card variant selected: border `--brass`, bg `--sky-100`.
**Accessibility:** Native radios in one `name` group / `role=radiogroup`; arrow keys move selection; group has a label.
**Do/Don't:** ✅ ≤6 options. ❌ single radio (use checkbox/switch). ❌ no default when one is genuinely required — mark required.

---

### 12.7 Switches

**Purpose:** Instant on/off of a setting (no submit).
**Anatomy:** Track (44×24) + thumb (20px).
**Sizes:** md 44×24 (default); sm 36×20.
**Variants:** With inline label · With leading label + trailing switch (settings rows).
**Spacing:** Label-to-switch space-between; row padding Y `--space-3`.
**States:** Off track `--mist-300`; On track `--ocean-500`; thumb `--white` with `--elev-1`; Focus `--focus-ring`; Disabled `opacity .45`; transition `--dur-fast --ease-standard`.
**Accessibility:** `role=switch` + `aria-checked`; operable by Space/Enter; label clickable.
**Do/Don't:** ✅ "Email me new listings". ❌ switch for actions needing confirmation. ❌ switch inside a form that requires Save (use checkbox).

---

### 12.8 Cards

**Purpose:** Group related content; the yacht card is the hero pattern.
**Anatomy:** Media (image/video) → body (eyebrow/title/specs/meta) → footer (CTA/price). Optional badge overlay.
**Sizes:** Fluid to grid column; media 16:9 (listing) or 4:5 (featured); body padding `--space-5` (24); radius `--radius-lg` (16).
**Variants:** Yacht card · Category tile (image + label only) · Stat card (§19.3) · Glass card (frosted, §16) · Content card (text-only).
**Spacing:** Internal stack gap `--space-3`; grid gap `--space-5`/`--space-6`.
**States:** Default `--elev-1`; Hover `--elev-3` + media zoom 1.0→1.05 (`--dur-slow`) + `--brass` hairline reveal; Focus-within `--focus-ring`; Loading → skeleton (§12.23); Selected (comparison) `--brass` 2px border.
**Accessibility:** Whole card clickable → wrap title in the link, make card a single tab stop; don't nest interactive elements ambiguously; provide `alt` for media.
**Usage:** Specs in `--font-mono`; price or "Price on application"; never more than one CTA.
**Do/Don't:** ✅ generous media, minimal chrome. ❌ heavy borders + heavy shadow together. ❌ truncating the yacht name.

---

### 12.9 Modals (dialogs)

**Purpose:** Focused task/decision requiring attention (inquiry confirm, gallery lightbox is a special modal).
**Anatomy:** Scrim → centered container (header w/ title + close, body, footer actions). Max-width 560 (standard) / 100vw (lightbox).
**Sizes:** sm 400 / md 560 / lg 720; radius `--radius-xl` (24); padding `--space-6`.
**Variants:** Standard dialog · Confirmation · Fullscreen lightbox (gallery) · Form modal.
**Spacing:** Header-body gap `--space-5`; footer actions gap `--space-3`, right-aligned.
**States:** Enter: scrim fade + container rise 16px (`--dur-base --ease-decelerate`); Exit reverse `--dur-fast`. Scrim `rgba(14,27,44,0.55)` + blur 4px.
**Accessibility:** `role=dialog` `aria-modal=true`, labelled by title; **focus trap**; focus moves to first focusable / close; Esc closes; focus returns to trigger; background `inert`; scroll lock.
**Usage:** ≤1 modal at a time; never stack modals. Primary action right, cancel left/ghost.
**Do/Don't:** ✅ Esc + click-scrim to dismiss (non-destructive). ❌ modal for content that should be a page. ❌ trapping with no visible close.

---

### 12.10 Drawers (sheets)

**Purpose:** Side/bottom panel for secondary flows (mobile nav, filters, quick inquiry).
**Anatomy:** Scrim → panel anchored to edge (right/left/bottom) with header + close, scrollable body, sticky footer.
**Sizes:** Right/left width 360–480 (desktop), 100vw−48 (mobile); bottom sheet height auto→90vh. Radius on inner edge `--radius-xl`.
**Variants:** Right (filters/cart-equivalent) · Left (mobile nav) · Bottom (mobile actions).
**Spacing:** Padding `--space-5`; footer `--space-4`.
**States:** Slide in from edge `--dur-base --ease-decelerate`; scrim as modal. Bottom sheet supports drag-to-dismiss.
**Accessibility:** Same as modal (focus trap, Esc, return focus, `aria-modal`). Announce as dialog.
**Do/Don't:** ✅ drawer for mobile filters. ❌ drawer for a single confirmation (use modal). ❌ multiple open drawers.

---

### 12.11 Tooltips

**Purpose:** Brief, supplementary label for an icon/control. Never essential info.
**Anatomy:** Trigger + floating bubble + arrow.
**Sizes:** Padding `--space-2 --space-3`; `--fs-small`; max-width 240px; radius `--radius-sm`.
**Variants:** Dark (default: bg `--ocean-800`, text white) · Light (on dark surfaces).
**Spacing:** 8px offset from trigger.
**States:** Appear on hover (150ms delay) + focus; fade `--dur-instant`. Dismiss on blur/Esc/leave.
**Accessibility:** `role=tooltip` + `aria-describedby`; must trigger on keyboard focus too (not hover-only); never the only source of critical info; not focusable itself.
**Do/Don't:** ✅ explain an icon-only button. ❌ put interactive content/links in a tooltip (use Popover/Dropdown). ❌ rely on tooltip for required field rules.

---

### 12.12 Dropdown Menus (action menus)

**Purpose:** List of actions/commands from a trigger (overflow "⋯", account menu).
**Anatomy:** Trigger → panel → items (icon + label + optional shortcut/submenu), dividers, optional section labels.
**Sizes:** Item height 40px; panel min-width 200px; radius `--radius-md`; `--elev-3`.
**Variants:** Action menu · Account menu · Context menu · With submenus.
**Spacing:** Item padding `--space-3 --space-4`; section gap via divider + `--space-2`.
**States:** Item hover bg `--sky-100`; focused 2px inset `--border-focus`; destructive item text `--error`; disabled `opacity .45`.
**Accessibility:** `role=menu`/`menuitem`; keyboard ↑↓, Home/End, Enter/Space, Esc, type-ahead; focus returns to trigger.
**Do/Don't:** ✅ group actions logically with dividers. ❌ mix navigation links and destructive actions without separation. ❌ more than ~7 items without sectioning.

---

### 12.13 Tabs

**Purpose:** Switch views within the same context (gallery: Exterior/Interior/Deck; detail: Overview/Specs/Features).
**Anatomy:** Tablist (tabs) + active indicator + panels.
**Sizes:** Tab height 44px; label `--fs-body`/500; indicator 2px.
**Variants:** Underline (default, indicator `--brass`) · Segmented (pill container, `--mist-100` bg, active `--white` chip) · Vertical (settings).
**Spacing:** Tab gap `--space-5`; panel top padding `--space-6`.
**States:** Inactive text `--text-muted`; active `--text-strong` + indicator; hover `--text-strong`; focus `--focus-ring`; indicator slides `--dur-base --ease-luxury`.
**Accessibility:** `role=tablist/tab/tabpanel`; ← → roam, Home/End; `aria-selected`; panel `aria-labelledby`; arrow-key activation (manual or automatic — pick one, document: **manual** here).
**Do/Don't:** ✅ ≤5 top-level tabs. ❌ tabs that reload the page. ❌ tabs for sequential steps (use a stepper).

---

### 12.14 Accordions

**Purpose:** Progressive disclosure of stackable content (full specs on mobile, FAQ).
**Anatomy:** Item = header (button: label + chevron) + collapsible region.
**Sizes:** Header min-height 56px; padding `--space-4 0`; content padding-bottom `--space-5`.
**Variants:** Single-open · Multi-open · Bordered (divider between items `1px --border-subtle`).
**Spacing:** Divider between items; content indented to align with header text.
**States:** Collapsed chevron 0°; expanded 180° (`--dur-fast`); height animates `--dur-base --ease-standard`; hover header `--text-strong`; focus `--focus-ring`.
**Accessibility:** Header is a `<button aria-expanded>` controlling region (`aria-controls`); region `role=region` labelled by header; height animation must not trap focus.
**Do/Don't:** ✅ collapse long spec lists on mobile. ❌ hide primary CTA inside accordion. ❌ nest more than 2 levels.

---

### 12.15 Navigation Bars

**Purpose:** Primary site navigation + persistent Enquire CTA.
**Anatomy:** Logo (left/center) + nav links + mega-menu triggers + utility (search, phone, language) + Enquire CTA.
**Sizes:** Height 72px (desktop) / 64px (scrolled-compact) / 56px (mobile); horizontal padding = container gutter.
**Variants:** Transparent-over-hero (text `--white`) · Solid/frosted-on-scroll (`--glass` + `--elev-2` + bottom hairline `--border-subtle`).
**Spacing:** Link gap `--space-5`; utility gap `--space-4`.
**States:** Link default `--text-invert`/`--text-strong`; hover `--brass` underline reveal; active link `--brass` indicator; scrolled state transitions `--dur-base`. Mobile → hamburger opens left drawer.
**Accessibility:** `<nav aria-label="Primary">`; skip-link to main; current page `aria-current="page"`; keyboard-operable mega menu; logo links home.
**Do/Don't:** ✅ keep Enquire always visible. ❌ hide nav entirely on scroll-down without easy return. ❌ more than ~6 top-level items.

---

### 12.16 Sidebars

**Purpose:** Persistent secondary nav for dashboards/settings (admin/owner portal).
**Anatomy:** Logo + nav groups (icon + label) + collapse toggle + footer (account).
**Sizes:** Expanded 264px / collapsed 72px (icons only); item height 44px.
**Variants:** Expanded · Collapsed (icon + tooltip) · Mobile (becomes left drawer).
**Spacing:** Item padding `--space-3 --space-4`; group gap `--space-5`; group label `--fs-caption` ALL-CAPS `--text-subtle`.
**States:** Item hover bg `--sky-100`; active bg `--sky-100` + `--brass` 2px left bar + `--text-strong`; focus `--focus-ring`.
**Accessibility:** `<nav aria-label>`; collapsed items need accessible names (tooltip + `aria-label`); `aria-current` for active.
**Do/Don't:** ✅ icons + labels. ❌ icon-only with no tooltip. ❌ >2 nesting levels.

---

### 12.17 Breadcrumbs

**Purpose:** Show hierarchy/location (Fleet › Motor Yachts › Azimut 68).
**Anatomy:** Ordered list of links + separators + current (non-link).
**Sizes:** `--fs-small`; separator "/" or "›" `--text-subtle`.
**Variants:** Standard · Truncated (Home › … › Current on mobile).
**Spacing:** Item-separator gap `--space-2`.
**States:** Link `--text-muted` → hover `--text-strong` underline; current `--text-strong` `aria-current="page"`.
**Accessibility:** `<nav aria-label="Breadcrumb">` + `<ol>`; current marked; separators decorative (`aria-hidden`).
**Do/Don't:** ✅ on detail/listing pages. ❌ on the homepage. ❌ make current item a link.

---

### 12.18 Pagination

**Purpose:** Navigate paged listings/search results.
**Anatomy:** Prev + page numbers (+ ellipsis) + Next; optional "Showing X–Y of Z".
**Sizes:** Control 40×40; gap `--space-2`.
**Variants:** Numbered · Prev/Next only · Load-more button · Infinite scroll (with visible "load more" fallback + count).
**Spacing:** Centered, margin-top `--space-8`.
**States:** Current page bg `--ocean-500` text white; hover bg `--sky-100`; disabled ends `opacity .45`; focus ring.
**Accessibility:** `<nav aria-label="Pagination">`; current `aria-current="page"`; Prev/Next have labels; never rely on color alone for current.
**Do/Don't:** ✅ show total count. ❌ infinite scroll with critical footer content below. ❌ tiny touch targets.

---

### 12.19 Tables

See §19.1 for full data-table spec. Summary: row height 56px comfortable / 44px compact; header `--fs-caption` ALL-CAPS `--text-subtle`; row divider `1px --border-subtle`; hover row `--mist-50`; numeric columns right-aligned in `--font-mono`; sticky header; sortable headers are buttons with `aria-sort`.

---

### 12.20 Empty States

**Purpose:** Guide users when there's no data (no saved yachts, no search results).
**Anatomy:** Icon/illustration + title + supportive line + primary action.
**Sizes:** Centered, max-width 420px; illustration ≤120px; vertical padding `--space-10`.
**Variants:** First-use (encourage) · No-results (adjust filters) · Error (retry) · Cleared (success).
**Spacing:** Icon→title `--space-5`; title→body `--space-3`; body→CTA `--space-5`.
**States:** Static; CTA follows button states.
**Accessibility:** Title is a heading; illustration `aria-hidden`; action focusable; announce result count changes via `aria-live`.
**Usage / copy:** See §20. Reframe positively: "No yachts match these filters yet — broaden your search."
**Do/Don't:** ✅ offer a next action. ❌ dead-end ("Nothing here"). ❌ blame the user.

---

### 12.21 Toast Notifications

**Purpose:** Transient, non-blocking feedback (inquiry sent, saved).
**Anatomy:** Icon (status) + message + optional action + close.
**Sizes:** Width 360 (desktop) / full−32 (mobile); padding `--space-4`; radius `--radius-md`; `--elev-4`.
**Variants:** Success · Error · Info · Warning · With action (Undo).
**Spacing:** Stacked gap `--space-3`; anchored top-right desktop / top mobile; z `--z-toast`.
**States:** Enter slide+fade `--dur-base --ease-decelerate`; auto-dismiss 5s (success/info), persist until dismissed (error); pause on hover/focus.
**Accessibility:** `role=status` (`aria-live=polite`) for success/info, `role=alert` (`assertive`) for error; not focus-stealing; reachable close; respect reduced motion.
**Do/Don't:** ✅ "Inquiry sent — a specialist will reply within 24h." ❌ toast for critical errors needing decision (use modal/inline). ❌ stack >3.

---

### 12.22 Loading States

**Purpose:** Communicate progress and preserve layout.
**Patterns:** (1) **Skeletons** for content/layout (preferred — see §12.23). (2) **Spinners** for indeterminate actions in buttons/small areas. (3) **Progress bars** for determinate uploads/multi-step.
**Sizes:** Spinner sm 16 / md 20 / lg 24, stroke 2px, color `--ocean-500` (or `--brass` on key CTA). Progress bar height 4px, radius pill, track `--mist-200`, fill `--ocean-500`.
**States:** Button loading = spinner + `aria-busy`, keep width. Page-level = skeleton, never a blank screen >300ms.
**Accessibility:** `role=status` + `aria-live=polite` + visually-hidden "Loading…"; progress `role=progressbar` with `aria-valuenow/min/max`; respect reduced motion (slow/replace spin with pulse).
**Do/Don't:** ✅ skeletons that match final layout. ❌ full-screen spinner for partial updates. ❌ layout shift when content loads.

---

### 12.23 Skeleton Loaders

**Purpose:** Placeholder shapes that mirror final content to reduce perceived wait.
**Anatomy:** Gray blocks matching media/title/text/lines geometry.
**Style:** bg `--mist-100`; shimmer gradient `mist-100 → mist-50 → mist-100` sweeping 1.5s `--ease-standard` (replace with static `--mist-100` under reduced motion); radius matches the real element.
**Sizes:** Match real component (card skeleton = media block 16:9 + 2 text lines + meta line).
**States:** Animate until data ready, then cross-fade `--dur-fast` to content.
**Accessibility:** Container `aria-hidden=true` + sibling `role=status` "Loading"; never announce shimmer.
**Do/Don't:** ✅ one skeleton per real card. ❌ skeleton that doesn't match layout (causes shift). ❌ skeletons for <300ms loads (flicker).

---

## 13. Interaction States

Every interactive element implements the applicable states below. Transitions use `--dur-fast var(--ease-luxury)` unless noted. **Never communicate state by color alone** — pair with border, icon, weight, or text (§14).


| State                  | Visual behavior                                                                                                                                                   | Transition                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| **Default**            | Base tokens per component.                                                                                                                                        | —                               |
| **Hover**              | Subtle lift: bg shift (e.g. `--ocean-500→600`), or `--sky-100` tint, or `--brass` hairline reveal; media zoom 1.0→1.05 on cards. Pointer cursor.                  | `--dur-fast --ease-luxury`      |
| **Active / Pressed**   | Slight darken (−6–8% lightness) + scale 0.98 (buttons/cards only).                                                                                                | `--dur-instant --ease-standard` |
| **Focus (visible)**    | `--focus-ring` (2px white gap + 2px `--ocean-500`); `--focus-ring-invert` on dark/photo. Always visible for keyboard; `:focus-visible` only (not on mouse click). | instant                         |
| **Disabled**           | `opacity .45`, `cursor not-allowed`, no hover/active, `aria-disabled`/`disabled`, removed from tab order only if truly inert.                                     | none                            |
| **Loading**            | Spinner replaces label (keep dimensions), `aria-busy=true`, pointer disabled.                                                                                     | `--dur-fast` fade               |
| **Selected / Checked** | `--ocean-500` fill (controls) or `--brass` border + `--sky-100` bg (cards/chips); `aria-selected`/`aria-checked`.                                                 | `--dur-fast`                    |
| **Error**              | Border `--error`, error text + icon below, `aria-invalid=true`; shake is NOT used (too playful for luxury).                                                       | `--dur-fast`                    |
| **Success**            | Border `--success` + check icon; success helper text; auto-revert after confirmation where appropriate.                                                           | `--dur-fast`                    |


**Rules**

- Hover effects must have a non-hover equivalent (focus) for keyboard/touch.
- Pressed scale only on tappable surfaces (buttons, cards), never inputs.
- All state changes respect `prefers-reduced-motion` (§14, §22): cross-fade instead of transform.
- State precedence: Disabled > Loading > Error/Success > Selected > Focus > Hover > Default.

---

## 14. Accessibility System

**Compliance target: WCAG 2.2 Level AA (AAA for body text contrast where feasible).** Accessibility is non-negotiable and part of "definition of done."

### 14.1 Contrast requirements


| Content                            | Min ratio | Notes                                                                 |
| ---------------------------------- | --------- | --------------------------------------------------------------------- |
| Body text (<18px / <14px bold)     | 4.5:1     | `--text-strong` on `--mist-50` = passes.                              |
| Large text (≥24px / ≥18.66px bold) | 3:1       | Hero serif over photo must use scrim.                                 |
| UI components & focus indicators   | 3:1       | Borders, icons, control boundaries.                                   |
| Text on imagery                    | 4.5:1     | Enforce via `--grad-glass-scrim`; never place raw text on busy photo. |


- **Champagne `--brass` (`#C8A86B`) fails 4.5:1 for small text on light** — use it for ≥24px text, borders, icons, and large elements only; for small text use `--brass-dark` (`#A8884E`) or `--ocean-500`.
- Verify every text/background pair; do not ship untested combinations.

### 14.2 Keyboard navigation

- All interactive elements reachable and operable by keyboard; logical DOM/tab order matching visual order.
- Standard keys: Tab/Shift+Tab move; Enter/Space activate; Esc closes overlays; arrow keys within composite widgets (menus, tabs, radios, sliders).
- Provide a **"Skip to content"** link as first focusable element.
- No keyboard traps except intentional, escapable focus traps in modals/drawers.

### 14.3 Focus indicators

- Use `:focus-visible` with `--focus-ring`; never `outline:none` without an equivalent.
- Focus ring must clear 3:1 contrast against adjacent colors; use `--focus-ring-invert` on dark/photo.
- Focus must return to the triggering element after closing overlays.

### 14.4 Screen reader support

- Semantic HTML first (see 14.8); ARIA only to fill gaps.
- Landmarks: `header/nav/main/aside/footer`; one `<h1>` per page; logical heading order (no skips).
- Images: meaningful `alt`; decorative `alt=""`/`aria-hidden`. Yacht photos describe the vessel ("Azimut 68, port profile at golden hour").
- Live regions: toasts (§12.21), async result counts, loading (`aria-live`).
- Icon-only controls require `aria-label`.

### 14.5 Minimum touch targets

- **44×44px minimum** (WCAG 2.2 AA target size). Visual control may be smaller (e.g. 36px) but hit area ≥44px via padding.
- Min 8px spacing between adjacent targets.

### 14.6 Reduced motion

- Honor `@media (prefers-reduced-motion: reduce)`: disable parallax, autoplay, large transforms, shimmer; replace with instant or cross-fade ≤200ms. Essential motion (loading) becomes a non-animated indicator.

### 14.7 Additional

- Don't disable zoom; support 200% zoom and 400% reflow without loss.
- Form errors: programmatically associated, in text, not color-only (§18).
- Respect `prefers-color-scheme` once dark theme ships.

### 14.8 Semantic HTML requirements


| Use             | Element                                                   |
| --------------- | --------------------------------------------------------- |
| Action          | `<button>`                                                |
| Navigation/link | `<a href>`                                                |
| Section heading | `<h1>`–`<h6>` in order                                    |
| Lists           | `<ul>/<ol>/<li>`                                          |
| Forms           | `<form><label><input>` + `<fieldset>/<legend>` for groups |
| Data table      | `<table><thead><th scope>`                                |
| Page regions    | landmark elements                                         |


> Never use `<div>`/`<span>` for actions or navigation.

---

## 15. Iconography System

**Style:** Minimal, **line/outline** icons with a refined, nautical-precise feel. Consistent geometric construction. No filled icons except for tiny status indicators and selected/toggle states.

**Specs**


| Property         | Value                                                                          |
| ---------------- | ------------------------------------------------------------------------------ |
| Style            | Outline / stroke                                                               |
| Stroke width     | **1.5px** at 24px (scales proportionally); 2px allowed at ≤16px for legibility |
| Corner treatment | Rounded joins & caps, radius ~2px feel — soft, premium (matches `--radius-sm`) |
| Grid             | 24px base, 2px padding (20px live area)                                        |
| Color            | Inherit `currentColor`; default `--text-muted`, active `--ocean-500`/`--brass` |


**Recommended libraries (pick ONE for consistency):**

1. **Lucide** (primary recommendation — clean 1.5px stroke, rounded, huge set, open source).
2. Phosphor (light/regular weight) — alternative.
3. Custom nautical set for brand moments (anchor, helm, knot, hull length, beam, draft, cabin, knots-speed) — drawn to the same grid/stroke.

> Do not mix libraries. Brand/spec icons must match the chosen library's construction.

**Sizing scale**


| Token   | Size | Use                                    |
| ------- | ---- | -------------------------------------- |
| icon-xs | 16px | Inline with `--fs-small`, dense tables |
| icon-sm | 18px | Inputs, buttons (md)                   |
| icon-md | 24px | Default, nav, list items               |
| icon-lg | 32px | Feature highlights                     |
| icon-xl | 48px | Empty states, section accents          |


**Alignment:** Optically center with text (cap-height, not bounding box); icon-to-label gap `--space-2`. Maintain 24px grid alignment in toolbars.

**Usage**

- ✅ Pair spec icons with mono figures (LOA, beam, speed) on detail pages.
- ✅ `aria-hidden` for decorative; `aria-label` when icon is the only label.
- ❌ Don't use icons purely decoratively where they add noise.
- ❌ Don't resize a 24px icon to 13px (use the xs asset).
- ❌ No multicolor / 3D / skeuomorphic icons.

---

## 16. Border & Elevation System

### 16.1 Borders


| Token                     | Value                    | Use                                   |
| ------------------------- | ------------------------ | ------------------------------------- |
| `--border-width-hairline` | 1px                      | Dividers, subtle separation           |
| `--border-width-strong`   | 2px                      | Active/selected emphasis              |
| `--border-subtle`         | `rgba(20,35,58,0.08)`    | Section dividers, glass inner borders |
| `--border-default`        | `#D9DEE3`                | Inputs, cards, default                |
| `--border-strong`         | `#C2C9D1`                | Hover, emphasis                       |
| `--border-focus`          | `#305282`                | Focus, active input                   |
| `--border-brass`          | `#C8A86B`                | Premium/selected accents              |
| `--border-invert`         | `rgba(255,255,255,0.16)` | Borders on dark surfaces              |


### 16.2 Dividers

- Horizontal: `1px --border-subtle`, full or inset; vertical separators in toolbars `1px --border-subtle`, height 60%.
- Premium accent divider (footer top, section breaks): `1px --border-brass` at low width or a 40px centered brass hairline.

### 16.3 Card / overlay borders

- Cards (light): `1px --border-subtle` OR rely on `--elev-1` (not both heavy).
- Glass cards: inner `1px rgba(255,255,255,0.5)` (light) / `rgba(255,255,255,0.12)` (dark).
- Overlays (modals/drawers/menus): `1px --border-subtle` + elevation.

### 16.4 Shadow hierarchy & elevation


| Level | Token      | Shadow                            | Use                                |
| ----- | ---------- | --------------------------------- | ---------------------------------- |
| 0     | `--elev-0` | none                              | Flush content, page background     |
| 1     | `--elev-1` | `0 1px 2px rgba(20,35,58,0.06)`   | Resting cards, inputs              |
| 2     | `--elev-2` | `0 4px 12px rgba(20,35,58,0.08)`  | Sticky nav, raised cards           |
| 3     | `--elev-3` | `0 8px 24px rgba(20,35,58,0.10)`  | Dropdowns, hovered cards, popovers |
| 4     | `--elev-4` | `0 16px 48px rgba(20,35,58,0.14)` | Modals, drawers, toasts            |


**Rules:** Shadows are soft, low-opacity, **blue-tinted** (never neutral gray/black). Elevation must map to z-index logic (§17): higher elevation = higher layer. Don't combine elev-3+ with heavy borders.

### 16.5 Glassmorphism rules

- Use only for: nav-on-scroll, hero overlay cards, mega-menu panels, lightbox chrome. **Not** for dense data UI (dashboards, tables) — legibility first.
- Recipe (light): `background: var(--glass); backdrop-filter: blur(24px); border:1px solid rgba(255,255,255,0.5);` + `--elev-2`.
- Recipe (dark/photo): `background: rgba(20,35,58,0.45); backdrop-filter: blur(24px); border:1px solid var(--border-invert);`.
- Always provide a solid-color fallback for browsers without `backdrop-filter`.
- Ensure text over glass still meets §14.1 contrast (add scrim if needed).

---

## 17. Layering & Z-Index Architecture

Use **only** these named tokens — no arbitrary z-index values.


| Layer         | Token          | Value | Contains                                            |
| ------------- | -------------- | ----- | --------------------------------------------------- |
| Base          | `--z-base`     | 0     | Page background, hero media                         |
| Content       | `--z-content`  | 10    | Normal flow content, cards                          |
| Sticky        | `--z-sticky`   | 100   | Sticky spec rail, sticky table header, back-to-top  |
| Navigation    | `--z-nav`      | 200   | Fixed/sticky top nav, mobile nav bar                |
| Dropdown      | `--z-dropdown` | 300   | Select panels, dropdown/action menus, popovers      |
| Tooltip       | `--z-tooltip`  | 400   | Tooltips                                            |
| Overlay/Scrim | `--z-overlay`  | 500   | Backdrop scrims behind drawers/modals               |
| Drawer        | `--z-drawer`   | 600   | Side/bottom drawers (panel above its scrim)         |
| Modal         | `--z-modal`    | 700   | Dialogs, lightbox (panel above its scrim)           |
| Toast         | `--z-toast`    | 800   | Toasts (above modals so feedback is always visible) |
| Max           | `--z-max`      | 9999  | Dev/skip-link/emergency only                        |


**Rules**

- Each overlay owns its scrim at `--z-overlay`; its panel sits one band above.
- Never stack two modals; a drawer + modal simultaneously is disallowed.
- Tooltips render above dropdowns but below overlays/modals (a tooltip should not cover a dialog).
- Toasts intentionally top everything for feedback visibility.
- Establish stacking contexts deliberately (a `transform`/`opacity` parent creates one — keep overlays at the body/root via portals).

---

## 18. Forms & Validation

### 18.1 Field layout

- **Single column** by default (inquiry, contact); two-column only for short related pairs (First/Last name) on ≥768px.
- Label above field (floating-label allowed for marketing). Field width matches expected content (postal code ≠ full width).
- Stack gap `--space-5` (24); group gap `--space-6`; section heading `--fs-h5`.

### 18.2 Required indicators

- Prefer marking **optional** fields with "(optional)" when most are required; otherwise mark required with an asterisk **and** text.
- Asterisk `--brass-dark`/`--error` + legend "* required". Never color/asterisk alone — include `aria-required` and visible text.

### 18.3 Helper, error & success text


| Type    | Placement                    | Style                                  | A11y                                     |
| ------- | ---------------------------- | -------------------------------------- | ---------------------------------------- |
| Helper  | below field                  | `--fs-small --text-subtle`             | `aria-describedby`                       |
| Error   | below field, replaces helper | `--fs-small --error` + 16px alert icon | `aria-invalid=true` + `aria-describedby` |
| Success | below field                  | `--fs-small --success` + check icon    | `aria-describedby`                       |


### 18.4 Validation behavior

- **Validate on blur**, not per keystroke (except live constraints like char counter / password rules where helpful).
- On submit: validate all, focus the **first** invalid field, summarize errors in a top `role=alert` region linking to fields.
- Clear error the moment the field becomes valid.
- Messages are specific & human (§20): ✅ "Enter a valid email so we can reply." ❌ "Invalid input."

### 18.5 Form spacing & structure

- Form max-width: 480 (single inquiry) / 640 (multi-section); padding within glass/card `--space-6`.
- Actions bar: primary right, ghost cancel left; sticky on long forms; top margin `--space-6`.

### 18.6 Submission states


| State          | Behavior                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------- |
| Idle           | Primary enabled when valid (or always enabled, validate on submit).                                            |
| Submitting     | Button loading (spinner, `aria-busy`), inputs disabled, prevent double-submit.                                 |
| Success        | Toast + inline confirmation panel ("Inquiry sent — a specialist replies within 24h"); optionally replace form. |
| Error (server) | Top `role=alert` with retry; preserve user input; never wipe the form.                                         |


### 18.7 Yacht inquiry form (canonical)

Fields: Name, Email, Phone (optional), Country, Message (textarea), consent checkbox. Tone: concierge, low-friction (5–6 fields max). Above form: "A dedicated specialist will personally respond." CTA: "Request details".

---

## 19. Data Display System

> Applies mainly to owner/admin portals, broker dashboards, market/valuation widgets. Marketing pages stay editorial; data UI prioritizes clarity over decoration (no glass on dense data).

### 19.1 Tables

- Header: `--fs-caption` ALL-CAPS `--text-subtle`, sticky, bottom border `1px --border-default`.
- Row height: comfortable 56px / compact 44px; row divider `1px --border-subtle`; hover `--mist-50`; selected `--sky-100` + `--brass` left bar.
- Alignment: text left; **numbers/currency/dates right-aligned in `--font-mono`** with tabular figures.
- Features: sortable headers (`<button>` + `aria-sort` + arrow icon), column resize (optional), sticky first column on overflow, pagination (§12.18), row actions in trailing menu (§12.12).
- Zebra striping discouraged (use dividers); keep it clean.

### 19.2 Charts

- Library-agnostic; theme to tokens. Palette: sequential ocean scale (`--ocean-300→700`), categorical (`--ocean-500`, `--sky-300`, `--brass`, `--success`, `--ocean-300`). Max ~5 categories.
- Axes/gridlines `--border-subtle`; labels `--fs-caption --text-subtle`; values in `--font-mono`.
- Always: title, legend, accessible data table fallback, tooltips on hover/focus, empty + loading states. No 3D, no heavy gradients, minimal chartjunk.

### 19.3 Statistics cards / KPI widgets

- Anatomy: eyebrow label (ALL-CAPS `--fs-caption`) + big value (`--font-mono`, `--fs-h2/h3`) + delta (▲/▼ with `--success`/`--error` + %) + optional sparkline.
- Marketing stat band (§ Part I 5): value `--fs-display`/mono, label below, no card chrome, brass divider between stats.
- Spacing: padding `--space-5`; grid gap `--space-5`.

### 19.4 Dashboards

- 12-col grid, widget gap `--space-5`; consistent card heights per row; most-important top-left.
- Density: default "comfortable"; offer "compact" toggle for power users.
- Each widget: title + optional menu + body + empty/loading/error states.

### 19.5 Financial / market data

- Currency always `--font-mono`, right-aligned, with explicit currency code (USD/EUR); large values abbreviated (€1.2M) with full value in tooltip.
- Gains `--success`, losses `--error`, plus sign for positive deltas; **never color-only** — include arrow/sign.
- Timestamp + "as of" for live data; show stale/refresh state.

### 19.6 Data density rules

- Three densities: Comfortable (56px rows, default marketing/portal), Compact (44px, data-heavy), Dense (40px, expert tables only).
- Don't mix densities within one table. Keep numeric precision consistent per column. Round in display, keep precision in tooltip/export.

---

## 20. Content & Copywriting Guidelines

### 20.1 Brand voice

Refined, confident, warm, precise — a knowledgeable concierge, not a hype salesman. **Show prestige through restraint.**

### 20.2 Tone by context


| Context             | Tone                           |
| ------------------- | ------------------------------ |
| Hero / storytelling | Evocative, aspirational, spare |
| Specs / data        | Precise, factual, neutral      |
| CTAs                | Inviting, direct, low-pressure |
| Errors              | Calm, helpful, accountable     |
| Success             | Warm, reassuring               |


### 20.3 Writing principles

- Clarity over cleverness; concision over completeness.
- Active voice, second person ("you"), present tense.
- Sentence case for UI and most headings (Title Case only for proper names/wordmark).
- Numbers: numerals for specs/measurements with units (68 ft, 32 knots, 8 guests).
- No exclamation marks in luxury copy; no jargon, no hype superlatives ("best ever").
- Inclusive, globally readable English (yachts sell internationally).

### 20.4 By element


| Element  | Guidance                   | ✅ Approved                                                                     | ❌ Not approved                         |
| -------- | -------------------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| Headline | Evocative, ≤8 words        | "A new standard on the water"                                                  | "The #1 yachts you can buy NOW!!"      |
| Subhead  | Clarify the promise        | "Curated motor and sailing yachts from the world's finest builders"            | "We have lots of boats for sale"       |
| Body     | Calm, informative          | "The flybridge opens to uninterrupted views and seating for ten."              | "This boat is super cool and amazing." |
| CTA      | Verb + value, low pressure | "Enquire", "Request details", "Download spec sheet", "Speak with a specialist" | "Buy now", "Submit", "Click here"      |
| Error    | Cause + fix, no blame      | "We couldn't send your inquiry. Check your connection and try again."          | "Error. Submission failed."            |
| Empty    | Reframe + next step        | "No yachts match these filters yet — broaden your search."                     | "No results."                          |
| Success  | Reassure + expectation     | "Inquiry sent — a specialist will reply within 24 hours."                      | "Done!"                                |
| Price    | Discreet                   | "Price on application" / "€4,200,000"                                          | "CHEAPEST DEAL!"                       |


### 20.5 Microcopy

- Buttons: ≤3 words. Labels: noun phrases. Tooltips: ≤1 short sentence.
- Form labels describe the value, not the action ("Email", not "Enter your email").

---

## 21. Responsive Design Rules

### 21.1 Breakpoints (mobile-first)


| Token      | Min width | Target                                        |
| ---------- | --------- | --------------------------------------------- |
| base       | 0         | Small phones (360+)                           |
| `--bp-md`  | 768px     | Tablet / large phone landscape                |
| `--bp-lg`  | 1024px    | Small laptop                                  |
| `--bp-xl`  | 1280px    | Desktop                                       |
| `--bp-2xl` | 1440px    | Large desktop (container caps here)           |
| (wide)     | 1920px    | Ultra-wide: cap content, expand margins/media |


### 21.2 Grid behavior


| Range     | Columns | Gutter | Margin                               |
| --------- | ------- | ------ | ------------------------------------ |
| <768      | 4       | 16px   | 16–24px                              |
| 768–1023  | 8       | 24px   | 32px                                 |
| 1024–1439 | 12      | 24px   | 48px                                 |
| ≥1440     | 12      | 24px   | auto (container 1200–1440, centered) |


### 21.3 Layout per tier

- **Mobile (<768):** single column; hero stays cinematic (full-height video, scaled type); nav → hamburger + left drawer; filters → bottom/right drawer; spec table → accordions; cards 1-up; sticky bottom Enquire bar; sticky spec rail collapses to a sticky bottom CTA.
- **Tablet (768–1023):** 2-up cards; mega-menu may simplify to drawer; hero two-region; spec rail inline above content.
- **Desktop (1024–1439):** full mega menu; 3-up cards; sticky spec rail beside gallery; alternating story sections.
- **Large (≥1440):** container caps at 1200–1440; 3–4-up cards; larger media; generous margins.
- **Ultra-wide (≥1920):** never stretch text lines past ~75ch; grow imagery and whitespace, not measure.

### 21.4 Component adaptation rules

- Type scales down ~20% at mobile (§3.2).
- Section spacing 96–160 desktop → 64 mobile.
- Touch targets stay ≥44px at all sizes.
- Hover-only affordances must have tap/focus equivalents on touch.
- Tables: horizontal scroll with sticky first column, or transform to stacked key-value cards on mobile.
- Modals → bottom sheets on mobile where appropriate.
- Images: responsive `srcset`/sizes; art-direct hero (different crop portrait vs landscape).

---

## 22. Motion System (Expanded)

### 22.1 Philosophy

Motion is **slow, weighted, intentional** — a large vessel in calm water. It guides attention and confirms action; it never decorates or delays. When in doubt, less motion.

### 22.2 Duration scale


| Token             | Value | Use                                        |
| ----------------- | ----- | ------------------------------------------ |
| `--dur-instant`   | 120ms | Micro feedback (press, checkbox)           |
| `--dur-fast`      | 200ms | Hover, small state changes, tooltips       |
| `--dur-base`      | 400ms | Most transitions, dropdowns, tab indicator |
| `--dur-slow`      | 600ms | Card image zoom, drawer/modal, reveals     |
| `--dur-cinematic` | 900ms | Hero/page transitions, large parallax      |


### 22.3 Easing


| Token               | Curve                         | Use                                  |
| ------------------- | ----------------------------- | ------------------------------------ |
| `--ease-luxury`     | `cubic-bezier(0.22,1,0.36,1)` | Default — smooth decel, premium feel |
| `--ease-standard`   | `cubic-bezier(0.4,0,0.2,1)`   | Functional UI transitions            |
| `--ease-decelerate` | `cubic-bezier(0,0,0.2,1)`     | Elements entering                    |
| `--ease-accelerate` | `cubic-bezier(0.4,0,1,1)`     | Elements exiting                     |


> No spring/bounce/elastic easing — too playful for the brand.

### 22.4 Patterns

- **Page transitions:** cross-fade + 16px rise, `--dur-cinematic --ease-luxury`; optional brief brand wipe on first load only.
- **Scroll reveals:** fade + 24px rise, staggered 60–80ms, trigger ~15% in view, animate once. `--dur-slow`.
- **Hover:** image zoom 1.0→1.05 `--dur-slow`; brass hairline reveal `--dur-fast`; button bg `--dur-fast`.
- **Parallax:** hero media + 8–15% depth max; disable on mobile and reduced-motion.
- **Loading:** skeleton shimmer 1.5s; spinner linear; progress eased.
- **Overlays:** scrim fade `--dur-fast`; panel rise/slide `--dur-base --ease-decelerate`; exit `--dur-fast --ease-accelerate`.

### 22.5 When NOT to use motion

- During data entry (no moving fields/labels jumping).
- Critical errors (appear instantly).
- Anything that delays content/interaction.
- Repeated/looping animation in content areas (distracting).
- When `prefers-reduced-motion: reduce` → replace transforms with ≤200ms opacity or none; kill parallax, autoplay, shimmer, stagger.

---

## 23. Page Templates

Each template lists: purpose, region order, key components, and rules. All use the grid (§4/§21), spacing (§10), and motion (§22).

### 23.1 Landing Page (priority)

Regions: Nav (transparent) → Hero (full-bleed video + serif statement + 1 CTA + scrim) → Featured fleet (horizontal showcase, 3–4) → Story band (dark immersive) → Browse by type (category tiles) → Trust band (stats + credentials + partner logos) → Testimonial (single serif quote) → Conversion/concierge band → Footer.
Rules: one primary CTA per section; brass appears once (hero CTA); flow emotion→desire→proof→action; section spacing 96–160.

### 23.2 Yacht Detail Page (priority)

Regions: Breadcrumb → Cinematic hero (yacht name + headline specs) → Sticky spec rail (LOA, beam, draft, year, builder, guests, cabins, crew, speed, price + Enquire) → Gallery (Exterior/Interior/Deck tabs + lightbox) → Feature storytelling (alternating image/text) → Full specs table (+ PDF download) → Inquiry flow (concierge form + specialist) → Related yachts → Footer.
Rules: spec rail sticky desktop / sticky bottom CTA mobile; specs in mono; persistent Enquire; no "add to cart".

### 23.3 Listing / Fleet Page

Regions: Nav (solid) → Page header (title + count) → Filter bar/sidebar → Results grid (cards, 3-up) → Pagination/load-more → Footer.
Rules: instant filter feedback + `aria-live` count; empty state (§12.20); skeleton cards on load; sort control; saved-search optional.

### 23.4 Search Results

Like Listing + query echo ("12 yachts matching 'Azimut'"), applied-filter chips (removable), no-results empty state with suggestions, recent/popular searches.

### 23.5 Dashboard (owner/broker portal)

Regions: Sidebar (§12.16) + top bar → KPI row (stat cards §19.3) → widgets grid (charts/tables) → activity.
Rules: data clarity over decoration; no glass on data; density toggle; every widget has empty/loading/error.

### 23.6 Contact Page

Regions: Hero-lite → concierge intro → contact methods (specialist cards, phone, offices) → inquiry form (§18.7) → map/offices → Footer.
Rules: human + specific; show response-time expectation; one clear primary action.

### 23.7 Authentication (sign in / register / reset)

Centered card (max 400) on ocean gradient or split with imagery; logo top; minimal fields; single primary CTA; inline validation; links (forgot/switch). Trust cues (secure). No nav clutter.

### 23.8 Settings Pages

Sidebar/tabbed sections (Profile, Preferences, Notifications, Security); two-column rows (label/description + control) on desktop, stacked on mobile; switches for instant prefs, forms with Save for editable data; sticky save bar when dirty; confirm destructive actions via modal.

### 23.9 Error Pages (404 / 500)

Centered: large calm headline (serif), supportive line, primary "Back to home" + secondary "Browse fleet"; optional search; brand imagery (calm horizon), never jarring. Tone per §20.

### 23.10 Empty States

Per §12.20 — always icon/illustration + title + supportive line + action. Variants: first-use, no-results, error, cleared. Positive, never dead-end.

---

## 24. Design-to-Code Rules (Binding Constraints)

> These are **hard rules**. Any output (human or AI) violating them is incorrect and must be fixed. "Looks right" is not sufficient — it must be *token-right*.

1. **No arbitrary colors.** Only §2 / §10 / §16 tokens. No new hex, no `rgba()` outside defined glass/scrim/shadow tokens. ❌ `color:#3a5f8a` ✅ `color: var(--ocean-500)`.
2. **No arbitrary spacing.** Margins, padding, gaps, sizes come from the `--space-`* scale (4px base) only. ❌ `padding:18px` ✅ `padding: var(--space-5)`.
3. **No arbitrary radius.** Only `--radius-sm/md/lg/xl/pill`. Buttons/inputs `md`; cards `lg`; modals `xl`; pills/avatars `pill`. Never fully custom radii.
4. **Typography is constrained.** Only the three families (§3.1) and the defined scale/weights (§3.2). No weights >600. Serif only for display/storytelling. Mono only for specs/figures. No arbitrary font sizes.
5. **No arbitrary shadows/z-index.** Only `--elev-`* and `--z-*` tokens. No inline custom shadows or magic z-index numbers.
6. **Layout uses the grid.** 12/8/4 columns, defined gutters/margins, container caps (§21). No off-grid one-off layouts. Max text measure ~75ch.
7. **Motion uses motion tokens.** Only `--dur-`* + `--ease-*`. No bounce/spring. Always honor reduced-motion.
8. **States are mandatory.** Every interactive element implements all applicable §13 states + §14 a11y. No element ships with default-only.
9. **Semantic HTML required** (§14.8). No `<div>` buttons/links.
10. **Touch targets ≥44px**, contrast ≥ §14.1, focus ring present — non-negotiable.
11. **Brass budget:** ≤5% of a screen; ≤1 brass primary CTA per view.
12. **One primary action per view/section.**

Implementation hint: expose all tokens as CSS custom properties (or Tailwind theme extension / Style Dictionary). Components consume tokens only — never literals.

---

## 25. AI Generation Rules (Claude, Cursor, v0, Lovable & others)

> This section makes the system machine-actionable. AI agents must treat §24 as inviolable and follow the workflow below.

### 25.1 Before generating

1. Load tokens from §2, §3, §10, §16, §17, §22 into the theme (CSS variables / Tailwind config / design tokens file) **first**.
2. Identify which **page template** (§23) and which **components** (§12) are needed; reuse existing components before creating new ones.
3. Confirm the surface (marketing vs data UI) — choose editorial vs functional density accordingly.

### 25.2 How to generate UI

- Compose from §12 components; do not invent bespoke variants when a defined one fits.
- Map every value to a token (color, space, radius, type, shadow, z, motion). If you're about to type a literal, stop and pick a token.
- Use semantic HTML (§14.8) and wire all §13 states + §14 a11y (labels, roles, focus, keyboard) in the first pass — not as an afterthought.
- Apply the correct layout grid (§21) and section spacing.
- Default to **light** surfaces; use dark sectionally per §2.9. Default control size `md` (44px).
- Photography placeholders must reflect §8 (cinematic, horizon, golden light); never generic stock vibes.

### 25.3 Applying design tokens (precedence)

Token source of truth order: component spec (§12) → state rules (§13) → foundations (§2/§3/§10/§16/§17/§22). When a spec gives a value, use it; otherwise fall back to the nearest foundation token. Never fall back to a literal.

### 25.4 Creating a NEW component (inheritance)

Allowed only when no §12 component fits. It must:

1. Reuse existing tokens exclusively (no new primitives without governance §26).
2. Inherit the global conventions (radius, transition, focus ring, control heights).
3. Define all 9 facets (purpose/anatomy/sizes/variants/spacing/states/a11y/usage/do-don't) in the same format as §12.
4. Reuse existing sub-components (buttons, inputs, icons) internally.
5. Be proposed back to the system (§26) before becoming "official."

### 25.5 Consistency rules

- Same purpose → same component everywhere. No divergent one-offs.
- Match existing naming, structure, and prop patterns of the codebase.
- Prefer composition over duplication; extract repeated patterns.
- Do not introduce new dependencies/icon libraries (§15) without governance.
- When unsure, choose the more restrained, token-compliant option and flag the ambiguity rather than inventing.

### 25.6 Self-check before returning output

- Zero literal colors/spacing/radii/shadows/z-index — tokens only.
- Typography within families/scale/weights.
- All states + a11y (roles, labels, focus, keyboard, 44px, contrast).
- Correct grid/breakpoints + reduced-motion handling.
- One primary action; brass ≤5%.
- Reused existing components/templates.

---

## 26. Design Governance

### 26.1 Ownership

A named Design System owner (or small council) approves changes to tokens and core components. Marketing and product teams consume; they don't fork.

### 26.2 Versioning (SemVer)

- **MAJOR** — breaking token renames/removals, structural changes (migration guide required).
- **MINOR** — new components/tokens/variants, backward compatible.
- **PATCH** — fixes, doc clarifications, non-visual tweaks.
- This document carries a version (current: **v2.0**) + changelog; tag releases.

### 26.3 Contribution process

1. Propose (problem, use cases, why existing components don't suffice).
2. Review against this system (tokens, a11y, naming) by the owner.
3. Design spec in §12's 9-facet format + tokens.
4. Build with all states/a11y; peer review (§26.5).
5. Document here; announce; version bump.

### 26.4 Token update process

- Tokens change only via governance (never ad hoc in product code).
- Add (don't repurpose) tokens to avoid silent breakage; deprecate before removal.
- Changing a core value (e.g. `--ocean-500`) is a MAJOR review — audit usage first.
- Single source: tokens defined once (Style Dictionary / theme file) and generated into platforms.

### 26.5 Component review checklist

- Matches brand & visual principles (§1) — restrained, premium.
- Tokens only (§24).
- All states (§13) + full a11y (§14).
- Responsive (§21) + reduced motion (§22).
- Documented in 9-facet format with do/don't.
- No duplication of existing components.

### 26.6 Deprecation process

1. Mark **Deprecated** in docs with reason + replacement + removal version.
2. Console/lint warning in code where feasible.
3. Provide migration guidance and a deprecation window (≥1 minor release).
4. Remove in the next MAJOR; update changelog.

### 26.7 Definition of Done (any UI)

Token-compliant (§24) · all states (§13) · AA accessible (§14) · responsive (§21) · motion-correct + reduced-motion (§22) · uses approved components/templates (§12/§23) · copy follows voice (§20) · reviewed (§26.5).

---

## Appendix A — Quick Reference Cheat Sheet


| Need                | Use                                                    |
| ------------------- | ------------------------------------------------------ |
| Primary CTA         | Button / Primary, `md`, `--ocean-500`, one per section |
| Premium accent      | `--brass`, ≤5%, ≥24px text or borders/icons            |
| Card radius         | `--radius-lg` (16)                                     |
| Input/button radius | `--radius-md` (8)                                      |
| Modal radius        | `--radius-xl` (24)                                     |
| Section spacing     | `--space-9`→`--space-11` desktop / `--space-8` mobile  |
| Default transition  | `--dur-fast --ease-luxury`                             |
| Drawer/modal motion | `--dur-base --ease-decelerate`                         |
| Focus ring          | `--focus-ring` (light) / `--focus-ring-invert` (dark)  |
| Spec figures        | `--font-mono`, right-aligned                           |
| Body text color     | `--text-strong` on light, `--text-invert` on dark      |
| Touch target        | ≥44px                                                  |
| Contrast            | 4.5:1 text / 3:1 large & UI                            |
| Modal z             | `--z-modal` (700); toast `--z-toast` (800)             |


## Appendix B — Document Status

- **Version:** 2.0 (Part I foundations + Part II production spec).
- **Status:** Draft for review → becomes single source of truth on approval.
- **Open follow-ups:** full dark-theme token map; finalized type licenses (Canela/Suisse vs Fraunces/Geist); custom nautical icon set; live token export pipeline (Style Dictionary); per-component Figma library parity.

*End of DESIGN_SYSTEM.md*