import Image from "next/image";
import type { CSSProperties } from "react";

type PortfolioImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  style?: CSSProperties;
  /** Keep native pixels — no optimizer downscale (diagrams, screenshots) */
  unoptimized?: boolean;
};

function isSvg(src: string) {
  return src.toLowerCase().endsWith(".svg");
}

/** Local SVGs must bypass next/image — the optimizer breaks inline styles and triggers download. */
export function PortfolioImage({
  src,
  alt,
  width = 720,
  height = 480,
  fill,
  className,
  sizes,
  priority,
  style,
  unoptimized,
}: PortfolioImageProps) {
  if (isSvg(src)) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className={className}
          style={{ ...style, objectFit: "contain", width: "100%", height: "100%" }}
        />
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{ maxWidth: "100%", height: "auto", ...style }}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={unoptimized}
      style={style}
    />
  );
}
