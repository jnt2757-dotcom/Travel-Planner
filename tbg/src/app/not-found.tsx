import { TextLink } from "@/components/sections";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[80dvh] flex-col justify-center pt-[var(--header-h)]">
      <p className="label text-bronze">404</p>
      <h1 className="mt-6 max-w-[14ch] text-display text-charcoal">This page could not be found.</h1>
      <div className="mt-10">
        <TextLink href="/">Return home</TextLink>
      </div>
    </div>
  );
}
