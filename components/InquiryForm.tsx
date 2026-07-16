"use client";

import { useState } from "react";
import { Check } from "lucide-react";

/**
 * Client-side inquiry form: validates and shows a success state. No backend.
 *
 * ── FORM SERVICE SEAM ──────────────────────────────────────────────
 * To actually receive these inquiries, POST `payload` inside handleSubmit
 * to a form service (Formspree, Basin, Web3Forms…) or a route handler
 * (app/api/inquiry/route.ts) that emails vznhairstudio@gmail.com via a
 * provider like Resend. Everything else — validation, success state —
 * already works and can stay as-is.
 */

type Props = {
  subjectLabel?: string;
  subjects?: readonly string[];
  defaultSubject?: string;
  submitLabel?: string;
  successMessage?: string;
};

type Errors = Partial<Record<"name" | "email" | "subject", string>>;

export default function InquiryForm({
  subjectLabel = "Subject",
  subjects,
  defaultSubject = "",
  submitLabel = "Send inquiry",
  successMessage = "Thanks — we got it. We'll get back to you by email.",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Please enter a valid email address.";
    if (subjects && !subject) next.subject = "Please pick one.";
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Payload ready for the form service seam described above:
    // const payload = { name, email, subject, message };
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 border border-hairline p-10 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-paper">
          <Check className="h-5 w-5" />
        </span>
        <p className="font-display text-xl font-bold">Inquiry sent</p>
        <p className="max-w-sm text-sm leading-relaxed text-smoke">{successMessage}</p>
      </div>
    );
  }

  // 16px input text — anything smaller makes iOS Safari zoom in on focus.
  const inputCls =
    "w-full border border-hairline bg-paper px-4 py-3 text-base placeholder:text-smoke/70 focus:border-ink";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="inq-name" className="eyebrow mb-2 block text-ink">
            Name
          </label>
          <input
            id="inq-name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "inq-name-err" : undefined}
            className={inputCls}
          />
          {errors.name && (
            <p id="inq-name-err" className="mt-1.5 text-xs font-medium">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="inq-email" className="eyebrow mb-2 block text-ink">
            Email
          </label>
          <input
            id="inq-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "inq-email-err" : undefined}
            className={inputCls}
          />
          {errors.email && (
            <p id="inq-email-err" className="mt-1.5 text-xs font-medium">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {subjects ? (
        <div>
          <label htmlFor="inq-subject" className="eyebrow mb-2 block text-ink">
            {subjectLabel}
          </label>
          <select
            id="inq-subject"
            name="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "inq-subject-err" : undefined}
            className={inputCls}
          >
            <option value="" disabled>
              Select…
            </option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p id="inq-subject-err" className="mt-1.5 text-xs font-medium">
              {errors.subject}
            </p>
          )}
        </div>
      ) : null}

      <div>
        <label htmlFor="inq-message" className="eyebrow mb-2 block text-ink">
          Message <span className="normal-case text-smoke">(optional)</span>
        </label>
        <textarea
          id="inq-message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputCls}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-ink/85"
      >
        {submitLabel}
      </button>
    </form>
  );
}
