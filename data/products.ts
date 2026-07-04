/**
 * Shop products.
 *
 * ALL PRODUCTS AND PRICES ARE PLACEHOLDERS — confirm the real merch line-up,
 * prices, sizes and photography with the client. The cart is client-side only;
 * checkout is stubbed until a payments provider (e.g. Stripe) is connected.
 */

export type Product = {
  slug: string;
  name: string;
  category: "Apparel" | "Product";
  price: number; // CAD — PLACEHOLDER, confirm with client
  description: string;
  details: string[];
  images: [string, string]; // [default, hover-swap]
  sizes?: string[];
};

export const products: Product[] = [
  {
    // PLACEHOLDER product — confirm with client
    slug: "vzn-classic-tee",
    name: "VZN Classic Tee",
    category: "Apparel",
    price: 35,
    description:
      "Heavyweight cotton tee with the VZN eye mark printed front and center. Boxy fit, pre-shrunk.",
    details: ["100% heavyweight cotton", "Screen-printed eye mark", "Unisex boxy fit"],
    images: ["/images/products/vzn-classic-tee-1.svg", "/images/products/vzn-classic-tee-2.svg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    // PLACEHOLDER product — confirm with client
    slug: "vzn-hoodie",
    name: "VZN Hoodie",
    category: "Apparel",
    price: 75,
    description:
      "Midweight fleece hoodie. 'Create Your Vision' embroidered across the back, eye mark at the chest.",
    details: ["400gsm brushed fleece", "Embroidered front and back", "Unisex fit"],
    images: ["/images/products/vzn-hoodie-1.svg", "/images/products/vzn-hoodie-2.svg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    // PLACEHOLDER product — confirm with client
    slug: "vzn-cap",
    name: "VZN Cap",
    category: "Apparel",
    price: 40,
    description:
      "Structured 6-panel cap with a low-key embroidered VZN mark. One size, adjustable strap.",
    details: ["6-panel structured crown", "Adjustable metal-clasp strap", "Embroidered mark"],
    images: ["/images/products/vzn-cap-1.svg", "/images/products/vzn-cap-2.svg"],
  },
  {
    // PLACEHOLDER product — confirm with client
    slug: "vzn-pomade",
    name: "VZN Pomade",
    category: "Product",
    price: 28,
    description:
      "Medium-hold, matte-finish pomade. The same one your barber reaches for at the end of your cut.",
    details: ["Medium hold, matte finish", "Water-based — washes out clean", "4 oz / 113 g"],
    images: ["/images/products/vzn-pomade-1.svg", "/images/products/vzn-pomade-2.svg"],
  },
  {
    // PLACEHOLDER product — confirm with client
    slug: "vzn-texture-powder",
    name: "VZN Texture Powder",
    category: "Product",
    price: 24,
    description:
      "Instant volume and grip with zero shine. Shake, work through dry hair, done.",
    details: ["Invisible matte finish", "Lightweight, no residue", "20 g"],
    images: ["/images/products/vzn-texture-powder-1.svg", "/images/products/vzn-texture-powder-2.svg"],
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
