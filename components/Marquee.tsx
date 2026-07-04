/**
 * Infinite horizontal marquee. Content is duplicated once and translated
 * -50% on loop; the duplicate is aria-hidden so screen readers hear it once.
 * Animation is disabled under prefers-reduced-motion (see globals.css).
 */
export default function Marquee({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item, i) => (
        <li
          key={i}
          className="display-tight flex items-center whitespace-nowrap px-6 text-[clamp(1.5rem,3.5vw,2.75rem)] md:px-10"
        >
          {item}
          <span className="ml-12 inline-block h-2 w-2 rounded-full bg-current opacity-40 md:ml-20" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`overflow-hidden border-y border-hairline py-5 ${className}`}>
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
