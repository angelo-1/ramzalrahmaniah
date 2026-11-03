# Ramz Al Rahmaniah

Professional bilingual business website for Ramz Al Rahmaniah Typing & Document Copying, built with React, TypeScript and Vite.

## Development

```bash
npm install
npm run dev
```

The local development server is normally available at `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## Docker

Build and run the production Nginx container:

```bash
docker compose up -d --build
```

Visit `http://localhost:8080`.

## GitHub Pages demo

The site deploys automatically to GitHub Pages when changes are pushed to `main`.
In the repository settings, set **Pages > Build and deployment > Source** to **GitHub Actions**.
After the first successful workflow run, the site is available at
`https://angelo-1.github.io/ramzalrahmaniah/`.

## Notes

- The contact form is frontend-only and opens a pre-filled WhatsApp message. No form data is stored by this site.
- The business Google Maps share link is used on the contact page.
- English and Arabic content live in `src/locales/`; the selected language is retained in local storage and updates the document direction for RTL Arabic.
- Replace the placeholder production domain in `public/robots.txt` and `public/sitemap.xml` before deployment.

