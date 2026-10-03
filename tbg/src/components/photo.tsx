import Image, { type ImageProps } from "next/image";
import { imageSizes } from "@content/image-sizes";
import type { Photo as PhotoData } from "@content/types";

type PhotoProps = Omit<ImageProps, "src" | "alt" | "width" | "height" | "priority"> & {
  photo: PhotoData;
  /** Above-the-fold / likely LCP image: load eagerly at high fetch priority. */
  priority?: boolean;
};

/** next/image with intrinsic dimensions looked up from the generated manifest. */
export function Photo({ photo, fill, sizes, priority, ...props }: PhotoProps) {
  const dims = fill ? {} : imageSizes[photo.src];
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill={fill}
      sizes={sizes ?? "100vw"}
      {...dims}
      {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      {...props}
    />
  );
}
