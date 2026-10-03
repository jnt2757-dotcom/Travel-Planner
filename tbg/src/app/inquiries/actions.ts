"use server";

import { inquirySchema, type InquiryResult } from "@/lib/inquiry";

export async function submitInquiry(input: unknown): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please review the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Bots fill the hidden field; accept quietly so they get no signal.
  if (parsed.data.company) return { ok: true };

  // TODO: deliver the inquiry (e.g. email via Resend/Postmark or a CRM webhook).
  // Until a provider is configured it is logged on the server.
  const { name, email, phone, location, details } = parsed.data;
  console.info(
    "[inquiry]",
    JSON.stringify({ name, email, phone, location, details, receivedAt: new Date().toISOString() }),
  );

  return { ok: true };
}
