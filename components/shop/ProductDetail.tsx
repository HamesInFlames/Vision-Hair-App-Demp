"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/cart/CartContext";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);

/**
 * Client-side product detail: image switcher, size picker, add to cart.
 */
export default function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  const [added, setAdded] = useState(false);

  const add = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-square overflow-hidden bg-hairline">
          <Image
            src={product.images[activeImage]}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover grayscale"
          />
        </div>
        <div className="mt-3 flex gap-3">
          {product.images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiveImage(i)}
              aria-label={`View image ${i + 1} of ${product.name}`}
              aria-pressed={activeImage === i}
              className={`relative aspect-square w-20 overflow-hidden bg-hairline transition-opacity ${
                activeImage === i ? "ring-2 ring-ink ring-offset-2" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover grayscale" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="eyebrow mb-4">{product.category}</p>
        <h1 className="display-tight text-[clamp(2.25rem,6vw,4rem)]">{product.name}</h1>
        <p className="mt-4 font-display text-2xl font-bold">{fmt(product.price)}</p>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed">{product.description}</p>

        <ul className="mt-6 space-y-2 text-sm text-smoke">
          {product.details.map((d) => (
            <li key={d} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-ink" />
              {d}
            </li>
          ))}
        </ul>

        {product.sizes && (
          <fieldset className="mt-8">
            <legend className="eyebrow mb-3">Size</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-12 border px-4 py-2 text-sm font-semibold transition-colors ${
                    size === s
                      ? "border-ink bg-ink text-paper"
                      : "border-hairline hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <button
          onClick={add}
          className="mt-10 inline-flex w-full items-center justify-center gap-2 bg-ink px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-ink/85 sm:w-auto"
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            "Add to cart"
          )}
        </button>

        <p className="mt-4 text-xs text-smoke">
          Online checkout is coming soon — for now, merch is available in the studio.
        </p>
      </div>
    </div>
  );
}
