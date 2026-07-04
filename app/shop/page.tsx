import type { Metadata } from "next";
import ProductCard from "@/components/shop/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "VZN merch and styling products — tees, hoodies, caps, pomade and texture powder from Vision Hair Studio, Toronto.",
};

export default function ShopPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-14 md:mb-20">
          <p className="eyebrow mb-4">Merch & product</p>
          <h1 className="display-tight text-[clamp(3rem,10vw,8rem)]">Shop</h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-smoke">
            Wear the vision. Studio merch and the styling products our barbers
            actually use — online checkout coming soon, everything available
            in-studio today.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3">
          {products.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </div>
  );
}
