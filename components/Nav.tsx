"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import EyeMark from "./EyeMark";
import { useCart } from "./cart/CartContext";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/barbers", label: "Visionaries" },
  { href: "/services", label: "Services" },
  { href: "/shop", label: "Shop" },
  { href: "/classes", label: "Classes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the overlay on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Scroll lock + focus trap while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key === "Tab" && headerRef.current) {
        const focusables = Array.from(
          headerRef.current.querySelectorAll<HTMLElement>('a[href], button')
        ).filter((el) => el.offsetParent !== null);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !headerRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-hairline bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8"
      >
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 py-2 font-display text-lg font-bold tracking-tight"
          aria-label="Vision Hair Studio — home"
        >
          <EyeMark className="h-5 w-8" />
          <span>VZN</span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-[11px] font-medium uppercase tracking-[0.22em] transition-opacity hover:opacity-60 ${
                pathname.startsWith(l.href) ? "opacity-100" : "opacity-80"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openCart}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative p-3 transition-opacity hover:opacity-60 active:opacity-40"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold text-paper">
                {count}
              </span>
            )}
          </button>

          <a
            href={site.squireShopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden bg-ink px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-paper transition-colors hover:bg-ink/85 lg:inline-block"
          >
            Book now
          </a>

          {/* Animated hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={`relative z-[90] flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden ${
              menuOpen ? "text-paper" : "text-ink"
            }`}
          >
            <span
              className={`h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen black overlay menu (mobile) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            data-inverted
            className="fixed inset-0 z-[80] flex h-dvh flex-col bg-ink px-6 text-paper lg:hidden pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-[calc(6rem+env(safe-area-inset-top))]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.ul
              className="flex flex-1 flex-col justify-center gap-1"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {links.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                  }}
                >
                  <Link
                    href={l.href}
                    className="display-tight block py-2 text-5xl text-paper transition-opacity hover:opacity-60 active:opacity-40"
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <div className="flex items-end justify-between">
              <a
                href={site.squireShopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center bg-paper px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink active:bg-hairline"
              >
                Book now
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex min-h-11 items-center text-paper/70 hover:text-paper active:text-paper transition-colors"
              >
                {site.instagram.handle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
