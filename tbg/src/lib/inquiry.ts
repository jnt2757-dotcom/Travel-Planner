import { z } from "zod";

/** Shared by the form (client-side validation) and the server action (authoritative). */
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Please enter a phone number with area code."),
  location: z
    .string()
    .trim()
    .min(2, "Tell us the neighborhood or lot you have in mind.")
    .max(200),
  details: z
    .string()
    .trim()
    .min(20, "A sentence or two about the project helps us prepare (20 characters minimum).")
    .max(4000),
  /** Honeypot: hidden from people, filled in by bots. */
  company: z.string().optional(),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Partial<Record<keyof Inquiry, string[]>> };
