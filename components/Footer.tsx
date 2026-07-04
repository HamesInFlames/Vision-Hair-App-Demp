import Link from "next/link";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import EyeMark from "./EyeMark";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer data-inverted className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-16 flex items-center gap-4">
          <EyeMark className="h-8 w-12" />
          <p className="display-tight text-[clamp(2.5rem,8vw,6rem)]">
            Create your vision
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <p className="eyebrow mb-5 text-paper/50">Studio</p>
            <address className="not-italic text-sm leading-relaxed text-paper/80">
              <a
                href={site.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-paper"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region}
                </span>
              </a>
            </address>
          </div>

          <div>
            <p className="eyebrow mb-5 text-paper/50">Hours</p>
            <ul className="space-y-2 text-sm text-paper/80">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span>
                    {h.open} – {h.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-paper/50">Contact</p>
            <ul className="space-y-2 text-sm text-paper/80">
              <li>
                <a href={`tel:${site.phones.work.tel}`} className="flex items-center gap-2 transition-colors hover:text-paper">
                  <Phone className="h-4 w-4" strokeWidth={1.5} />
                  {site.phones.work.label}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-paper">
                  <Mail className="h-4 w-4" strokeWidth={1.5} />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-paper"
                >
                  <Instagram className="h-4 w-4" strokeWidth={1.5} />
                  {site.instagram.handle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5 text-paper/50">Menu</p>
            <ul className="space-y-2 text-sm text-paper/80">
              {[
                ["Visionaries", "/barbers"],
                ["Services", "/services"],
                ["Shop", "/shop"],
                ["Classes", "/classes"],
                ["Gallery", "/gallery"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-paper">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/15 pt-8 text-xs text-paper/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            Booking powered by{" "}
            <a
              href={site.squireShopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-paper"
            >
              Squire
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
