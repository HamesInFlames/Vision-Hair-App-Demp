# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Marketing/booking site for Vision Hair Studio (VZN), a Toronto barbershop. Next.js 15 App Router + TypeScript + Tailwind CSS v4 + Framer Motion. Fully static (SSG) — **no API routes, no database, no env vars, no backend**.

## Commands

```bash
npm run dev            # dev server on :3000
npm run build          # static production build — must pass before commit
npm run lint           # ESLint (flat config) — must pass before commit
npm run placeholders   # regenerate SVG placeholder art in /public/images
```

## Hard rules

- **Never build a booking system.** All booking goes through Squire deep links stored in `data/barbers.ts` (per barber) and `data/site.ts` (shop-wide). Every "Book" CTA must point at one of those URLs.
- **Checkout and forms are intentional stubs.** The cart's checkout button is inert (Stripe seam commented in `components/cart/CartDrawer.tsx`); forms validate client-side and send nothing (form-service seam in `components/InquiryForm.tsx`). Don't "fix" them without being asked.
- **Mark invented content.** Any price, bio, review, or copy not confirmed by the client gets a `// PLACEHOLDER` comment in the data file.
- **Palette is closed:** `--color-ink` #0a0a0a, `--color-paper` #fff, `--color-smoke` #8a8a8a, `--color-hairline` #eaeaea (tokens in `app/globals.css`). No other colors, anywhere. All photos render grayscale by design.

## Architecture

- **Content lives in `/data/*.ts`, not in components.** Adding a barber to `data/barbers.ts` generates `/barbers/<slug>` via `generateStaticParams`; same pattern for products. Edit content there, never inline in pages.
- `app/` pages are server components; interactivity (nav, carousels, lightbox, cart, forms) lives in client components under `components/`.
- Cart state: React context in `components/cart/CartContext.tsx`, in-memory only.
- SEO: per-page Metadata API; JSON-LD via `components/JsonLd.tsx` (keeps `<` escaped — preserve that).

## Conventions

- Tailwind v4 CSS-first config: tokens and custom utilities in `app/globals.css` (`@theme`, `@utility`, and a `touch:` variant = `@media (hover: none)`).
- Mobile standards this codebase already meets — keep them: 44px minimum tap targets, `env(safe-area-inset-*)` on fixed elements, 16px minimum form-input font, zero horizontal overflow at 360px, hover-only affordances must have a `touch:` fallback.
- All animation respects `prefers-reduced-motion` (global `MotionConfig` in `components/MotionProvider.tsx`; CSS marquee gated in `globals.css`).
- Images: `next/image` with explicit `sizes`; placeholder art is generated SVG (`scripts/generate-placeholders.mjs`).
- Commits: conventional style (`feat:`, `fix:`, `chore:`); author email is the GitHub noreply address (set in repo git config — don't override).
