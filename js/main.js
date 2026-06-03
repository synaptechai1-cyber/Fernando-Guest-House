/* Fernando's Guest House — main.js */

// Mark doc as JS-ready so CSS reveal animations activate safely
document.documentElement.classList.add('js-ready');

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

// ── Scroll reveal (progressive enhancement) ─
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

// Add reveal class & observe — content is visible by default (CSS fallback),
// only hidden if .js-ready is set (which we do above)
document.querySelectorAll(
  '#about .about-text, #about .about-images, ' +
  '.room-card, .amenity-card, .review-card, ' +
  '.grill-content, ' +
  '.location-text, .location-map, ' +
  '.contact-text, .contact-form-wrap'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.07}s`;
  revealObserver.observe(el);
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

// ── Contact form ──────────────────────────
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const action = form.getAttribute('action') || '';

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  if (!action || action.includes('YOUR_FORM_ID')) {
    // Demo mode — no real endpoint yet
    setTimeout(() => {
      submitBtn.textContent = 'Send Enquiry';
      submitBtn.disabled = false;
      successMsg.style.display = 'block';
      form.reset();
      setTimeout(() => successMsg.style.display = 'none', 6000);
    }, 900);
    return;
  }

  try {
    const res = await fetch(action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      successMsg.style.display = 'block';
      form.reset();
      setTimeout(() => successMsg.style.display = 'none', 8000);
    } else {
      throw new Error();
    }
  } catch {
    alert('Something went wrong. Please call us directly on (041) 373 2823.');
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
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(10,28,20,.96);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:1.5rem;animation:fadeIn .2s ease;';
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.cssText = 'max-width:92vw;max-height:92vh;object-fit:contain;border-radius:2px;box-shadow:0 25px 80px rgba(0,0,0,.7);';
    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
    });
  });
});

// ── Set min dates on check-in/out ─────────
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
if (checkin && checkout) {
  const today = new Date().toISOString().split('T')[0];
  checkin.min = today;
  checkout.min = today;
  checkin.addEventListener('change', () => { checkout.min = checkin.value; });
}
