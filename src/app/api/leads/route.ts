import { NextResponse } from "next/server";
import { leadsEnabled } from "@/lib/site";
import { isAllowedWebhook, validateLead } from "@/lib/leads";

export const dynamic = "force-dynamic";

/**
 * Lead delivery is intentionally disabled until LEAD_WEBHOOK_URL is set and
 * NEXT_PUBLIC_LEADS_ENABLED=true. This route never reports success unless the
 * approved endpoint accepts the payload.
 *
 * Do not log the request body. It contains personal contact details.
 */
export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid", message: "The request could not be read." }, { status: 400 });
  }

  const { errors, value } = validateLead(raw);
  if (!value) {
    return NextResponse.json({ ok: false, code: "invalid", message: "Check the highlighted fields.", errors }, { status: 400 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!leadsEnabled || !webhook || !isAllowedWebhook(webhook)) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        message: "Lead delivery is not configured. The submission was not sent.",
      },
      { status: 503 },
    );
  }

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(value),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { ok: false, code: "delivery_failed", message: "The lead service did not accept the request." },
        { status: 502 },
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, code: "delivery_failed", message: "The lead service did not accept the request." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, code: "received", message: "The count request was submitted." });
}
