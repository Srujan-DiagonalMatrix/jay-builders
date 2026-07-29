import { render, screen } from '@testing-library/react';
import { existsSync, readFileSync } from 'node:fs';
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

  it('declares every generated master and variant without committing binaries', () => {
    for (const asset of imageManifest) {
      expect(asset.sourceFilename).toBe(`${asset.id}.png`);
      for (const variant of asset.variants) {
        expect(variant.src).toBe(`/assets/images/${asset.id}-${variant.width}.${variant.format}`);
        expect(variant.height).toBeGreaterThan(0);
      }
    }
    expect(existsSync('public/assets/icons/emergency-callout.svg')).toBe(true);
    expect(readFileSync('.gitignore', 'utf8')).toContain('public/assets/images/');
    expect(readFileSync('.gitignore', 'utf8')).toContain('deliverables/*.zip');
  });

  it('stores the story 02 master as reproducible text instead of a binary', () => {
    const encoded = readFileSync(
      'assets-source/customer-stories/CustomerSays-story-02.png.base64',
      'utf8',
    );
    expect(encoded).toMatch(/^[A-Za-z0-9+/=\s]+$/);

    const png = Buffer.from(encoded, 'base64');
    expect(png.subarray(0, 8).toString('hex')).toBe('89504e470d0a1a0a');
    expect(png.readUInt32BE(16)).toBe(1440);
    expect(png.readUInt32BE(20)).toBe(810);
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

  it('renders the supplied Complete Home Renovation thumbnail without a network dependency', () => {
    render(<CustomerStories/>);
    const thumbnail = screen.getByAltText('Complete Home Renovation customer story');
    expect(thumbnail.getAttribute('src')).toMatch(/^data:image\/png;base64,/);
    expect(thumbnail).toHaveAttribute('width', '1672');
    expect(thumbnail).toHaveAttribute('height', '941');
  });

  it('lazy-loads below-the-fold photography', () => {
    render(<CustomerStories/>);
    for (const image of screen.getAllByRole('img')) expect(image).toHaveAttribute('loading', 'lazy');
  });
});
