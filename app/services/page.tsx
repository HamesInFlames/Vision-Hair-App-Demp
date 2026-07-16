import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { serviceCategories } from "@/data/services";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description:
    "Cuts, fades, perms, braids, beard work and kids cuts at Vision Hair Studio, Toronto. See the menu and book through Squire.",
};

export default function ServicesPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 md:mb-20">
          <p className="eyebrow mb-4">The menu</p>
          <h1 className="display-tight text-[clamp(3rem,10vw,8rem)]">Services</h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-smoke">
            Prices shown are a guide — live pricing and availability are always
            in Squire when you book. Every service includes a consult at the
            chair.
          </p>
        </Reveal>

        <div className="space-y-16 md:space-y-20">
          {serviceCategories.map((cat, ci) => (
            <section key={cat.category} aria-labelledby={`cat-${ci}`}>
              <Reveal>
                <div className="mb-6 flex items-baseline gap-4 md:gap-8">
                  <span className="text-xs tabular-nums text-smoke">
                    {String(ci + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`cat-${ci}`} className="display-tight text-3xl md:text-5xl">
                    {cat.category}
                  </h2>
                </div>
              </Reveal>

              <Stagger className="border-t border-hairline">
                {cat.services.map((s) => (
                  <StaggerItem key={s.name}>
                    <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-hairline py-5 sm:grid-cols-[1fr_auto_auto_auto] sm:gap-x-10">
                      <div>
                        <h3 className="font-display text-lg font-bold">{s.name}</h3>
                        <p className="mt-0.5 text-sm text-smoke">{s.description}</p>
                      </div>
                      <p className="hidden text-sm text-smoke sm:block">{s.duration}</p>
                      <p className="text-right font-display text-lg font-bold sm:w-16">
                        {s.price}
                      </p>
                      <a
                        href={site.squireShopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Book ${s.name} on Squire`}
                        className="col-span-2 mt-2 inline-flex min-h-11 w-max items-center gap-1.5 border border-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-ink hover:text-paper active:bg-ink active:text-paper sm:col-span-1 sm:mt-0"
                      >
                        Book <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          ))}
        </div>

        <Reveal className="mt-16 border border-hairline p-8 text-center md:p-12">
          <p className="eyebrow mb-4">Not sure what you need?</p>
          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-smoke">
            Book any slot and talk it through with your barber at the chair —
            or browse the Visionaries to find the right specialist first.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton href={site.squireShopUrl} external>
              Book on Squire
            </MagneticButton>
            <MagneticButton href="/barbers" variant="outline">
              Meet the Visionaries
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
