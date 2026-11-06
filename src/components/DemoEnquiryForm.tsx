"use client";

import { useId, useState } from "react";
import { business } from "@/config/business";
import { SampleTag } from "./ui";

/**
 * FRONTEND-ONLY DEMO. Nothing is sent or stored anywhere.
 * When the business confirms an enquiry channel (email, WhatsApp, CRM form),
 * replace `onSubmit` with a real destination.
 */
export function DemoEnquiryForm({ kind }: { kind: "franchise" | "general" }) {
  const id = useId();
  const [submitted, setSubmitted] = useState<null | { name: string }>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const destination = kind === "franchise" ? business.contact.franchiseEmail ?? business.contact.email : business.contact.email;

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (!name) next.name = "Please enter your name.";
    if (!city) next.city = "Please enter your city.";
    if (!/^[+\d][\d\s-]{7,}$/.test(phone)) next.phone = "Please enter a valid phone number.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    setSubmitted({ name });
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-[3px] border border-line bg-card p-6 lg:p-8">
        <SampleTag>Demo only</SampleTag>
        <p className="mt-4 text-[1.35rem] font-semibold tracking-tight">Thanks, {submitted.name}.</p>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-2">
          This is a preview of the enquiry form. Your details were <strong>not sent or saved</strong> — the enquiry
          channel has not been connected yet.
          {destination && (
            <>
              {" "}
              In the meantime, you can write to{" "}
              <a className="link-underline font-medium" href={`mailto:${destination}`}>
                {destination}
              </a>
              .
            </>
          )}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(null)}
          className="mt-6 text-[14px] font-medium link-underline"
        >
          Start again
        </button>
      </div>
    );
  }

  const field =
    "mt-2 block w-full rounded-[3px] border border-line-strong bg-card px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-muted/70 focus:border-ink aria-[invalid=true]:border-saffron-deep";

  return (
    <form noValidate onSubmit={onSubmit} className="rounded-[3px] border border-line bg-card p-6 lg:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[1.2rem] font-semibold tracking-tight">
          {kind === "franchise" ? "Register your interest" : "Send an enquiry"}
        </p>
        <SampleTag>Demo · not submitted</SampleTag>
      </div>
      <p className="mt-2 text-[13px] text-muted">
        Preview form. Details stay in your browser and are not sent anywhere.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Full name" error={errors.name}>
          <input id={`${id}-name`} name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} />
        </Field>
        <Field id={`${id}-city`} label="City" error={errors.city}>
          <input id={`${id}-city`} name="city" autoComplete="address-level2" className={field} aria-invalid={!!errors.city} aria-describedby={errors.city ? `${id}-city-err` : undefined} />
        </Field>
        <Field id={`${id}-phone`} label="Mobile number" error={errors.phone}>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id}-phone-err` : undefined} />
        </Field>
        <Field id={`${id}-email`} label="Email (optional)">
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={field} />
        </Field>
        {kind === "franchise" && (
          <Field id={`${id}-bg`} label="Current business (optional)" className="sm:col-span-2">
            <select id={`${id}-bg`} name="background" className={field} defaultValue="">
              <option value="">Select one</option>
              <option>Already run a mobile or electronics store</option>
              <option>Run another retail business</option>
              <option>New to retail</option>
            </select>
          </Field>
        )}
        <Field id={`${id}-msg`} label="Message (optional)" className="sm:col-span-2">
          <textarea id={`${id}-msg`} name="message" rows={4} className={field} />
        </Field>
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ink px-7 text-[15px] font-medium text-paper transition-colors hover:bg-saffron sm:w-auto"
      >
        {kind === "franchise" ? "Preview franchise enquiry" : "Preview enquiry"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[13px] font-medium text-ink-2">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[13px] text-saffron-deep">
          {error}
        </p>
      )}
    </div>
  );
}
