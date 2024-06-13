'use client'

import { useState } from 'react';
import Image from 'next/image';
import cn from 'clsx';

/**
 * @description Must set width and height, if not add layout='fill'
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export function NextImage({
  src,
  alt,
  width,
  height,
  children,
  className,
  useSkeleton,
  imgClassName,
  previewCount,
  blurClassName,
  ...rest
}) {
  const [loading, setLoading] = useState(!!useSkeleton);

  const handleLoad = () => setLoading(false);

  return (
    <figure style={{ width }} className={className}>
      <Image
        className={cn(
          imgClassName,
          loading
            ? blurClassName ??
                'animate-pulse bg-light-secondary dark:bg-dark-secondary'
            : previewCount === 1
            ? '!h-auto !min-h-0 !w-auto !min-w-0 rounded-lg object-contain'
            : 'object-cover'
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={handleLoad}
        layout='responsive'
        {...rest}
      />
      {children}
    </figure>
  );
}
