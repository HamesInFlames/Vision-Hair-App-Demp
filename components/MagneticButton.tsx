"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

type Props = {
  href: string;
  children: React.ReactNode;
  /** "solid" = black pill, "outline" = hairline pill, "inverted" = white pill on black */
  variant?: "solid" | "outline" | "inverted";
  className?: string;
  external?: boolean;
};

const styles: Record<NonNullable<Props["variant"]>, string> = {
  solid:
    "bg-ink text-paper hover:bg-ink/85",
  outline:
    "border border-ink text-ink hover:bg-ink hover:text-paper",
  inverted:
    "bg-paper text-ink hover:bg-hairline",
};

/**
 * Primary CTA with a magnetic hover — the button subtly follows the cursor.
 * Disabled automatically for touch devices and reduced-motion users.
 */
export default function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
  external,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  // null = not yet measured; touch devices fire synthetic mouse events on
  // tap, so the magnet must be gated on real hover capability, not just
  // reduced motion.
  const canHover = useRef<boolean | null>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 18, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    if (canHover.current === null) {
      canHover.current = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;
    }
    if (!canHover.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  // active:scale gives touch users a clear press state in place of the
  // cursor-following hover effect.
  const cls = `inline-flex min-h-11 items-center gap-2 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.97] ${styles[variant]} ${className}`;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-block"
    >
      <motion.div style={{ x: sx, y: sy }} className="inline-block">
        {external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
            {children}
          </a>
        ) : (
          <Link href={href} className={cls}>
            {children}
          </Link>
        )}
      </motion.div>
    </div>
  );
}
