export type SectionId = 'home' | 'customer-stories' | 'our-work' | 'services' | 'why-jay' | 'project-spotlight' | 'recommendations' | 'process' | 'contact' | 'urgent-assistance' | 'footer';

export interface NavigationItem { label: string; target: `#${SectionId}`; }
export interface Cta { label: string; target: `#${SectionId}` | `tel:${string}`; }
export interface TestimonialClaim { quote: string; attribution: string; verification: 'unverified'; }
export interface StoryRecord { title: string; location: string; durationLabel: string; }
export interface ProjectRecord { title: string; location: string; duration: string; }
export interface ServiceRecord { title: string; description: string; icon: string; }
export interface ReasonRecord { title: string; description: string; }
export interface ReviewRecord extends TestimonialClaim { rating: number; title: string; platform: string; }
export interface ProcessStep { order: number; title: string; description: string; }
export interface FormField { name: string; label: string; type: 'text' | 'email' | 'tel' | 'textarea' | 'file' | 'select'; required: boolean; options?: readonly string[]; accept?: readonly string[]; multiple?: boolean; }
export interface PlaceholderBusinessData { phoneLabel: string; phoneHref: `tel:${string}`; email: string; serviceArea: string; companyNumber: string; status: 'placeholder'; }
