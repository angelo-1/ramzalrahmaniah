---
name: frontend-development
description: Build or revise this project's React/TypeScript pages, components, styling, bilingual content and responsive interactions.
---

# Frontend Development

Use this skill for UI changes in the Ramz Al Rahmaniah website.

## Project-specific guidance

- Follow the repository instructions in `AGENTS.md`.
- Reuse existing components and translation helpers before introducing new abstractions.
- Keep content separate from presentation where practical. Add English and Arabic strings together when adding visible copy.
- Preserve the existing `HashRouter` setup so GitHub Pages refreshes continue to work.
- For Arabic, test both translated content and the visual RTL layout: navigation order, icon placement, spacing, forms and directional arrows.
- Keep service and contact claims limited to approved business information.

## UI quality bar

- Use semantic elements and accessible labels.
- Keep interactive elements keyboard accessible with visible focus states.
- Use the established brand colors and visual language rather than adding unrelated palettes.
- Make responsive behavior intentional at mobile, tablet and desktop widths.
- Reuse the supplied logo asset and preserve its proportions.
- Add motion only when it improves hierarchy or feedback, and include a reduced-motion fallback.

## Verification

After changes, run `npm run build` and inspect the affected route in the browser. Check the browser console, language switcher, navigation links and mobile layout.
