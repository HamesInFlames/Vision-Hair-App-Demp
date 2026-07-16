import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";

/**
 * Hours, contact details and an embedded Google Map.
 */
export default function HoursMap() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="flex flex-col justify-between gap-10">
        <div>
          <p className="eyebrow mb-5 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" /> Hours
          </p>
          <ul className="divide-y divide-hairline border-y border-hairline">
            {site.hours.map((h) => (
              <li key={h.days} className="flex items-baseline justify-between py-4">
                <span className="font-display text-lg font-bold">{h.days}</span>
                <span className="text-sm text-smoke">
                  {h.open} – {h.close}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <a
            href={site.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center gap-3 transition-opacity hover:opacity-60 active:opacity-40"
          >
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            <span>
              {site.address.street}, {site.address.city}, {site.address.region}
            </span>
          </a>
          <a
            href={`tel:${site.phones.work.tel}`}
            className="flex min-h-11 items-center gap-3 transition-opacity hover:opacity-60 active:opacity-40"
          >
            <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            {site.phones.work.label}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex min-h-11 items-center gap-3 transition-opacity hover:opacity-60 active:opacity-40"
          >
            <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            {site.email}
          </a>
        </div>
      </div>

      <div className="min-h-[320px] overflow-hidden border border-hairline">
        <iframe
          src={site.mapEmbedSrc}
          title={`Map — ${site.name}, ${site.address.street}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-full w-full grayscale"
          style={{ border: 0, minHeight: 320 }}
        />
      </div>
    </div>
  );
}
