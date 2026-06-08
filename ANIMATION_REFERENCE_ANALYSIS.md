# Reference Analysis & Reverse-Engineering (Analysis Phase Only)

> No layouts, components, or code in this document. This is a study of *why* the references
> work and *how* they are likely built — to inform the yacht platform's experience strategy.

Sources consulted: the live yacht template; Active Theory case studies & award write-ups
([Hydra engine story](https://medium.com/active-theory/the-story-of-technology-built-at-active-theory-5d17ae0e3fb4),
[webgpu.com showcase](https://www.webgpu.com/showcase/active-theory-portfolio/));
[KPRverse — Awwwards Site of the Year 2022 by Resn](https://www.awwwards.com/annual-awards-2022/site-of-the-year);
Codrops technical breakdowns on
[composite rendering / WebGL transitions](https://tympanus.net/codrops/2026/02/23/composite-rendering-the-brilliance-behind-inspiring-webgl-transitions/)
and [GSAP+Three.js+Barba scroll galleries](https://tympanus.net/codrops/2026/02/02/building-a-scroll-revealed-webgl-gallery-with-gsap-three-js-astro-and-barba-js/).

---

# CATEGORY 1 — Yacht Website Benchmark

### `yachting-tmp.webflow.io`

## 1.1 What this reference actually is (critical framing)

It is a **charter / rental** template, not a **brokerage / sales** site. The vocabulary gives it away:
"Yacht **Renting**", "**Quick Reservation** / Reserve now", "**Passenger capacity**", "Book a Tour".
That distinction matters enormously for our build:


| Charter site (this reference)      | Our brokerage platform (target)                 |
| ---------------------------------- | ----------------------------------------------- |
| Reserve / Book now                 | **Enquire / Request details / Private viewing** |
| Passenger capacity, day-trip vibe  | **LOA, beam, draft, year, builder, GT, range**  |
| Price per day / instant booking    | **Price on application / discreet pricing**     |
| Transactional funnel               | **Relationship / concierge funnel**             |
| Lifestyle imagery sells the *trip* | Imagery sells the *asset + the life*            |


**Conclusion:** Use it for IA, hierarchy, and yacht-presentation conventions — but **invert the conversion model** from transactional booking to high-touch enquiry.

## 1.2 Information Architecture

Flat, shallow, conventional — exactly what users expect:

- **Primary nav:** Home · Yacht Renting (`/services`) · About us · Contact us · Quick Reservation (persistent button).
- **Yacht detail pages:** `/our-yachts/{name}` (Nauti Buoy, Black Pearl, Captain Sparrow, Golden Dolphin) — a CMS collection.
- **Service pages:** `/services/rent`, `/services/travels`, `/services/transfers`.
- **Editorial/content:** `/features/{slug}` (experiential stories).
- **Trust/support:** `/about-us`, `/team`, `/contact`, `/faq`, plus legal + styleguide.

**Takeaway:** Three content types — **Yachts (product)**, **Services (offer)**, **Stories (editorial)** — plus trust pages. This is the minimum viable IA for the industry; our brokerage needs the same skeleton minus "booking," plus a **listing/search** layer the template lacks.

## 1.3 Homepage content hierarchy (top → bottom)

1. Header (logo, nav, persistent reservation CTA)
2. Contact strip (address Capri, phone, email, socials) — *local-trust signal up top*
3. Hero — "Luxury Yachting Experience" + large imagery
4. Photo gallery (3 large yacht photos + descriptive text)
5. Features (VIP service / Book a Tour)
6. **Fleet listing** — 4 yacht cards
7. Services — "We sell memories" (3 cards)
8. Service categories (Travels / Renting / Transfers)
9. **Testimonials** — five 5-star reviews w/ photos + names
10. Newsletter capture
11. Footer (links, address, contact, social)

**Hierarchy logic:** emotion (hero) → proof of product (fleet) → emotional reframe ("we sell memories") → social proof (testimonials) → capture (newsletter). A textbook **awareness → desire → proof → capture** funnel.

## 1.4 Yacht presentation (the product card pattern)

Each card = **name · tagline · key specs (Length / Beam / Capacity) · hero photo · "More details →" · category badge.**

- Specs are reduced to **three legible numbers** — never a spec dump on the card.
- One image dominates; chrome is minimal.
- A single secondary link ("More details"), not a buy button.

**Takeaway for us:** keep the 3-number discipline, but swap capacity for **LOA · Year · Cabins/Guests**, add **price or "POA,"** and a **status badge** (New listing / Brokerage / Flagship). The card is the atomic unit of the whole platform.

## 1.5 Conversion flow

Persistent **Quick Reservation** + repeated soft CTAs ("Read More," "More details," "Discover More," "Get Started," newsletter). Funnel: Homepage → service/yacht → contact/reservation form.
**Critique:** it leans on a single transactional CTA. A brokerage needs a **layered CTA system**: soft (save / download spec sheet), medium (enquire), high (request private viewing / speak to a specialist) — matched to buyer intent at six- to eight-figure price points.

## 1.6 Motion & technical approach of this reference

Standard **Webflow IX2** interactions — DOM/CSS, **not** WebGL:

- Scroll-into-view fades/slide-ups, hover scale/opacity on cards, likely a testimonial slider, possibly light image parallax.
- Smooth, tasteful, *conventional*. It satisfies "polished" but never "memorable."

**This is precisely the gap Category 2 fills.** The yacht reference defines *what to say and in what order*; the experience references define *how to make it unforgettable*.

## 1.7 Industry expectations distilled

A successful yacht-selling site must: (a) lead with cinematic imagery; (b) present fleet as scannable spec-disciplined cards; (c) provide rich, photo-led detail pages; (d) build heavy trust (testimonials, brokerage credentials, real people/offices); (e) make enquiry effortless and discreet; (f) feel like luxury, not e-commerce.

---

# CATEGORY 2 — Experience & Animation Benchmarks

## 2A. ACTIVE THEORY — `activetheory.net`

### 2A.1 What it is

Not a website — **an engine rendered like a game.** The portfolio is a fully immersive 3D
environment (modeled on their LA/Amsterdam studios) navigated by **cursor, scroll, and drag**,
with an AI guide that can fly you around. Everything runs on **Hydra**, their proprietary WebGL
engine (born in the Flash→HTML5 era, evolved past raw Three.js into a node-based 3D engine with a
visual GUI). The crawler sees almost nothing because the DOM is near-empty — the experience lives on the GPU.

### 2A.2 Why it's memorable / the emotional response

- **Disbelief that it's a browser.** It violates the mental model of "webpage," so the brain flags it as novel → memorable.
- **Agency + discovery.** You *pilot* it; exploration releases dopamine. Case studies feel like "short films you scroll through."
- **Confidence through restraint.** Minimal UI, maximum spectacle = the studio proving mastery, not explaining it. The medium *is* the portfolio.
- Emotion: *awe, curiosity, slight intimidation* — exactly the brand promise ("we build the impossible").

### 2A.3 How attention is controlled

- **Single focal subject** in 3D space; depth-of-field, lighting, and camera framing push everything else back.
- **Camera choreography** — instead of "sections," the camera *moves you* to the next beat, so attention is directed cinematically rather than via scrollbars.
- **Motion contrast** — ambient micro-motion everywhere (drift, flicker, particles) makes the one intentional movement read as "look here."

### 2A.4 Most impressive animations & how they likely work

1. **Cinematic project transitions (the signature).** Likely **composite / render-to-texture (FBO) transitions**: the outgoing scene is rendered to an offscreen texture, the incoming scene to another, and a fullscreen quad with a custom shader blends/melts/displaces between them (noise/displacement maps, RGB-shift, zoom-warp). *Technically advanced.*
2. **"Images melt / text flickers."** Fragment-shader **displacement + glitch**: feed a texture + a noise/flow map, offset UVs over time, add chromatic aberration and scanline/flicker. *Advanced.*
3. **GPU particle systems.** Thousands of instanced points driven in shaders (curl-noise flow fields, physics in vertex/compute) — the Hydra "particle physics" tool. *Advanced.*
4. **Cursor-reactive camera/parallax.** Each frame, `lerp` the camera/objects toward a target derived from pointer position → weighted, never twitchy. *Simple technique, big payoff.*
5. **3D environment + DOF + bloom.** Real meshes (Draco-compressed), post-processing stack (bloom, DOF, grain). *Advanced asset pipeline.*

### 2A.5 Scrolling & transitions

- **Scroll is an input signal, not a document position.** It likely drives a normalized timeline (0→1) that the engine maps to camera dollies, scene swaps, and shader uniforms — i.e. **virtualized/inertial scroll** (custom, or Lenis-style) feeding the render loop, decoupled from native layout.
- **Transitions are GPU composites**, so there is no "white flash / reflow" — scenes dissolve continuously. This continuity is a huge part of the premium feel.

### 2A.6 How depth & atmosphere are created

True 3D (perspective, occlusion, parallax), **fog + DOF** for aerial depth, **bloom/volumetric light**, film **grain**, and **ambient looped motion** so the world feels alive even when idle. Sound design reinforces space.

### 2A.7 How interaction reinforces the brand

The brand claim is "masters of immersive web." Letting users *pilot a real-time 3D world in a browser at 60fps* is the proof. Form = message. Every drag that responds instantly is a credibility deposit.

### 2A.8 Why premium / cinematic / immersive / different

- **Premium:** flawless performance (~1.3s LCP despite the load — Draco + lazy loading), zero jank, weighted motion.
- **Cinematic:** camera language, DOF, lighting, grain, scene-to-scene dissolves — film grammar, not web grammar.
- **Immersive:** 3D space + spatial sound + agency.
- **Different:** it abandons the page metaphor entirely.

---

## 2B. KPRVERSE — `kprverse.com` (by Resn)

### 2B.1 What it is

A **narrative WebGL world** for a Web3 IP ("The Keep") — **Awwwards Site of the Year 2022**,
beating Spotify/Gucci/Netflix. Aesthetic: **minimalism + futurism + sci-fi terminal UI**.
Stack indicators: **React + react-three-fiber (WebGL)**, **GSAP**, **Storyblok** CMS, custom asset pipeline.

### 2B.2 Why it's memorable / emotional response

- **Worldbuilding over web-design.** It pulls you into a fiction (encrypted protocol IDs, live "Keeper" counter, "type your command"), so it feels like *entering* something, not *browsing*.
- **Intrigue + exclusivity.** Terminal language and gated reveals create insider tension.
- Emotion: *curiosity, anticipation, belonging*.

### 2B.3 Attention control & journey

- **A real preloader as Act 0** — animated SVG (concentric rings, triangles) + a **counter (0→100)** that *frames* the entry and sets pace; by the time content appears you're primed.
- **Linear, authored scroll-story:** scroll progress reveals chapters in a deliberate sequence; the camera/scene and copy advance together. Attention is held by *one beat at a time*.

### 2B.4 Most impressive animations & how they likely work

1. **Branded preloader sequence** — SVG `stroke-dashoffset` animation on rings + a JS counter, orchestrated with a GSAP timeline; exits with a wipe/scale into the scene. *Simple-to-medium, disproportionately high impact.*
2. **Scroll-driven 3D scenes (r3f).** **GSAP ScrollTrigger** emits progress 0→1 → mapped to camera position, object transforms, and shader uniforms each frame. The hallmark "scroll choreographs the world." *Advanced.*
3. **Custom cursor** — a DOM/canvas element that **lerps** toward the pointer, scaling/labeling on interactive targets (the same lerp-to-target pattern as AT). *Simple, brand-defining.*
4. **Shader reveals / dissolves** on imagery and section changes (displacement + alpha reveal). *Medium-advanced.*
5. **Page/route transitions** — likely a **Barba.js-style** intercept (or r3f route persistence): outgoing animates out, async load, incoming animates in, so navigation feels seamless. *Medium.*
6. **Sound design** toggling with interaction — multiplies immersion for near-zero visual cost.

### 2B.5 Scrolling & transitions

- **Smooth/virtualized scroll** (Lenis or custom) synced to GSAP ScrollTrigger so DOM and WebGL stay frame-locked.
- Transitions are **timed dissolves/wipes**, not hard cuts — continuity again = premium.

### 2B.6 Depth & atmosphere

3D scenes with fog/particles, layered parallax, glow/bloom, dark palette with neon accents, and ambient motion + sound. Depth here is as much **narrative** (a world with lore) as visual.

### 2B.7 Interaction reinforces brand

A futuristic Web3 IP must feel *technologically ahead*. Terminal UI, live counters, command input, and reactive 3D make the *interface itself* a character in the fiction — interaction = storytelling.

### 2B.8 Why premium / cinematic / immersive / different

- **Premium:** craftsmanship in timing, restraint, and consistency; nothing default.
- **Cinematic:** authored pacing, preloader as title sequence, scene-by-scene story.
- **Immersive:** fiction + 3D + sound + agency.
- **Different:** it's an *experience with a narrative*, not an information site.

---

# CROSS-REFERENCE: RECURRING PATTERNS

Patterns shared by both award-winning experiences (and absent from the yacht template):

1. **The page metaphor is abandoned** — scroll is an *input* that drives a timeline/camera, not a document offset.
2. **Smooth/virtualized scroll** (Lenis-class) frame-locked to the animation engine (GSAP).
3. **Continuous transitions** (shader dissolves / composite render-to-texture / Barba intercepts) — never a hard cut, flash, or reflow.
4. **An entrance ritual** — a branded preloader that sets pace and primes emotion (Act 0).
5. **A custom, lerped cursor** as a constant brand signature.
6. **Lerp/damp everything** — pointer parallax, camera, hovers move toward targets with easing → weighted, "expensive" motion.
7. **Atmosphere via depth** — fog, DOF, bloom, grain, particles, ambient idle-motion.
8. **One focal beat at a time** — ruthless attention control through motion contrast and camera framing.
9. **Restraint in UI, spectacle in motion** — minimal chrome, maximal craft.
10. **Form proves the brand** — the *how* is the message.

---

# ANIMATION BREAKDOWN — Key Techniques (graded)

**Foundational (simple, high ROI — do these first):**

- Smooth scroll with inertia (Lenis) synced to a rAF loop.
- Scroll-reveal: staggered fade + 24px rise, eased, triggered in-view (GSAP ScrollTrigger / IntersectionObserver).
- Custom cursor that lerps to pointer + scales/labels on hover targets.
- Pointer parallax via per-frame lerp toward a target.
- Magnetic buttons; image hover zoom (scale 1.0→1.05).
- Branded preloader with a counter and an SVG progress stroke.
- Split-text reveals (lines/words rise from a mask).

**Intermediate:**

- Pinned scroll sections (horizontal showcase / step storytelling) via ScrollTrigger pin + scrub.
- Scrubbed parallax layers tied to scroll progress.
- Section/route transitions via overlay wipes or Barba.js intercepts.
- Animated counters, marquees, progress indicators.

**Advanced (the "award" tier):**

- WebGL hero with **custom GLSL shaders** (FBM/noise water, gradient atmospheres, displacement).
- **Scroll-driven 3D**: ScrollTrigger progress → Three.js camera/uniforms each frame.
- **Composite / render-to-texture (FBO) transitions** — melt/dissolve/warp between scenes.
- **GPU particle systems** (instanced, curl-noise flow fields).
- Post-processing stack: **bloom, DOF, grain, chromatic aberration**.
- Image-to-image displacement transitions; "fluid"/flowmap effects.
- Spatial **sound design** tied to interaction.

---

# TECH STACK ANALYSIS (likely)


| Concern       | Yacht template           | Active Theory                                           | KPRverse                                        |
| ------------- | ------------------------ | ------------------------------------------------------- | ----------------------------------------------- |
| Base          | Webflow (HTML/CSS + IX2) | Custom JS app, near-empty DOM                           | React + Nuxt-style assets                       |
| 3D/render     | none                     | **Hydra** (proprietary WebGL engine; Three.js heritage) | **react-three-fiber / Three.js (WebGL)**        |
| Animation     | Webflow IX2              | Engine timelines + shaders; GSAP-class easing           | **GSAP (+ ScrollTrigger)**                      |
| Smooth scroll | native/Webflow           | custom virtualized/inertial                             | Lenis-class smooth scroll                       |
| Transitions   | page loads               | **composite/FBO shader dissolves**                      | dissolves + **Barba.js-style** route intercepts |
| Shaders       | none                     | extensive custom GLSL                                   | custom GLSL reveals                             |
| Particles     | none                     | **GPU particle physics**                                | scene particles                                 |
| Assets        | images                   | **Draco-compressed meshes, lazy load** (~1.3s LCP)      | optimized 3D + CMS (Storyblok)                  |
| Post-FX       | none                     | bloom/DOF/grain                                         | glow/bloom                                      |
| Audio         | none                     | spatial sound                                           | interactive sound                               |


**Reusable, HTML-friendly stack that approximates this tier without a proprietary engine:**
`Three.js` (or OGL for lightweight) + `GSAP + ScrollTrigger` + `Lenis` + custom **GLSL shaders**, optional `Barba.js` for page transitions and `Lottie` for vector micro-animation. This trio (Three + GSAP + Lenis) is the de-facto award-site baseline confirmed across the Codrops breakdowns.

---

# RECOMMENDATIONS (strategy — for the analysis record, not a build)

**1. Marry the two categories deliberately.** Take the yacht template's *IA, hierarchy, and card discipline* and deliver it through the experience references' *motion, continuity, and atmosphere*. The win is "a brokerage that feels like an Active Theory film."

**2. Re-base the conversion model** from charter-booking to **concierge enquiry** (soft → medium → high CTAs), with "Price on application" and brokerage trust signals — the template's biggest mismatch with our business.

**3. Adopt the award baseline, scoped to luxury (not sci-fi).** Lenis + GSAP/ScrollTrigger + a restrained Three.js WebGL hero (ocean/sky shader) + lerped custom cursor + branded preloader. Borrow KPR's *entrance ritual* and *authored pacing*; borrow AT's *continuous transitions* and *atmospheric depth* — but keep our brand calm, warm, and trustworthy rather than neon/futuristic.

**4. Where the two priorities (Landing + Detail) most benefit:**

- *Landing:* cinematic WebGL hero, scroll-choreographed fleet reveal, ambient depth.
- *Detail:* continuous gallery transitions (shader dissolves), scroll-driven feature storytelling, a possible 3D yacht model as the "memorable moment."

**5. Effort-to-impact order** (so motion never delays content): preloader + smooth scroll + scroll reveals + custom cursor (week 1 wins) → WebGL hero + pinned storytelling (signature) → composite transitions + particles + 3D model (the award tier).

**6. Guardrails:** performance budget (Draco/lazy-load discipline like AT's 1.3s LCP), full `prefers-reduced-motion` fallbacks, and a graceful non-WebGL path — premium means *flawless*, never *heavy*.

**7. Define the single "memorable moment."** Both references have one signature beat (AT's piloted 3D world; KPR's entrance + scroll-story). Our platform needs **one** unforgettable moment — most likely the **ocean-to-sky WebGL hero transitioning into the fleet**, or a **3D yacht reveal** on the detail page. Decide it before designing.

---

*Analysis phase complete. No layouts or code produced. Next phase (on approval): translate these patterns into an experience blueprint mapped to the Landing and Detail pages.*