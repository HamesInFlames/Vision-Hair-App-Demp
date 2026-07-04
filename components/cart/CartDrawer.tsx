"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./CartContext";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, setQty, removeItem } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  // ESC to close + body scroll lock while open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            aria-label="Close cart"
            className="fixed inset-0 z-[60] bg-ink/40 cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            tabIndex={-1}
            className="fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-md flex-col bg-paper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
              <p className="eyebrow text-ink">Your cart</p>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="p-1 hover:opacity-60 transition-opacity"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 text-smoke">
                <ShoppingBag className="h-8 w-8" strokeWidth={1.25} />
                <p className="text-sm">Your cart is empty.</p>
              </div>
            ) : (
              <ul className="flex-1 divide-y divide-hairline overflow-y-auto px-6">
                {items.map((item) => (
                  <li key={`${item.slug}-${item.size ?? ""}`} className="flex gap-4 py-5">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-hairline">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover grayscale"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-sm">{fmt(item.price * item.qty)}</p>
                      </div>
                      {item.size && (
                        <p className="mt-0.5 text-xs text-smoke">Size {item.size}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-hairline">
                          <button
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="p-1.5 hover:bg-hairline transition-colors"
                            onClick={() => setQty(item.slug, item.size, item.qty - 1)}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.qty}</span>
                          <button
                            aria-label={`Increase quantity of ${item.name}`}
                            className="p-1.5 hover:bg-hairline transition-colors"
                            onClick={() => setQty(item.slug, item.size, item.qty + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          aria-label={`Remove ${item.name} from cart`}
                          className="p-1.5 text-smoke hover:text-ink transition-colors"
                          onClick={() => removeItem(item.slug, item.size)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-hairline px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-smoke">Subtotal</span>
                <span className="font-semibold">{fmt(subtotal)}</span>
              </div>
              {/*
                ── PAYMENTS SEAM ─────────────────────────────────────────
                When the client is ready to sell online, replace this stub
                with a real checkout: create a Stripe Checkout Session in a
                route handler (app/api/checkout/route.ts), POST the cart
                items to it, and redirect to session.url. Until then the
                button is intentionally inert.
              */}
              <button
                disabled
                className="w-full cursor-not-allowed bg-ink/30 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-paper"
              >
                Checkout coming soon
              </button>
              <p className="mt-3 text-center text-xs text-smoke">
                Online checkout isn&apos;t live yet — grab merch in the studio.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
