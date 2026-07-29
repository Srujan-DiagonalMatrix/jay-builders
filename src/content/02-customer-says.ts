import type { StoryRecord } from '../types';
export const customerSaysContent = {
  sectionId: 'customer-stories', heading: 'SEE WHAT OUR CUSTOMERS SAY', subheading: 'REAL CUSTOMERS. REAL PROJECTS. REAL RESULTS.',
  stories: [
    { title: 'Complete Home Renovation', location: 'Reading', durationLabel: '1:02' },
    { title: 'Kitchen Extension', location: 'Maidenhead', durationLabel: '0:58' },
    { title: 'Bathroom Renovation', location: 'Slough', durationLabel: '1:15' },
  ] satisfies StoryRecord[],
  cta: { label: 'Watch More Customer Stories', target: '#recommendations' },
} as const;
