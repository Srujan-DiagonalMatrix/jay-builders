export interface ImageAsset {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
}

export function ResponsiveImage({ asset, alt, sizes, className }: { asset: ImageAsset; alt: string; sizes: string; className?: string }) {
  return <img className={className} src={asset.src} srcSet={asset.srcSet} sizes={sizes} width={asset.width} height={asset.height} alt={alt} loading="lazy" decoding="async"/>;
import type { ImgHTMLAttributes } from 'react';
import type { ImageAsset } from '../content/image-manifest';
interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>,'src'|'srcSet'|'width'|'height'|'alt'|'loading'>{asset:ImageAsset;sizes:string;priority?:boolean}
export function ResponsiveImage({asset,sizes,priority=false,className,...props}:Props){
 const sourceSet=(format:'avif'|'webp')=>asset.variants.filter(v=>v.format===format).map(v=>`${v.src} ${v.width}w`).join(', ');
 const fallback=asset.variants.find(v=>v.format==='webp'&&v.width===1440);if(!fallback)throw new Error(`Missing WebP fallback for ${asset.id}`);
 return <picture className={className}><source type="image/webp" srcSet={sourceSet('webp')} sizes={sizes}/><source type="image/avif" srcSet={sourceSet('avif')} sizes={sizes}/><img {...props} src={fallback.src} srcSet={sourceSet('webp')} sizes={sizes} width={asset.width} height={asset.height} alt={asset.alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding={priority?'sync':'async'}/></picture>
}
