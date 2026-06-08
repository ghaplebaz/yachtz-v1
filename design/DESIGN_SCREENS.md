# DubaiYachtz — Visual Design Screens (Design Rationale)

> The design system applied to real composition. These are **static, high-fidelity visual
> design comps** — not the final build. Motion/WebGL/3D are *annotated where they belong* and
> deferred to the build phase. Everything here is driven by `DESIGN_SYSTEM.md` tokens.

## Files
- `design/landing.html` — Landing page composition (storyboard scenes S1–S9)
- `design/detail.html` — Yacht detail composition (storyboard scenes D1–D8)
- `design/comps.css` — token-driven stylesheet (self-contained, no JS dependency)

## What is intentionally NOT in these comps (deferred to build)
| Storyboard element | Comp treatment | Build phase |
|---|---|---|
| S1 WebGL ocean+sky hero | Static CSS Monsoon-Glow gradient (sky→horizon→deep water) + annotation chip | Three.js GLSL shader + scroll descent |
| S3 Fleet horizontal pin | Real 3-up card grid + note strip | ScrollTrigger pin + horizontal scrub |
| Scroll reveals / counters | Everything shown in final state | GSAP/ScrollTrigger entrance + count |
| D0 / D8 boarding transition | Standard links between pages | Barba.js shared-element morph |
| D3 gallery dissolves | Static grid + tabs | WebGL displacement dissolve + lightbox |
| D5 3D model | Poster image + "Drag to orbit" hint pill | Three.js Draco glTF, lazy-loaded |
| Custom cursor / preloader | Omitted (design layer) | Build-phase JS |

> A `phase-tag` chip is fixed bottom-left on each comp to make clear these are design screens.

---

## LANDING — scene → composition → tokens

**Nav** — frosted glass (`--glass` + blur, `--border-subtle`), `--font-display` wordmark, mono-weight links with brass underline-on-hover, single outlined Enquire (always present). Tokens: nav height `--space-4` pad, `--radius-pill` CTA.

**S1 Hero** — composition: vast negative space, bottom-anchored content, one `--fs-display` Fraunces headline (`max-width:16ch`), eyebrow with brass dot, `--fs-body-lg` sub at `--text-invert-muted`, two CTAs (invert primary + ghost). Color: the signature ocean→sky gradient places the bright **mist horizon band** at ~46% and the deep `--ocean-900` water below — the brand motif rendered statically.

**S2 Manifesto** — single large serif statement (`--fs` ~3rem, `max-width:20ch`) on `--mist-50`, paired with a quiet aside. Generous `--space-9/11` section padding = the "breath."

**S3 Fleet** — `yacht-card`: 4:5 media, glass `--badge`, Fraunces name (`--fs-h4`), **mono specs** (LOA·Year·Guests) above a `--border-subtle` hairline, price/POA + Details link. `--elev-1` rest → `--elev-3` hover + image scale 1.06. Grid `--space-6` gutter.

**S4 Heritage** — dark `--ocean-900` split; serif H2, `--text-invert-muted` body, **brass CTA** (the one warm accent in this band). 4:5 media for editorial weight.

**S5 Assurance** — 4-up stats: mono numerals `clamp(2.5–4rem)`, brass left-border dividers, ALL-CAPS `--fs-small` labels on `--grad-dark`.

**S6 Categories** — 3:4 image tiles, gradient scrim bottom, Fraunces label + mono count; hover image scale. 4-col → 2-col → 1-col responsive.

**S7 Testimonial** — centered serif pull-quote on `--sky-100` (a calm tonal lift), cite in `--text-muted` with strong name.

**S8 Concierge** — full-bleed ocean image at 50% opacity under a diagonal `--ocean` scrim; centered invitation; **layered CTAs** (high-intent invert button + soft "save shortlist" text link) — the brokerage conversion ladder.

**S9 Footer** — `--ocean-900`, brass top hairline, oversized Fraunces wordmark, refined link columns, `--border-invert` bottom rule.

---

## DETAIL — scene → composition → tokens

**D1 PDP Hero** — cinematic full-bleed yacht under `--grad-scrim`; breadcrumb (ALL-CAPS `--fs-caption`), `--fs-display` Fraunces name, **mono spec meta row** (Length/Year/Guests/Cabins/Cruising).

**D2 Spec rail** — sticky (`--glass` + blur, `--border-subtle`); horizontally scrollable mono spec items + persistent primary Enquire (`--ocean-500`). Mobile → sticky bottom bar (build).

**Overview** — split: serif H2 + `--fs-body-lg` lead in `--text-muted`. Rational calm before the gallery.

**D3 Gallery** — tabs with brass active underline; asymmetric grid (first item spans 2×2); `--radius-md` items, hover scale. Note strip flags the build-phase dissolves + lightbox.

**D4 Feature storytelling** — alternating image/text `split` rows; serif H3 + `--text-muted` body (`max-width:42ch`); `--radius-lg` 3:2 media. One focal idea per row.

**D5 3D reveal** ★ — dark `--ocean-900` module; serif H2; a 16:8 `--radius-xl` stage (radial deep-ocean fill, `--border-invert`) holding a poster + a **glass "Drag to orbit · scroll to step inside"** hint pill; mono caption states the build/RM behavior. This is the detail page's memorable moment, designed as a clear, premium placeholder.

**D6 Full specs** — two-column `dl`; `--text-muted` terms, **mono** values, `--border-subtle` row rules; "Download spec sheet" ghost button.

**D7 Inquiry** — concierge card (`--mist-50`, `--radius-xl`, `--border-subtle`); boxed inputs with `--border-default` → `--focus-ring`; 5 fields max, full-width primary submit; specialist contact in mono alongside.

**D8 Related** — three compact yacht cards (4:3) → each links back into the detail "boarding" loop. Then footer.

---

## Why these compositions deliver the brand
- **Restraint = luxury:** one display headline, one primary action, and vast `--space-9/11` whitespace per scene.
- **Three type voices working:** Fraunces (emotion), Inter Tight (clarity), IBM Plex Mono (precision specs) — exactly per the system.
- **Brass is rationed:** eyebrow dots, one heritage CTA, stat dividers, active tab underline — never a large fill (≤5% rule).
- **Ocean→sky is the through-line:** the hero gradient, dark heritage band, sky-100 testimonial lift, and ocean-900 footer trace the horizon top to bottom.
- **Conversion is concierge, not commerce:** POA pricing, "Request a private viewing," layered CTAs — the deliberate inversion of the charter-template benchmark.

---
*Visual design phase complete. Next (on approval): the full build — wiring these compositions to the Experience Blueprint's motion system (Lenis + GSAP + Three.js + transitions).*
