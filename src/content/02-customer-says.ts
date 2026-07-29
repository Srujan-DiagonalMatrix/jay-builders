import type { StoryRecord } from '../types';
export const customerSaysContent = {
  sectionId: 'customer-stories', heading: 'SEE WHAT OUR CUSTOMERS SAY', subheading: 'REAL CUSTOMERS. REAL PROJECTS. REAL RESULTS.',
  stories: [
    { title: 'Complete Home Renovation', location: 'Reading', durationLabel: '1:02', youtubeVideoId: 'pU5kvweq-EE' },
    { title: 'Kitchen Extension', location: 'Maidenhead', durationLabel: '0:58', youtubeVideoId: 'Jw7s42Op2ao' },
    { title: 'Bathroom Renovation', location: 'Slough', durationLabel: '1:15', youtubeVideoId: 'tOwjEOt1zYU' },
  ] satisfies StoryRecord[],
  cta: { label: 'Watch More Customer Stories', target: '#recommendations' },
} as const;
