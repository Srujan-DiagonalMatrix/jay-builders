export interface ImageAsset {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

export function ResponsiveImage({ asset, alt, sizes, className }: { asset: ImageAsset; alt: string; sizes: string; className?: string }) {
  return <img className={className} src={asset.src} srcSet={asset.srcSet} sizes={sizes} width={asset.width} height={asset.height} alt={alt} loading="lazy" decoding="async"/>;
}
