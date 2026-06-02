# Fernando's Guest House — Website

A static HTML/CSS/JS website ready to deploy on Netlify, Vercel, GitHub Pages, or any static host.

## Deploy to Netlify (3 ways)

### Option 1: Drag & drop (easiest)
1. Zip the `fernando-netlify/` folder.
2. Go to https://app.netlify.com/drop
3. Drag the unzipped folder (or the zip) into the drop zone
4. Done. Netlify gives you a URL in ~30 seconds.

### Option 2: Connect a Git repo
1. Push the `fernando-netlify/` folder to GitHub/GitLab
2. In Netlify → "Add new site" → "Import from Git"
3. Build command: *(leave empty)*
4. Publish directory: `public`

### Option 3: Netlify CLI
```
npm install -g netlify-cli
cd fernando-netlify
netlify deploy --dir=public --prod
```

## To connect a custom domain
1. In Netlify → Domain settings → Add custom domain (e.g. fernandosguesthouse.co.za)
2. Update your domain's DNS to point to Netlify (Netlify provides the exact records)
3. HTTPS is automatic and free.

## File structure
```
fernando-netlify/
├── public/                        ← everything that gets deployed
│   ├── index.html                 ← the website
│   └── images/fernando/*.jpg      ← 29 optimised photos
├── netlify.toml                   ← optional config
└── README.md
```

## Contact details embedded in the site
- Address: 102 Cape Road, Mill Park, Port Elizabeth
- Landline: 041 373 2145
- Mobile: 081 536 3067
- Email: fernando@mweb.co.za

To change anything, open `public/index.html` in any text editor and update the relevant lines. The file is heavily commented.
