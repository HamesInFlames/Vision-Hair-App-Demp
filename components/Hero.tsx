"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { site } from "@/data/site";

const lines = ["Create", "Your", "Vision"];

export default function Hero() {
  let letterIndex = 0;

  return (
    <section className="relative flex min-h-dvh flex-col justify-center overflow-hidden px-5 pt-16 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          VZN — Barbershop · Toronto
        </motion.p>

        <h1 className="display-tight text-[clamp(3.25rem,13vw,8rem)]" aria-label="Create your vision">
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]" aria-hidden="true">
              {line.split("").map((ch) => {
                const i = letterIndex++;
                return (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.08 + i * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          <MagneticButton href={site.squireShopUrl} external>
            Book now
          </MagneticButton>
          <MagneticButton href="/barbers" variant="outline">
            Meet the Visionaries
          </MagneticButton>
        </motion.div>

        <motion.p
          className="mt-10 max-w-md text-sm leading-relaxed text-smoke"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.5 }}
        >
          {site.address.street}, {site.address.city} · Open 7 days a week.
          Booking handled by Squire — pick your barber, pick your time.
        </motion.p>
      </div>
    </section>
  );
}
