"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Barber } from "@/data/barbers";

/**
 * Roster card. The whole card links to the barber's profile; the Book Now
 * pill (revealed on hover) is a sibling anchor layered above it, so we never
 * nest <a> inside <a>.
 */
export default function BarberCard({
  barber,
  priority = false,
}: {
  barber: Barber;
  priority?: boolean;
}) {
  return (
    <div className="group relative">
      <Link
        href={`/barbers/${barber.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${barber.name} — view profile`}
      />

      <div className="relative aspect-[4/5] overflow-hidden bg-hairline">
        <Image
          src={barber.portrait}
          alt={`Portrait of ${barber.name}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover grayscale transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {/* Specialties + book: revealed on hover; always visible on touch
            devices, where hover doesn't exist. */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/80 via-ink/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 touch:opacity-100 sm:p-5">
          {barber.specialties.length > 0 && (
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-paper/85">
              {barber.specialties.join(" · ")}
            </p>
          )}
          <a
            href={barber.squireUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-20 inline-flex min-h-11 w-max items-center gap-1.5 bg-paper px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors hover:bg-hairline active:bg-hairline"
          >
            Book now <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="flex items-baseline justify-between pt-3">
        <div>
          <h3 className="font-display text-lg font-bold leading-tight transition-opacity group-hover:opacity-70">
            {barber.name}
          </h3>
          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-smoke">
            {barber.role}
          </p>
        </div>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-smoke transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-inherit" />
      </div>
    </div>
  );
}
