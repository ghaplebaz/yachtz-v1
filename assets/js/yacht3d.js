/* ============================================================
   DubaiYachtz — D5 "Aboard the model"
   Interactive real-time 3D yacht (Three.js r128 + OrbitControls).
   Built from primitives — no external asset — in the brand palette.
   Lazy-inits near viewport; pauses off-screen; reduced-motion = still frame.
   ============================================================ */
(function () {
  var canvas = document.getElementById('yacht3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var started = false, raf = null;

  function init() {
    if (started) return; started = true;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b1623, 10, 26);

    var camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(6.5, 3.3, 7.5);

    // ---- lighting (soft studio) ----
    scene.add(new THREE.HemisphereLight(0xcfe0f0, 0x16304a, 0.95));
    var key = new THREE.DirectionalLight(0xfff2da, 1.15); key.position.set(7, 10, 5); scene.add(key);
    var fill = new THREE.DirectionalLight(0x9ab4cf, 0.5); fill.position.set(-7, 4, -6); scene.add(fill);

    // ---- water ----
    var water = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.MeshStandardMaterial({ color: 0x1b3350, roughness: 0.55, metalness: 0.25 })
    );
    water.rotation.x = -Math.PI / 2; scene.add(water);

    // ---- yacht (primitives) ----
    var yacht = new THREE.Group();
    var white = new THREE.MeshStandardMaterial({ color: 0xeef3f7, roughness: 0.45, metalness: 0.05 });
    var cabinMat = new THREE.MeshStandardMaterial({ color: 0xf4f7f9, roughness: 0.4 });
    var glassMat = new THREE.MeshStandardMaterial({ color: 0x16304a, roughness: 0.15, metalness: 0.45 });
    var dark = new THREE.MeshStandardMaterial({ color: 0x14233a, roughness: 0.5 });
    var brass = new THREE.MeshStandardMaterial({ color: 0xc8a86b, roughness: 0.35, metalness: 0.6 });

    // hull (extruded side profile)
    var s = new THREE.Shape();
    s.moveTo(-3.0, 0.18);
    s.lineTo(2.4, 0.02);
    s.quadraticCurveTo(3.5, 0.12, 3.15, 1.0);
    s.lineTo(-2.8, 1.0);
    s.lineTo(-3.0, 0.18);
    var hullGeo = new THREE.ExtrudeGeometry(s, { depth: 1.5, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.06, bevelSegments: 2 });
    hullGeo.translate(0, 0, -0.78);
    yacht.add(new THREE.Mesh(hullGeo, white));

    // bootline stripe
    var stripe = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.06, 1.56), dark);
    stripe.position.set(0.1, 0.2, 0); yacht.add(stripe);

    // main cabin + window band
    var cabin = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.55, 1.2), cabinMat);
    cabin.position.set(-0.2, 1.28, 0); yacht.add(cabin);
    var glass = new THREE.Mesh(new THREE.BoxGeometry(3.42, 0.2, 1.22), glassMat);
    glass.position.set(-0.2, 1.3, 0); yacht.add(glass);

    // flybridge + window
    var fly = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.4, 0.95), cabinMat);
    fly.position.set(-0.5, 1.72, 0); yacht.add(fly);
    var fglass = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.16, 0.97), glassMat);
    fglass.position.set(-0.5, 1.74, 0); yacht.add(fglass);

    // bow rail + mast (fine details)
    var mast = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.9, 8), new THREE.MeshStandardMaterial({ color: 0xcfd6dd }));
    mast.position.set(-0.9, 2.3, 0); yacht.add(mast);
    var flag = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.12, 0.01), brass);
    flag.position.set(-0.78, 2.6, 0); yacht.add(flag);

    scene.add(yacht);

    // ---- OPTIONAL: real glTF model (Draco), with graceful fallback to the primitive ----
    // Provide an asset by setting window.DUBAIYACHTZ_MODEL_URL or data-model-url on the canvas.
    var MODEL_URL = canvas.getAttribute('data-model-url') || window.DUBAIYACHTZ_MODEL_URL || '';
    if (MODEL_URL && typeof THREE.GLTFLoader === 'function') {
      var gltfLoader = new THREE.GLTFLoader();
      if (typeof THREE.DRACOLoader === 'function') {
        var draco = new THREE.DRACOLoader();
        draco.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        gltfLoader.setDRACOLoader(draco);
      }
      gltfLoader.load(MODEL_URL, function (gltf) {
        var m = gltf.scene;
        // normalize: center on origin and scale to ~6 units in the longest horizontal axis
        var box = new THREE.Box3().setFromObject(m);
        var size = box.getSize(new THREE.Vector3());
        var center = box.getCenter(new THREE.Vector3());
        var scale = 6 / Math.max(size.x, size.z, 0.001);
        m.scale.setScalar(scale);
        m.position.x -= center.x * scale;
        m.position.z -= center.z * scale;
        m.position.y -= box.min.y * scale; // rest hull on the water plane
        scene.remove(yacht); // swap out the stylized primitive
        scene.add(m);
      }, undefined, function () { /* load failed — keep the primitive model */ });
    }

    // ---- controls ----
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.9, 0);
    controls.enableDamping = true; controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 6; controls.maxDistance = 14;
    controls.minPolarAngle = 0.45; controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.autoRotate = !reduce; controls.autoRotateSpeed = 0.6;
    controls.update();

    function resize() {
      var w = canvas.clientWidth || canvas.parentElement.clientWidth;
      var h = canvas.clientHeight || canvas.parentElement.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1); camera.updateProjectionMatrix();
    }
    if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('load', resize);
    setTimeout(resize, 200); resize();

    function render() { controls.update(); renderer.render(scene, camera); if (!reduce) raf = requestAnimationFrame(render); }
    render();
    if (reduce) renderer.render(scene, camera);

    // pause when off-screen
    if ('IntersectionObserver' in window && !reduce) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { if (!raf) render(); }
          else { cancelAnimationFrame(raf); raf = null; }
        });
      }, { threshold: 0.01 }).observe(canvas);
    }
  }

  // lazy init when the section approaches the viewport
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es, obs) {
      es.forEach(function (e) { if (e.isIntersecting) { init(); obs.disconnect(); } });
    }, { rootMargin: '300px' }).observe(canvas);
  } else { init(); }
})();
