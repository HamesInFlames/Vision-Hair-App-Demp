/**
 * Service menu.
 *
 * ALL PRICES ARE PLACEHOLDERS — confirm every price and duration with the
 * client before launch. Squire is the source of truth for live pricing.
 */

export type Service = {
  name: string;
  description: string;
  price: string; // PLACEHOLDER — confirm with client
  duration: string; // PLACEHOLDER — confirm with client
};

export type ServiceCategory = {
  category: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    category: "Cuts",
    services: [
      // PLACEHOLDER prices — confirm with client
      { name: "Haircut", description: "Full cut, styled to finish.", price: "$40", duration: "45 min" },
      { name: "Scissor Cut", description: "Full-scissor precision cut.", price: "$50", duration: "60 min" },
      { name: "Buzz Cut", description: "All-over clipper cut, one length or graded.", price: "$30", duration: "30 min" },
      { name: "Haircut + Beard", description: "Full cut with a lined, blended beard.", price: "$55", duration: "60 min" },
    ],
  },
  {
    category: "Fades",
    services: [
      // PLACEHOLDER prices — confirm with client
      { name: "Skin Fade", description: "Down-to-skin fade with a crisp blend.", price: "$45", duration: "45 min" },
      { name: "Taper Fade", description: "Clean taper around the ears and neckline.", price: "$40", duration: "45 min" },
      { name: "Fade + Design", description: "Fade with a custom part or design.", price: "$55", duration: "60 min" },
    ],
  },
  {
    category: "Perms",
    services: [
      // PLACEHOLDER prices — confirm with client
      { name: "Perm", description: "Textured perm, cut not included.", price: "$120", duration: "120 min" },
      { name: "Perm + Haircut", description: "Perm with a full cut and style.", price: "$150", duration: "150 min" },
    ],
  },
  {
    category: "Braids",
    services: [
      // PLACEHOLDER prices — confirm with client
      { name: "Two Braids", description: "Two clean cornrow braids.", price: "$40", duration: "45 min" },
      { name: "Full Braids", description: "Full-head braid work, pattern of your choice.", price: "$90", duration: "120 min" },
      { name: "Braid Touch-Up", description: "Refresh and re-tighten existing braids.", price: "$50", duration: "60 min" },
    ],
  },
  {
    category: "Beard",
    services: [
      // PLACEHOLDER prices — confirm with client
      { name: "Beard Trim", description: "Shaped, lined and blended.", price: "$25", duration: "30 min" },
      { name: "Hot Towel Shave", description: "Straight-razor shave with hot towel finish.", price: "$35", duration: "45 min" },
      { name: "Line-Up", description: "Hairline and edges sharpened.", price: "$20", duration: "20 min" },
    ],
  },
  {
    category: "Kids",
    services: [
      // PLACEHOLDER prices — confirm with client
      { name: "Kids Cut (12 & under)", description: "Full cut for the young ones.", price: "$30", duration: "30 min" },
      { name: "Kids Fade", description: "Fade sized down for kids.", price: "$35", duration: "45 min" },
    ],
  },
];
