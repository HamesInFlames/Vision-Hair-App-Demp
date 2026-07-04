import type { Metadata } from "next";
import MasonryGallery, { type GalleryItem } from "@/components/MasonryGallery";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Recent work from the Visionaries at Vision Hair Studio — fades, scissor cuts, perms, braids and beard work in Toronto.",
};

// Dimensions match the generated placeholder SVGs (see
// scripts/generate-placeholders.mjs). When swapping in real photos,
// update width/height to the real image dimensions.
const dims: [number, number][] = [
  [800, 1000], [800, 800], [800, 1200], [800, 900],
  [800, 1100], [800, 800], [800, 1000], [800, 1250],
  [800, 850], [800, 1050], [800, 950], [800, 1150],
];

const items: GalleryItem[] = dims.map(([width, height], i) => ({
  src: `/images/gallery/work-${String(i + 1).padStart(2, "0")}.svg`,
  alt: `VZN client work, photo ${i + 1} — placeholder`,
  width,
  height,
}));

export default function GalleryPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 md:mb-20">
          <p className="eyebrow mb-4">The work</p>
          <h1 className="display-tight text-[clamp(3rem,10vw,8rem)]">Gallery</h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-smoke">
            A running record of what leaves the chairs. Tap any photo to view
            it full size — arrow keys work too.
          </p>
        </Reveal>

        <MasonryGallery items={items} />
      </div>
    </div>
  );
}
