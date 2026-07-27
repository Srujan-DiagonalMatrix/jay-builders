export type SectionId = 'home' | 'customer-stories' | 'our-work' | 'services' | 'why-jay' | 'project-spotlight' | 'recommendations' | 'process' | 'contact' | 'urgent-assistance' | 'footer';

export interface NavigationItem { label: string; target: `#${SectionId}`; }
export interface ResponsiveImage { src: string; alt: string; width: number; height: number; srcSet?: string; sizes?: string; loading?: 'eager' | 'lazy'; }
export interface Story { id: string; title: string; quote: string; attribution?: string; media: ResponsiveImage; videoUrl?: string; }
export interface Project { id: string; title: string; category: string; images: ResponsiveImage[]; description?: string; }
export interface Service { id: string; title: string; description: string; icon?: ResponsiveImage; }
export interface Review { id: string; quote: string; author: string; platform?: string; rating?: number; verified: boolean; }
export interface ProcessStep { id: string; order: number; title: string; description: string; }
export interface FormField { name: string; label: string; type: 'text' | 'email' | 'tel' | 'textarea' | 'file' | 'select'; required: boolean; options?: readonly string[]; accept?: readonly string[]; }
export interface SiteContent { navigation: NavigationItem[]; stories: Story[]; projects: Project[]; services: Service[]; reviews: Review[]; processSteps: ProcessStep[]; formFields: FormField[]; }
