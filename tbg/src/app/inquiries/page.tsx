import type { Metadata } from "next";
import { inquiry, site } from "@content/site";
import { InquiryForm } from "@/components/inquiry-form";
import { Photo } from "@/components/photo";

export const metadata: Metadata = {
  title: "Inquiries",
  description:
    "Start a conversation with Thompson Building Group about building a custom home in Charlotte. 519 Fenton Place, Charlotte NC 28207. 704.202.4390.",
  alternates: { canonical: "/inquiries" },
};

export default function InquiriesPage() {
  const { contact } = site;
  return (
    <>
      <div className="grid lg:min-h-dvh lg:grid-cols-12">
        <div className="container-page pt-[calc(var(--header-h)+clamp(5rem,10vw,9rem))] pb-[var(--section)] lg:col-span-7 lg:pr-16">
          <p className="label text-bronze">Inquiries</p>
          <h1 className="mt-6 text-display text-charcoal">{inquiry.heading}</h1>
          <p className="mt-8 max-w-xl text-lede text-graphite">{inquiry.intro}</p>
          <div className="mt-16">
            <InquiryForm />
          </div>
        </div>

        <aside
          aria-label="Contact details"
          className="dark-surface relative flex min-h-[28rem] flex-col justify-end overflow-hidden bg-charcoal text-ember lg:col-span-5"
        >
          <Photo
            photo={{
              src: "/images/site/inquiries.webp",
              alt: "",
            }}
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover opacity-55"
          />
          <div className="relative space-y-8 p-[var(--gutter)] pb-16">
            <div>
              <p className="label text-ember-muted">Studio</p>
              <address className="mt-3 font-serif text-title not-italic">
                {contact.street}
                <br />
                {contact.city} {contact.region} {contact.postalCode}
              </address>
            </div>
            <div>
              <p className="label text-ember-muted">Telephone</p>
              <a href={contact.phoneHref} className="link-underline mt-3 inline-block font-serif text-title hover:text-gilt">
                {contact.phone}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
