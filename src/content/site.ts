import type { FormField, NavigationItem, SectionId, SiteContent } from '../types';

export const sectionOrder = ['home', 'customer-stories', 'our-work', 'services', 'why-jay', 'project-spotlight', 'recommendations', 'process', 'contact', 'urgent-assistance', 'footer'] as const satisfies readonly SectionId[];
export const navigation: NavigationItem[] = sectionOrder.filter((id) => id !== 'urgent-assistance' && id !== 'footer').map((id) => ({ label: id.replaceAll('-', ' '), target: `#${id}` }));
export const formFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'project', label: 'Tell us about your project', type: 'textarea', required: true },
  { name: 'files', label: 'Project photos or videos', type: 'file', required: false, accept: ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov'] },
];
export const siteContent: SiteContent = { navigation, stories: [], projects: [], services: [], reviews: [], processSteps: [], formFields };
