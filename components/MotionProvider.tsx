"use client";

import { MotionConfig } from "framer-motion";

/**
 * Gates every framer-motion animation behind the user's OS-level
 * prefers-reduced-motion setting.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
