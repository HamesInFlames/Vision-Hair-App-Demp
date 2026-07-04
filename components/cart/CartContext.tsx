"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

/**
 * Client-side, in-memory cart. Nothing persists and nothing is charged —
 * checkout is a stub until a payments provider is connected
 * (see CartDrawer.tsx for the Stripe seam).
 */

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (slug: string, size?: string) => void;
  setQty: (slug: string, size: string | undefined, qty: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const keyOf = (slug: string, size?: string) => `${slug}__${size ?? ""}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const k = keyOf(item.slug, item.size);
      const existing = prev.find((i) => keyOf(i.slug, i.size) === k);
      if (existing) {
        return prev.map((i) =>
          keyOf(i.slug, i.size) === k ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, size?: string) => {
    setItems((prev) => prev.filter((i) => keyOf(i.slug, i.size) !== keyOf(slug, size)));
  }, []);

  const setQty = useCallback(
    (slug: string, size: string | undefined, qty: number) => {
      if (qty < 1) return removeItem(slug, size);
      setItems((prev) =>
        prev.map((i) =>
          keyOf(i.slug, i.size) === keyOf(slug, size) ? { ...i, qty } : i
        )
      );
    },
    [removeItem]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      setQty,
    }),
    [items, isOpen, addItem, removeItem, setQty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
