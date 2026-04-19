import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLOUDINARY_JSON = path.join(__dirname, '../src/data/cloudinary-urls.json');
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects.ts');

const cloudinary = JSON.parse(fs.readFileSync(CLOUDINARY_JSON, 'utf8'));

function imgs(slug) {
  const data = cloudinary[slug];
  if (!data || !data.images || data.images.length === 0) {
    console.warn(`  ⚠️  No images found for slug: ${slug}`);
    return [];
  }
  return data.images;
}

function thumb(slug) { return imgs(slug)[0] ?? ''; }

function formatImages(slug) {
  const list = imgs(slug);
  if (list.length === 0) return '[]';
  return '[\n' + list.map(url => `      '${url}'`).join(',\n') + ',\n    ]';
}

const existingProjects = [
  {
    id: '1',
    title: '4BHK-ARVIND VILLA NO 6 KHATRAJ',
    slug: 'arvind-villa-khatraj',
    category: 'residential',
    location: 'Khatraj, Ahmedabad',
    year: 2024,
    size: '4,200 sq ft',
    status: 'completed',
    featured: true,
    description: `A serene luxury villa defined by pure white interiors, clean lines, and a calming minimalist palette. Every room — from the spacious master suite to the thoughtfully designed children's bedroom — balances simplicity with comfort. Subtle cove lighting, custom furniture, and restrained detailing come together to create a home that feels both effortlessly elegant and deeply liveable.`,
    challenges: `Achieving a sense of luxury without visual clutter, while designing distinct spaces for family members with different needs — including a playful yet refined children's room.`,
    solutions: `A strict neutral palette with warm cove lighting creates cohesion across all rooms. Custom furniture pieces and curated accents serve as focal points without overwhelming the space.`,
    tags: ['Minimalist', 'Villa', 'Luxury', 'Residential', 'White Interiors'],
  },
  {
    id: '2',
    title: '4BHK PARIJAAT ECLAAT',
    slug: 'parijaat-eclat-4bhk',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '2,500 sq ft',
    status: 'completed',
    featured: false,
    description: `An elegant 4BHK apartment defined by rose-gold accents, white marble surfaces, and velvet upholstery. The dining area is a particular standout — a white marble table surrounded by terracotta velvet chairs, framed by a rose-gold partition screen that filters light beautifully.`,
    challenges: `Creating a consistent sense of luxury across a large 4BHK footprint while keeping the design feeling intimate and personal rather than hotel-like.`,
    solutions: `A warm, rose-gold and ivory palette runs through all spaces, while custom millwork and personal touches make the apartment feel distinctly tailored to its owners.`,
    tags: ['Luxury', 'Rose Gold', '4BHK', 'Marble', 'Sophisticated'],
    videoUrl: 'https://youtu.be/zqCSHp4NWu4?si=7pWuXYGLCKVTEaHS',
  },
  {
    id: '3',
    title: 'FARMHOUSE-RANCHARDA',
    slug: 'farmhouse-rancharda',
    category: 'residential',
    location: 'Rancharda, Ahmedabad',
    year: 2024,
    size: '5,500 sq ft',
    status: 'completed',
    featured: false,
    description: `The crown jewel of this farmhouse is its dramatic entertainment lounge. A sweeping teal and grey marble mural wall forms the backdrop for an arched bar unit lined with individually lit niche displays, colourful decanters, and curated collectibles. Deep red velvet bar stools and a warm wooden beam ceiling with circular pendant lighting complete the atmosphere.`,
    challenges: `Designing an entertainment space grand enough to impress guests while remaining warm and inviting — avoiding the sterile feel of a commercial bar setup.`,
    solutions: `Natural materials — wood, marble, velvet — bring warmth to a dramatic scheme. The arched niches and warm lighting create an intimate atmosphere despite the large scale of the space.`,
    tags: ['Farmhouse', 'Entertainment', 'Bar Lounge', 'Dramatic', 'Luxury'],
    videoUrl: 'https://youtu.be/KUWhU-RQJCk?si=PBO1bXfzlN3_ITj9',
  },
  {
    id: '4',
    title: 'COMMERCIAL-EVENT MANAGEMENT OFFICE-AMALGA',
    slug: 'event-office',
    category: 'commercial',
    location: 'Ahmedabad, Gujarat',
    year: 2023,
    size: '1,200 sq ft',
    status: 'completed',
    featured: false,
    description: `A focused, high-performance office workspace designed for efficiency. A custom multi-monitor workstation setup in a clean, minimal environment — purpose-built for long hours of precision work.`,
    tags: ['Commercial', 'Office', 'Workspace', 'Minimal'],
    videoUrl: 'https://youtu.be/xMyVu1XXDu0?si=OBrFpNyGFFda83T5',
  },
  {
    id: '5',
    title: 'COMMERCIAL-RESTAURANT IN LA, USA',
    slug: 'usa-restaurant-la',
    category: 'hospitality',
    region: 'international',
    country: 'USA',
    flag: '🇺🇸',
    location: 'Los Angeles, California, USA',
    year: 2025,
    size: '3,200 sq ft',
    status: 'completed',
    featured: false,
    description: `A full restaurant interior design project in the heart of Los Angeles — where the energy of LA dining culture meets the sophistication of Indian design sensibility. Dramatic lighting, custom joinery, and a layered material story create a space that is bold, immersive, and entirely memorable.`,
    challenges: `Meeting the high expectations of LA's competitive dining scene while incorporating the client's vision for a warm, character-rich space that stands apart from typical restaurant aesthetics.`,
    solutions: `A theatrical approach to lighting, custom booth seating, and richly textured wall treatments bring depth and drama.`,
    tags: ['International', 'Restaurant', 'USA', 'Los Angeles', 'Hospitality'],
  },
];

const newProjects = [
  {
    id: '6',
    title: '3BHK-INDRAPRASTH GREEN A BLOCK',
    slug: 'indraprashtha-green-a',
    category: 'residential',
    location: 'Indraprashtha Greens, Ahmedabad',
    year: 2024,
    size: '1,400 sq ft',
    status: 'completed',
    featured: false,
    description: 'A thoughtfully designed 3BHK residence at Indraprashtha Greens. Clean layouts, functional storage, and a warm material palette create a comfortable and stylish home.',
    tags: ['Residential', '3BHK', 'Apartment', 'Modern'],
  },
  {
    id: '7',
    title: '3BHK-INDRAPRASTH GREENS F BLOCK',
    slug: 'indraprashtha-green-f',
    category: 'residential',
    location: 'Indraprashtha Greens, Ahmedabad',
    year: 2024,
    size: '1,400 sq ft',
    status: 'completed',
    featured: false,
    description: 'A contemporary 3BHK apartment at Indraprashtha Greens with a cohesive design palette and smart space utilisation throughout.',
    tags: ['Residential', '3BHK', 'Apartment', 'Contemporary'],
  },
  {
    id: '8',
    title: '3BHK-MAPLE TREE F BLOCK',
    slug: 'maple-tree-f-block',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '1,500 sq ft',
    status: 'completed',
    featured: false,
    description: 'A modern 3BHK residence at Maple Tree society, designed with clean lines, premium finishes, and a warm contemporary aesthetic.',
    tags: ['Residential', '3BHK', 'Apartment', 'Modern'],
  },
  {
    id: '9',
    title: '3BHK-PANCHAM PENTAGON',
    slug: 'pancham-pentagon',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '1,800 sq ft',
    status: 'completed',
    featured: false,
    description: 'A vibrant 3BHK apartment at Pancham Pentagon, blending bold design choices with functional living spaces that reflect the personality of its residents.',
    tags: ['Residential', '3BHK', 'Apartment', 'Contemporary'],
  },
  {
    id: '10',
    title: '3BHK-RATNAKAAR PRISTINE',
    slug: 'ratnakaar-pristine',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '1,600 sq ft',
    status: 'completed',
    featured: true,
    description: 'An extensively documented 3BHK residence at Ratnakaar Pristine. Every room meticulously designed with premium materials, layered lighting, and bespoke furniture.',
    tags: ['Residential', '3BHK', 'Apartment', 'Luxury', 'Premium'],
  },
  {
    id: '11',
    title: '4BHK + HOMETHEATRE-VALENCIA RAJKOT',
    slug: 'valencia-rajkot',
    category: 'residential',
    location: 'Rajkot, Gujarat',
    year: 2024,
    size: '2,800 sq ft',
    status: 'completed',
    featured: false,
    description: 'A luxurious 4BHK residence in Rajkot featuring a dedicated home theatre — where cinematic immersion meets refined residential design.',
    tags: ['Residential', '4BHK', 'Home Theatre', 'Luxury', 'Rajkot'],
  },
  {
    id: '12',
    title: '4BHK-GIRIRAJ AMBAVADI',
    slug: 'giriraj-ambavadi',
    category: 'residential',
    location: 'Ambavadi, Ahmedabad',
    year: 2024,
    size: '2,200 sq ft',
    status: 'completed',
    featured: false,
    description: 'A sophisticated 4BHK apartment in Ambavadi with a premium material palette, custom millwork, and an interior language that balances boldness with livability.',
    tags: ['Residential', '4BHK', 'Apartment', 'Sophisticated'],
  },
  {
    id: '13',
    title: '4BHK-POPLAR DOMAIN',
    slug: 'poplar-domain',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '2,000 sq ft',
    status: 'completed',
    featured: false,
    description: 'A well-crafted 4BHK apartment at Poplar Domain with refined interiors, purposeful spatial planning, and a contemporary design sensibility throughout.',
    tags: ['Residential', '4BHK', 'Apartment', 'Contemporary'],
  },
  {
    id: '14',
    title: '4BHK-SHILP SHALIGRAM',
    slug: 'shilp-shaligram',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '2,000 sq ft',
    status: 'completed',
    featured: false,
    description: 'A polished 4BHK interior at Shilp Shaligram — premium finishes, layered lighting design, and thoughtful spatial flow from entry to bedroom.',
    tags: ['Residential', '4BHK', 'Apartment', 'Premium'],
  },
  {
    id: '15',
    title: 'COMMERCIAL-BEFIT PHYSIOTHERAPY CLINIC',
    slug: 'befit-physiotherapy',
    category: 'commercial',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '800 sq ft',
    status: 'completed',
    featured: false,
    description: 'A calming, clinical-grade interior for Befit Physiotherapy — designed to instil confidence and comfort in patients while maintaining a clean, professional environment.',
    tags: ['Commercial', 'Clinic', 'Healthcare', 'Minimal'],
  },
  {
    id: '16',
    title: 'COMMERCIAL-IMPORT & EXPORT OFFICE SHIVALIK',
    slug: 'import-export-shivalik',
    category: 'commercial',
    location: 'Shivalik, Ahmedabad',
    year: 2024,
    size: '700 sq ft',
    status: 'completed',
    featured: false,
    description: 'A compact but impactful commercial office designed for an import & export business — professional, efficient, and built to impress visiting clients.',
    tags: ['Commercial', 'Office', 'Workspace', 'Professional'],
  },
  {
    id: '17',
    title: 'COMMERCIAL-IT OFFICE STRATUM FOCUS',
    slug: 'stratum-focus-it-office',
    category: 'commercial',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '2,500 sq ft',
    status: 'completed',
    featured: false,
    description: 'A dynamic IT office interior for Stratum Focus — open collaborative zones, focused workstations, and a bold brand identity woven into the spatial design.',
    tags: ['Commercial', 'IT Office', 'Tech', 'Workspace', 'Corporate'],
  },
  {
    id: '18',
    title: 'COMMERCIAL-LAMHAA RESTAURANT NJ,USA',
    slug: 'lamhaa-restaurant-nj',
    category: 'hospitality',
    region: 'international',
    country: 'USA',
    flag: '🇺🇸',
    location: 'New Jersey, USA',
    year: 2025,
    size: '3,500 sq ft',
    status: 'completed',
    featured: true,
    description: 'Lamhaa — a full-service Indian restaurant in New Jersey bringing the warmth of South Asian hospitality to the American dining scene. Rich textures, ambient lighting, and a layered material story create an immersive dining experience.',
    tags: ['International', 'Restaurant', 'USA', 'New Jersey', 'Hospitality'],
  },
  {
    id: '19',
    title: 'COMMERCIAL-LUXURY LOUNGE IN USA',
    slug: 'luxury-lounge-usa',
    category: 'hospitality',
    region: 'international',
    country: 'USA',
    flag: '🇺🇸',
    location: 'USA',
    year: 2025,
    size: '1,200 sq ft',
    status: 'completed',
    featured: false,
    description: 'An intimate luxury lounge in the USA — sophisticated, atmospheric, and designed for an exclusive clientele. Plush seating, curated lighting, and premium materials define this upscale space.',
    tags: ['International', 'Lounge', 'USA', 'Luxury', 'Hospitality'],
  },
  {
    id: '20',
    title: '3BHK-ARISTO BLAZE',
    slug: 'aristo-blaze',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '1,400 sq ft',
    status: 'completed',
    featured: false,
    description: 'A modern 3BHK residence at Aristo Blaze with clean lines, premium finishes, and a warm contemporary aesthetic throughout.',
    tags: ['Residential', '3BHK', 'Apartment', 'Modern'],
  },
  {
    id: '21',
    title: '3BHK-ELITE MARS A BLOCK',
    slug: 'elite-mars-a-block',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '1,500 sq ft',
    status: 'completed',
    featured: false,
    description: 'A stylish 3BHK apartment at Elite Mars, A Block — thoughtfully designed with a cohesive palette and smart space planning.',
    tags: ['Residential', '3BHK', 'Apartment', 'Contemporary'],
  },
  {
    id: '22',
    title: '3BHK-GREENZ TURQUIOSE SHELA',
    slug: 'greenz-turquoise-shela',
    category: 'residential',
    location: 'Shela, Ahmedabad',
    year: 2024,
    size: '1,600 sq ft',
    status: 'completed',
    featured: false,
    description: 'A vibrant 3BHK residence at Greenz Turquoise, Shela — rich textures, layered lighting, and a design language that is both fresh and refined.',
    tags: ['Residential', '3BHK', 'Apartment', 'Contemporary'],
  },
  {
    id: '23',
    title: '3BHK-SHEETAL WEST PARK VASTRAPUR',
    slug: 'sheetal-west-park',
    category: 'residential',
    location: 'Vastrapur, Ahmedabad',
    year: 2024,
    size: '1,400 sq ft',
    status: 'completed',
    featured: false,
    description: 'A compact yet elegant 3BHK at Sheetal West Park, Vastrapur — every square foot purposefully designed for modern family living.',
    tags: ['Residential', '3BHK', 'Apartment', 'Modern'],
  },
  {
    id: '24',
    title: '4BHK-THE BUNGLOWS WEST',
    slug: 'the-bunglows-west-4bhk',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '3,000 sq ft',
    status: 'completed',
    featured: false,
    description: 'A premium 4BHK bungalow at The Bunglows West — grand proportions, luxury finishes, and an interior that balances drama with everyday comfort.',
    tags: ['Residential', '4BHK', 'Bungalow', 'Luxury', 'Premium'],
  },
  {
    id: '25',
    title: '4BHK-VENICE BUNGLOWS',
    slug: 'venice-bungalows-4bhk',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '3,200 sq ft',
    status: 'completed',
    featured: false,
    description: 'A bold, contemporary 4BHK bungalow at Venice — striking geometric details, premium materials, and a cohesive design story from entry to bedroom.',
    tags: ['Residential', '4BHK', 'Bungalow', 'Contemporary', 'Premium'],
  },
  {
    id: '26',
    title: '4BHK-VILLA YATKRUPA SOC ANAND',
    slug: 'villa-yatkrupa-anand',
    category: 'residential',
    location: 'Anand, Gujarat',
    year: 2024,
    size: '2,800 sq ft',
    status: 'completed',
    featured: false,
    description: 'A warm and welcoming 4BHK villa at Yatkrupa Society, Anand — classic sensibilities elevated with contemporary detailing and bespoke joinery.',
    tags: ['Residential', '4BHK', 'Villa', 'Anand', 'Gujarat'],
  },
  {
    id: '27',
    title: '5BHK- THE BUNGLOWS WEST SAMPLE',
    slug: 'the-bunglows-west-5bhk',
    category: 'residential',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '4,000 sq ft',
    status: 'completed',
    featured: true,
    description: 'A stunning 5BHK sample flat at The Bunglows West — designed to showcase the pinnacle of luxury residential design. Every room is a statement, every detail considered.',
    tags: ['Residential', '5BHK', 'Bungalow', 'Sample Flat', 'Luxury'],
  },
  {
    id: '28',
    title: 'COMMERCIAL-SATYAM IMPEX TILES SHOWROOM CTM',
    slug: 'satyam-impex-tiles',
    category: 'commercial',
    location: 'CTM, Ahmedabad',
    year: 2024,
    size: '1,000 sq ft',
    status: 'completed',
    featured: false,
    description: 'A sleek tiles showroom for Satyam Impex at CTM — designed to showcase premium tile collections in a setting that is itself a testament to quality craftsmanship.',
    tags: ['Commercial', 'Showroom', 'Retail', 'Tiles'],
  },
];

function renderProject(p) {
  const imageList = formatImages(p.slug);
  const thumbnailUrl = thumb(p.slug);
  const opt = {
    region:     p.region     ? `\n    region: '${p.region}',`          : '',
    country:    p.country    ? `\n    country: '${p.country}',`         : '',
    flag:       p.flag       ? `\n    flag: '${p.flag}',`               : '',
    challenges: p.challenges ? `\n    challenges: \`${p.challenges}\`,`  : '',
    solutions:  p.solutions  ? `\n    solutions: \`${p.solutions}\`,`    : '',
    videoUrl:   p.videoUrl   ? `\n    videoUrl: '${p.videoUrl}',`        : '',
  };
  const tagsStr = p.tags.map(t => `'${t}'`).join(', ');
  return `  {
    id: '${p.id}',
    title: '${p.title}',
    slug: '${p.slug}',
    category: '${p.category}',${opt.region}${opt.country}${opt.flag}
    location: '${p.location}',
    year: ${p.year},
    size: '${p.size}',
    status: '${p.status}',
    featured: ${p.featured},
    thumbnail: '${thumbnailUrl}',
    images: ${imageList},
    description: \`${p.description}\`,${opt.challenges}${opt.solutions}
    tags: [${tagsStr}],${opt.videoUrl}
  }`;
}

const allProjects = [
  ...existingProjects.map(p => renderProject(p)),
  ...newProjects.map(p => renderProject(p)),
];

const output = `export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'residential' | 'commercial' | 'hospitality' | 'retail';
  region?: 'india' | 'international';
  country?: string;
  flag?: string;
  location: string;
  year: number;
  size: string;
  area?: string;
  status: 'completed' | 'in-progress';
  featured: boolean;
  thumbnail: string;
  images: string[];
  description: string;
  challenges?: string;
  solutions?: string;
  tags: string[];
  videoUrl?: string;
}

export const projects: Project[] = [
${allProjects.join(',\n')}
];

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured);
};

export const getProjectsByCategory = (category: string) => {
  if (category === 'all') return projects;
  return projects.filter(project => project.category === category);
};

export const getProjectBySlug = (slug: string) => {
  return projects.find(project => project.slug === slug);
};
`;

fs.writeFileSync(OUTPUT_FILE, output);

console.log('\n=== MERGE SUMMARY ===');
console.log(`  Existing projects: ${existingProjects.length}`);
console.log(`  New projects:      ${newProjects.length}`);
console.log(`  Total:             ${existingProjects.length + newProjects.length}`);
for (const p of [...existingProjects, ...newProjects]) {
  const count = imgs(p.slug).length;
  console.log(`  ${count > 0 ? '✓' : '⚠️ '} ${p.title}: ${count} images`);
}
console.log(`\n✅ Written to: src/data/projects.ts`);
