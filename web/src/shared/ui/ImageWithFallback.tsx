"use client";

import type { ImageProps } from "next/image";
import Image from "next/image";
import { useState } from "react";
import { Icon } from "./Icon";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "onError"> {
  src: string | null | undefined;
  fallbackIconSize?: number;
  containerClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackIconSize = 64,
  containerClassName = "",
  className = "",
  sizes,
  ...imageProps
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const hasValidImage = src && !imageError;

  return (
    <>
      {hasValidImage ? (
        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          onError={() => setImageError(true)}
          className={className}
          {...imageProps}
        />
      ) : (
        <div className={`flex items-center justify-center w-full h-full ${containerClassName}`}>
          <Icon name="emptyImage" size={fallbackIconSize} disableCurrentColor />
        </div>
      )}
    </>
  );
}
