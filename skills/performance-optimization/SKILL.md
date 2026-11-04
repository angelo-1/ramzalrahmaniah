---
name: performance-optimization
description: Diagnose and improve loading speed, image delivery, rendering cost and interaction performance in this Vite website.
---

# Performance Optimization

Use this skill when the website has slow initial loading, delayed hero imagery, layout shifts or excessive animation cost.

## Priorities

1. Protect the first render and above-the-fold content.
2. Measure before changing loading behavior.
3. Defer non-critical images and effects without making the page feel unfinished.
4. Keep visual quality acceptable on mobile networks.

## Project guidance

- Inspect image dimensions and file sizes before replacing code.
- Do not eagerly load every hero carousel image. Keep one appropriate first image available immediately and load alternates after the initial render or on demand.
- Prefer responsive, compressed formats and explicit width/height or aspect-ratio.
- Avoid loading large decorative assets through CSS if JavaScript can safely defer them.
- Preserve image placeholders and transitions to prevent flashes and cumulative layout shift.
- Keep animations transform/opacity based where possible and pause or simplify them under `prefers-reduced-motion`.
- Avoid adding a dependency for a small performance improvement.

## Verification

- Run `npm run build`.
- Inspect the browser Network panel for the largest assets and request timing.
- Check a cold load and a cached load.
- Test mobile width, slow-network behavior and reduced-motion behavior.
- Confirm that deferred images do not create broken backgrounds or console errors.
