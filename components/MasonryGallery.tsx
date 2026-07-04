"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import { Stagger, StaggerItem } from "./Reveal";

export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/**
 * CSS-columns masonry grid; each tile opens the lightbox.
 * Explicit width/height on every image prevents layout shift.
 */
export default function MasonryGallery({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Stagger className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((item, i) => (
          <StaggerItem key={item.src} className="mb-4 break-inside-avoid">
            <button
              onClick={() => setOpenIndex(i)}
              aria-label={`Open image: ${item.alt}`}
              className="group block w-full overflow-hidden bg-hairline"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={i < 3 ? "eager" : "lazy"}
                className="h-auto w-full grayscale transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            </button>
          </StaggerItem>
        ))}
      </Stagger>

      <Lightbox
        images={items}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
