"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);

/**
 * Product tile with hover image-swap (second image fades in over the first).
 */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-hairline">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover grayscale transition-opacity duration-300 group-hover:opacity-0"
        />
        <Image
          src={product.images[1]}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover opacity-0 grayscale transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>
      <div className="flex items-baseline justify-between pt-3">
        <div>
          <h3 className="font-display text-base font-bold leading-tight transition-opacity group-hover:opacity-70">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-smoke">
            {product.category}
          </p>
        </div>
        <p className="text-sm font-semibold">{fmt(product.price)}</p>
      </div>
    </Link>
  );
}
