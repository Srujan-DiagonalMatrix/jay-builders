import type { ReasonRecord } from '../types';
export const whyJayContent = {
  sectionId: 'why-jay', heading: 'WHY CUSTOMERS CHOOSE JAY BUILDERS', reasons: [
    { title: 'Proven Work', description: 'See real projects, customer videos and before & after results before you decide.' },
    { title: 'One Team, Complete Delivery', description: 'We manage everything from start to finish so you don’t have to worry about a thing.' },
    { title: 'Exterior Works', description: 'Plastering, roofing, realistic guarantees and regular updates throughout your project.' },
    { title: 'Respect for Your Home', description: 'We keep your property clean, work carefully and minimise disruption.' },
  ] satisfies ReasonRecord[],
} as const;
