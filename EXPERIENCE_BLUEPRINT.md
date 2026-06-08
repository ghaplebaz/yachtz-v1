# DubaiYachtz — Experience Blueprint (Choreography Phase)

> **Scope:** This document choreographs the *experience* — scenes, scroll beats, transitions,
> immersive moments, and the technology behind each. It contains **no UI designs, wireframes,
> layouts, components, or code.** It is the storyboard/score that design and build will follow.
>
> Built on `DESIGN_SYSTEM.md` (foundations) and `ANIMATION_REFERENCE_ANALYSIS.md` (patterns).
> Two priority surfaces: **Landing Page** and **Yacht Detail Page**.

---

## 0. PRINCIPLES OF THE CHOREOGRAPHY

**Emotional arc we are directing:** Arrival → Calm → Desire → Trust → Invitation.
The user should feel they have *boarded something rare*, unhurried and in control.

**Four rules that govern every scene:**

1. **Continuity over cuts.** No hard page flashes or reflows — scenes dissolve and flow (the Active Theory lesson).
2. **One focal beat at a time.** Motion contrast directs the eye; everything else is calm (the attention-control lesson).
3. **Weighted motion.** Lerp/damp everything; nothing snaps. Slow = expensive (the luxury lesson).
4. **Motion serves, never blocks.** Content and interaction are never delayed by spectacle; full reduced-motion path always exists.

**The ONE memorable moment (decided):**

> **The ocean-to-sky WebGL hero that "descends" into the fleet** on the landing page,
> and **a 3D yacht reveal** as the signature beat of the detail page.
> Everything else supports these two anchors; we do not add a second spectacle that competes.

**Complexity tiers used throughout:**
`◆ Advanced` (WebGL/3D/shaders) · `◈ Intermediate` (pinned/scrubbed/route transitions) · `○ Simple` (reveals/cursor/counters).

---

## 1. GLOBAL SYSTEMS (persistent across both pages)

These run continuously and stitch the scenes together.


| System                                       | Role in the choreography                                                                                                                                                                                             | Tier | Tech                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------------------------------------------------------- |
| **Act 0 — Preloader (entrance ritual)**      | Frames the entry, sets pace, primes emotion before any content. Counter 0→100 + a single brass progress stroke around the mark; exits as a vertical "tide" wipe that *reveals* the hero already in motion behind it. | ◈    | GSAP timeline + SVG stroke; first WebGL frame pre-warmed during load |
| **Smooth scroll spine**                      | Turns scroll into a weighted, inertial *signal* that drives every scrubbed scene. Frame-locks DOM + WebGL.                                                                                                           | ◈    | **Lenis** + `gsap.ticker`                                            |
| **Custom cursor**                            | Constant brand signature; lerps to pointer, swells + labels on interactive targets ("View / Explore / Drag / Open"). Hides on touch.                                                                                 | ○    | DOM/canvas + per-frame lerp                                          |
| **Page-transition system**                   | The connective tissue between Landing ↔ Detail. Never a white flash — a composite dissolve / shared-element handoff.                                                                                                 | ◆    | **Barba.js** route intercept + WebGL/FBO or shared-element morph     |
| **Chapter/scroll indicator**                 | Quiet sense of place and progress (thin progress line + current chapter label).                                                                                                                                      | ○    | ScrollTrigger progress                                               |
| **Ambient sound (optional, off by default)** | Low ocean ambience + soft UI ticks; a single toggle. Huge immersion-per-cost, but must be opt-in.                                                                                                                    | ○    | Howler.js                                                            |
| **Performance governor**                     | Pauses WebGL when off-screen; quality scales to device; Draco/lazy assets. Protects the "flawless" feel.                                                                                                             | ◈    | IntersectionObserver + DPR cap                                       |


---

## 2. LANDING PAGE — SCENE-BY-SCENE CHOREOGRAPHY

A single continuous descent: *sky → horizon → water → the world of the fleet → people → invitation.*
Scroll beats are expressed as the scene's local progress `0.0 → 1.0`.

### S0 · ARRIVAL (Act 0)

- **Intent:** ritual entry; the curtain.
- **Beats:** load → counter 000→100 → tide-wipe up → reveal.
- **Motion:** brass stroke fills; mark settles; wipe eases out over ~1.1s revealing a *living* hero.
- **Tier / Tech:** ◈ · GSAP + SVG.
- **Reduced-motion:** instant fade to hero, no counter theatrics.

### S1 · HERO — "The Open Horizon" ◆ *(MEMORABLE MOMENT, part 1)*

- **Intent:** awe + calm; establish ocean+sky as the brand world.
- **Scene:** full-bleed **WebGL ocean-and-sky shader** — animated FBM swell, drifting mist, a horizon glow with a warm champagne kiss; subtle **pointer parallax** (the sun/horizon follows the cursor with heavy damping).
- **Scroll beats:**
  - `0.0` headline lines rise from a mask (staggered); eyebrow + sub + CTA fade up.
  - `0.0–1.0` (as user begins to scroll) the **camera/horizon descends** — sky lifts out of frame, the waterline rises, the shader shifts from "sky-dominant" to "water-dominant," and the headline parts/falls away. This *is* the descent that hands off to the fleet.
- **Attention control:** one headline, one CTA, vast negative space; the only large motion is the water.
- **Tier / Tech:** ◆ · Three.js + custom GLSL; scroll progress drives shader uniforms (horizon Y, color mix) and camera dolly.
- **Reduced-motion:** static gradient still frame (a pre-rendered ocean), text fades in, no parallax/descent.

### S1→S2 TRANSITION · "Descent to stillness"

- The turbulent open-water shader **calms and lightens** into the mist-white of the manifesto. No cut — the hero's water literally becomes the manifesto's background tone.
- **Tech:** continued shader uniform scrub + background color crossfade tied to scroll. ◈

### S2 · MANIFESTO — "Why we exist"

- **Intent:** slow the pulse; establish philosophy and voice.
- **Scene:** a single large serif statement, mostly empty space.
- **Scroll beats:** **word-by-word illumination** as the line scrubs through center (opacity .12 → 1), an aside fades up at `0.6`.
- **Attention control:** deliberately quiet after the spectacle — the "breath" between beats.
- **Tier / Tech:** ◈ · ScrollTrigger scrub on word spans.
- **Reduced-motion:** full text visible, gentle fade-in.

### S3 · THE FLEET — "Sailing past the collection" ◈ *(signature interaction)*

- **Intent:** desire; present the product with cinematic motion.
- **Scene:** the section **pins**; as the user scrolls *down*, the fleet **moves horizontally** past them — like vessels gliding by at anchor. A thin progress line tracks position.
- **Scroll beats:**
  - `0.0` section locks; first card centered.
  - `0.0–1.0` horizontal travel through all cards; each card does a micro **parallax of its image** within its frame as it crosses center; hovered card lifts + slow image zoom + brass hairline.
  - `1.0` section releases into the next.
- **Attention control:** horizontal motion against vertical scroll = pattern interrupt = memorable; only the centered card is fully "lit."
- **Tier / Tech:** ◈ · ScrollTrigger pin + scrub translating the track; per-card parallax.
- **Reduced-motion / mobile:** converts to a native horizontal **swipe** carousel with snap (no pin).

### S4 · HERITAGE / STORY — "Built by masters" ◆/◈

- **Intent:** depth + credibility; the emotional core.
- **Scene:** **dark immersive** band; a large image with **scroll parallax** (image drifts slower than text); optional faint **GPU particle drift** (sea mist/dust motes) for atmosphere.
- **Scroll beats:** image enters with overscan, copy reveals in stagger, a brass CTA appears at `0.7`.
- **Attention control:** the tonal shift to dark = "we're going deeper"; depth cues (parallax, particles, grain) create atmosphere.
- **Tier / Tech:** ◈ scrubbed parallax (baseline) → ◆ add GPU particles only if perf budget allows.
- **Reduced-motion:** static image, fade-in copy, no particles.

### S5 · ASSURANCE — "A quarter century at sea" ○

- **Intent:** trust via numbers.
- **Scroll beats:** **counters animate** 0 → value once in view; brass dividers draw in.
- **Tier / Tech:** ○ · ScrollTrigger once-trigger + tween.
- **Reduced-motion:** final numbers shown immediately.

### S6 · BROWSE BY TYPE — "Choose your water" ○/◈

- **Intent:** orient + route into the catalogue.
- **Scene:** category tiles; **hover = slow image zoom + label shift**; tiles reveal in a soft stagger.
- **Tier / Tech:** ○ reveals + CSS hover; ◈ optional cursor-driven tilt.
- **Reduced-motion:** static tiles.

### S7 · TESTIMONIAL — "In their words" ○

- **Intent:** human proof; a held, quiet beat.
- **Scroll beats:** a single large serif quote fades/rises; no distraction.
- **Tier / Tech:** ○.

### S8 · CONCIERGE INVITATION — "Begin a quiet conversation" ◈

- **Intent:** the conversion beat; warm, low-pressure.
- **Scene:** full-bleed calm ocean image with a gentle **scrub parallax** and gradient; centered invitation + layered CTAs (soft → high intent).
- **Tier / Tech:** ◈ parallax + reveal.
- **Reduced-motion:** static.

### S9 · FOOTER — "Harbor" ○

- **Intent:** resolution; large wordmark, refined links, brass hairline.
- **Motion:** wordmark rises subtly on entry; otherwise still.
- **Tier / Tech:** ○.

**Landing emotional curve:** awe (S1) → calm (S2) → desire (S3) → depth (S4) → trust (S5–S7) → invitation (S8) → rest (S9). Spectacle is front-loaded (S1) and book-ended by calm so it never fatigues.

---

## 3. YACHT DETAIL PAGE — SCENE-BY-SCENE CHOREOGRAPHY

The detail page trades *breadth of spectacle* for *depth of focus on one vessel*. The memorable moment moves from "the ocean" to "this yacht."

### D0 · ENTRY TRANSITION — "Boarding" ◆ *(connective)*

- **Intent:** seamless handoff from a fleet/related card into the vessel.
- **Choreography:** clicked card image **expands/morphs** into the detail hero (shared-element), or a **composite dissolve** carries the user across — no white flash, no perceived reload. The yacht "comes aboard."
- **Tier / Tech:** ◆ · Barba.js intercept + shared-element morph (or WebGL/FBO crossfade). ◈ fallback: cover-wipe transition.
- **Reduced-motion:** simple fade.

### D1 · PDP HERO — "The vessel, framed" ◈

- **Intent:** establish the specific yacht, cinematically.
- **Scene:** full-bleed yacht image/video; name + headline specs settle in; subtle **scroll scrub zoom-out** (image eases from slight overscan to rest as you begin scrolling) for a "settling into focus" feel.
- **Tier / Tech:** ◈ · scrubbed scale + text reveal.
- **Reduced-motion:** static hero.

### D2 · SPEC RAIL ESTABLISH — "The essentials, always at hand" ○

- **Intent:** persistent orientation + conversion anchor.
- **Choreography:** as the hero scrolls away, the **spec rail becomes sticky** (LOA, beam, draft, year, builder, price + Enquire). On mobile it collapses to a sticky bottom Enquire bar.
- **Tier / Tech:** ○ · sticky + state swap on scroll.

### D3 · GALLERY — "Walking the yacht" ◆/◈ *(continuous transitions)*

- **Intent:** immersive exploration; this is where Active-Theory-style continuity shines.
- **Choreography:** Exterior / Interior / Deck views; switching does **not** swap instantly — images **dissolve via a displacement shader** (a soft "ripple/melt" between shots). Thumbnails open a fullscreen lightbox with the same dissolve.
- **Scroll beats:** gallery grid reveals in stagger on entry.
- **Tier / Tech:** ◆ WebGL displacement dissolve (signature) → ◈ crossfade fallback.
- **Reduced-motion:** instant image swap, no dissolve.

### D4 · FEATURE STORYTELLING — "Life aboard" ◈

- **Intent:** sell the *experience* of the vessel (owner's deck, engineering, beach club).
- **Choreography:** alternating image/text beats that **reveal on scroll**; image parallax within frame; each beat is one focal idea. Optional pinned "chapter" for the single most impressive feature.
- **Tier / Tech:** ◈ · scrubbed parallax + reveals; optional pin for one feature.
- **Reduced-motion:** static stacked sections.

### D5 · THE 3D REVEAL — "Aboard the model" ◆ *(MEMORABLE MOMENT, part 2)*

- **Intent:** the unforgettable detail-page beat; tactile ownership feeling.
- **Choreography:** a **real-time 3D yacht model** the user can **orbit/drag** (or that auto-rotates and responds to scroll). Scroll can drive an exterior→interior "fly-through" or deck-plan hotspots. This is the detail page's spectacle anchor.
- **Tier / Tech:** ◆ · Three.js + **Draco-compressed glTF**, lazy-loaded only when the section nears viewport (perf-critical); soft studio lighting + DOF.
- **Reduced-motion / low-power:** falls back to a **pre-rendered turntable image sequence** or a hero still — same information, no live GPU load.
- **Guardrail:** load on-demand; never block earlier content; show a graceful poster while loading.

### D6 · FULL SPECIFICATIONS — "Every measure" ○

- **Intent:** rational confidence after emotional immersion.
- **Choreography:** clean two-column spec table reveals in a quiet stagger; mono figures; "Download spec sheet" affordance.
- **Tier / Tech:** ○.

### D7 · INQUIRY — "Speak with a specialist" ◈

- **Intent:** conversion; concierge tone.
- **Choreography:** form reveals calmly; **floating labels animate**, inline validation on blur, a graceful **submitting → success** state (button morph + confirmation panel). Persistent Enquire remains in the spec rail.
- **Tier / Tech:** ◈ · micro-interactions + state machine.
- **Reduced-motion:** no field motion; instant state changes.

### D8 · RELATED + FOOTER — "Continue the journey" ○/◆

- **Intent:** keep momentum without pressure.
- **Choreography:** related yacht cards reveal; clicking one re-triggers the **D0 boarding transition** (loop closes elegantly). Footer = harbor.
- **Tier / Tech:** ○ reveals + ◆ shared-element transition reused.

**Detail emotional curve:** seamless arrival (D0) → focus (D1–D2) → immersion (D3–D5) → confidence (D6) → invitation (D7) → onward (D8).

---

## 4. TRANSITION MAP (the connective score)


| From → To                           | Transition                                | Feel                  | Tier | Tech                 |
| ----------------------------------- | ----------------------------------------- | --------------------- | ---- | -------------------- |
| Load → Landing                      | Tide-wipe reveal (Act 0)                  | Curtain rising        | ◈    | GSAP + SVG           |
| Hero → Manifesto                    | Shader calm + color crossfade             | Descent to stillness  | ◈    | shader scrub         |
| Section → Section (landing)         | Fade + 24px rise, staggered               | Quiet breath          | ○    | ScrollTrigger        |
| Fleet (S3)                          | Pin + horizontal scrub                    | Gliding past vessels  | ◈    | ScrollTrigger pin    |
| Landing card → Detail (D0)          | Shared-element morph / composite dissolve | Boarding              | ◆    | Barba.js + WebGL/FBO |
| Gallery view ↔ view (D3)            | Displacement dissolve                     | Walking through       | ◆    | GLSL displacement    |
| Detail → Back / Related → Detail    | Reverse boarding                          | Stepping off / aboard | ◆    | Barba.js             |
| Any overlay (lightbox/drawer/modal) | Scrim fade + panel ease                   | Calm focus            | ○    | CSS/GSAP             |


**Rule:** every navigation is *continuous*. The user should never see a blank frame or layout jump.

---

## 5. WHERE ADVANCED vs SIMPLE INTERACTIONS BELONG

**Concentrate the ◆ advanced budget on exactly four places** (so each lands and nothing competes):

1. Landing **hero ocean shader + descent** (S1).
2. Landing↔Detail **boarding transition** (D0/D8).
3. Detail **gallery displacement dissolves** (D3).
4. Detail **3D yacht reveal** (D5).

**Keep everything else simple-to-intermediate** — reveals, parallax, counters, cursor, hovers, sticky rail. Simplicity in the connective tissue is what makes the four spectacles feel expensive. Over-animating secondary scenes would flatten the hierarchy and hurt performance.

**Deliberately calm (○) zones** (the "breaths"): manifesto, stats, testimonial, full-spec table, footer. These exist *because* spectacle needs contrast.

---

## 6. RECOMMENDED TECHNOLOGIES PER EXPERIENCE


| Capability                        | Recommended                                             | Notes                                      |
| --------------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| Smooth scroll spine               | **Lenis**                                               | Frame-locked to GSAP ticker                |
| Animation engine                  | **GSAP + ScrollTrigger**                                | Reveals, pins, scrubs, counters, timelines |
| WebGL hero + 3D model + dissolves | **Three.js** (+ custom **GLSL**)                        | OGL acceptable if bundle size critical     |
| 3D assets                         | **glTF + Draco compression**, lazy-loaded               | Perf-critical for D5                       |
| Page transitions                  | **Barba.js** (+ WebGL/FBO or shared-element)            | Continuity across routes                   |
| Vector micro-animation            | **Lottie** (optional)                                   | Icons, small accents only                  |
| Sound                             | **Howler.js** (optional, opt-in)                        | Ambient + UI ticks                         |
| Post-FX (bloom/DOF/grain)         | Three.js post-processing                                | Use sparingly, atmosphere only             |
| Governor                          | IntersectionObserver, DPR cap, `prefers-reduced-motion` | Pause off-screen, scale quality            |


> This is the de-facto award-site baseline (Three + GSAP + Lenis + shaders), scoped to a **calm luxury** register rather than the sci-fi register of the references.

---

## 7. PERFORMANCE & ACCESSIBILITY GUARDRAILS (non-negotiable)

- **Performance budget:** target ~1.3s LCP (Active Theory benchmark). The hero must paint fast; heavy 3D (D5) loads on-demand. Cap DPR at 2; pause all WebGL when off-screen.
- **Progressive enhancement:** the site is fully usable and beautiful **without** WebGL/JS spectacle — shaders and 3D are enhancements over a solid static base.
- `**prefers-reduced-motion`:** every scene above lists a fallback; globally this disables parallax, descent, particles, shimmer, dissolves, and smooth-scroll inertia.
- **No spectacle blocks content or interaction.** Loading states are graceful; nothing janks.
- **Mobile:** pins become swipes; 3D may downgrade to turntable stills; touch removes the custom cursor.

---

## 8. ONE-LINE SUMMARY OF THE CHOREOGRAPHY

> A ritual entrance, an awe-inducing descent from sky to sea, a cinematic glide past the fleet,
> a deep calm of heritage and trust, and a seamless "boarding" into a single vessel you can
> walk through and orbit in 3D — spectacle concentrated in four moments, everything else
> calm, weighted, and flawless.

---

*Choreography phase complete. No UI, layouts, or code produced. Next phase (on approval):
translate this into low-fidelity experience wireframes / motion storyboards, or begin the
design system's screen application.*