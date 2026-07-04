"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, Users } from "lucide-react";
import InquiryForm from "./InquiryForm";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import { classes } from "@/data/classes";

/**
 * Class cards + reserve form. "Reserve a spot" pre-selects the class and
 * scrolls to the inquiry form below.
 */
export default function ClassesSection() {
  const [selected, setSelected] = useState<string>("");

  const reserve = (name: string) => {
    setSelected(name);
    document
      .getElementById("reserve")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Stagger className="grid gap-6 md:grid-cols-2">
        {classes.map((c, i) => (
          <StaggerItem key={c.slug}>
            <article className="flex h-full flex-col border border-hairline">
              <div className="relative aspect-[3/2] overflow-hidden bg-hairline">
                <Image
                  src={c.image}
                  alt={`${c.name} class — placeholder image`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover grayscale"
                />
                <span className="absolute left-4 top-4 bg-ink px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-paper">
                  {c.level}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="display-tight text-2xl md:text-3xl">{c.name}</h2>
                  <p className="font-display text-xl font-bold">{c.price}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-smoke">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5" /> {c.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" /> {c.spots} spots per session
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed">{c.description}</p>

                <ul className="mt-4 space-y-1.5 text-sm text-smoke">
                  {c.covers.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-ink" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => reserve(c.name)}
                  className="mt-6 w-max bg-ink px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-ink/85"
                >
                  Reserve a spot
                </button>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mx-auto mt-20 max-w-2xl">
        <div id="reserve" className="scroll-mt-28">
          <p className="eyebrow mb-4">Reserve</p>
          <h2 className="display-tight mb-3 text-3xl md:text-4xl">
            Request a spot
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-smoke">
            Send an inquiry and we&apos;ll confirm dates, availability and
            payment by email. No charge until your spot is confirmed.
          </p>
          <InquiryForm
            key={selected}
            subjectLabel="Class"
            subjects={classes.map((c) => c.name)}
            defaultSubject={selected}
            submitLabel="Request my spot"
            successMessage="Thanks — we got your request. We'll email you to confirm dates and payment."
          />
        </div>
      </Reveal>
    </>
  );
}
