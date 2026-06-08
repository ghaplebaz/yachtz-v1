# DubaiYachtz — Luxury Yacht Platform (V1)

An immersive, award-style yacht experience built with **HTML + CSS + vanilla JS**, enhanced
with the same calibre of frontend technology demonstrated by the reference sites
(Active Theory, KPRverse): WebGL shaders, smooth scroll, and GSAP scroll-driven storytelling.

Everything is driven by the tokens and rules in **`DESIGN_SYSTEM.md`**.

## Pages
- `index.html` — Landing page (priority #1)
- `yacht.html` — Yacht detail page (priority #2)

## Tech stack
| Layer | Library | Why |
|---|---|---|
| WebGL hero | **Three.js r128** | Custom GLSL ocean+sky fragment shader (Monsoon Glow palette), animated FBM waves, horizon glow, mouse parallax — inspired by Active Theory's shader-first approach |
| Smooth scroll | **Lenis** | Weighted, premium inertia scrolling |
| Animation | **GSAP + ScrollTrigger** | Split-text hero reveal, pinned horizontal fleet, scroll reveals, parallax, animated counters, word-by-word manifesto |
| Custom JS | — | Branded preloader (KPR-style counter + brass progress ring), magnetic custom cursor, gallery tabs + lightbox, inquiry form states |

All libraries load via CDN. No build step required.

## Run locally
Any static server works. For example:

```bash
# from this folder
python -m http.server 8124
# then open http://localhost:8124/index.html
```

## Signature interactions
- **WebGL ocean-and-sky hero** with live horizon, sun glow and mist (pauses when off-screen for performance).
- **Branded preloader** — animated count 000→100 with a brass progress arc around the “M” mark.
- **Magnetic custom cursor** with contextual labels (View / Explore / Open).
- **Pinned horizontal fleet** showcase that scrolls sideways as you scroll down.
- **Split-text hero headline** rise-in, **word-by-word manifesto**, **animated statistics counters**.
- **Parallax imagery** and staggered fade-and-rise reveals throughout.
- **Detail page**: sticky spec rail, gallery tabs + fullscreen lightbox, alternating feature storytelling, concierge inquiry form with submission state.
- **Interactive 3D yacht reveal** ("Aboard the model") — drag to orbit a real-time Three.js model; auto-rotates, lazy-loads near viewport, falls back to a still under reduced-motion.
- **"Boarding" page transition** — a dark cover-wipe between Landing ↔ Detail (no white flash), paired with a fast-path preloader on internal navigation.
- **WebGL displacement-dissolve gallery** — a featured stage + thumbnail strip; clicking a thumb (or switching Exterior/Interior/Deck) melts between images with a noise-driven displacement shader; click the stage for the fullscreen lightbox. Falls back to a plain image swap without WebGL / under reduced-motion.

## Plug in a real 3D yacht model
The detail page ships an asset-free **stylized** Three.js yacht. To use a real photoreal model, drop in a **Draco-compressed glTF** — no code changes needed:

```html
<!-- option A: attribute on the canvas in yacht.html -->
<canvas id="yacht3d-canvas" data-model-url="assets/models/azimut-36m.glb"></canvas>

<!-- option B: a global before yacht3d.js loads -->
<script>window.DUBAIYACHTZ_MODEL_URL = "assets/models/azimut-36m.glb";</script>
```
The loader (GLTFLoader + DRACOLoader, decoder from the gstatic CDN) auto-centers, scales, and rests the model on the water plane, swapping out the primitive. If the asset is missing or fails to load, the stylized model remains — nothing breaks. The gallery's dissolve is currently a noise displacement; a custom displacement-map texture can be swapped into `gallery.js` for art-directed transitions.

## Accessibility & performance
- Respects `prefers-reduced-motion` (disables WebGL animation loop, parallax, shimmer, smooth scroll).
- Semantic HTML, skip link, focus rings, ARIA on tabs/dialog/nav.
- Graceful image fallback: any failed photo reveals a premium ocean gradient instead of a broken image.

## Files
```
index.html              Landing page
yacht.html              Yacht detail page
assets/css/style.css    Design-system-token-driven styles
assets/js/ocean.js      Three.js WebGL ocean+sky shader (hero)
assets/js/yacht3d.js    Three.js interactive 3D yacht model (+ optional glTF/Draco loader)
assets/js/gallery.js    WebGL displacement-dissolve gallery (stage + thumbnails)
assets/js/main.js       Lenis + GSAP orchestration, cursor, preloader, lightbox, form, page transition
design/                 Static visual-design comps (landing.html, detail.html, comps.css)
DESIGN_SYSTEM.md        Single source of truth (foundations + production spec)
ANIMATION_REFERENCE_ANALYSIS.md · EXPERIENCE_BLUEPRINT.md · STORYBOARD.md   Pre-build planning chain
```
