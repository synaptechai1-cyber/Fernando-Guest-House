/* Fernando's Guest House — main.js */

// ── Sticky nav on scroll ──────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Mobile hamburger ──────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
// Close on link click
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Scroll reveal ─────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── Add reveal class to sections ─────────
document.querySelectorAll(
  '#about .about-text, #about .about-images, ' +
  '.room-card, .amenity-card, ' +
  '.grill-content, ' +
  '.location-text, .location-map, ' +
  '.contact-text, .contact-form-wrap'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 3) * 0.1}s`;
});

// Trigger reveal check after adding classes
setTimeout(() => reveals.forEach(el => observer.observe(el)), 50);

// ── Contact form ──────────────────────────
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // Simulate send (replace with real form service e.g. Formspree)
  setTimeout(() => {
    btn.textContent = '✓ Enquiry Sent!';
    btn.style.background = '#2a4a3a';
    this.reset();
    setTimeout(() => {
      btn.textContent = 'Send Enquiry';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }, 1200);
});

// ── Smooth active nav highlight ───────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}`
      ? 'var(--gold)'
      : '';
  });
});

// ── Gallery lightbox (simple) ─────────────
const galItems = document.querySelectorAll('.gal-item img');
galItems.forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position:fixed;inset:0;background:rgba(10,28,20,.95);
      z-index:9999;display:flex;align-items:center;justify-content:center;
      cursor:zoom-out;padding:2rem;
    `;
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.cssText = `
      max-width:90vw;max-height:90vh;object-fit:contain;
      border-radius:2px;box-shadow:0 20px 80px rgba(0,0,0,.6);
    `;
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
    });
  });
});
