export const PAGE_TITLE = 'JAY Builders | Renovations, Extensions & Property Services';
export const PAGE_DESCRIPTION = 'Trusted building, renovation, extension, maintenance and emergency property services in Reading and surrounding areas.';

export type VerifiedReview = {
  verified: true;
  author: string;
  body: string;
  rating: number;
};

export type SeoMetadata = {
  title: string;
  description: string;
  canonical: string;
  openGraph: { title: string; description: string; type: 'website'; url: string };
};

export function metadataFor(origin: string): SeoMetadata {
  const canonical = new URL('/', origin).href;
  return { title: PAGE_TITLE, description: PAGE_DESCRIPTION, canonical, openGraph: { title: PAGE_TITLE, description: PAGE_DESCRIPTION, type: 'website', url: canonical } };
}

/**
 * Produces only facts approved by the supplied specification. Contact details,
 * identifiers, ratings and testimonials are deliberately opt-in.
 */
export function structuredDataFor(origin: string, reviews: readonly VerifiedReview[] = []) {
  const url = new URL('/', origin).href;
  const business = { '@type': 'LocalBusiness', '@id': `${url}#business`, name: 'JAY Builders', url };
  const service = {
    '@type': 'Service',
    '@id': `${url}#building-services`,
    name: 'Building, renovation, extension and property services',
    serviceType: ['Renovations', 'Extensions', 'Property maintenance', 'Emergency property services'],
    areaServed: { '@type': 'AdministrativeArea', name: 'Reading and surrounding areas' },
    provider: { '@id': business['@id'] },
  };
  const reviewNodes = reviews.map(review => ({
    '@type': 'Review',
    reviewBody: review.body,
    author: { '@type': 'Person', name: review.author },
    reviewRating: { '@type': 'Rating', ratingValue: review.rating, bestRating: 5, worstRating: 1 },
    itemReviewed: { '@id': business['@id'] },
  }));
  return { '@context': 'https://schema.org', '@graph': [business, service, ...reviewNodes] };
}
