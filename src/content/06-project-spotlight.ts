import type { TestimonialClaim } from '../types';
export const projectSpotlightContent = {
  sectionId: 'project-spotlight', eyebrow: 'PROJECT SPOTLIGHT', heading: ['From Outdated Property', 'to Modern Family Home'],
  body: 'This complete renovation included structural alterations, a new kitchen, bathrooms, flooring, electrical, plumbing, heating and full interior finishing.',
  scope: ['Structural wall removal & RSJ installation', 'New kitchen & utility room', 'Two new bathrooms', 'Full electrical rewire & new heating system', 'Flooring, plastering & decoration', 'Exterior improvements'],
  testimonial: { quote: 'Having one team manage the whole project made the experience much easier. The quality of the finish exceeded our expectations.', attribution: 'James & Lisa, Bracknell', verification: 'unverified' } satisfies TestimonialClaim,
  cta: { label: 'Speak to Us for Your Free Consultation', target: '#contact' },
} as const;
