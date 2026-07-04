import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import ProductDetail from "@/components/shop/ProductDetail";
import { Reveal } from "@/components/Reveal";
import { getProduct, products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <div className="px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Link
            href="/shop"
            className="group mb-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-smoke transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            All products
          </Link>
        </Reveal>
        <Reveal>
          <ProductDetail product={product} />
        </Reveal>
      </div>
    </div>
  );
}
