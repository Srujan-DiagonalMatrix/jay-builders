import type { ReviewRecord } from '../types';
export const recommendationsContent = {
  sectionId: 'recommendations', heading: 'RECOMMENDED BY HOMEOWNERS & LANDLORDS',
  reviews: [
    { rating: 5, title: 'Full Property Renovation', quote: 'Reliable, professional and easy to communicate with. The project was completed to a very high standard.', attribution: 'Andrew, Reading', platform: 'Google', verification: 'unverified' },
    { rating: 5, title: 'Kitchen Extension', quote: 'Great team, tidy workers and excellent finish. We love our new kitchen and extra space.', attribution: 'Nisha, Windsor', platform: 'Checkatrade', verification: 'unverified' },
    { rating: 5, title: 'Bathroom Renovation', quote: 'Very happy with the workmanship and attention to detail. Would definitely recommend.', attribution: 'Paul, Slough', platform: 'Trustpilot', verification: 'unverified' },
    { rating: 5, title: 'Roof & Exterior Works', quote: 'Fixed our roof quickly and the rendering looks fantastic. Professional from start to finish.', attribution: 'Sarah, High Wycombe', platform: 'Houzz', verification: 'unverified' },
  ] satisfies ReviewRecord[],
} as const;
