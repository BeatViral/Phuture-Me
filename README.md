# Phuture Me™

**Sow Clever. Reap Well.**

Phuture Me is a working concept MVP for a future-aware human decision companion. A visitor can enter a difficult decision, compare two plausible paths, explore a four-stage Aging Curve and leave with a reflective question plus a small reversible experiment.

The prototype never declares a winner or presents the future as certain. Questions involving danger, harm, abuse, coercion, gangs or other serious safety concerns pause the normal experience and place protection and human support first.

## What is included

- Six fully connected prototype journeys with an honest boundary for unmatched questions
- Distinct Protection Before Exploration routes for self-harm, harm to others, unsafe homes and other danger
- Six visible connected examples plus 31 non-interactive roadmap questions grouped by life area
- Four-stage Aging Curve: Now, Soon, Later and Older You
- Responsive, keyboard-accessible interface with reduced-motion support
- No backend, accounts, database, external AI, analytics or storage of user input
- Separate production builds for OpenAI Sites and GitHub Pages

## Local development

Use Node.js 22 or newer.

```bash
npm install
npm run dev
```

The local Vite app runs at `http://localhost:5173` with hot reload.

## Validation

```bash
npm run build
npm run test:unit
npm run build:pages
```

The GitHub Pages build is written to `pages-dist/`. Its Vite base is explicitly set to `/Phuture-Me/` so scripts and styles load correctly from the repository subpath instead of producing a blank page.

## GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds and deploys the site whenever `main` is updated. A production-built copy also lives at the repository root so the app remains usable if Pages is configured to publish directly from `main` instead of from the Actions artifact.

Refresh that fallback after changing the app:

```bash
npm run sync:pages-fallback
```

## Product boundary

Concept prototype only. Phuture Me does not replace a trusted adult, qualified professional, emergency service or crisis support.

Based on the concept Messy In → Beautiful Out™ by Mahmood Matloob.
