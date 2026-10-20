"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { interestOptions, leadForm } from "@/content/site";
import { RichText } from "@/components/RichText";
import { buttonClass } from "@/components/button-styles";
import { validateLead, type LeadErrors } from "@/lib/leads";

type LeadFormProps = {
  defaultInterest?: string;
  id?: string;
};

type Delivery = "idle" | "submitting" | "success" | "unconfigured" | "error";

const fields = ["fullName", "email", "phone", "interest", "zip", "notes", "consent"] as const;

export function LeadForm({ defaultInterest = "", id = "quote" }: LeadFormProps) {
  const pathname = usePathname();
  const formId = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const lock = useRef(false);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [delivery, setDelivery] = useState<Delivery>("idle");

  const initialInterest = interestOptions.includes(defaultInterest as (typeof interestOptions)[number])
    ? defaultInterest
    : "";

  useEffect(() => {
    if (delivery === "idle" || delivery === "submitting") return;
    statusRef.current?.focus();
  }, [delivery]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const result = validateLead({ ...data, page: pathname });
    setErrors(result.errors);

    if (!result.value) {
      const firstInvalid = fields.find((field) => result.errors[field]);
      if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    lock.current = true;
    setDelivery("submitting");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, page: pathname }),
      });
      const body = (await response.json().catch(() => null)) as { code?: string; errors?: LeadErrors } | null;

      if (body?.code === "invalid" && body.errors) {
        setErrors(body.errors);
        setDelivery("idle");
        const firstInvalid = fields.find((field) => body.errors?.[field]);
        if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
        return;
      }

      if (response.status === 503 || body?.code === "not_configured") {
        setDelivery("unconfigured");
        return;
      }

      if (!response.ok || body?.code !== "received") {
        setDelivery("error");
        return;
      }

      setDelivery("success");
      form.reset();
    } catch {
      setDelivery("error");
    } finally {
      lock.current = false;
    }
  }

  function clearError(name: keyof LeadErrors) {
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  if (delivery === "success" || delivery === "unconfigured" || delivery === "error") {
    const title =
      delivery === "success" ? leadForm.successTitle : delivery === "unconfigured" ? leadForm.unconfiguredTitle : leadForm.errorTitle;
    const body =
      delivery === "success" ? leadForm.successBody : delivery === "unconfigured" ? leadForm.unconfiguredBody : leadForm.errorBody;

    return (
      <div
        id={id}
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="scroll-mt-28 rounded-2xl border border-line bg-white p-6 outline-none sm:p-8"
      >
        <h2 className="text-3xl font-bold tracking-tight text-navy">{title}</h2>
        <p className="mt-3 text-base leading-7 text-muted">{body}</p>
        {delivery !== "success" ? (
          <button type="button" className={`${buttonClass.primary} mt-6`} onClick={() => setDelivery("idle")}>
            Edit and try again
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <form id={id} className="scroll-mt-28" onSubmit={onSubmit} noValidate>
      <h2 className="text-3xl font-bold tracking-tight text-navy">{leadForm.title}</h2>
      <p className="mt-2 max-w-xl text-base leading-7 text-muted">{leadForm.lede}</p>

      {errors.form ? (
        <p className="mt-4 rounded-lg border border-danger/30 bg-white px-3 py-2 text-sm text-danger" role="alert">
          {errors.form}
        </p>
      ) : null}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.fullName} id={`${formId}-name`}>
          <input
            id={`${formId}-name`}
            name="fullName"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? `${formId}-name-error` : undefined}
            className={inputClass(Boolean(errors.fullName))}
            onInput={() => clearError("fullName")}
          />
        </Field>
        <Field label="Email" error={errors.email} id={`${formId}-email`}>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={inputClass(Boolean(errors.email))}
            onInput={() => clearError("email")}
          />
        </Field>
        <Field label="Phone" error={errors.phone} id={`${formId}-phone`}>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
            className={inputClass(Boolean(errors.phone))}
            onInput={() => clearError("phone")}
          />
        </Field>
        <Field label={leadForm.interestLabel} error={errors.interest} id={`${formId}-interest`}>
          <select
            id={`${formId}-interest`}
            name="interest"
            defaultValue={initialInterest}
            required
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={errors.interest ? `${formId}-interest-error` : undefined}
            className={inputClass(Boolean(errors.interest))}
            onChange={() => clearError("interest")}
          >
            <option value="">{leadForm.interestPlaceholder}</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
        <Field label={leadForm.zipLabel} error={errors.zip} id={`${formId}-zip`}>
          <input
            id={`${formId}-zip`}
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            required
            aria-invalid={Boolean(errors.zip)}
            aria-describedby={errors.zip ? `${formId}-zip-error` : undefined}
            className={inputClass(Boolean(errors.zip))}
            onInput={() => clearError("zip")}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label={leadForm.notesLabel} optional error={errors.notes} id={`${formId}-notes`}>
            <textarea
              id={`${formId}-notes`}
              name="notes"
              rows={4}
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={errors.notes ? `${formId}-notes-error` : undefined}
              className={inputClass(Boolean(errors.notes))}
              onInput={() => clearError("notes")}
            />
          </Field>
        </div>
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input id={`${formId}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 text-sm leading-6 text-ink">
          <input
            name="consent"
            type="checkbox"
            value="yes"
            className="mt-1 h-4 w-4 shrink-0 accent-teal"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
            onChange={() => clearError("consent")}
          />
          <span>
            <RichText text={leadForm.consent} />
          </span>
        </label>
        {errors.consent ? (
          <p id={`${formId}-consent-error`} className="mt-2 text-sm text-danger">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <button type="submit" className={`${buttonClass.primary} mt-6`} disabled={delivery === "submitting"}>
        {delivery === "submitting" ? leadForm.submitting : leadForm.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  optional,
  error,
  id,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  id: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-navy" htmlFor={id}>
      {label}
      {optional ? <span className="ml-2 font-normal text-muted">Optional</span> : null}
      <span className="mt-1.5 block font-normal">{children}</span>
      {error ? (
        <span id={`${id}-error`} className="mt-1.5 block text-sm font-normal text-danger">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function inputClass(invalid: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-base font-normal text-ink outline-none ${
    invalid ? "border-danger" : "border-line"
  }`;
}
