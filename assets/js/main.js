/* ============================================================
   DubaiYachtz — interaction layer
   Lenis smooth scroll + GSAP/ScrollTrigger orchestration
   Custom cursor, magnetics, split-text, counters, lightbox.
   ============================================================ */
(function () {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof gsap !== 'undefined';
  if (hasGSAP && typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  /* ---------- 1. PRELOADER ---------- */
  function runPreloader(done) {
    const pre = document.getElementById('preloader');
    const countEl = document.querySelector('.pre-count');
    const ring = document.querySelector('.ring-progress');
    if (!pre) { done(); return; }
    const len = ring ? ring.getTotalLength() : 0;
    if (ring) { ring.style.strokeDasharray = len; ring.style.strokeDashoffset = len; }

    // Fast path on internal navigation (keep the full ritual only on first visit)
    let visited = false;
    try { visited = sessionStorage.getItem('dy_visited') === '1'; } catch (e) {}
    if (visited) {
      if (countEl) countEl.textContent = '100';
      if (ring) ring.style.strokeDashoffset = 0;
      setTimeout(() => exit(pre, done), 200);
      return;
    }

    let p = 0;
    const tick = () => {
      p += Math.max(1, (100 - p) * 0.06);
      if (p >= 100) p = 100;
      if (countEl) countEl.textContent = String(Math.floor(p)).padStart(3, '0');
      if (ring) ring.style.strokeDashoffset = len * (1 - p / 100);
      if (p < 100) requestAnimationFrame(tick);
      else { try { sessionStorage.setItem('dy_visited', '1'); } catch (e) {} setTimeout(() => exit(pre, done), 350); }
    };
    requestAnimationFrame(tick);
  }
  function exit(pre, done) {
    document.body.classList.remove('is-loading');
    let finished = false;
    const finish = () => { if (finished) return; finished = true; pre.style.display = 'none'; done(); };
    if (hasGSAP && !reduce) {
      gsap.to(pre, { yPercent: -100, duration: 1.1, ease: 'power4.inOut', onComplete: finish });
      // Safety: if rAF is throttled (e.g. backgrounded tab), never trap the user behind the loader
      setTimeout(finish, 1500);
    } else { finish(); }
  }

  /* ---------- 2. LENIS SMOOTH SCROLL ---------- */
  let lenis = null;
  function initLenis() {
    if (typeof Lenis === 'undefined' || reduce) return;
    lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true, lerp: 0.1 });
    if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length > 1) { const el = document.querySelector(id);
          if (el) { e.preventDefault(); lenis.scrollTo(el, { offset: -80 }); } }
      });
    });
  }

  /* ---------- 3. CUSTOM CURSOR + MAGNETICS ---------- */
  function initCursor() {
    if (window.matchMedia('(hover:none)').matches || reduce) return;
    const cur = document.createElement('div');
    cur.className = 'cursor';
    cur.innerHTML = '<div class="cursor__ring"></div><div class="cursor__dot"></div><div class="cursor__label">View</div>';
    document.body.appendChild(cur);
    const ring = cur.querySelector('.cursor__ring');
    const dot = cur.querySelector('.cursor__dot');
    const label = cur.querySelector('.cursor__label');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      label.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a,button,.magnetic,[data-cursor]').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const c = el.getAttribute('data-cursor');
        if (c) { cur.classList.add('is-view'); label.textContent = c; }
        else cur.classList.add('is-hover');
      });
      el.addEventListener('mouseleave', () => cur.classList.remove('is-hover', 'is-view'));
    });
    addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
    addEventListener('mouseenter', () => cur.classList.remove('is-hidden'));

    // magnetic pull
    document.querySelectorAll('.magnetic').forEach((el) => {
      const strength = 0.35;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transform = `translate(${x}px,${y}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- 4. SPLIT TEXT (lightweight) ---------- */
  function splitLines(el) {
    const text = el.textContent.trim();
    el.innerHTML = '';
    // split by explicit <br data> markers via data-lines attribute
    const lines = el.dataset.lines ? el.dataset.lines.split('|') : [text];
    lines.forEach((ln) => {
      const wrap = document.createElement('span'); wrap.className = 'line';
      const inner = document.createElement('span'); inner.textContent = ln;
      wrap.appendChild(inner); el.appendChild(wrap);
    });
    return el.querySelectorAll('.line span');
  }
  function splitWords(el) {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(' ');
    return el.querySelectorAll('.word');
  }

  /* ---------- 5. NAV SCROLL STATE ---------- */
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const set = () => nav.classList.toggle('is-scrolled', scrollY > 60);
    set(); addEventListener('scroll', set, { passive: true });
  }

  /* ---------- 6. GSAP SCENES ---------- */
  function initScenes() {
    /* hero entrance */
    const heroTitleSpans = document.querySelectorAll('.hero__title .line span');
    if (hasGSAP && !reduce) {
      const tl = gsap.timeline({ delay: 0.15 });
      if (heroTitleSpans.length) {
        gsap.set(heroTitleSpans, { yPercent: 110 });
        tl.to(heroTitleSpans, { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.12 });
      }
      tl.to('.hero__eyebrow', { opacity: 1, duration: 0.8 }, 0.2)
        .to('.hero__sub', { opacity: 1, y: 0, duration: 0.9 }, '-=0.6')
        .to('.hero__actions', { opacity: 1, y: 0, duration: 0.9 }, '-=0.7');
    } else {
      gsap && gsap.set(['.hero__eyebrow', '.hero__sub', '.hero__actions'], { opacity: 1 });
    }

    if (!hasGSAP || typeof ScrollTrigger === 'undefined' || reduce) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      document.querySelectorAll('[data-count]').forEach((el) => el.textContent = el.dataset.count);
      return;
    }

    /* hero cinematic pin-zoom (enhancement only — existing entrance animation untouched) */
    const heroBg = document.querySelector('.hero__bg');
    const heroEl = document.querySelector('.hero');
    const heroZoomOK = window.matchMedia('(pointer: fine)').matches || window.innerWidth > 768;
    if (heroBg && heroEl && heroZoomOK) {
      const heroZoom = gsap.timeline({
        scrollTrigger: { trigger: heroEl, start: 'top top', end: '+=100%', scrub: true, pin: true, anticipatePin: 1, invalidateOnRefresh: true }
      });
      heroZoom
        .fromTo(heroBg, { scale: 1, filter: 'brightness(1)' }, { scale: 1.15, filter: 'brightness(1.06)', ease: 'none', duration: 1 }, 0)
        .to('.hero__scroll', { autoAlpha: 0, ease: 'none', duration: 0.25 }, 0)
        .to('.hero__content', { autoAlpha: 0, y: -40, ease: 'none', duration: 0.4 }, 0.62);
    }

    /* generic reveals (skip cards inside staggered grids) */
    gsap.utils.toArray('.reveal').forEach((el) => {
      if (el.closest('[data-stagger]')) return;
      ScrollTrigger.create({ trigger: el, start: 'top 85%',
        onEnter: () => el.classList.add('in') });
    });
    /* staggered feature-card grids: cards reveal progressively */
    gsap.utils.toArray('[data-stagger]').forEach((grid) => {
      const cards = grid.querySelectorAll(':scope > .reveal');
      ScrollTrigger.create({ trigger: grid, start: 'top 82%', once: true,
        onEnter: () => cards.forEach((c, i) => setTimeout(() => c.classList.add('in'), i * 90)) });
    });

    /* manifesto word-by-word */
    const man = document.querySelector('.manifesto__text');
    if (man) {
      const words = splitWords(man);
      ScrollTrigger.create({
        trigger: man, start: 'top 75%', end: 'bottom 55%', scrub: true,
        onUpdate: (self) => {
          const lit = Math.floor(self.progress * words.length);
          words.forEach((w, i) => w.classList.toggle('lit', i <= lit));
        }
      });
    }

    /* fleet is now a native drag/swipe carousel — no scroll-hijacking pin (see initFleetDrag) */

    /* parallax images */
    gsap.utils.toArray('[data-parallax]').forEach((img) => {
      gsap.fromTo(img, { yPercent: -8 }, { yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* animated counters */
    gsap.utils.toArray('[data-count]').forEach((el) => {
      const end = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split('.')[1] || '').length;
      ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true,
        onEnter: () => gsap.to({ v: 0 }, { v: end, duration: 2, ease: 'power3.out',
          onUpdate: function () { el.textContent = this.targets()[0].v.toFixed(dec) +
            (el.dataset.suffix || ''); } }) });
    });

    /* pdp hero zoom-out */
    const pdpImg = document.querySelector('.pdp-hero img');
    if (pdpImg) gsap.fromTo(pdpImg, { scale: 1.15 }, { scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.pdp-hero', start: 'top top', end: 'bottom top', scrub: true } });

    ScrollTrigger.refresh();
  }

  /* ---------- 7. GALLERY TABS + LIGHTBOX ---------- */
  function initGallery() {
    const tabs = document.querySelectorAll('.gallery__tab');
    const panels = document.querySelectorAll('.gallery__panel');
    // Legacy panel-based gallery only (new WebGL gallery is owned by gallery.js)
    if (panels.length) tabs.forEach((tab) => tab.addEventListener('click', () => {
      tabs.forEach((t) => t.setAttribute('aria-selected', 'false'));
      panels.forEach((p) => p.hidden = true);
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(tab.getAttribute('aria-controls'));
      if (panel) { panel.hidden = false;
        hasGSAP && gsap.fromTo(panel.querySelectorAll('.gallery__item'),
          { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: 'power3.out' }); }
    }));

    const box = document.querySelector('.lightbox');
    if (!box) return;
    const bImg = box.querySelector('img');
    document.querySelectorAll('.gallery__item img').forEach((img) => {
      img.parentElement.addEventListener('click', () => {
        bImg.src = img.dataset.full || img.src; box.classList.add('open');
        box.setAttribute('aria-hidden', 'false');
      });
    });
    const close = () => { box.classList.remove('open'); box.setAttribute('aria-hidden', 'true'); };
    box.addEventListener('click', (e) => { if (e.target === box || e.target.closest('.lightbox__close')) close(); });
    addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* ---------- 8. FORM ---------- */
  function initForm() {
    const form = document.querySelector('form[data-inquiry]');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      btn.setAttribute('aria-busy', 'true'); btn.textContent = 'Sending…';
      setTimeout(() => {
        form.innerHTML = '<div style="text-align:center;padding:24px"><p class="serif" style="font-size:1.75rem;margin-bottom:12px">Thank you.</p><p style="color:var(--text-muted)">Your inquiry has been received. A dedicated specialist will reply within 24 hours.</p></div>';
      }, 1400);
    });
  }

  /* ---------- FLEET MARQUEE (continuous loop) ---------- */
  function initFleetMarquee() {
    if (reduce) return; // reduced-motion = static scrollable rows, no clones
    // duplicate each marquee track's items so translateX(-50%) loops seamlessly
    ['.fleet__track', '.photoband__track'].forEach((sel) => {
      const track = document.querySelector(sel);
      if (!track) return;
      Array.prototype.slice.call(track.children).forEach((c) => {
        const clone = c.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.removeAttribute('data-cursor');
        track.appendChild(clone);
      });
    });
    // autoplay the looping video cards (originals + clones); muted = allowed to play
    document.querySelectorAll('.photoband video, .cat video, .service-card video').forEach((v) => {
      v.muted = true;
      const p = v.play();
      if (p && p.catch) p.catch(function () {});
    });
  }

  /* ---------- PAGE TRANSITION ("boarding") ---------- */
  function initPageTransition() {
    if (reduce) return;
    const ov = document.createElement('div');
    ov.className = 'page-transition';
    document.body.appendChild(ov);
    document.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || a.target === '_blank') return;
      if (!/\.html(\?|#|$)/.test(href)) return; // only internal .html routes
      a.addEventListener('click', (e) => {
        e.preventDefault();
        ov.classList.add('cover');
        setTimeout(() => { window.location.href = href; }, 520);
      });
    });
  }

  /* ---------- IMAGE FALLBACK ---------- */
  document.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'IMG') {
      e.target.style.opacity = '0';
      e.target.dataset.failed = 'true';
    }
  }, true);

  /* ---------- INIT ---------- */
  /* ---------- REVIEWS: overlapping fan gallery ---------- */
  function initOverlapGallery() {
    const g = document.getElementById('reviewGallery');
    if (!g || reduce) return; // reduced-motion = static grid (CSS)
    const cards = Array.prototype.slice.call(g.querySelectorAll('.og-card'));
    const n = cards.length;
    if (!n) return;
    const half = Math.floor(n / 2);
    let active = half;
    let timer = null;

    function layout() {
      const w = g.clientWidth;
      const fx = w < 600 ? 0.14 : 0.17; // horizontal offset factor (% of width)
      cards.forEach((card, i) => {
        let p = i - active;
        if (p > half) p -= n;
        if (p < -half) p += n;
        const ap = Math.abs(p);
        const x = p * fx * w;
        const y = p === 0 ? -30 : 24 + (ap - 1) * 18;
        const s = p === 0 ? 1.18 : ap === 1 ? 0.95 : 0.84;
        card.style.setProperty('--x', x.toFixed(1) + 'px');
        card.style.setProperty('--y', y + 'px');
        card.style.setProperty('--s', s);
        card.style.setProperty('--z', 30 - ap * 10);
        card.style.setProperty('--o', ap >= 3 ? 0 : 1);
        card.classList.toggle('is-focus', p === 0);
        card.setAttribute('aria-hidden', p === 0 ? 'false' : 'true');
      });
    }
    function go(i) { active = ((i % n) + n) % n; layout(); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() { stop(); timer = setInterval(() => go(active + 1), 2400); }

    cards.forEach((card, i) => {
      card.addEventListener('click', () => go(i));
      card.addEventListener('mouseenter', () => go(i));
    });
    g.addEventListener('mouseenter', stop);
    g.addEventListener('mouseleave', start);

    // basic swipe / drag
    let sx = null;
    g.addEventListener('pointerdown', (e) => { sx = e.clientX; stop(); });
    window.addEventListener('pointerup', (e) => {
      if (sx == null) return;
      const dx = e.clientX - sx; sx = null;
      if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
      start();
    });
    window.addEventListener('resize', layout);

    layout();
    start();
  }

  document.addEventListener('DOMContentLoaded', () => {
    // pre-split hero title and set hidden states BEFORE preloader exits (prevents flash)
    document.querySelectorAll('.hero__title[data-split]').forEach(splitLines);
    if (hasGSAP && !reduce) {
      gsap.set('.hero__title .line span', { yPercent: 110 });
      gsap.set(['.hero__sub', '.hero__actions'], { y: 20 });
    }

    runPreloader(() => {
      initLenis();
      initScenes();
      if (lenis) ScrollTrigger && ScrollTrigger.refresh();
    });
    initNav();
    initCursor();
    initGallery();
    initForm();
    initPageTransition();
    initFleetMarquee();
    initOverlapGallery();
  });

  window.addEventListener('load', () => { if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh(); });
})();
