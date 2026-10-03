"use client";

// Modelled on the 21st.dev "Grayscale Mosaic Gallery" idea (mosaic tiles that
// open a captioned lightbox), rebuilt for TBG: an asymmetric editorial mosaic,
// lazy-loaded next/image tiles, and a lightbox that is only downloaded on first open.
import { useState } from "react";
import dynamic from "next/dynamic";
import { Expand } from "lucide-react";
import type { Photo as PhotoData } from "@content/types";
import { Photo } from "@/components/photo";
import { cn } from "@/lib/utils";

const GalleryLightbox = dynamic(() => import("./gallery-lightbox"), { ssr: false });

const spans = ["md:col-span-8", "md:col-span-4", "md:col-span-5", "md:col-span-7"];
const ratios = ["aspect-[3/2]", "aspect-[4/5]", "aspect-[4/5]", "aspect-[3/2]"];

export function ProjectGallery({ photos, title }: { photos: PhotoData[]; title: string }) {
  const [index, setIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);

  const open = (i: number) => {
    setLoaded(true);
    setIndex(i);
  };

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-12 md:gap-8">
        {photos.map((photo, i) => (
          <li key={photo.src} className={cn(spans[i % 4], photos.length === 1 && "md:col-span-12")}>
            <button
              type="button"
              onClick={() => open(i)}
              onPointerEnter={() => setLoaded(true)}
              className="group relative block w-full cursor-zoom-in overflow-hidden bg-stone text-left"
              aria-label={`Open image ${i + 1} of ${photos.length}: ${photo.alt}`}
            >
              <span data-reveal-image className={cn("relative block", ratios[i % 4])}>
                <Photo
                  photo={photo}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover transition-transform duration-[var(--duration-image)] ease-[var(--ease-arrive)] group-hover:scale-[1.03]"
                />
              </span>
              <span className="absolute right-4 bottom-4 inline-flex size-11 items-center justify-center bg-linen/85 text-charcoal opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-4" aria-hidden="true" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {loaded ? (
        <GalleryLightbox
          photos={photos}
          index={index}
          title={title}
          onClose={() => setIndex(-1)}
        />
      ) : null}
    </>
  );
}
