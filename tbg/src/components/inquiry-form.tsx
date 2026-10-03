"use client";

// Adapted from 21st.dev "Centered Contact Form" (@ln-dev7): labelled fields,
// a single full-width submit, and an in-place confirmation once sent. Rebuilt
// with react-hook-form + zod, the TBG fields, and underline-only inputs.
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { submitInquiry } from "@/app/inquiries/actions";
import { inquirySchema, type Inquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

type FieldName = Exclude<keyof Inquiry, "company">;

const fields: {
  name: FieldName;
  label: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
  multiline?: boolean;
  half?: boolean;
}[] = [
  { name: "name", label: "Name", autoComplete: "name", half: true },
  { name: "email", label: "Email", type: "email", autoComplete: "email", half: true },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
  {
    name: "location",
    label: "Neighborhood or lot",
    hint: "For example Eastover, or a lot address if you have one.",
    half: true,
  },
  {
    name: "details",
    label: "Project details",
    hint: "Timing, architect, size, anything you already know.",
    multiline: true,
  },
];

const inputClass =
  "block w-full border-0 border-b border-rule bg-transparent px-0 py-3 text-body text-charcoal placeholder:text-graphite/70 transition-colors focus:border-charcoal focus:ring-0 focus-visible:outline-none aria-[invalid=true]:border-error";

export function InquiryForm() {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    try {
      const result = await submitInquiry(values);
      if (result.ok) {
        setStatus("sent");
        return;
      }
      setServerMessage(result.message);
      setStatus("error");
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        if (messages?.[0]) setError(field as FieldName, { message: messages[0] });
      }
    } catch {
      setServerMessage("Something went wrong sending your inquiry. Please try again, or call 704.202.4390.");
      setStatus("error");
    }
  });

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-6 border-t border-charcoal pt-10">
        <span className="inline-flex size-12 items-center justify-center border border-charcoal">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h2 className="text-headline text-charcoal">Thank you.</h2>
        <p className="max-w-md text-lede text-graphite">
          Your inquiry is with our team, and we will be in touch with you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={status === "error" ? `${id}-error` : undefined}>
      {status === "error" ? (
        <p id={`${id}-error`} role="alert" className="mb-10 border-l-2 border-error pl-4 text-error">
          {serverMessage}
        </p>
      ) : null}

      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {fields.map((field) => {
          const error = errors[field.name]?.message;
          const fieldId = `${id}-${field.name}`;
          const describedBy = [field.hint && `${fieldId}-hint`, error && `${fieldId}-err`]
            .filter(Boolean)
            .join(" ");
          const common = {
            id: fieldId,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": describedBy || undefined,
            "aria-required": true,
            className: inputClass,
            ...register(field.name),
          };
          return (
            <div key={field.name} className={cn(!field.half && "sm:col-span-2")}>
              <label htmlFor={fieldId} className="label text-graphite">
                {field.label}
              </label>
              {field.multiline ? (
                <textarea rows={5} {...common} className={cn(inputClass, "resize-y")} />
              ) : (
                <input type={field.type ?? "text"} autoComplete={field.autoComplete} {...common} />
              )}
              {field.hint ? (
                <p id={`${fieldId}-hint`} className="mt-2 text-sm text-graphite">
                  {field.hint}
                </p>
              ) : null}
              {error ? (
                <p id={`${fieldId}-err`} className="mt-2 text-sm text-error">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} tabIndex={-1} autoComplete="off" {...register("company")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="label mt-14 inline-flex h-14 w-full items-center justify-center gap-3 bg-charcoal px-8 text-linen transition-colors duration-[var(--duration-hover)] hover:bg-bronze disabled:cursor-wait disabled:opacity-80 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending
          </>
        ) : (
          <>
            Send inquiry
            <ArrowRight className="size-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
