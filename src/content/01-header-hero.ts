import type { NavigationItem, TestimonialClaim } from '../types';

export const headerHeroContent = {
  sectionId: 'home',
  navigation: [
    { label: 'Home', target: '#home' },
    { label: 'Our Work', target: '#our-work' },
    { label: 'Services', target: '#services' },
    { label: 'Reviews', target: '#recommendations' },
    { label: 'About', target: '#why-jay' },
    { label: 'Contact', target: '#contact' },
  ] satisfies NavigationItem[],
  primaryCta: { label: 'Request a Free Quote', target: '#contact' },
  headline: ['BUILDING TRUST.', 'DELIVERING QUALITY.'],
  subhead: ['COMPLETE RENOVATIONS, EXTENSIONS', 'AND PROPERTY SERVICES YOU CAN RELY ON.'],
  trustPoints: ['Fully Insured', 'Experienced Team', 'On Time, On Budget', 'Clear Quotations', 'Quality Workmanship', 'Emergency Call-outs'],
  secondaryCta: { label: 'View Our Work', target: '#our-work' },
  featuredCustomerQuote: {
    quote: 'JAY Builders transformed our home beautifully and the whole process was smooth and stress-free.',
    attribution: 'Sarah & Mark, London',
    verification: 'unverified',
  } satisfies TestimonialClaim,
} as const;
