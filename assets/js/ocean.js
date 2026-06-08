/* ============================================================
   WebGL Ocean + Sky hero — Three.js fragment shader
   Palette: Monsoon Glow (#305282 / #98AFC7 / #E9ECEF)
   Adapted from Active Theory's shader-driven approach.
   ============================================================ */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const uniforms = {
    u_time:  { value: 0 },
    u_res:   { value: new THREE.Vector2() },
    u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
    // palette
    c_deep:  { value: new THREE.Color(0x0E1B2C) },
    c_ocean: { value: new THREE.Color(0x305282) },
    c_sky:   { value: new THREE.Color(0x98AFC7) },
    c_mist:  { value: new THREE.Color(0xE9ECEF) },
    c_brass: { value: new THREE.Color(0xC8A86B) }
  };

  const vert = `
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
  `;

  const frag = `
    precision highp float;
    varying vec2 vUv;
    uniform float u_time;
    uniform vec2  u_res;
    uniform vec2  u_mouse;
    uniform vec3  c_deep, c_ocean, c_sky, c_mist, c_brass;

    // hash + value noise + fbm
    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
    float noise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1.0,0.0));
      float c = hash(i + vec2(0.0,1.0));
      float d = hash(i + vec2(1.0,1.0));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
    }
    float fbm(vec2 p){
      float v = 0.0, amp = 0.5;
      for(int i=0;i<5;i++){ v += amp*noise(p); p *= 2.0; amp *= 0.5; }
      return v;
    }

    void main(){
      vec2 uv = vUv;
      float aspect = u_res.x / max(u_res.y,1.0);
      float t = u_time * 0.04;

      // gentle mouse parallax
      vec2 par = (u_mouse - 0.5) * 0.06;
      uv += par * vec2(1.0, 0.6);

      float horizon = 0.46;
      float d = uv.y - horizon;           // >0 sky, <0 sea

      // ---------- SKY ----------
      vec3 sky = mix(c_sky, c_mist, smoothstep(0.0, 0.55, d));
      // soft drifting clouds
      vec2 sp = vec2(uv.x*aspect*1.4 + t*0.6, uv.y*2.2 - t*0.2);
      float clouds = fbm(sp) * smoothstep(0.0, 0.4, d);
      sky = mix(sky, c_mist, clouds * 0.35);
      // sun glow near horizon, pulled toward mouse
      vec2 sun = vec2(0.5 + par.x*2.0, horizon + 0.04);
      float glow = exp(-pow(distance(vec2(uv.x*aspect, uv.y), vec2(sun.x*aspect, sun.y)) * 3.2, 2.0));
      sky += c_mist * glow * 0.9;
      sky += c_brass * glow * 0.18;       // warm champagne kiss

      // ---------- SEA ----------
      // perspective: stretch noise toward horizon
      float persp = 1.0 / max(horizon - uv.y, 0.03);
      vec2 wp = vec2(uv.x * aspect * 1.2, (horizon - uv.y) * persp * 0.20);
      float waves = fbm(wp + vec2(t*1.5, t*0.6));
      waves += 0.5 * fbm(wp*2.3 - vec2(t*1.0, 0.0));
      vec3 sea = mix(c_ocean, c_deep, smoothstep(0.0, 0.9, -d*2.2));
      // shimmer highlights
      float spark = smoothstep(0.62, 0.95, waves) * smoothstep(0.0, 0.25, horizon - uv.y);
      sea += c_mist * spark * 0.5;
      // horizon reflection of sun on water
      float refl = exp(-pow((uv.x - sun.x)*2.2, 2.0)) * smoothstep(0.0,0.12,horizon-uv.y) * (0.6 - waves*0.3);
      sea += (c_mist + c_brass*0.3) * max(refl,0.0) * 0.4;

      // ---------- COMPOSITE ----------
      float blend = smoothstep(-0.012, 0.012, d);
      vec3 col = mix(sea, sky, blend);
      // bright misty horizon band
      col += c_mist * exp(-pow(d*40.0, 2.0)) * 0.35;

      // subtle vignette + film grain
      float vig = smoothstep(1.25, 0.2, distance(vUv, vec2(0.5)));
      col *= 0.85 + 0.15*vig;
      float grain = (hash(vUv*u_res + t) - 0.5) * 0.02;
      col += grain;

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const material = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  scene.add(quad);

  function resize() {
    const w = canvas.clientWidth || canvas.parentElement.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || canvas.parentElement.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    uniforms.u_res.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
  }
  window.addEventListener('resize', resize);
  // Robust sizing: react to layout/viewport changes (preloader, font load, viewport unit settle)
  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(canvas);
  }
  window.addEventListener('load', resize);
  setTimeout(resize, 300);
  resize();

  // smooth mouse
  const target = { x: 0.5, y: 0.5 };
  window.addEventListener('pointermove', (e) => {
    target.x = e.clientX / window.innerWidth;
    target.y = 1.0 - e.clientY / window.innerHeight;
  });

  const clock = new THREE.Clock();
  let raf;
  function render() {
    uniforms.u_time.value = reduce ? 8.0 : clock.getElapsedTime();
    uniforms.u_mouse.value.x += (target.x - uniforms.u_mouse.value.x) * 0.05;
    uniforms.u_mouse.value.y += (target.y - uniforms.u_mouse.value.y) * 0.05;
    renderer.render(scene, camera);
    if (!reduce) raf = requestAnimationFrame(render);
  }
  render();
  if (reduce) renderer.render(scene, camera);

  // pause when hero off-screen (perf, à la Active Theory lazy rendering)
  if ('IntersectionObserver' in window && !reduce) {
    new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { if (!raf) render(); }
        else { cancelAnimationFrame(raf); raf = null; }
      });
    }, { threshold: 0.01 }).observe(canvas);
  }
})();
