# Agent Instructions

## Project

Ramz Al Rahmaniah is a bilingual React, TypeScript and Vite website for a typing and document-copying service in Sharjah, UAE.

## Source of truth

- Keep business facts aligned with the approved requirements in the project brief.
- Do not invent prices, testimonials, awards, certifications, government partnerships, approval guarantees or customer counts.
- The contact form is frontend-only and must open a prefilled WhatsApp message. It must not claim to store or email submissions.
- Preserve the supplied brand logo at `public/assets/ramzalrahmaniah.png`; do not distort or redraw it.

## Frontend conventions

- Use React functional components and strict TypeScript. Avoid `any` unless there is a documented reason.
- Keep reusable UI in `src/components`, page composition in `src/pages`, content in `src/data` or `src/locales`, and global styling in `src/styles`.
- Use React Router for navigation and preserve the existing HashRouter/GitHub Pages compatibility.
- Keep English as the default language. Arabic must update `dir="rtl"`, alignment and layout behavior, not only translated strings.
- Use the existing brand palette: warm white, olive green, muted gold and golden yellow.
- Preserve the existing font system: DM Sans for English body and UI text, Cairo for Arabic text, and Playfair Display for serif headings and display copy.
- Use semantic HTML, accessible labels, keyboard-friendly controls and meaningful image alt text.

## Performance and UX

- Keep the first render lightweight. Do not eagerly load non-critical hero carousel images.
- Prefer compressed WebP/AVIF assets where available and reserve image space to prevent layout shift.
- Respect `prefers-reduced-motion` for scroll reveals, carousels and loading effects.
- Check mobile layouts for overflow, touch target size and Arabic RTL behavior after visual changes.

## Validation

Before handing off a change, run the relevant checks:

```bash
npm run build
```

For UI changes, also inspect the app in the browser at desktop and mobile widths. Verify navigation, language switching, WhatsApp links, form validation and direct page refreshes.

For deployment changes, verify both GitHub Pages behavior and the Docker/Nginx fallback configuration.

## Local skills

Reusable project skills are stored in [`skills/`](./skills/):

- `frontend-development` for React pages, components, styling and bilingual UI.
- `performance-optimization` for loading, image and runtime performance work.
- `deployment-checklist` for build, Docker, GitHub Pages and release verification.
