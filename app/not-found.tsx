import MagneticButton from "@/components/MagneticButton";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-5 pt-16 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="display-tight text-[clamp(3rem,10vw,8rem)]">
        Lost the vision
      </h1>
      <p className="mt-6 max-w-md text-sm leading-relaxed text-smoke">
        The page you&apos;re looking for doesn&apos;t exist — but a fresh cut does.
      </p>
      <div className="mt-10">
        <MagneticButton href="/">Back home</MagneticButton>
      </div>
    </div>
  );
}
