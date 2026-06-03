# Fernando's Guest House & Grill — Website

**Live site:** *(add your Netlify URL here after deploy)*  
**Tel:** (041) 373 2823  
**Address:** 102 Cape Road, Mill Park, Port Elizabeth, 6001

---

## Project Structure

```
fernandos/
├── index.html          ← Main page (all sections)
├── netlify.toml        ← Netlify config (redirects + cache headers)
├── css/
│   └── style.css       ← All styles
├── js/
│   └── main.js         ← Nav, scroll reveal, gallery lightbox, form
└── images/
    └── f1.jpg – f20.jpg  ← Property photos
```

---

## Deploy to Netlify via GitHub

### Step 1 — Push to GitHub
```bash
cd fernandos
git init
git add .
git commit -m "Initial commit — Fernando's Guest House website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fernandos-guesthouse.git
git push -u origin main
```

### Step 2 — Connect to Netlify
1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**
2. Choose GitHub → select `fernandos-guesthouse`
3. Build settings:
   - **Build command:** *(leave blank)*
   - **Publish directory:** `.` *(or leave blank — it's a static site)*
4. Click **Deploy site**

Your site goes live in ~30 seconds. 🎉

### Step 3 — Custom Domain (optional)
In Netlify → Site settings → Domain management → Add custom domain.

---

## Contact Form Setup (Formspree)

The form currently shows a simulated success state. To make it send real emails:

1. Go to [formspree.io](https://formspree.io) → create a free account
2. Create a new form → copy your form endpoint (looks like `https://formspree.io/f/xyzabc`)
3. In `js/main.js`, replace the `setTimeout` simulation block with:

```js
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: new FormData(this),
    headers: { 'Accept': 'application/json' }
  });

  if (res.ok) {
    btn.textContent = '✓ Sent! We\'ll be in touch.';
    btn.style.background = '#2a4a3a';
    this.reset();
  } else {
    btn.textContent = 'Error — try calling us';
    btn.style.background = '#c0392b';
  }
  setTimeout(() => {
    btn.textContent = 'Send Enquiry';
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);
});
```

---

## To Make Updates

Edit `index.html` for content, `css/style.css` for styles.  
After any change: `git add . && git commit -m "Update" && git push`  
Netlify auto-deploys within ~20 seconds.
