"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { imageSizes } from "@content/image-sizes";
import type { Photo } from "@content/types";

// Widths from Next's default deviceSizes, served by the built-in image optimizer.
const WIDTHS = [828, 1200, 1920, 2048];

function toSlide(photo: Photo) {
  const { width, height } = imageSizes[photo.src];
  return {
    src: `/_next/image?url=${encodeURIComponent(photo.src)}&w=1920&q=75`,
    alt: photo.alt,
    description: photo.alt,
    width,
    height,
    srcSet: WIDTHS.filter((w) => w <= Math.max(width, WIDTHS[0])).map((w) => ({
      src: `/_next/image?url=${encodeURIComponent(photo.src)}&w=${w}&q=75`,
      width: w,
      height: Math.round((height * w) / width),
    })),
  };
}

export default function GalleryLightbox({
  photos,
  index,
  title,
  onClose,
}: {
  photos: Photo[];
  index: number;
  title: string;
  onClose: () => void;
}) {
  return (
    <Lightbox
      open={index >= 0}
      index={Math.max(index, 0)}
      close={onClose}
      slides={photos.map(toSlide)}
      plugins={[Captions, Counter]}
      captions={{ descriptionTextAlign: "center" }}
      labels={{ Lightbox: `${title} gallery` }}
      animation={{ fade: 400, swipe: 450 }}
      controller={{ closeOnBackdropClick: true }}
      styles={{
        container: { backgroundColor: "rgb(37 35 32 / 0.97)" },
        captionsDescriptionContainer: { backgroundColor: "transparent", paddingBottom: "2rem" },
        captionsDescription: { fontFamily: "var(--font-manrope)", color: "#e9e2d6", fontSize: "0.9375rem" },
      }}
    />
  );
}
