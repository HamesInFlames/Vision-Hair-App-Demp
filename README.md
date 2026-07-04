# Vision Hair Studio — VZN

**Create Your Vision.** Website for Vision Hair Studio, 9390 Sheppard Avenue E, Unit 2, Toronto.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and Embla Carousel. There is no CMS, no database, and no backend — all content lives in a handful of typed data files, and all booking happens on Squire via deep links.

## Running the site

```bash
npm install     # once
npm run dev     # development server at http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

Node 18.18+ (or 20+) is required.

## Editing content — the only files you need to touch

Everything a client would want to change lives under [`/data`](data). Each file has comments at the top explaining its shape, and every piece of invented content (prices, bios, reviews, products, classes) is marked with a `PLACEHOLDER` comment — **review all of those before launch**.

| File | Controls |
| --- | --- |
| [`data/site.ts`](data/site.ts) | Name, tagline, address, phones, email, hours, Instagram, Google Maps links |
| [`data/barbers.ts`](data/barbers.ts) | The Visionaries roster. Add an entry and a profile page appears at `/barbers/<slug>` automatically; delete one and it disappears everywhere. Squire booking URLs live here. |
| [`data/services.ts`](data/services.ts) | Pricing table on `/services` and the services preview on the home page. **All prices are placeholders.** |
| [`data/products.ts`](data/products.ts) | Shop merch grid and product pages. All products are placeholders. |
| [`data/classes.ts`](data/classes.ts) | Classes/workshops cards (dates, prices, spots). Placeholders. |
| [`data/reviews.ts`](data/reviews.ts) | Testimonial cards on the home page. Placeholder quotes — replace with real Google reviews. |

## Replacing placeholder images

All images are generated grayscale SVG placeholders in [`/public/images`](public/images) (`barbers/`, `gallery/`, `products/`, `classes/`). Drop in real photos (JPG/PNG are fine) and update the matching paths in the data files. Photos are displayed with a grayscale CSS filter site-wide, so mixed-quality phone photos will still look cohesive — no editing needed.

`npm run placeholders` regenerates the placeholder art if you ever need it back.

## Booking — Squire

There is deliberately **no booking system in this codebase**. Every "Book" button deep-links to a barber's existing Squire page (URLs in `data/barbers.ts`). If a barber's Squire link changes, update it there and every CTA follows.

## Intentional stubs (seams for later)

- **Shop checkout** — the cart is client-side only; the checkout button is a stub. The seam for Stripe is commented in `components/cart/CartDrawer.tsx`.
- **Forms** (contact, class inquiries) — validate and show a success state client-side only; nothing is sent. The seam for a form service (Formspree, Resend, etc.) is commented in `components/InquiryForm.tsx`.

## Structure

- `app/` — routes: `/`, `/barbers`, `/barbers/[slug]`, `/services`, `/shop`, `/shop/[slug]`, `/classes`, `/gallery`, `/contact`, plus `sitemap.ts` and `robots.ts`
- `components/` — Nav, Hero, marquee, barber cards, carousels, lightbox, cart, forms
- `data/` — **all editable content (see above)**

SEO is handled per-page via the Metadata API, with LocalBusiness JSON-LD on the home page and Person JSON-LD on each barber profile. Before going live, set the production domain in `data/site.ts` (`url`) so sitemap/OpenGraph URLs are correct. All animations respect `prefers-reduced-motion`.
