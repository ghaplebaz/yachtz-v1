# DubaiYachtz — Low-Fidelity Motion Storyboards (Pre-Visual)

> **Scope:** Storyboard *frames* (layout as plain boxes), **scroll beats**, **transition cues**,
> and **state notes** for the Landing and Detail pages. This is choreography made spatial.
> **No visual design, no styon, no real layout proportions, no code.** Boxes show *position and
> motion intent only* — not final composition. Follows `EXPERIENCE_BLUEPRINT.md`.

---

## 0. HOW TO READ THIS

**A "frame"** = one moment in a scene's timeline (entry / mid-scrub / exit). Boxes are schematic.

**Legend**
```
▓▓  media / WebGL / image          ····  body text lines
[ ]  button / interactive          ▭     heading / text block
░░  secondary surface / card       ═══   hairline / divider
→ ← ↑ ↓  motion direction          ⟳     rotate / orbit / loop
⤓   scroll-down cue                ★     the "memorable moment"
◆ advanced  ◈ intermediate  ○ simple        RM = reduced-motion fallback
```

**Scroll-beat ruler** (per scrubbed scene) reads left→right as the user scrolls:
```
beat │0.0────0.25────0.5────0.75────1.0
     │ ⓐ              ⓑ            ⓒ
```
ⓐ entry state · ⓑ mid state · ⓒ exit/handoff state.

**Viewport box** = one screen height (`100svh`) unless marked “(tall/pinned)”.

---

## 1. PERSISTENT OVERLAYS (storyboarded once; present on every scene)

### 1.1 Custom cursor ○
```
default:        hover link:        over card/media:     dragging 3D:
  •               ( • )              (  view  )            ( ⟳ drag )
 dot            ring swells         ring + label          label swaps
```
- Lerps toward pointer each frame (heavy damping). Hidden on touch. Blend-mode keeps it legible on any surface.
- **RM:** native cursor; no custom element.

### 1.2 Nav states ○ (fixed, top)
```
over hero (transparent)        after 60px scroll (frosted)
┌───────────────────────────┐  ┌───────────────────────────┐
│ DubaiYachtz   fleet…   [Enquire] │  │ DubaiYachtz  fleet…    [Enquire] │  ← frosted bar + hairline
└───────────────────────────┘  └───────────────────────────┘
   light text                      dark text, blur bg
```
- Crossfades between states on scroll threshold. Enquire is always present.
- **Mobile:** links collapse to a burger → left drawer (slide-in).

### 1.3 Chapter / progress indicator ○
```
right edge:  │·····●·····│   thin vertical line, node = position
                            label fades in on scene change ("02 / Manifesto")
```

---

## 2. LANDING PAGE STORYBOARD

### S0 · ARRIVAL (Act 0 preloader) ◈
```
FRAME A (load)        FRAME B (counting)     FRAME C (reveal)
┌──────────────┐      ┌──────────────┐       ┌──────────────┐
│              │      │      ◜       │       │░░ tide wipe ↑│
│      M       │      │    ( M )     │       │▓▓ hero shows │
│              │      │     047      │       │   (in motion)│
│     000      │      │  brass arc → │       │              │
└──────────────┘      └──────────────┘       └──────────────┘
```
- **Beats:** A `load` → B counter 000→100 + brass stroke fills the ring → C tide-wipe up reveals an already-living hero.
- **Transition OUT:** vertical wipe (~1.1s, ease-luxury). WebGL first frame pre-warmed during load.
- **RM:** A → C instant fade, no counter/arc theatrics.

---

### S1 · HERO "Open Horizon" ◆ ★ (memorable moment, part 1)
```
beat │0.0──────────0.5──────────1.0   (begins as user starts scrolling)
     │ ⓐ            ⓑ            ⓒ

ⓐ entry                ⓑ mid-descent          ⓒ handoff
┌──────────────┐       ┌──────────────┐       ┌──────────────┐
│ ▓ SKY ▓      │       │ ▓ horizon ▓  │       │ ▓▓ WATER ▓▓  │  sky lifted out
│   · glow ·   │       │   rises ↑    │       │              │
│ ▭ The art of │       │ ▭ parting ↑  │       │ (text gone)  │
│   being…     │       │              │       │ ░ calming →  │  → into S2 tone
│ ···· sub     │       │              │       │              │
│ [Explore][·] │       │              │       │              │
│        ⤓     │       │              │       │              │
└──────────────┘       └──────────────┘       └──────────────┘
```
- **Entry (on reveal):** headline lines rise from mask (stagger ~0.12s); eyebrow→sub→CTAs fade up.
- **Scrub 0→1:** scroll drives shader uniforms — horizon Y rises, color mix sky→water, camera dolly down; headline parts/falls.
- **Idle motion:** FBM swell + drifting mist + champagne horizon glow; **pointer parallax** (sun/horizon follow cursor, heavy damping).
- **Attention:** one headline, one primary CTA, vast space; only the water moves.
- **Tech:** Three.js + custom GLSL; ScrollTrigger scrub → uniforms.
- **States:** CTA hover = brass hairline + magnetic pull. **RM:** static ocean still, text fade-in, no descent/parallax.

**TRANSITION S1→S2 "Descent to stillness":** water shader calms + background crossfades to mist-white (continuous, scroll-linked). No cut.

---

### S2 · MANIFESTO "Why we exist" ◈
```
beat │0.0─────────0.5─────────1.0
     │ words illuminate L→R as line passes center

┌──────────────────────────────┐
│                              │
│  A yacht is not purchased.   │  ← word opacity .12 → 1 (scrub)
│  It is chosen…               │
│                       ░ aside │  ← fades up at ~0.6
└──────────────────────────────┘
```
- **Beats:** word-by-word reveal tied to scroll; aside block fades in late. Deliberately quiet (the "breath").
- **Tech:** ScrollTrigger scrub over word spans. **RM:** full text visible, gentle fade.

---

### S3 · FLEET "Sailing past the collection" ◈ (pinned, tall)
```
SCENE PINS; vertical scroll → horizontal travel
beat │0.0────────0.33────────0.66────────1.0
     │ card1       card2        card3       …release
     │ progress ──────────────────▶

┌───────────────────────────────────────┐ (viewport, pinned)
│ ▭ Featured fleet            [View all] │
│ ┌──────┐  ┌──────┐  ┌──────┐  ┌────    │
│ │▓ ░░  │→ │▓ ░░  │→ │▓ ░░  │→ │▓ …  →  │  track moves ←
│ │ name │  │ name │  │ name │  │        │
│ │specs │  │specs │  │specs │  │        │
│ └──────┘  └──────┘  └──────┘  └────    │
│ ═══════════●─────────────────────────  │  progress line
└───────────────────────────────────────┘
```
- **Beats:** `0.0` pin locks, card1 centered → scrub translates track horizontally through all cards → `1.0` release to S4.
- **Per-card:** image parallax within frame as it crosses center; centered card "lit," others slightly receded.
- **States:** hover = lift + slow image zoom + brass hairline; cursor shows "View"; click → **D0 boarding transition**.
- **Tech:** ScrollTrigger pin + scrub on track. **RM / mobile:** native horizontal swipe-snap carousel, no pin.

---

### S4 · HERITAGE "Built by masters" ◆/◈ (dark)
```
beat │0.0──────────0.5──────────1.0
     │ image overscan ↓ slower than text;  CTA at ~0.7

┌──────────────────────────────┐  (dark band)
│ ┌────────┐   ▭ Built by       │
│ │▓ parallax│   masters.        │
│ │  drift ↓ │   ···· copy       │  text reveals stagger
│ │ ·mist·   │   [Discover →]    │  ← brass, ~0.7
│ └────────┘                     │
└──────────────────────────────┘
```
- **Beats:** image drifts (scrub parallax) slower than copy; optional faint GPU particle mist for atmosphere; brass CTA late.
- **Attention:** tonal shift to dark = "going deeper."
- **Tech:** ◈ scrub parallax (baseline); ◆ particles only if perf budget allows. **RM:** static image, fade copy, no particles.

---

### S5 · ASSURANCE (stats) ○
```
┌──────────────────────────────┐  (dark)
│  640+    €4.2B    27    32    │  ← count 0→value once in view
│  yachts  txns   years  ctries │
│  ║       ║       ║      ║     │  ← brass dividers draw in
└──────────────────────────────┘
```
- **Beats:** counters tween on enter (once); dividers wipe in. **RM:** final numbers shown immediately.

---

### S6 · BROWSE BY TYPE ○/◈
```
┌──────────────────────────────┐
│ ▭ Find your vessel           │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐      │  tiles reveal in stagger
│ │▓ │ │▓ │ │▓ │ │▓ │          │  hover = slow zoom + label shift
│ │Mot│ │Sai│ │Exp│ │Cat│      │
│ └───┘ └───┘ └───┘ └───┘      │
└──────────────────────────────┘
```
- **States:** hover zoom + cursor "Explore"; optional cursor-tilt (◈). **RM:** static tiles.

---

### S7 · TESTIMONIAL ○
```
┌──────────────────────────────┐
│        " They understood     │  single serif quote
│          the life I wanted… " │  fade + rise, then held
│            — Owner, M/Y …     │
└──────────────────────────────┘
```
- Quiet held beat. **RM:** fade only.

---

### S8 · CONCIERGE INVITATION ◈
```
┌──────────────────────────────┐
│ ▓▓ calm ocean (scrub parallax)│
│      ▭ Begin a quiet          │
│        conversation           │
│   [Request viewing]  save ·   │  layered CTAs (high→soft)
└──────────────────────────────┘
```
- **Beats:** bg parallax on scroll; content reveal. **RM:** static bg.

---

### S9 · FOOTER "Harbor" ○
```
┌──────────────────────────────┐
│ ═ brass hairline ═            │
│ DubaiYachtz (large)   cols  cols    │  wordmark rises subtly on enter
│ © …                socials    │
└──────────────────────────────┘
```

**LANDING MASTER TIMELINE**
```
S0 ▓ ritual │ S1 ◆★ awe →descent │ S2 ○ calm │ S3 ◈ desire(pin) │
S4 ◆/◈ depth │ S5 ○ trust │ S6 ○ │ S7 ○ │ S8 ◈ invite │ S9 ○ rest
spectacle:   ████              ███                 (front-loaded, book-ended by calm)
```

---

## 3. YACHT DETAIL PAGE STORYBOARD

### D0 · ENTRY "Boarding" ◆ (connective)
```
FRAME A (card clicked)   FRAME B (morph)        FRAME C (detail hero)
┌──────────┐             ┌──────────────┐       ┌──────────────┐
│ ┌────┐   │             │  ┌────────┐  │       │ ▓▓▓▓▓▓▓▓▓▓▓▓ │
│ │▓ ░ │── click ──▶     │  │▓ expands│  │  ──▶  │  Azimut 36M  │
│ │name│   │             │  │  ▓▓▓▓  ↗│  │       │  specs…      │
│ └────┘   │             │  └────────┘  │       │              │
└──────────┘             └──────────────┘       └──────────────┘
```
- **Beats:** clicked card image morphs/expands into the detail hero (shared element) OR composite dissolve. No reload/white flash.
- **Tech:** Barba.js intercept + shared-element morph (◆); cover-wipe fallback (◈). **RM:** simple fade.

---

### D1 · PDP HERO "The vessel, framed" ◈
```
beat │0.0───────────────1.0
     │ image overscan → settles to rest (scrub zoom-out)

┌──────────────────────────────┐
│ ▓▓ yacht (scale 1.08 → 1.0) ▓ │
│ breadcrumb ›                  │
│ ▭ Azimut Grande 36M           │  name + meta settle in
│ LOA 36m · 2024 · 10 guests    │
│                        ⤓      │
└──────────────────────────────┘
```
- **RM:** static hero, no zoom.

---

### D2 · SPEC RAIL ESTABLISH ○
```
as hero scrolls away → rail sticks
┌──────────────────────────────┐
│ LOA│Beam│Draft│Builder│Price │[Enquire]│  ← sticky top (desktop)
└──────────────────────────────┘
mobile: ……………… [ Enquire ] ← sticky BOTTOM bar
```
- **Beats:** sticky engages after hero; state swap desktop↔mobile. ○.

---

### D3 · GALLERY "Walking the yacht" ◆/◈
```
tabs: [Exterior] Interior  Deck
switching view = displacement dissolve (not instant)

FRAME A (Exterior)     FRAME B (dissolve)     FRAME C (Interior)
┌────────────┐         ┌────────────┐         ┌────────────┐
│ ▓ big ▓ ░░ │         │ ▓ ripple ▓ │   ──▶   │ ▓ big ▓ ░░ │
│ ░░  ░░  ░░ │  ──▶    │  melt/warp │         │ ░░  ░░  ░░ │
└────────────┘         └────────────┘         └────────────┘
click any → fullscreen lightbox (same dissolve)
```
- **Beats:** grid reveals in stagger on entry; tab change triggers GLSL displacement dissolve; lightbox open/close eased.
- **Tech:** ◆ WebGL displacement; ◈ crossfade fallback. **RM:** instant swap, no dissolve.

---

### D4 · FEATURE STORYTELLING "Life aboard" ◈
```
alternating beats, each = ONE focal idea (reveal on scroll)
┌───────────────┐   ┌───────────────┐
│ ┌────┐ ▭ Owner│   │ ▭ Engineering │
│ │▓ ∥ │ ·· copy│   │ ·· copy ┌────┐│  image parallax ∥ within frame
│ └────┘        │   │         │▓ ∥ ││
└───────────────┘   └───────────────┘
(optional: PIN the single most impressive feature)
```
- **RM:** static stacked sections.

---

### D5 · 3D REVEAL "Aboard the model" ◆ ★ (memorable moment, part 2)
```
beat │0.0──────────0.5──────────1.0
     │ poster → model loads → orbit / scroll fly-through

FRAME A (poster)    FRAME B (live 3D)        FRAME C (interior)
┌────────────┐      ┌────────────┐           ┌────────────┐
│ ▓ still ▓  │      │   ⟳ 3D ⟳   │   scroll  │  inside ▓  │
│ loading…   │ ──▶  │  drag/orbit│   ──▶      │  deck-plan │
│            │      │  ◈ DOF     │           │  hotspots  │
└────────────┘      └────────────┘           └────────────┘
```
- **Beats:** lazy-load only when near viewport → poster shows first → live model (orbit/drag, or scroll-driven exterior→interior fly-through) → hotspots.
- **Tech:** Three.js + Draco glTF, soft studio light + DOF. **RM / low-power:** pre-rendered turntable image-sequence or single still. **Guardrail:** never blocks earlier content.

---

### D6 · FULL SPECIFICATIONS ○
```
┌──────────────────────────────┐
│ ▭ Specifications  [Download ▼]│
│ LOA ……… 36.0 m │ Guests … 10  │  two columns, rows reveal stagger
│ Beam …… 7.4 m  │ Cabins … 5   │  mono figures
│ ……            │ ……           │
└──────────────────────────────┘
```
- Calm, rational beat after immersion. **RM:** rows visible immediately.

---

### D7 · INQUIRY "Speak with a specialist" ◈
```
states: idle → submitting → success
┌──────────────────────────────┐    ┌──────────────────────────────┐
│ ▭ Request details            │    │        ✓ Thank you.           │
│ [First][Last]                │ →  │  A specialist will reply       │
│ [Email][Phone]               │    │  within 24 hours.              │
│ [Message……]                  │    │                                │
│ [ Request details ]          │    └──────────────────────────────┘
└──────────────────────────────┘     (button morphs → confirmation)
```
- **Beats:** floating labels animate; validate on blur; submit → button busy → success panel. Spec-rail Enquire persists.
- **RM:** no field motion; instant state changes.

---

### D8 · RELATED + FOOTER ○/◆
```
┌──────────────────────────────┐
│ ▭ You may also consider      │
│ ┌───┐ ┌───┐ ┌───┐            │  reveal stagger
│ │▓ │ │▓ │ │▓ │  click → D0   │  re-triggers "boarding" (loop closes)
│ └───┘ └───┘ └───┘            │
├──────────────────────────────┤
│ FOOTER (harbor)              │
└──────────────────────────────┘
```

**DETAIL MASTER TIMELINE**
```
D0 ◆ board │ D1 ◈ frame │ D2 ○ anchor │ D3 ◆ immerse │ D4 ◈ story │
D5 ◆★ 3D reveal │ D6 ○ confidence │ D7 ◈ invite │ D8 loop+harbor
spectacle:  ███            ████        █████              (anchored at D3 & D5)
```

---

## 4. TRANSITION STORYBOARDS (connective beats)

```
LOAD → LANDING        HERO → MANIFESTO       LANDING → DETAIL
[wipe ↑ reveal]       [water calms→mist]     [card morphs→hero]
◈ GSAP+SVG            ◈ shader scrub         ◆ Barba + shared element

GALLERY view↔view     DETAIL → BACK          OVERLAYS (lightbox/drawer)
[ripple dissolve]     [reverse boarding]     [scrim fade + panel ease]
◆ GLSL displacement   ◆ Barba                ○ CSS/GSAP
```
**Rule restated:** every navigation is continuous — never a blank frame or layout jump.

---

## 5. STATE MATRIX (key elements)

| Element | Default | Hover/Focus | Active/Loading | Empty/Edge | Reduced-motion |
|---|---|---|---|---|---|
| Primary CTA | rest | brass hairline + magnetic | busy spinner, width held | — | no magnetic, instant |
| Yacht card | rest | lift + slow zoom + "View" | → boarding transition | — | no zoom, instant nav |
| Fleet (S3) | card1 centered | hovered card lit | scrubbing | <2 cards: static row | swipe carousel |
| Gallery (D3) | exterior | thumb hover zoom | dissolve playing | missing img → gradient | instant swap |
| 3D model (D5) | poster | cursor "drag" | loading / orbiting | low-power → turntable | still image |
| Inquiry (D7) | idle | field focus ring | submitting → success | server error → inline alert | no field motion |
| Cursor | dot | ring swell + label | drag label | — | native cursor |
| Nav | transparent | link brass underline | frosted on scroll | — | crossfade only |

---

## 6. PRODUCTION NOTES (carried from blueprint)
- **◆ advanced budget concentrated in 4 places only:** S1 hero+descent, D0/D8 boarding, D3 gallery dissolves, D5 3D reveal. Everything else ○/◈.
- **Calm "breath" scenes are intentional:** S2, S5, S7, D6, footer — contrast is what makes spectacle feel expensive.
- **Every scene lists an RM fallback;** site is fully usable without WebGL/JS.
- **Perf:** ~1.3s LCP target; heavy 3D lazy-loads; WebGL pauses off-screen; DPR cap 2.

---
*Storyboard phase complete. No visual design, layouts, or code produced.
Next phase (on approval): translate frames into visual design (apply DESIGN_SYSTEM.md to real screens) or proceed to build.*
