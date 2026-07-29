import type { ProjectRecord } from '../types';
export const ourWorkContent = {
  sectionId: 'our-work', heading: 'OUR WORK SPEAKS FOR ITSELF',
  projects: [
    { title: 'Full Property Renovation', location: 'Bracknell', duration: '8 Weeks' },
    { title: 'Rear Extension', location: 'Windsor', duration: '6 Weeks' },
    { title: 'Kitchen Transformation', location: 'Uxbridge', duration: '3 Weeks' },
    { title: 'Bathroom Renovation', location: 'Slough', duration: '2 Weeks' },
    { title: 'Driveway & Landscaping', location: 'Ascot', duration: '2 Weeks' },
    { title: 'Roofing & Exterior', location: 'High Wycombe', duration: '1 Week' },
  ] satisfies ProjectRecord[], cta: { label: 'View More Projects', target: '#contact' },
} as const;
