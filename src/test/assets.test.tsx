import { render, screen } from '@testing-library/react';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';
import { Hero } from '../components/Hero';
import { CustomerStories } from '../components/CustomerStories';
import { imageManifest } from '../content/image-manifest';

describe('production asset contract', () => {
  it('has a complete, unique manifest with required metadata', () => {
    expect(imageManifest).toHaveLength(20);
    expect(new Set(imageManifest.map(asset => asset.id)).size).toBe(imageManifest.length);
    for (const asset of imageManifest) {
      expect(asset.sourceFilename).toMatch(/\.png$/);
      expect(asset.cropRatio).toMatch(/^\d+:\d+$/);
      expect(Number.isFinite(asset.focalPoint.x)).toBe(true);
      expect(Number.isFinite(asset.focalPoint.y)).toBe(true);
      expect(asset.width).toBeGreaterThan(0);
      expect(asset.height).toBeGreaterThan(0);
      expect(asset.classification === 'decorative' ? asset.alt === '' : asset.alt.length > 0).toBe(true);
      expect(new Set(asset.variants.map(variant => variant.format))).toEqual(new Set(['avif', 'webp']));
      expect(asset.variants).toHaveLength(6);
    }
  });

  it('puts every declared variant on disk with its format and dimensions', () => {
    for (const asset of imageManifest) {
      expect(asset.sourceFilename).toBe(`${asset.id}.png`);
      for (const variant of asset.variants) {
        expect(variant.src).toBe(`/assets/images/${asset.id}-${variant.width}.${variant.format}`);
        expect(variant.height).toBeGreaterThan(0);
        const path = `public${variant.src}`;
        expect(existsSync(path), path).toBe(true);
        expect(statSync(path).size, path).toBeGreaterThan(0);
        const metadata = execFileSync('php', ['-r', '$i=getimagesize($argv[1]); echo "$i[0]x$i[1] $i[mime]";', path], {encoding:'utf8'});
        expect(metadata).toBe(`${variant.width}x${variant.height} image/${variant.format}`);
      }
    }
    expect(existsSync('public/assets/icons/emergency-callout.svg')).toBe(true);
    expect(readFileSync('.gitignore', 'utf8')).toContain('public/assets/images/');
    expect(readFileSync('.gitignore', 'utf8')).toContain('deliverables/*.zip');
  });

  it('gives the hero eager loading and high fetch priority with explicit dimensions', () => {
    render(<Hero/>);
    const hero = screen.getByAltText('Contemporary kitchen after a complete renovation');
    expect(hero).toHaveAttribute('loading', 'eager');
    expect(hero).toHaveAttribute('fetchpriority', 'high');
    expect(hero).toHaveAttribute('width', '1440');
    expect(hero).toHaveAttribute('height', '810');
    expect(hero).toHaveAttribute('srcset');
    expect(hero).toHaveAttribute('sizes', '100vw');
  });

  it('lazy-loads below-the-fold photography', () => {
    render(<CustomerStories/>);
    for (const image of screen.getAllByRole('img')) expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('renders complete customer-story responsive images before opening a modal', () => {
    render(<CustomerStories/>);
    const descriptions = ['Completed open-plan kitchen renovation', 'Completed rear kitchen extension', 'Completed modern bathroom renovation'];
    for (const description of descriptions) {
      const image = screen.getByAltText(description);
      expect(image.getAttribute('src')).toMatch(/^\/assets\/images\/.+\.webp$/);
      expect(image.getAttribute('srcset')).toContain('480w');
      expect(image.getAttribute('srcset')).toContain('960w');
      expect(image.getAttribute('srcset')).toContain('1440w');
      expect(image.closest('picture')?.querySelector('source[type="image/avif"]')?.getAttribute('srcset')).toContain('1440w');
    }
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
