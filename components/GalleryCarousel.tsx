"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

/**
 * Free-drag Embla carousel with a scroll progress bar.
 */
export default function GalleryCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(Math.min(1, Math.max(0, emblaApi.scrollProgress())));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Sync the bar to the carousel's current position on mount/remount
    // without a synchronous setState inside the effect body.
    const raf = requestAnimationFrame(onScroll);
    emblaApi.on("scroll", onScroll).on("reInit", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);

  return (
    <div>
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y gap-4">
          {images.map((src, i) => (
            <div
              key={src + i}
              className="relative aspect-[4/5] w-[70%] shrink-0 overflow-hidden bg-hairline sm:w-[45%] lg:w-[30%]"
            >
              <Image
                src={src}
                alt={`VZN client work, photo ${i + 1} — placeholder`}
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 30vw"
                className="object-cover grayscale"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-6 h-px w-full bg-hairline"
        role="progressbar"
        aria-label="Gallery scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div
          className="h-[2px] -translate-y-px bg-ink transition-[width] duration-150"
          style={{ width: `${Math.max(5, progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
