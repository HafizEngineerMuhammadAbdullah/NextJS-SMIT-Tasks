import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

function SanityImage({
  image,
  alt,
  width = 1600,
  height = 1000,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 60vw, 100vw",
}) {
  const src = urlForImage(image, { width, height });
  const description = alt || image?.alt || "";

  if (!src) {
    return (
      <div className={cn("flex h-full w-full items-end bg-[#e7e1d4] p-5 dark:bg-[#2a2a26]", className)}>
        <span className="eyebrow">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={description}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}

export { SanityImage };
