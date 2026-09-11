# Dominox

Dominox is a small, accessible frontend demo. This repository now contains a static, keyboard- and screen-reader-friendly frontend app you can deploy to Vercel.

Features
- Accessible HTML with ARIA roles and landmarks
- Keyboard navigation (Left/Right to move, Enter/Space to flip, Delete to remove)
- High-contrast, visible focus styles
- No build step required — static files (index.html, styles.css, script.js)

How to test locally
1. Clone the repository
   git clone https://github.com/felix1-cyberdominic/Dominox.git
2. Open `index.html` in your browser (or serve it with a static server like `npx serve`):
   npx serve .

Deploying to Vercel (recommended)
1. Go to https://vercel.com and sign in (GitHub account).
2. Click "Import Project" and select this repository (felix1-cyberdominic/Dominox).
3. Vercel will detect a static project. If asked, set the root directory to the repository root.
4. Click "Deploy". After a few moments your site will be live.

Notes on accessibility
- Use the skip link (Tab once on page load) to jump to main content.
- Tiles are buttons with ARIA states and can be operated entirely by keyboard and screen reader.

If you'd like, I can also:
- Add automated tests (axe-core) and a GitHub Action to run accessibility checks on every push.
- Create a small GitHub Action to auto-trigger a Vercel deployment hook.

