import { Reveal } from "./Reveal";

/**
 * Editorial section header: uppercase micro-eyebrow + oversized display title.
 */
export default function SectionHeading({
  eyebrow,
  title,
  className = "",
  align = "left",
}: {
  eyebrow: string;
  title: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="display-tight text-[clamp(2.5rem,7vw,5.5rem)]">{title}</h2>
    </Reveal>
  );
}
