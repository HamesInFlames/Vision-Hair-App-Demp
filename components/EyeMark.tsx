/**
 * The VZN "vision" eye mark. Used as logo glyph, hover accents and favicon.
 */
export default function EyeMark({
  className = "h-6 w-6",
  strokeWidth = 1.5,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 32 20"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1.5 10C6 3 11 1.5 16 1.5S26 3 30.5 10C26 17 21 18.5 16 18.5S6 17 1.5 10Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
      <circle cx="16" cy="10" r="5" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="16" cy="10" r="1.8" fill="currentColor" />
    </svg>
  );
}
