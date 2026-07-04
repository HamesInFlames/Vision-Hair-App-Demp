import type { Metadata } from "next";
import BarberCard from "@/components/BarberCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { barbers } from "@/data/barbers";

export const metadata: Metadata = {
  title: "The Visionaries",
  description:
    "Meet the barbers of Vision Hair Studio — fades, scissor cuts, perms, braids and beard work. Pick your Visionary and book through Squire.",
};

export default function BarbersPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 md:mb-20">
          <p className="eyebrow mb-4">The roster</p>
          <h1 className="display-tight text-[clamp(3rem,10vw,8rem)]">
            The Visionaries
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-smoke">
            Every chair at VZN is its own practice. Find your barber, see their
            work, and book directly into their Squire calendar.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {barbers.map((barber, i) => (
            <StaggerItem key={barber.slug}>
              <BarberCard barber={barber} priority={i < 4} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
