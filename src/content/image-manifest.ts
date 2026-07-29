import type { ImageAsset } from '../components/ResponsiveImage';

const storyImages = {
  'CustomerSays-story-01': { src: '/assets/images/customer-story-renovation.svg', width: 640, height: 360 },
  'CustomerSays-story-02': { src: '/assets/images/customer-story-extension.svg', width: 640, height: 360 },
  'CustomerSays-story-03': { src: '/assets/images/customer-story-bathroom.svg', width: 640, height: 360 },
} as const satisfies Record<string, ImageAsset>;

export type ImageAssetKey = keyof typeof storyImages;

export function getImageAsset(key: ImageAssetKey): ImageAsset {
  return storyImages[key];
}
