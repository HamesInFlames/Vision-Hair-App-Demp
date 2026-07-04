/**
 * Barbering classes & workshops.
 *
 * ALL CLASSES, DATES, PRICES AND SPOT COUNTS ARE PLACEHOLDERS — confirm the
 * real programme with the client. The reserve form is client-side only; see
 * components/InquiryForm.tsx for the seam where a form service connects.
 */

export type BarberClass = {
  slug: string;
  name: string;
  level: string;
  date: string; // PLACEHOLDER — confirm with client
  price: string; // PLACEHOLDER — confirm with client
  spots: number; // PLACEHOLDER — confirm with client
  description: string;
  covers: string[];
  image: string;
};

export const classes: BarberClass[] = [
  {
    // PLACEHOLDER class — confirm with client
    slug: "intro-to-fades",
    name: "Intro to Fades",
    level: "Beginner",
    date: "Sunday evenings — dates announced on Instagram",
    price: "$150",
    spots: 8,
    description:
      "A hands-on introduction to fading: guard progression, guideline setting, blending and finishing. Bring your clippers; mannequin heads provided.",
    covers: ["Guard progression & guidelines", "Blending without lines", "Neckline & edge finishing", "Clipper maintenance basics"],
    image: "/images/classes/intro-to-fades.svg",
  },
  {
    // PLACEHOLDER class — confirm with client
    slug: "scissor-work-fundamentals",
    name: "Scissor Work Fundamentals",
    level: "Intermediate",
    date: "Monthly — dates announced on Instagram",
    price: "$200",
    spots: 6,
    description:
      "Scissor-over-comb, point cutting and layering fundamentals for barbers who want to move beyond the clippers. Taught in small groups at the studio.",
    covers: ["Scissor-over-comb control", "Point cutting & texturizing", "Layering and weight removal", "Growing-out-friendly shapes"],
    image: "/images/classes/scissor-work-fundamentals.svg",
  },
];
