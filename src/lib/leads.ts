import { interestOptions, type Interest } from "@/content/site";

export type LeadErrors = Partial<
  Record<"fullName" | "email" | "phone" | "interest" | "zip" | "notes" | "consent" | "form", string>
>;

export type LeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  interest: Interest;
  zip: string;
  notes: string | null;
  consent: true;
  page: string;
  source: "amerilist-insurance-website";
  submittedAt: string;
};

const namePattern = /^[\p{L}][\p{L}\s.'’-]{1,79}$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const zipPattern = /^\d{5}(-\d{4})?$/;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

export function validateLead(input: Record<string, unknown>): { errors: LeadErrors; value?: LeadPayload } {
  const errors: LeadErrors = {};
  const fullName = clean(input.fullName);
  const email = clean(input.email);
  const phone = clean(input.phone);
  const interest = clean(input.interest);
  const zip = clean(input.zip);
  const notes = clean(input.notes);
  const website = clean(input.website);
  const consent = input.consent === true || input.consent === "yes" || input.consent === "on";
  const page = clean(input.page).slice(0, 120) || "/";

  if (website) errors.form = "We could not submit this request.";

  if (!fullName) errors.fullName = "Enter your full name.";
  else if (!namePattern.test(fullName)) errors.fullName = "Use letters in your full name.";

  if (!email) errors.email = "Enter your email address.";
  else if (email.length > 120 || !emailPattern.test(email)) errors.email = "Enter a valid email address.";

  const digits = phone.replace(/\D/g, "");
  const validPhone = digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
  if (!phone) errors.phone = "Enter your phone number.";
  else if (!validPhone || phone.length > 20) errors.phone = "Enter a 10-digit phone number.";

  if (!interest) errors.interest = "Choose a service or audience.";
  else if (!interestOptions.includes(interest as Interest)) {
    errors.interest = "Choose a service or audience from the list.";
  }

  if (!zip) errors.zip = "Enter the market ZIP code.";
  else if (!zipPattern.test(zip)) errors.zip = "Enter a 5-digit ZIP code.";

  if (notes.length > 1000) errors.notes = "Keep notes to 1,000 characters or fewer.";

  if (!consent) errors.consent = "Confirm that we may use this information to respond to your request.";

  if (Object.keys(errors).length > 0) return { errors };

  return {
    errors,
    value: {
      fullName,
      email,
      phone,
      interest: interest as Interest,
      zip,
      notes: notes || null,
      consent: true,
      page: page.startsWith("/") ? page : "/",
      source: "amerilist-insurance-website",
      submittedAt: new Date().toISOString(),
    },
  };
}

export function isAllowedWebhook(rawUrl: string) {
  try {
    const url = new URL(rawUrl);
    if (url.protocol === "https:") return true;
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    return url.protocol === "http:" && local;
  } catch {
    return false;
  }
}
