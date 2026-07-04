/**
 * Global business info. This file is the single source of truth for
 * address, hours, contact details and links — edit here, updates everywhere.
 */

export const site = {
  name: "Vision Hair Studio",
  shortName: "VZN",
  tagline: "Create Your Vision.",
  description:
    "Vision Hair Studio (VZN) is a Toronto barbershop specializing in fades, scissor cuts, perms, braids and beard work. Book with one of our Visionaries today.",
  // PLACEHOLDER — confirm final production domain with client before launch.
  url: "https://vznhairstudio.com",

  address: {
    street: "9390 Sheppard Avenue E, Unit 2",
    city: "Toronto",
    region: "ON",
    postalCode: "", // PLACEHOLDER — confirm postal code with client
    country: "CA",
  },

  // PLACEHOLDER — approximate coordinates for Sheppard Ave E; confirm exact
  // geo with client / Google Business Profile before launch.
  geo: { latitude: 43.8036, longitude: -79.1867 },

  phones: {
    work: { label: "(416) 286-7100", tel: "+14162867100" },
    cell1: { label: "(416) 459-2014", tel: "+14164592014" },
    cell2: { label: "(647) 534-2985", tel: "+16475342985" },
  },
  email: "vznhairstudio@gmail.com",

  instagram: {
    handle: "@vznhairstudio",
    url: "https://www.instagram.com/vznhairstudio/",
  },

  /** General Squire booking page for the shop (used where no barber is specified). */
  squireShopUrl:
    "https://getsquire.com/booking/book/vision-hair-studio-toronto",

  hours: [
    { days: "Monday – Saturday", open: "11:00 AM", close: "7:00 PM" },
    { days: "Sunday", open: "11:00 AM", close: "6:00 PM" },
  ],

  /** schema.org OpeningHoursSpecification-friendly shape */
  hoursSpec: [
    {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:00",
      closes: "19:00",
    },
    { dayOfWeek: ["Sunday"], opens: "11:00", closes: "18:00" },
  ],

  mapEmbedSrc:
    "https://www.google.com/maps?q=9390+Sheppard+Ave+E+Unit+2,+Toronto,+ON&output=embed",
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=9390+Sheppard+Ave+E+Unit+2+Toronto+ON",

  // PLACEHOLDER — swap in the shop's real Google review link (Google Business Profile → "Ask for reviews").
  googleReviewUrl:
    "https://www.google.com/maps/search/?api=1&query=Vision+Hair+Studio+Toronto",
} as const;

export const marqueeServices = [
  "fades",
  "perms",
  "braids",
  "scissor cuts",
  "beard trims",
];
