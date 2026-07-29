import type { PlaceholderBusinessData } from '../types';

export const placeholderBusinessData = { phoneLabel: '07000 900 123', phoneHref: 'tel:07000900123', email: 'info@jaybuilders.co.uk', serviceArea: 'Reading & Surrounding Areas', companyNumber: '12345678', status: 'placeholder' } satisfies PlaceholderBusinessData;

export const footerContent = {
  sectionId: 'footer',
  brand: 'JAY Builders',
  contactLabels: { phone: 'Phone', email: 'Email', serviceArea: 'Service Area' },
  columnHeadings: { contact: 'CONTACT', services: 'SERVICES', company: 'COMPANY', followUs: 'FOLLOW US' },
  services: ['Renovations', 'Extensions', 'Kitchens & Bathrooms', 'Interior Finishing', 'Exterior Works', 'Electrical & Plumbing', 'Maintenance', 'Emergency Call-outs', 'Structural Work'],
  company: [{ label: 'About Us', target: '#why-jay' }, { label: 'Testimonials', target: '#recommendations' }, { label: 'Privacy Policy' }, { label: 'Terms & Conditions' }],
  social: [
    { label: 'Facebook', url: 'https://www.facebook.com/jaybuildersuk', icon: 'facebook' },
    { label: 'Instagram', url: 'https://www.instagram.com/jaybuildersuk', icon: 'instagram' },
    { label: 'WhatsApp', url: 'https://wa.me/447000900123', icon: 'whatsapp' },
  ],
  legal: { copyright: '© 2026 JAY Builders. All rights reserved.', companyNumberLabel: 'Company No', insurance: 'Fully Insured' },
} as const;
