/* Fernando's Guest House — main.js */

// ── Sticky nav ────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile hamburger ──────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Scroll reveal ─────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '#about .about-text, #about .about-images, ' +
  '.room-card, .amenity-card, .review-card, ' +
  '.grill-content, ' +
  '.location-text, .location-map, ' +
  '.contact-text, .contact-form-wrap'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
  observer.observe(el);
});

// ── Active nav highlight ──────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
  });
}, { passive: true });

// ── Contact form (Formspree) ──────────────
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  // If the action still has placeholder, simulate submit
  const action = form.getAttribute('action');
  if (action.includes('YOUR_FORM_ID')) {
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.textContent = 'Send Enquiry';
      submitBtn.disabled = false;
      successMsg.style.display = 'block';
      form.reset();
      setTimeout(() => successMsg.style.display = 'none', 6000);
    }, 1200);
    return;
  }

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  try {
    const res = await fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      successMsg.style.display = 'block';
      form.reset();
      setTimeout(() => successMsg.style.display = 'none', 8000);
    } else {
      throw new Error('Server error');
    }
  } catch {
    alert('Something went wrong. Please call us on (041) 373 2823 or try again.');
  } finally {
    submitBtn.textContent = 'Send Enquiry';
    submitBtn.disabled = false;
  }
});

// ── Gallery lightbox ──────────────────────
document.querySelectorAll('.gal-item img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(10,28,20,.95);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:2rem;';
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:2px;box-shadow:0 20px 80px rgba(0,0,0,.6);';
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
    });
  });
});

// ── Set minimum date on date inputs ──────
const today = new Date().toISOString().split('T')[0];
document.getElementById('checkin').min = today;
document.getElementById('checkout').min = today;
document.getElementById('checkin').addEventListener('change', function() {
  document.getElementById('checkout').min = this.value;
});
