---
name: deployment-checklist
description: Prepare and verify production builds, Docker/Nginx hosting, GitHub Pages deployment and release documentation for this project.
---

# Deployment Checklist

Use this skill for build, release, Docker, GitHub Pages or deployment-readiness work.

## Required checks

- Confirm `npm run build` succeeds with no TypeScript or bundler errors.
- Confirm the generated `dist` output contains the application assets and the supplied logo.
- Confirm SPA fallback behavior for direct navigation to application routes.
- Confirm Docker uses a multi-stage Node build and Nginx production server.
- Confirm the published port and local Docker URL match the README.
- Confirm GitHub Pages configuration uses the repository's intended base path and workflow.
- Check `robots.txt` and `sitemap.xml` for placeholder domains before production release.

## Safety and scope

- Do not add secrets, private keys, tokens or credentials to the repository.
- Do not claim a deployment succeeded until the build or deployment result is observable.
- Do not change hosting providers or repository remotes without explicit user direction.
- Keep the site frontend-only; deployment work must not introduce a backend or database.

## Handoff

Document the commands used, the expected URL, any remaining manual configuration and any checks that could not run because of environment access.
