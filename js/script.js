const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const hamburger = document.querySelector(".hamburgerMenuImg");
const closeBtn = document.getElementById("closeSidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  hamburger.classList.add("hide");
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  hamburger.classList.remove("hide");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  hamburger.classList.remove("hide");
});

document.addEventListener("DOMContentLoaded", () => {
  // === MOVEMENT SETTINGS ===
  const FLOAT_STRENGTH = 10; // idle float for all
  const PARALLAX_STRENGTH = 50; // strong for other elements
  const MAIN_FLOAT_STRENGTH = 5; // softer float for main background
  const MAIN_PARALLAX_STRENGTH = 40; // subtle parallax for main background
  const SMOOTHNESS = 0.07;
  // ==========================

  const photos = document.querySelectorAll(
    ".slider_mainBackground, .slider_photoOne, .slider_photoTwo, .slider_photoThree, .slider_photoFour, .slider_photoFive, .slider_photoSix, .slider_photoSeven, .slider_photoEight, .slider_photoSmokeOne, .slider_photoSmokeTwo, .slider_photoSmokeThree, .slider_photoSmokeFour, .slider_photoSmokeFive"
  );

  // Assign random float pattern and depth
  const photoData = Array.from(photos).map((el) => {
    const depth = parseFloat(el.dataset.depth) || 0.5 + Math.random() * 0.5;
    return {
      el,
      depth,
      seedX: Math.random() * 1000,
      seedY: Math.random() * 1000,
      isMain: el.classList.contains("slider_mainBackground"),
    };
  });

  let mouseX = 0,
    mouseY = 0;
  let targetX = 0,
    targetY = 0;
  let tiltX = 0,
    tiltY = 0;
  let lastTime = performance.now();

  // === Mouse movement (desktop) ===
  document.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    targetX = (e.clientX - cx) / cx;
    targetY = (e.clientY - cy) / cy;
  });

  // === Device tilt (mobile/tablet) ===
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (event) => {
      if (event.gamma != null && event.beta != null) {
        tiltX = event.gamma / 30;
        tiltY = event.beta / 30;
      }
    });
  }

  function animate(now) {
    const delta = (now - lastTime) / 1000;
    lastTime = now;

    const effectiveX = (targetX + tiltX) / 2;
    const effectiveY = (targetY + tiltY) / 2;

    mouseX += (effectiveX - mouseX) * SMOOTHNESS;
    mouseY += (effectiveY - mouseY) * SMOOTHNESS;

    photoData.forEach((p) => {
      const t = now * 0.001 + p.seedX;

      // Determine strengths per element
      const floatStrength = p.isMain ? MAIN_FLOAT_STRENGTH : FLOAT_STRENGTH;
      const parallaxStrength = p.isMain
        ? MAIN_PARALLAX_STRENGTH
        : PARALLAX_STRENGTH;

      // Idle floating
      const floatX = Math.sin(t + p.seedX) * floatStrength * p.depth;
      const floatY = Math.cos(t + p.seedY) * floatStrength * p.depth;

      // Parallax
      const parallaxX = mouseX * parallaxStrength * p.depth;
      const parallaxY = mouseY * parallaxStrength * p.depth;

      const finalX = floatX + parallaxX;
      const finalY = floatY + parallaxY;

      p.el.style.transform = `translate3d(${finalX}px, ${finalY}px, 0)`;
    });

    requestAnimationFrame(animate);
  }

  document.addEventListener("visibilitychange", () => {
    lastTime = performance.now();
  });

  requestAnimationFrame(animate);
});
