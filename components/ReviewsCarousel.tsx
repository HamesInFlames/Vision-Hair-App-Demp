"use client";

import { useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import type { Review } from "@/data/reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={`h-3.5 w-3.5 ${i < rating ? "fill-current" : "opacity-25"}`}
        />
      ))}
    </div>
  );
}

/**
 * Auto-playing reviews strip. Pauses on hover, stops for good once the user
 * interacts (drag/swipe); autoplay is skipped entirely for reduced-motion
 * users.
 */
export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const reduced = useReducedMotion();
  const autoplay = useMemo(
    () =>
      Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true }),
    []
  );
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    reduced ? [] : [autoplay]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex touch-pan-y gap-4">
        {reviews.map((review, i) => (
          <figure
            key={i}
            className="flex w-[85%] shrink-0 flex-col justify-between border border-hairline p-7 sm:w-[48%] lg:w-[31.5%]"
          >
            <div>
              <Stars rating={review.rating} />
              <blockquote className="mt-4 text-[15px] leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            </div>
            <figcaption className="mt-6 text-xs uppercase tracking-[0.18em] text-smoke">
              {review.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
