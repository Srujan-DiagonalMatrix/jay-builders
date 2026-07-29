import { render, screen } from '@testing-library/react';
import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { Hero } from '../components/Hero';
import { CustomerStories } from '../components/CustomerStories';
import { UrgentAssistance } from '../components/UrgentAssistance';
import { ProjectSpotlight } from '../components/ProjectSpotlight';
import { ProjectGallery } from '../components/ProjectGallery';
import { imageManifest } from '../content/image-manifest';

describe('production asset contract', () => {
  it('has a complete, unique manifest with required metadata', () => {
    expect(imageManifest).toHaveLength(22);
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

  it('uses the supplied Project Spotlight sources with stable generated URLs', () => {
    render(<ProjectSpotlight/>);
    const image = screen.getByAltText('Renovated open-plan kitchen with a central island, dining area and garden doors');
    const assets = imageManifest.filter(({ id }) => id.startsWith('OutdatedProp-spotlight-'));

    const encodedSource = readFileSync('assets-source/images/spotlight/main.png.base64', 'utf8');
    const source = Buffer.from(encodedSource.replace(/\s/g, ''), 'base64');
    expect(source.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
    expect([source.readUInt32BE(16), source.readUInt32BE(20)]).toEqual([728, 524]);
    expect(assets).toHaveLength(5);
    expect(assets[0]).toMatchObject({
      sourceFilename: 'main.png',
      width: 728,
      height: 524,
      cropRatio: '182:131',
      classification: 'meaningful',
    });
    expect(image).toHaveAttribute('sizes', '(max-width: 1024px) 100vw, 48vw');
    expect(image.getAttribute('src')).toMatch(/^data:image\/png;base64,/);
    for (const asset of assets) {
      for (const variant of asset.variants) {
        expect(variant.src).toBe(`/assets/images/${asset.id}-${variant.width}.${variant.format}`);
      }
    }
  });

  it('declares every generated master and variant without committing binaries', () => {
    for (const asset of imageManifest) {
      for (const variant of asset.variants) {
        expect(variant.src).toBe(`/assets/images/${asset.id}-${variant.width}.${variant.format}`);
        expect(variant.height).toBeGreaterThan(0);
      }
    }
    expect(existsSync('public/assets/icons/emergency-callout.svg')).toBe(true);
    expect(readFileSync('.gitignore', 'utf8')).toContain('public/assets/images/');
    expect(readFileSync('.gitignore', 'utf8')).toContain('deliverables/*.zip');
  });

  it('ships the JAY Builders logo as a public PNG asset', () => {
    const encodedLogo = readFileSync('requirements/image-assets/JayLogo.png.base64', 'utf8');
    const logo = Buffer.from(encodedLogo.replace(/\s/g, ''), 'base64');
    expect(logo.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
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

  it('renders the supplied Kitchen Extension thumbnail without a network dependency', () => {
    const { container } = render(<CustomerStories/>);
    const thumbnail = screen.getByAltText('Kitchen Extension customer story');
    const source = thumbnail.getAttribute('src') ?? '';
    const decoded = Buffer.from(source.split(',')[1], 'base64');

    expect(source).toMatch(/^data:image\/png;base64,/);
    expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([1672, 941]);
    expect(thumbnail).toHaveAttribute('width', '1672');
    expect(thumbnail).toHaveAttribute('height', '941');
    expect(container.querySelectorAll('.play-icon')).toHaveLength(0);
  });

  it('renders the supplied Bathroom Renovation thumbnail without a network dependency', () => {
    render(<CustomerStories/>);
    const thumbnail = screen.getByAltText('Bathroom Renovation customer story');
    const source = thumbnail.getAttribute('src') ?? '';
    const decoded = Buffer.from(source.split(',')[1], 'base64');

    expect(source).toMatch(/^data:image\/png;base64,/);
    expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([1672, 941]);
    expect(thumbnail).toHaveAttribute('width', '1672');
    expect(thumbnail).toHaveAttribute('height', '941');
  });

  it('renders the supplied Full Property Renovation thumbnail without a binary-file dependency', () => {
    render(<ProjectGallery/>);
    const thumbnail = screen.getByAltText('Full property renovation before and after');
    const source = thumbnail.getAttribute('src') ?? '';
    const decoded = Buffer.from(source.split(',')[1], 'base64');

    expect(source).toMatch(/^data:image\/png;base64,/);
    expect(decoded.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([1578, 997]);
    expect(thumbnail).toHaveAttribute('width', '1578');
    expect(thumbnail).toHaveAttribute('height', '997');
  });

  it('renders the supplied Bathroom Renovation project thumbnail without a binary-file dependency', () => {
    render(<ProjectGallery/>);
    const thumbnail = screen.getByAltText('Bathroom renovation before and after');
    const source = thumbnail.getAttribute('src') ?? '';
    const decoded = Buffer.from(source.split(',')[1], 'base64');

    expect(source).toMatch(/^data:image\/png;base64,/);
    expect(decoded.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([1528, 1029]);
    expect(thumbnail).toHaveAttribute('width', '1528');
    expect(thumbnail).toHaveAttribute('height', '1029');
    expect(thumbnail).toHaveAttribute('loading', 'lazy');
  });

  it('renders the supplied urgent-assistance image without a generated-file dependency', () => {
    const { container } = render(<UrgentAssistance/>);
    const image = container.querySelector('.urgent-media img');
    const source = image?.getAttribute('src') ?? '';
    const decoded = Buffer.from(source.split(',')[1], 'base64');

    expect(source).toMatch(/^data:image\/png;base64,/);
    expect(decoded.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
    expect([decoded.readUInt32BE(16), decoded.readUInt32BE(20)]).toEqual([732, 436]);
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('lazy-loads below-the-fold photography', () => {
    render(<CustomerStories/>);
    for (const image of screen.getAllByRole('img')) expect(image).toHaveAttribute('loading', 'lazy');
  });
});
