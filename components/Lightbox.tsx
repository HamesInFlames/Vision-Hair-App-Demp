"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/**
 * Accessible lightbox: keyboard navigable (←/→), focus-trapped, ESC to
 * close, body scroll locked while open, focus restored on close.
 */
export default function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const open = index !== null;

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!open) return;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog once it exists
    requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>("[data-lightbox-close]")
        ?.focus();
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
        return;
      }
      // Focus trap
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current.contains(active))) {
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
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [open, onClose, prev, next]);

  return (
    <AnimatePresence>
      {index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image ${index + 1} of ${images.length}: ${images[index].alt}`}
          data-inverted
          className="fixed inset-0 z-[90] flex flex-col bg-ink/95 text-paper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="flex items-center justify-between p-4 md:p-6">
            <p className="eyebrow text-paper/70">
              {index + 1} / {images.length}
            </p>
            <button
              data-lightbox-close
              onClick={onClose}
              aria-label="Close lightbox"
              className="p-2 transition-opacity hover:opacity-60"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative mx-auto w-full max-w-5xl flex-1 px-14 pb-6 md:px-20">
            <div className="relative h-full w-full">
              <Image
                key={images[index].src}
                src={images[index].src}
                alt={images[index].alt}
                fill
                sizes="100vw"
                className="object-contain grayscale"
                priority
              />
            </div>

            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 border border-paper/25 p-2.5 transition-colors hover:bg-paper hover:text-ink md:left-4"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 border border-paper/25 p-2.5 transition-colors hover:bg-paper hover:text-ink md:right-4"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
