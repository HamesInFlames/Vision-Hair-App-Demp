/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder art is generated as local SVGs (see scripts/generate-placeholders.mjs).
    // Safe here: only same-origin, script-free SVGs we generate ourselves are served.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
