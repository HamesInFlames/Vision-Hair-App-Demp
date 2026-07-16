# Vision Hair Studio — VZN

**Create Your Vision.** A monochrome, editorial-style website for Vision Hair Studio, a barbershop at 9390 Sheppard Avenue E, Toronto — built as client work and shared here for portfolio review.

<!-- SCREENSHOT SLOT: drop a capture at docs/screenshot.png and uncomment -->
<!-- ![Vision Hair Studio — home page](docs/screenshot.png) -->

> **Live site:** coming soon — the client is finalizing content (real photos, confirmed pricing) before launch.

## What this is

A complete, production-ready site for a 13-barber shop: every barber gets a generated profile page with their own booking deep link, and every piece of content a non-developer would ever change lives in a handful of typed data files. No CMS, no database, no backend to maintain — deliberate choices for a small business that books through [Squire](https://getsquire.com) and doesn't want another system to run.

**Design:** white-dominant black-and-white, fashion-editorial rather than corporate template — oversized display type (Space Grotesk), grayscale imagery (a CSS filter keeps mixed-quality phone photos cohesive), inverted black sections for rhythm, and a subtle "eye" motif from the VZN brand.

## Tech stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), fully static output (SSG) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (design tokens via `@theme`, custom `touch:` variant) |
| Animation | Framer Motion — letter-stagger hero, scroll reveals, page transitions, all gated behind `prefers-reduced-motion` |
| Carousels | Embla — free-drag gallery with progress bar, auto-playing reviews strip |
| Icons / fonts | Lucide, `next/font` (Inter + Space Grotesk, zero layout shift) |

## Features worth a look

- **Data-driven roster** — add an entry to [`data/barbers.ts`](data/barbers.ts) and a profile page appears at `/barbers/<slug>` with portrait, specialties, bio, Instagram, personal work gallery, and a sticky "Book with [name]" bar deep-linking to their Squire calendar ([app/barbers/[slug]/page.tsx](app/barbers/[slug]/page.tsx))
- **Accessible lightbox built from scratch** — keyboard navigable, focus-trapped, ESC/tap-outside to close, body scroll locked, focus restored, swipe navigation on touch ([components/Lightbox.tsx](components/Lightbox.tsx))
- **Mobile-first touch pass** — audited at 360/375/390/430px: zero horizontal overflow, 44px minimum tap targets, safe-area insets on every fixed element, 16px inputs (no iOS zoom), hover-reveals made touch-visible via a custom `hover: none` Tailwind variant
- **Client-side cart** (React context) with a deliberately stubbed checkout and a commented seam where Stripe would connect — same pattern for the inquiry forms
- **SEO** — per-page Metadata API, LocalBusiness JSON-LD (with `<`-escaped output), Person JSON-LD per barber, sitemap and robots
- **Honest placeholders** — every invented price, bio, review, and product is marked `PLACEHOLDER` in the data files so nothing fabricated can ship as fact

## Run it locally

```bash
npm install
npm run dev     # http://localhost:3000
```

`npm run build` (static production build) and `npm run lint` both pass clean. Node 18.18+ required. There are no environment variables — it runs out of the box.

## Project structure

```
app/          routes: /, /barbers, /barbers/[slug], /services, /shop,
              /shop/[slug], /classes, /gallery, /contact, sitemap, robots
components/   nav, hero, marquee, barber cards, carousels, lightbox, cart, forms
data/         ALL editable content — barbers, services, products, classes,
              reviews, site info (address/hours/phones/links)
public/       generated grayscale SVG placeholder art (npm run placeholders)
```

### Editing content (for the client)

Everything lives under [`/data`](data) — each file documents its own shape:

| File | Controls |
|---|---|
| [`data/site.ts`](data/site.ts) | Name, address, phones, email, hours, Instagram, map links |
| [`data/barbers.ts`](data/barbers.ts) | The roster + Squire booking URLs — one entry per barber |
| [`data/services.ts`](data/services.ts) | The pricing menu (all prices placeholder until confirmed) |
| [`data/products.ts`](data/products.ts) / [`data/classes.ts`](data/classes.ts) / [`data/reviews.ts`](data/reviews.ts) | Shop, classes, testimonials |

Booking is **Squire deep links only** — there is intentionally no booking system in this codebase.

## Rights

© Vision Hair Studio. All rights reserved — this is client work shared for portfolio review only; see [LICENSE](LICENSE). The Vision Hair Studio name, brand, and business information belong to the client. Not open source.
