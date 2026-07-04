/**
 * Generates grayscale SVG placeholder art for the whole site.
 * Run with: npm run placeholders
 *
 * Everything this produces is a PLACEHOLDER — replace with real photography
 * by dropping same-named .jpg/.png files into /public/images and updating
 * the paths in /data. All photos are displayed with a CSS grayscale filter,
 * so mixed-quality source photos will still look cohesive.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = (p) => join(root, "public", "images", p);

const barbers = [
  ["kyle-vivar", "KV"],
  ["victor-ignacio", "VI"],
  ["carlo-rivero", "CR"],
  ["chelsea-pecson", "CP"],
  ["rj-trinidad", "RJ"],
  ["henderson-sun", "HS"],
  ["uriel-fernandez", "UF"],
  ["justine-dela-vega", "JD"],
  ["jensen-canedo", "JC"],
  ["karl-boco", "KB"],
  ["jun-alexander", "JA"],
  ["happi-vijayakumar", "HV"],
  ["josh-rosales", "JR"],
];

const products = [
  "vzn-classic-tee",
  "vzn-hoodie",
  "vzn-cap",
  "vzn-pomade",
  "vzn-texture-powder",
];

const classes = ["intro-to-fades", "scissor-work-fundamentals"];

// Deterministic pseudo-random from an integer seed
const rand = (seed) => {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

const eye = (cx, cy, s, stroke) => `
  <g fill="none" stroke="${stroke}" stroke-width="${s * 0.06}">
    <path d="M ${cx - s} ${cy} Q ${cx} ${cy - s * 0.72} ${cx + s} ${cy} Q ${cx} ${cy + s * 0.72} ${cx - s} ${cy} Z"/>
    <circle cx="${cx}" cy="${cy}" r="${s * 0.3}"/>
    <circle cx="${cx}" cy="${cy}" r="${s * 0.1}" fill="${stroke}"/>
  </g>`;

function portrait(slug, initials, i) {
  const r = rand(i + 7);
  const base = 218 + Math.floor(r() * 20); // light gray background
  const tone = 140 + Math.floor(r() * 40); // silhouette gray
  const bg = `rgb(${base},${base},${base})`;
  const fg = `rgb(${tone},${tone},${tone})`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
  <rect width="800" height="1000" fill="${bg}"/>
  <circle cx="400" cy="380" r="150" fill="${fg}"/>
  <path d="M 150 1000 Q 150 640 400 640 Q 650 640 650 1000 Z" fill="${fg}"/>
  ${eye(400, 380, 60, bg)}
  <text x="400" y="925" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="700" letter-spacing="8" fill="#0A0A0A">${initials}</text>
  <text x="400" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" letter-spacing="10" fill="#8A8A8A">VZN — PLACEHOLDER</text>
  <rect x="12" y="12" width="776" height="976" fill="none" stroke="#0A0A0A" stroke-opacity="0.12" stroke-width="2"/>
</svg>`;
}

function work(i, w, h) {
  const r = rand(i * 31 + 3);
  const base = 205 + Math.floor(r() * 30);
  const bg = `rgb(${base},${base},${base})`;
  let shapes = "";
  for (let k = 0; k < 5; k++) {
    const tone = 90 + Math.floor(r() * 110);
    const g = `rgb(${tone},${tone},${tone})`;
    if (r() > 0.5) {
      shapes += `<circle cx="${r() * w}" cy="${r() * h}" r="${40 + r() * 130}" fill="${g}" fill-opacity="${0.25 + r() * 0.5}"/>`;
    } else {
      const x = r() * w * 0.7;
      const y = r() * h * 0.7;
      shapes += `<rect x="${x}" y="${y}" width="${60 + r() * 240}" height="${60 + r() * 240}" fill="${g}" fill-opacity="${0.25 + r() * 0.5}" transform="rotate(${Math.floor(r() * 40 - 20)} ${x} ${y})"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  ${shapes}
  ${eye(w / 2, h / 2, 46, "#0A0A0A")}
  <text x="${w / 2}" y="${h - 34}" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" letter-spacing="8" fill="#0A0A0A" fill-opacity="0.55">WORK ${String(i).padStart(2, "0")} — PLACEHOLDER</text>
</svg>`;
}

function product(slug, variant, i) {
  const r = rand(i * 17 + variant * 5);
  const base = variant === 1 ? 235 : 225;
  const bg = `rgb(${base},${base},${base})`;
  const tone = 60 + Math.floor(r() * 60);
  const g = `rgb(${tone},${tone},${tone})`;
  const label = slug.replace(/-/g, " ").toUpperCase();
  const shape =
    variant === 1
      ? `<rect x="250" y="270" width="300" height="330" rx="18" fill="${g}"/>`
      : `<circle cx="400" cy="420" r="180" fill="${g}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <rect width="800" height="800" fill="${bg}"/>
  ${shape}
  ${eye(400, 420, 52, bg)}
  <text x="400" y="700" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" letter-spacing="6" fill="#0A0A0A">${label}</text>
  <text x="400" y="740" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="6" fill="#8A8A8A">PLACEHOLDER — VIEW ${variant}</text>
</svg>`;
}

function classImg(slug, i) {
  const r = rand(i * 13 + 1);
  const base = 215 + Math.floor(r() * 20);
  const bg = `rgb(${base},${base},${base})`;
  const label = slug.replace(/-/g, " ").toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
  <rect width="1200" height="800" fill="${bg}"/>
  <rect x="80" y="120" width="1040" height="480" fill="rgb(150,150,150)" fill-opacity="0.5"/>
  ${eye(600, 360, 70, "#0A0A0A")}
  <text x="600" y="690" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="8" fill="#0A0A0A">${label}</text>
  <text x="600" y="736" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="6" fill="#8A8A8A">PLACEHOLDER</text>
</svg>`;
}

const write = (rel, svg) => {
  const p = out(rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, svg, "utf8");
  console.log("wrote", rel);
};

barbers.forEach(([slug, initials], i) => write(`barbers/${slug}.svg`, portrait(slug, initials, i)));

const galleryDims = [
  [800, 1000], [800, 800], [800, 1200], [800, 900],
  [800, 1100], [800, 800], [800, 1000], [800, 1250],
  [800, 850], [800, 1050], [800, 950], [800, 1150],
];
galleryDims.forEach(([w, h], i) => write(`gallery/work-${String(i + 1).padStart(2, "0")}.svg`, work(i + 1, w, h)));

products.forEach((slug, i) => {
  write(`products/${slug}-1.svg`, product(slug, 1, i));
  write(`products/${slug}-2.svg`, product(slug, 2, i));
});

classes.forEach((slug, i) => write(`classes/${slug}.svg`, classImg(slug, i)));

console.log("done.");
