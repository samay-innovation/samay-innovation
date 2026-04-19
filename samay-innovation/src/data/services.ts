// Services data for Samay Innovation
export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Turnkey Solutions',
    icon: 'key',
    description: 'Complete end-to-end interior design services from concept to completion.',
    features: [
      'Complete project management',
      'Vendor coordination',
      'Quality control',
      'Timely delivery',
    ],
  },
  {
    id: '2',
    name: 'Space Planning',
    icon: 'layout',
    description: 'Strategic space optimization to maximize functionality and flow.',
    features: [
      'Functional layouts',
      'Traffic flow analysis',
      'Furniture placement',
      '3D visualization',
    ],
  },
  {
    id: '3',
    name: '3D Visualization',
    icon: 'box',
    description: 'Photorealistic 3D renders that bring your vision to life.',
    features: [
      'Photorealistic renders',
      'Virtual walkthroughs',
      'Material visualization',
      'Lighting simulation',
    ],
  },
  {
    id: '4',
    name: 'Interior Design',
    icon: 'palette',
    description: 'Bespoke interior design solutions tailored to your unique style.',
    features: [
      'Custom design concepts',
      'Material selection',
      'Color consultation',
      'Style curation',
    ],
  },
  {
    id: '5',
    name: 'Furniture Sourcing',
    icon: 'sofa',
    description: 'Access to premium furniture and decor from leading brands worldwide.',
    features: [
      'Custom furniture design',
      'Global sourcing',
      'Quality assurance',
      'Installation services',
    ],
  },
  {
    id: '6',
    name: 'Project Management',
    icon: 'clipboard-list',
    description: 'Professional project management ensuring on-time, on-budget delivery.',
    features: [
      'Timeline management',
      'Budget control',
      'Contractor coordination',
      'Regular updates',
    ],
  },
];
