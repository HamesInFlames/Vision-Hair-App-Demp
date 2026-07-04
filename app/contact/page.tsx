import type { Metadata } from "next";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Visit Vision Hair Studio at 9390 Sheppard Avenue E, Unit 2, Toronto. Hours, phone numbers, email and directions.",
};

export default function ContactPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 md:mb-20">
          <p className="eyebrow mb-4">Get in touch</p>
          <h1 className="display-tight text-[clamp(3rem,10vw,8rem)]">Contact</h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-smoke">
            For bookings, use Squire — it&apos;s the fastest way to a chair.
            For everything else: call, email, DM, or use the form below.
          </p>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-10">
              <div>
                <p className="eyebrow mb-4">Studio</p>
                <a
                  href={site.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-lg font-display font-bold transition-opacity hover:opacity-60"
                >
                  <MapPin className="mt-1.5 h-5 w-5 shrink-0" strokeWidth={1.5} />
                  <span>
                    {site.address.street}
                    <br />
                    {site.address.city}, {site.address.region}
                  </span>
                </a>
              </div>

              <div>
                <p className="eyebrow mb-4">Phone</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href={`tel:${site.phones.work.tel}`} className="flex items-center gap-3 transition-opacity hover:opacity-60">
                      <Phone className="h-4 w-4" strokeWidth={1.5} />
                      {site.phones.work.label} <span className="text-smoke">— studio</span>
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${site.phones.cell1.tel}`} className="flex items-center gap-3 transition-opacity hover:opacity-60">
                      <Phone className="h-4 w-4" strokeWidth={1.5} />
                      {site.phones.cell1.label} <span className="text-smoke">— cell</span>
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${site.phones.cell2.tel}`} className="flex items-center gap-3 transition-opacity hover:opacity-60">
                      <Phone className="h-4 w-4" strokeWidth={1.5} />
                      {site.phones.cell2.label} <span className="text-smoke">— cell</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="eyebrow mb-4">Email & social</p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-opacity hover:opacity-60">
                      <Mail className="h-4 w-4" strokeWidth={1.5} />
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 transition-opacity hover:opacity-60"
                    >
                      <Instagram className="h-4 w-4" strokeWidth={1.5} />
                      {site.instagram.handle}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="eyebrow mb-4">Hours</p>
                <ul className="divide-y divide-hairline border-y border-hairline text-sm">
                  {site.hours.map((h) => (
                    <li key={h.days} className="flex justify-between py-3">
                      <span className="font-semibold">{h.days}</span>
                      <span className="text-smoke">
                        {h.open} – {h.close}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <div className="space-y-12">
            <Reveal>
              <div className="h-[320px] overflow-hidden border border-hairline lg:h-[400px]">
                <iframe
                  src={site.mapEmbedSrc}
                  title={`Map — ${site.name}, ${site.address.street}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-full w-full grayscale"
                  style={{ border: 0 }}
                />
              </div>
            </Reveal>

            <Reveal>
              <p className="eyebrow mb-6">Send a message</p>
              <InquiryForm
                subjectLabel="What's it about?"
                subjects={[
                  "Booking question",
                  "Classes",
                  "Merch",
                  "Something else",
                ]}
                submitLabel="Send message"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
