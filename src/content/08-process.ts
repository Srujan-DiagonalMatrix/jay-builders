import type { ProcessStep } from '../types';
export const processContent = { sectionId: 'process', heading: 'A CLEAR & SIMPLE PROCESS', steps: [
  { order: 1, title: 'Tell Us About Your Project', description: 'Fill in the form and send us photos or videos of your property.' },
  { order: 2, title: 'Site Visit & Quotation', description: 'We assess the work, discuss your needs and provide a clear quotation.' },
  { order: 3, title: 'Planning & Delivery', description: 'We agree the schedule, organise the work and keep you updated throughout.' },
  { order: 4, title: 'Completion & Handover', description: 'We inspect the work with you and ensure everything is perfect before handover.' },
] satisfies ProcessStep[] } as const;
