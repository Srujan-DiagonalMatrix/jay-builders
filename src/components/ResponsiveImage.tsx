import type { ImgHTMLAttributes } from 'react';
import type { ImageAsset } from '../content/image-manifest';

interface Props
  extends Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    'src' | 'srcSet' | 'width' | 'height' | 'alt' | 'loading'
  > {
  asset: ImageAsset;
  sizes: string;
    priority?: boolean;
    staticSource?: { src: string; width: number; height: number };
}

export function ResponsiveImage({
  asset,
  sizes,
  priority = false,
  staticSource,
  className,
  ...props
}: Props) {
  const sourceSet = (format: 'avif' | 'webp') =>
    asset.variants
      .filter((variant) => variant.format === format)
      .map((variant) => `${variant.src} ${variant.width}w`)
      .join(', ');

  const fallback = asset.variants.find(
    (variant) => variant.format === 'webp' && variant.width === 1440,
  );

  if (!fallback) {
    throw new Error(`Missing WebP fallback for ${asset.id}`);
  }

  const image = (
    <img
      {...props}
      src={staticSource?.src ?? fallback.src}
      srcSet={staticSource ? undefined : sourceSet('webp')}
      sizes={staticSource ? undefined : sizes}
      width={staticSource?.width ?? asset.width}
      height={staticSource?.height ?? asset.height}
      alt={asset.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
    />
  );

  if (staticSource) return <picture className={className}>{image}</picture>;

  return (
    <picture className={className}>
      <source type="image/avif" srcSet={sourceSet('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={sourceSet('webp')} sizes={sizes} />
      {image}
    </picture>
  );
}
