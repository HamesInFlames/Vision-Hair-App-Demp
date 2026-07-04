import Link from "next/link";
import { ArrowRight, ArrowUpRight, Instagram } from "lucide-react";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SectionHeading from "@/components/SectionHeading";
import BarberCard from "@/components/BarberCard";
import GalleryCarousel from "@/components/GalleryCarousel";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import HoursMap from "@/components/HoursMap";
import MagneticButton from "@/components/MagneticButton";
import JsonLd from "@/components/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { site, marqueeServices } from "@/data/site";
import { featuredBarbers } from "@/data/barbers";
import { serviceCategories } from "@/data/services";
import { reviews } from "@/data/reviews";

const galleryImages = Array.from(
  { length: 8 },
  (_, i) => `/images/gallery/work-${String(i + 1).padStart(2, "0")}.svg`
);

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["HairSalon", "LocalBusiness"],
  name: site.name,
  alternateName: site.shortName,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phones.work.tel,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  openingHoursSpecification: site.hoursSpec.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.dayOfWeek,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [site.instagram.url],
  hasMap: site.mapLink,
};

const fromPrice = (category: (typeof serviceCategories)[number]) =>
  Math.min(...category.services.map((s) => Number(s.price.replace(/\D/g, ""))));

export default function HomePage() {
  return (
    <>
      <JsonLd data={businessJsonLd} />

      <Hero />

      <Marquee items={[...marqueeServices, ...marqueeServices]} />

      {/* ── Featured Visionaries (inverted) ─────────────────────── */}
      <section data-inverted className="bg-ink py-20 text-paper md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="The roster" title="Visionaries" />
            <Reveal delay={0.1}>
              <Link
                href="/barbers"
                className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em]"
              >
                Full roster
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3">
            {featuredBarbers.map((barber, i) => (
              <StaggerItem key={barber.slug}>
                <BarberCard barber={barber} priority={i < 3} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Services preview ─────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="The menu" title="Services" className="mb-12" />
          <Stagger className="border-t border-hairline">
            {serviceCategories.map((cat, i) => (
              <StaggerItem key={cat.category}>
                <Link
                  href="/services"
                  className="group flex items-baseline justify-between gap-4 border-b border-hairline py-6 transition-colors hover:bg-ink hover:text-paper md:py-8"
                >
                  <span className="flex items-baseline gap-4 pl-1 md:gap-8">
                    <span className="text-xs tabular-nums text-smoke">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-tight text-3xl md:text-5xl">
                      {cat.category}
                    </span>
                  </span>
                  <span className="pr-1 text-sm text-smoke transition-colors group-hover:text-paper/70">
                    from ${fromPrice(cat)}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <MagneticButton href="/services" variant="outline">
              Full price list
            </MagneticButton>
          </Reveal>
        </div>
      </section>

      {/* ── Gallery strip ────────────────────────────────────────── */}
      <section className="border-t border-hairline py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="The work" title="Recent cuts" />
            <Reveal delay={0.1}>
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em]"
              >
                View gallery
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <GalleryCarousel images={galleryImages} />
          </Reveal>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────────── */}
      <section className="border-t border-hairline py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Word of mouth" title="Reviews" />
            <Reveal delay={0.1}>
              <a
                href={site.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em]"
              >
                Review us on Google
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          </div>
          <Reveal>
            <ReviewsCarousel reviews={reviews} />
          </Reveal>
        </div>
      </section>

      {/* ── Hours + map ──────────────────────────────────────────── */}
      <section className="border-t border-hairline py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Find us" title="The studio" className="mb-12" />
          <Reveal>
            <HoursMap />
          </Reveal>
        </div>
      </section>

      {/* ── Instagram CTA (inverted) ─────────────────────────────── */}
      <section data-inverted className="border-t border-hairline bg-ink py-20 text-paper md:py-28">
        <div className="mx-auto max-w-7xl px-5 text-center md:px-8">
          <Reveal>
            <p className="eyebrow mb-6 text-paper/50">Fresh cuts, daily</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="display-tight inline-block break-all text-[clamp(1.75rem,6.5vw,5.5rem)] transition-opacity hover:opacity-60"
            >
              {site.instagram.handle}
            </a>
            <div className="mt-10 flex justify-center">
              <MagneticButton href={site.instagram.url} variant="inverted" external>
                <Instagram className="h-4 w-4" /> Follow on Instagram
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
