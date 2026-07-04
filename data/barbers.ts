/**
 * The Visionaries — VZN's barber roster.
 *
 * To add a barber: copy an entry, give it a unique `slug`, and a profile page
 * is generated automatically at /barbers/<slug>. To remove one, delete the entry.
 *
 * `portrait` and `gallery` point at generated placeholder art — replace with
 * real photos in /public/images and update the paths here.
 * Bios marked PLACEHOLDER were written by the developer, not the barber —
 * confirm or replace before launch.
 */

export type Barber = {
  slug: string;
  name: string;
  firstName: string;
  role: string;
  isOwner: boolean;
  /** Shown in the featured grid on the home page */
  featured: boolean;
  instagram: string | null;
  instagramUrl: string | null;
  squireUrl: string;
  specialties: string[];
  yearsExperience: number | null;
  bio: string;
  portrait: string;
  gallery: string[];
};

const ig = (handle: string) =>
  `https://www.instagram.com/${handle.replace(/^@/, "")}/`;

/** Rotating pool of placeholder work shots shared across profiles. */
const pool = Array.from(
  { length: 12 },
  (_, i) => `/images/gallery/work-${String(i + 1).padStart(2, "0")}.svg`
);
const workSet = (offset: number) =>
  Array.from({ length: 6 }, (_, i) => pool[(offset + i) % pool.length]);

export const barbers: Barber[] = [
  {
    slug: "kyle-vivar",
    name: "Kyle Vivar",
    firstName: "Kyle",
    role: "Barber / Owner",
    isOwner: true,
    featured: true,
    instagram: "@kvfades",
    instagramUrl: ig("kvfades"),
    squireUrl:
      "https://getsquire.com/booking/book/vision-hair-studio-toronto/barber/kyle-vivar/services",
    specialties: ["Fades", "All-around cuts"],
    yearsExperience: null,
    // PLACEHOLDER bio — confirm with Kyle
    bio: "Co-owner of Vision Hair Studio and a versatile all-around barber. Whatever you're going for, Kyle can get you there.",
    portrait: "/images/barbers/kyle-vivar.svg",
    gallery: workSet(0),
  },
  {
    slug: "victor-ignacio",
    name: "Victor Ignacio",
    firstName: "Victor",
    role: "Barber / Owner",
    isOwner: true,
    featured: true,
    instagram: "@victorignvcio",
    instagramUrl: ig("victorignvcio"),
    squireUrl:
      "https://online.getsquire.com/book/vision-hair-studio-toronto/barber/victor-ignacio-1/services",
    specialties: ["Scissor cuts", "Perms", "Fades"],
    yearsExperience: 6,
    // PLACEHOLDER bio — confirm with Victor
    bio: "Co-owner of Vision Hair Studio with six years behind the chair. Victor specializes in scissor cuts, perms and fades.",
    portrait: "/images/barbers/victor-ignacio.svg",
    gallery: workSet(2),
  },
  {
    slug: "carlo-rivero",
    name: "Carlo Rivero",
    firstName: "Carlo",
    role: "Barber",
    isOwner: false,
    featured: true,
    instagram: "@_crivero",
    instagramUrl: ig("_crivero"),
    squireUrl:
      "https://online.getsquire.com/book/vision-hair-studio-toronto/barber/carlo-rivero-1/services",
    specialties: ["Braids", "Perms", "Fades"],
    yearsExperience: null,
    // PLACEHOLDER bio — confirm with Carlo
    bio: "Carlo covers a wide range — braids, perms and fades — bringing detail and consistency to every chair session.",
    portrait: "/images/barbers/carlo-rivero.svg",
    gallery: workSet(4),
  },
  {
    slug: "chelsea-pecson",
    name: "Chelsea Pecson",
    firstName: "Chelsea",
    role: "Barber",
    isOwner: false,
    featured: true,
    instagram: "@abg.cutz",
    instagramUrl: ig("abg.cutz"),
    squireUrl:
      "https://online.getsquire.com/book/vision-hair-studio-toronto/barber/chelsea-pecson/services",
    specialties: ["Scissor work"],
    yearsExperience: 6,
    // PLACEHOLDER bio — confirm with Chelsea
    bio: "Six years of precise scissor work. Chelsea's cuts are built to grow out as clean as they start.",
    portrait: "/images/barbers/chelsea-pecson.svg",
    gallery: workSet(6),
  },
  {
    slug: "rj-trinidad",
    name: "RJ Trinidad",
    firstName: "RJ",
    role: "Barber",
    isOwner: false,
    featured: true,
    instagram: "@rj.trinidad",
    instagramUrl: ig("rj.trinidad"),
    squireUrl:
      "https://online.getsquire.com/book/vision-hair-studio-toronto/barber/rj-trinidad/services",
    specialties: ["Beard trims", "Tapers", "Buzz cuts", "Fades"],
    yearsExperience: 5,
    // PLACEHOLDER bio — confirm with RJ
    bio: "A hair school graduate with five years of experience, RJ specializes in beard trims, tapers, buzz cuts and fades.",
    portrait: "/images/barbers/rj-trinidad.svg",
    gallery: workSet(8),
  },
  {
    slug: "henderson-sun",
    name: "Henderson Sun",
    firstName: "Henderson",
    role: "Braider / Barber",
    isOwner: false,
    featured: true,
    instagram: "@hendersonthebarber",
    instagramUrl: ig("hendersonthebarber"),
    squireUrl:
      "https://online.getsquire.com/book/vision-hair-studio-toronto/barber/henderson-sun/services",
    specialties: ["Braids"],
    yearsExperience: null,
    // PLACEHOLDER bio — confirm with Henderson
    bio: "VZN's braid specialist. Book Henderson for clean, long-lasting braid work alongside barbering services.",
    portrait: "/images/barbers/henderson-sun.svg",
    gallery: workSet(10),
  },
  {
    slug: "uriel-fernandez",
    name: "Uriel Fernandez",
    firstName: "Uriel",
    role: "Barber",
    isOwner: false,
    featured: false,
    instagram: "@frndz_cutz",
    instagramUrl: ig("frndz_cutz"),
    squireUrl:
      "https://online.getsquire.com/book/vision-hair-studio-toronto/barber/uriel-fernandez-1/services",
    specialties: [],
    yearsExperience: null,
    bio: "Barber at Vision Hair Studio. Book with Uriel through Squire.",
    portrait: "/images/barbers/uriel-fernandez.svg",
    gallery: workSet(1),
  },
  {
    slug: "justine-dela-vega",
    name: "Justine Dela Vega",
    firstName: "Justine",
    role: "Barber",
    isOwner: false,
    featured: false,
    instagram: "@preethecuts",
    instagramUrl: ig("preethecuts"),
    squireUrl:
      "https://online.getsquire.com/book/vision-hair-studio-toronto/barber/justine-dela-vega/services",
    specialties: [],
    yearsExperience: null,
    bio: "Barber at Vision Hair Studio. Book with Justine through Squire.",
    portrait: "/images/barbers/justine-dela-vega.svg",
    gallery: workSet(3),
  },
  {
    slug: "jensen-canedo",
    name: "Jensen Canedo",
    firstName: "Jensen",
    role: "Barber",
    isOwner: false,
    featured: false,
    instagram: "@jensencanedo",
    instagramUrl: ig("jensencanedo"),
    squireUrl:
      "https://online.getsquire.com/book/vision-hair-studio-toronto/barber/jensen-canedo/services",
    specialties: [],
    yearsExperience: null,
    bio: "Barber at Vision Hair Studio. Book with Jensen through Squire.",
    portrait: "/images/barbers/jensen-canedo.svg",
    gallery: workSet(5),
  },
  {
    slug: "karl-boco",
    name: "Karl Boco",
    firstName: "Karl",
    role: "Barber",
    isOwner: false,
    featured: false,
    instagram: null,
    instagramUrl: null,
    squireUrl:
      "https://getsquire.com/booking/book/vision-hair-studio-toronto/barber/karl-boco-1/services",
    specialties: ["Fades", "Scissor cuts", "Perms"],
    yearsExperience: null,
    // PLACEHOLDER bio — confirm with Karl
    bio: "Karl specializes in fades, scissor cuts and perms — dialled-in work across the board.",
    portrait: "/images/barbers/karl-boco.svg",
    gallery: workSet(7),
  },
  {
    slug: "jun-alexander",
    name: "Jun Alexander",
    firstName: "Jun",
    role: "Apprentice",
    isOwner: false,
    featured: false,
    instagram: "@blend2trend",
    instagramUrl: ig("blend2trend"),
    squireUrl:
      "https://getsquire.com/booking/book/vision-hair-studio-toronto/barber/jun-alexander/services",
    specialties: [],
    yearsExperience: null,
    bio: "Apprentice at Vision Hair Studio. Book with Jun through Squire.",
    portrait: "/images/barbers/jun-alexander.svg",
    gallery: workSet(9),
  },
  {
    slug: "happi-vijayakumar",
    name: "Happi Vijayakumar",
    firstName: "Happi",
    role: "Barber",
    isOwner: false,
    featured: false,
    instagram: null,
    instagramUrl: null,
    squireUrl:
      "https://getsquire.com/booking/book/vision-hair-studio-toronto/barber/happi-vijayakumar/services",
    specialties: [],
    yearsExperience: null,
    bio: "Barber at Vision Hair Studio. Book with Happi through Squire.",
    portrait: "/images/barbers/happi-vijayakumar.svg",
    gallery: workSet(11),
  },
  {
    slug: "josh-rosales",
    name: "Josh Rosales",
    firstName: "Josh",
    role: "Barber",
    isOwner: false,
    featured: false,
    instagram: null,
    instagramUrl: null,
    squireUrl:
      "https://getsquire.com/discover/barbershop/vision-hair-studio-toronto/barber/josh-rosales-1",
    specialties: [],
    yearsExperience: null,
    bio: "Barber at Vision Hair Studio. Book with Josh through Squire.",
    portrait: "/images/barbers/josh-rosales.svg",
    gallery: workSet(6),
  },
];

export const getBarber = (slug: string) =>
  barbers.find((b) => b.slug === slug);

/** Owners first, then the rest of the featured list — used on the home page. */
export const featuredBarbers = [
  ...barbers.filter((b) => b.featured && b.isOwner),
  ...barbers.filter((b) => b.featured && !b.isOwner),
];
