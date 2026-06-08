/* ============================================================
   DubaiYachtz — D3 Gallery
   WebGL displacement-dissolve between images (Three.js r128 + GSAP).
   Tabs filter thumbnails; clicking a thumb dissolves the stage.
   Graceful fallback to a plain <img> swap (no WebGL / reduced-motion).
   ============================================================ */
(function () {
  var stage = document.querySelector('.gallery__stage');
  var canvas = document.getElementById('gallery-canvas');
  if (!stage || !canvas) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof gsap !== 'undefined';
  var thumbs = [].slice.call(document.querySelectorAll('.gallery__thumb'));
  var tabs = [].slice.call(document.querySelectorAll('.gallery__tab'));
  var fallbackImg = stage.querySelector('.gallery__fallback');
  var expandBtn = stage.querySelector('.gallery__expand');
  var current = thumbs[0];

  /* ---- fullscreen via existing lightbox ---- */
  function openFull(url) {
    var lb = document.querySelector('.lightbox'); if (!lb) return;
    var im = lb.querySelector('img'); if (im) im.src = url;
    lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false');
  }
  if (expandBtn) expandBtn.addEventListener('click', function (e) { e.stopPropagation(); if (current) openFull(current.dataset.full); });
  stage.addEventListener('click', function () { if (current) openFull(current.dataset.full); });

  function bindTabs(onSwitch) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
        tab.setAttribute('aria-selected', 'true');
        var cat = tab.dataset.cat, first = null;
        thumbs.forEach(function (th) {
          var show = th.dataset.cat === cat; th.hidden = !show;
          if (show && !first) first = th;
        });
        if (first) onSwitch(first);
      });
    });
  }

  /* ---- fallback path (no WebGL / reduced motion) ---- */
  var webglOK = (function () { try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('webgl'); } catch (e) { return false; } })();
  if (!webglOK || typeof THREE === 'undefined' || reduce) {
    function setActiveFallback(t) {
      thumbs.forEach(function (x) { x.classList.remove('is-active'); });
      t.classList.add('is-active'); current = t;
      if (fallbackImg) fallbackImg.src = t.dataset.full;
    }
    thumbs.forEach(function (t) { t.addEventListener('click', function () { setActiveFallback(t); }); });
    bindTabs(setActiveFallback);
    return;
  }

  /* ---- WebGL stage ---- */
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  if ('outputEncoding' in renderer) renderer.outputEncoding = THREE.sRGBEncoding;

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var loader = new THREE.TextureLoader(); loader.crossOrigin = 'anonymous';

  var uniforms = {
    uTexA: { value: null }, uTexB: { value: null },
    uResA: { value: new THREE.Vector2(1, 1) }, uResB: { value: new THREE.Vector2(1, 1) },
    uRes: { value: new THREE.Vector2(1, 1) },
    uProgress: { value: 0 }, uTime: { value: 0 }
  };

  var frag = [
    'precision highp float;',
    'varying vec2 vUv;',
    'uniform sampler2D uTexA,uTexB;',
    'uniform vec2 uResA,uResB,uRes;',
    'uniform float uProgress,uTime;',
    'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));vec2 u=f*f*(3.-2.*f);return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;}',
    'vec2 coverUV(vec2 uv,vec2 texRes){float ta=texRes.x/texRes.y;float qa=uRes.x/uRes.y;vec2 s= ta>qa ? vec2(qa/ta,1.) : vec2(1.,ta/qa);return (uv-0.5)*s+0.5;}',
    'void main(){',
    '  vec2 uv=vUv;',
    '  float p=uProgress;',
    '  float n=noise(uv*3.5+uTime*0.05);',
    '  float disp=(n-0.5)*0.12;',
    '  vec3 ca=texture2D(uTexA,coverUV(uv+vec2(disp)*p,uResA)).rgb;',
    '  vec3 cb=texture2D(uTexB,coverUV(uv-vec2(disp)*(1.0-p),uResB)).rgb;',
    '  float m=smoothstep(0.0,1.0,(p*1.3)-(n*0.3));',
    '  gl_FragColor=vec4(mix(ca,cb,clamp(m,0.0,1.0)),1.0);',
    '}'
  ].join('\n');

  var mat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: 'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}',
    fragmentShader: frag
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

  function loadTex(url) {
    return new Promise(function (res) {
      loader.load(url, function (t) {
        t.minFilter = THREE.LinearFilter; t.generateMipmaps = false;
        if ('encoding' in t) t.encoding = THREE.sRGBEncoding;
        res(t);
      }, undefined, function () { res(null); });
    });
  }

  var transitioning = false;
  function setFirst(t) {
    loadTex(t.dataset.full).then(function (tex) {
      if (!tex) return;
      uniforms.uTexA.value = tex; uniforms.uTexB.value = tex;
      uniforms.uResA.value.set(tex.image.width, tex.image.height);
      uniforms.uResB.value.copy(uniforms.uResA.value);
      uniforms.uProgress.value = 0; current = t;
    });
  }
  function transitionTo(t) {
    if (transitioning || t === current) return;
    transitioning = true;
    loadTex(t.dataset.full).then(function (tex) {
      if (!tex) { transitioning = false; return; }
      uniforms.uTexB.value = tex;
      uniforms.uResB.value.set(tex.image.width, tex.image.height);
      uniforms.uProgress.value = 0;
      thumbs.forEach(function (x) { x.classList.remove('is-active'); });
      t.classList.add('is-active');
      var done = function () {
        uniforms.uTexA.value = tex; uniforms.uResA.value.copy(uniforms.uResB.value);
        uniforms.uProgress.value = 0; current = t; transitioning = false;
      };
      if (hasGSAP) gsap.fromTo(uniforms.uProgress, { value: 0 }, { value: 1, duration: 1.1, ease: 'power2.inOut', onComplete: done });
      else { uniforms.uProgress.value = 1; done(); }
    });
  }

  thumbs.forEach(function (t) { t.addEventListener('click', function () { transitionTo(t); }); });
  bindTabs(function (first) { transitionTo(first); });

  stage.classList.add('webgl');

  function resize() {
    var w = canvas.clientWidth || stage.clientWidth, h = canvas.clientHeight || stage.clientHeight;
    renderer.setSize(w, h, false);
    uniforms.uRes.value.set(w, h);
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
  window.addEventListener('resize', resize);
  window.addEventListener('load', resize);
  setTimeout(resize, 200); resize();

  var raf = null, clock = new THREE.Clock();
  function render() { uniforms.uTime.value = clock.getElapsedTime(); renderer.render(scene, camera); raf = requestAnimationFrame(render); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { if (!raf) render(); }
        else if (raf) { cancelAnimationFrame(raf); raf = null; }
      });
    }, { threshold: 0.01 }).observe(canvas);
  } else { render(); }

  setFirst(thumbs[0]);
})();
