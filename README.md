# News CMS Project

A clean, editorial-style MERN (MongoDB, Express, Node, EJS) news CMS focused on readable layout, strong typography, and an approachable admin interface.

---

## Screenshots

Replace the placeholders in `/screenshots/` with the images you provided. They will appear here automatically.

![Latest Stories screenshot](screenshots/screenshot-1.svg)

![Homepage with sidebar and cards](screenshots/screenshot-2.svg)

![Admin dashboard and menubar](screenshots/screenshot-admin.svg)

---

## Quick Summary

- Node + Express server with EJS templates
- MongoDB models for news, categories, users, comments
- Admin panel for managing articles, categories, users, and settings
- Responsive editorial frontend with custom design tokens (warm terracotta-to-peach gradient)

## Design System (short)

- Accent: `#E8491D`
- Accent Hover: `#c73c15`
- Ink: `#1a1a2e`
- Ground: `#f7f7fa`
- Gradient: `linear-gradient(135deg, #E8491D 0%, #f4845f 50%, #f6b093 100%)`
- Fonts: `Playfair Display` (headlines), `Inter` (UI & body)

## Key Files

- `app.js` — application entry
- `routes/frontend.js`, `routes/admin.js` — route definitions
- `views/layout.ejs`, `views/index.ejs`, `views/single.ejs` — main templates
- `public/css/style.css` — core styles (frontend + admin preserved)
- `models/` — Mongoose models

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with your MongoDB URI and other env vars (example):

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/news-cms
SESSION_SECRET=your_secret_here
```

3. Start the server:

```bash
node app.js
```

Open `http://localhost:3000` in your browser.

## Admin Access

- Admin routes are served under `/admin`.
- Admin CSS was preserved while theming the admin menubar to match the frontend palette.

## How to embed your screenshots (if you want me to add them)

1. Upload the images you attached in chat into `/screenshots/` with these filenames:
   - `screenshot-1.png` (homepage editorial view)
   - `screenshot-2.png` (homepage full layout)
   - `screenshot-admin.png` (admin dashboard)
2. Refresh the README view on GitHub/VS Code — images will show automatically.

If you prefer, attach the images again here and I can place them into `/screenshots/` for you.

## Contributing

- Create branches per feature: `feature/your-feature`
- Open PRs against `main` and describe the purpose and test steps

## License

MIT

---

Thanks — if you'd like I can commit the attachments into `/screenshots/` for you now; just confirm and re-attach the images or grant upload permission.
