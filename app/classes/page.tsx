import type { Metadata } from "next";
import ClassesSection from "@/components/ClassesSection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Barbering Classes",
  description:
    "Learn to cut at Vision Hair Studio — hands-on barbering classes and workshops in Toronto, from fades to scissor work fundamentals.",
};

export default function ClassesPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 md:mb-20">
          <p className="eyebrow mb-4">Learn the craft</p>
          <h1 className="display-tight text-[clamp(3rem,10vw,8rem)]">Classes</h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-smoke">
            Small-group workshops taught by the Visionaries, in the studio,
            on real tools. Dates drop on Instagram first — reserve below and
            we&apos;ll confirm by email.
          </p>
        </Reveal>

        <ClassesSection />
      </div>
    </div>
  );
}
