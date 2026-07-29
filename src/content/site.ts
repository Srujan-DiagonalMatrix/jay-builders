import type { SectionId } from '../types';
export { headerHeroContent } from './01-header-hero';
export { customerSaysContent } from './02-customer-says';
export { ourWorkContent } from './03-our-work';
export { servicesContent } from './04-services';
export { whyJayContent } from './05-why-jay';
export { projectSpotlightContent } from './06-project-spotlight';
export { recommendationsContent } from './07-recommendations';
export { processContent } from './08-process';
export { projectFormContent, preferredContactOptions, typeOfWorkOptions } from './09-project-form';
export { urgentAssistanceContent } from './10-urgent-assistance';
export { footerContent, placeholderBusinessData } from './11-footer';

export const sectionOrder = ['home', 'customer-stories', 'our-work', 'services', 'why-jay', 'project-spotlight', 'recommendations', 'process', 'contact', 'urgent-assistance', 'footer'] as const satisfies readonly SectionId[];
