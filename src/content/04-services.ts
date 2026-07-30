import type { ServiceRecord } from '../types';
export const servicesContent = {
  sectionId: 'services', heading: 'COMPLETE BUILDING SERVICES UNDER ONE ROOF',
  services: [
    { title: 'Complete Renovations', description: 'End-to-end property renovations and refurbishments.', icon: 'renovations' },
    { title: 'Building Extensions', description: 'Rear, side and double-storey extensions to create more space.', icon: 'extensions' },
    { title: 'Kitchens & Bathrooms', description: 'Design, supply and installation of beautiful kitchens and bathrooms.', icon: 'kitchen-bathroom' },
    { title: 'Interior Finishing', description: 'Plastering, flooring, carpentry, painting and decorating.', icon: 'interior-finishing' },
    { title: 'Exterior Works', description: 'Roofing, rendering, driveways, patios and landscaping.', icon: 'exterior-works' },
    { title: 'Electrical & Plumbing', description: 'Electrical installations, plumbing, heating and drainage.', icon: 'electrical-plumbing' },
    { title: 'Maintenance Services', description: 'Planned maintenance, repairs and landlord services.', icon: 'maintenance' },
    { title: 'Emergency Call-outs', description: 'Fast response for urgent building, plumbing and electrical issues.', icon: 'emergency-callout' },
  ] satisfies ServiceRecord[],
} as const;
