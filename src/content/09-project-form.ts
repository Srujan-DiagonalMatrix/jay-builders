import type { FormField } from '../types';
export const typeOfWorkOptions = ['Complete Renovation', 'Building Extension', 'Kitchen or Bathroom', 'Interior Finishing', 'Exterior Works', 'Electrical or Plumbing', 'Maintenance or Repairs', 'Emergency Call-out', 'Structural Work', 'Other'] as const;
export const preferredContactOptions = ['Phone', 'Email', 'WhatsApp'] as const;
export const projectFormContent = {
  sectionId: 'contact', heading: 'TELL US ABOUT YOUR PROJECT', intro: 'Share a few details and a member of the JAY Builders team will contact you.',
  fields: [
    { name: 'name', label: 'Full Name', type: 'text', required: true }, { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'phone', label: 'Phone Number', type: 'tel', required: true }, { name: 'postcode', label: 'Property Postcode', type: 'text', required: true },
    { name: 'work', label: 'Type of Work Required', type: 'select', required: true, options: typeOfWorkOptions },
    { name: 'start', label: 'Estimated Start Date', type: 'select', required: false }, { name: 'budget', label: 'Approximate Budget', type: 'select', required: false },
    { name: 'contactMethod', label: 'Preferred Contact Method', type: 'select', required: true, options: preferredContactOptions },
    { name: 'project', label: 'Project Description', type: 'textarea', required: true },
    { name: 'files', label: 'Upload Photos / Videos', type: 'file', required: false, multiple: true, accept: ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov'] },
  ] satisfies FormField[],
  cta: { label: 'Request My Free Consultation', target: '#contact' }, privacyNote: 'Your details will only be used to discuss your enquiry.',
} as const;
