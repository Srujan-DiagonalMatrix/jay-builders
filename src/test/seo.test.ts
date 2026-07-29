import { describe, expect, it } from 'vitest';
import { metadataFor, structuredDataFor } from '../seo/metadata';

describe('SEO metadata', () => {
  it('generates canonical and Open Graph values from the deployed origin', () => {
    const metadata = metadataFor('https://builders.test/path');
    expect(metadata.canonical).toBe('https://builders.test/');
    expect(metadata.openGraph.url).toBe(metadata.canonical);
    expect(metadata.title).toMatch(/^JAY Builders/);
    expect(metadata.description.length).toBeGreaterThan(50);
  });

  it('emits valid business and service nodes without placeholder facts', () => {
    const data = structuredDataFor('https://builders.test');
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@graph'].map(node => node['@type'])).toEqual(['LocalBusiness', 'Service']);
    expect(JSON.stringify(data)).not.toMatch(/07000|12345678|info@jaybuilders|placeholder/i);
  });

  it('includes Review only when explicitly supplied as verified', () => {
    const data = structuredDataFor('https://builders.test', [{ verified: true, author: 'Verified customer', body: 'Verified review text.', rating: 5 }]);
    expect(data['@graph'].at(-1)).toMatchObject({ '@type': 'Review', reviewBody: 'Verified review text.' });
  });
});
