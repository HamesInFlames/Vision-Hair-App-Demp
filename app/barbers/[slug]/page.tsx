import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Instagram } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import MagneticButton from "@/components/MagneticButton";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { barbers, getBarber } from "@/data/barbers";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return barbers.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const barber = getBarber(slug);
  if (!barber) return {};
  return {
    title: `${barber.name} — ${barber.role}`,
    description: `${barber.bio} Book with ${barber.firstName} at Vision Hair Studio, Toronto.`,
  };
}

export default async function BarberProfilePage({ params }: Props) {
  const { slug } = await params;
  const barber = getBarber(slug);
  if (!barber) notFound();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: barber.name,
    jobTitle: barber.role,
    description: barber.bio,
    url: `${site.url}/barbers/${barber.slug}`,
    worksFor: {
      "@type": "HairSalon",
      name: site.name,
      url: site.url,
    },
    knowsAbout: barber.specialties,
    ...(barber.instagramUrl ? { sameAs: [barber.instagramUrl] } : {}),
  };

  return (
    <div className="px-5 pb-32 pt-28 md:px-8 md:pt-36 lg:pb-24">
      <JsonLd data={personJsonLd} />

      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Link
            href="/barbers"
            className="group mb-8 inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-smoke transition-colors hover:text-ink active:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            All Visionaries
          </Link>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* Portrait + sticky book CTA (desktop) */}
          <div>
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <div className="relative aspect-[4/5] overflow-hidden bg-hairline">
                  <Image
                    src={barber.portrait}
                    alt={`Portrait of ${barber.name}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover grayscale"
                  />
                </div>
                <div className="mt-6 hidden lg:block">
                  <MagneticButton href={barber.squireUrl} external className="w-full justify-center">
                    Book with {barber.firstName} <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Details */}
          <div>
            <Reveal>
              <p className="eyebrow mb-4">{barber.role}</p>
              <h1 className="display-tight text-[clamp(2.75rem,8vw,6rem)]">
                {barber.name}
              </h1>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-smoke">
                {barber.yearsExperience && (
                  <p>
                    <span className="font-display text-2xl font-bold text-ink">
                      {barber.yearsExperience}+
                    </span>{" "}
                    years behind the chair
                  </p>
                )}
                {barber.instagramUrl && barber.instagram && (
                  <a
                    href={barber.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 py-2 text-ink transition-opacity hover:opacity-60 active:opacity-40"
                  >
                    <Instagram className="h-4 w-4" strokeWidth={1.5} />
                    {barber.instagram}
                  </a>
                )}
              </div>

              {barber.specialties.length > 0 && (
                <ul className="mt-8 flex flex-wrap gap-2" aria-label="Specialties">
                  {barber.specialties.map((s) => (
                    <li
                      key={s}
                      className="border border-ink px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-8 max-w-xl text-[15px] leading-relaxed">
                {barber.bio}
              </p>

              <div className="mt-8 lg:hidden">
                <MagneticButton href={barber.squireUrl} external>
                  Book with {barber.firstName} <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </Reveal>

            {/* Work gallery */}
            <div className="mt-16">
              <Reveal>
                <p className="eyebrow mb-6">Selected work</p>
              </Reveal>
              <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {barber.gallery.map((src, i) => (
                  <StaggerItem key={src + i}>
                    <div className="relative aspect-square overflow-hidden bg-hairline">
                      <Image
                        src={src}
                        alt={`Work by ${barber.name}, photo ${i + 1} — placeholder`}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover grayscale transition-transform duration-500 hover:scale-[1.05]"
                      />
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky book bar (mobile) — bottom padding clears the iPhone home
          indicator via the safe-area inset. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-paper/95 p-3 backdrop-blur-md lg:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={barber.squireUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 w-full items-center justify-center gap-2 bg-ink px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-paper active:bg-ink/70"
        >
          Book with {barber.firstName} <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
