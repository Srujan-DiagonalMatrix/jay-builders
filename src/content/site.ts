import type { FormField, NavigationItem, ProcessStep, SectionId } from '../types';

export const sectionOrder = ['home', 'customer-stories', 'our-work', 'services', 'why-jay', 'project-spotlight', 'recommendations', 'process', 'contact', 'urgent-assistance', 'footer'] as const satisfies readonly SectionId[];

export const navigation: NavigationItem[] = [
  { label: 'Home', target: '#home' }, { label: 'Our Work', target: '#our-work' },
  { label: 'Services', target: '#services' }, { label: 'Reviews', target: '#recommendations' },
  { label: 'About', target: '#why-jay' }, { label: 'Contact', target: '#contact' },
];

export const stories = [
  { title: 'Complete Home Renovation', location: 'Reading', duration: '1:02' },
  { title: 'Kitchen Extension', location: 'Maidenhead', duration: '0:58' },
  { title: 'Bathroom Renovation', location: 'Slough', duration: '1:15' },
];
export const projects = [
  ['Full Property Renovation', 'Bracknell', '8 Weeks'], ['Rear Extension', 'Windsor', '6 Weeks'],
  ['Kitchen Transformation', 'Uxbridge', '3 Weeks'], ['Bathroom Renovation', 'Slough', '2 Weeks'],
  ['Driveway & Landscaping', 'Ascot', '2 Weeks'], ['Roofing & Exterior', 'High Wycombe', '1 Week'],
];
export const services = [
  ['Complete Renovations', 'End-to-end property renovations and refurbishments.', 'renovations'],
  ['Building Extensions', 'Rear, side and double-storey extensions to create more space.', 'extensions'],
  ['Kitchens & Bathrooms', 'Design, supply and installation of beautiful kitchens and bathrooms.', 'kitchen-bathroom'],
  ['Interior Finishing', 'Plastering, flooring, carpentry, painting and decorating.', 'interior-finishing'],
  ['Exterior Works', 'Roofing, rendering, driveways, patios and landscaping.', 'exterior-works'],
  ['Electrical & Plumbing', 'Electrical installations, plumbing, heating and drainage.', 'electrical-plumbing'],
  ['Maintenance Services', 'Planned maintenance, repairs and landlord services.', 'maintenance'],
  ['Emergency Call-outs', 'Fast response for urgent building, plumbing and electrical issues.', 'emergency-callout'],
  ['Structural Work', 'Foundations, RSJs, damp proofing and underpinning.', 'structural'],
];
export const reasons = [
  ['Proven Work', 'See real projects, customer videos and before & after results before you decide.'],
  ['One Team, Complete Delivery', 'We manage everything from start to finish so you don’t have to worry about a thing.'],
  ['Exterior Works', 'Plastering, roofing, realistic guarantees and regular updates throughout your project.'],
  ['Respect for Your Home', 'We keep your property clean, work carefully and minimise disruption.'],
];
export const reviews = [
  ['Full Property Renovation', 'Reliable, professional and easy to communicate with. The project was completed to a very high standard.', 'Andrew, Reading', 'Google'],
  ['Kitchen Extension', 'Great team, tidy workers and excellent finish. We love our new kitchen and extra space.', 'Nisha, Windsor', 'Checkatrade'],
  ['Bathroom Renovation', 'Very happy with the workmanship and attention to detail. Would definitely recommend.', 'Paul, Slough', 'Trustpilot'],
  ['Roof & Exterior Works', 'Fixed our roof quickly and the rendering looks fantastic. Professional from start to finish.', 'Sarah, High Wycombe', 'Houzz'],
];
export const processSteps: ProcessStep[] = [
  { id: 'tell', order: 1, title: 'Tell Us About Your Project', description: 'Fill in the form and send us photos or videos of your property.' },
  { id: 'visit', order: 2, title: 'Site Visit & Quotation', description: 'We assess the work, discuss your needs and provide a clear quotation.' },
  { id: 'delivery', order: 3, title: 'Planning & Delivery', description: 'We agree the schedule, organise the work and keep you updated throughout.' },
  { id: 'handover', order: 4, title: 'Completion & Handover', description: 'We inspect the work with you and ensure everything is perfect before handover.' },
];
const workOptions = ['Complete Renovation', 'Building Extension', 'Kitchen or Bathroom', 'Interior Finishing', 'Exterior Works', 'Electrical or Plumbing', 'Maintenance or Repairs', 'Emergency Call-out', 'Structural Work', 'Other'];
export const formFields: FormField[] = [
  { name: 'name', label: 'Full Name', type: 'text', required: true }, { name: 'email', label: 'Email Address', type: 'email', required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true }, { name: 'postcode', label: 'Property Postcode', type: 'text', required: true },
  { name: 'work', label: 'Type of Work Required', type: 'select', required: true, options: workOptions },
  { name: 'start', label: 'Estimated Start Date', type: 'select', required: false, options: ['As soon as possible', 'Within 1–3 months', 'Within 3–6 months', 'Just researching'] },
  { name: 'budget', label: 'Approximate Budget', type: 'select', required: false, options: ['Under £10,000', '£10,000–£25,000', '£25,000–£50,000', 'Over £50,000'] },
  { name: 'contactMethod', label: 'Preferred Contact Method', type: 'select', required: true, options: ['Phone', 'Email', 'WhatsApp'] },
  { name: 'project', label: 'Project Description', type: 'textarea', required: true },
  { name: 'files', label: 'Upload Photos / Videos', type: 'file', required: false, accept: ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov'] },
];
export const siteContent = { navigation, stories: [], projects: [], services: [], reviews: [], processSteps, formFields };
