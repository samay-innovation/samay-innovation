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
    location: 'Khatraj, Ahmedabad District',
    year: 2024,
    size: '4,200 sq ft',
    status: 'completed',
    featured: true,
    description: `A serene luxury villa at Khatraj defined by an unwavering commitment to pure white interiors, clean architectural lines, and a calming minimalist palette. Every room — from the double-height living space with its floating staircase to the spacious master suite and the thoughtfully designed children's bedroom — balances simplicity with comfort. Subtle cove lighting traces every ceiling line, custom furniture is upholstered in ivory and warm linen, and restrained detailing comes together to create a home that feels both effortlessly elegant and deeply liveable. The villa's exterior-to-interior transition is seamless, with the same crisp white palette extending from the entrance foyer into every private space.`,
    challenges: `Achieving a genuine sense of luxury in a large villa without visual clutter — while also designing distinct, age-appropriate spaces for multiple family members including a children's bedroom that needed to feel playful without breaking the design code.`,
    solutions: `A strict neutral palette with layered warm cove lighting creates cohesion throughout. Custom furniture pieces and carefully curated accents serve as focal points in each room without overwhelming the overall restraint. The children's room uses soft pastels and custom storage joinery that feels considered rather than childish.`,
    tags: ['4BHK', 'Villa', 'Minimalist', 'White Interiors', 'Luxury', 'Khatraj'],
    videoUrl: 'https://youtu.be/88GrtHcljXE',
  },
  {
    id: '2',
    title: '4BHK PARIJAAT ECLAAT',
    slug: 'parijaat-eclat-4bhk',
    category: 'residential',
    location: 'Parijaat Eclat, Ahmedabad',
    year: 2024,
    size: '3,800 sq ft',
    status: 'completed',
    featured: false,
    description: `An apartment whose very name — Éclat, French for brilliance — sets the design brief. This 3,800 sq ft 4BHK at Parijaat Eclat is defined by rose-gold accents, white marble surfaces, and plush velvet upholstery throughout. The dining area is a particular standout: a white Carrara marble table surrounded by terracotta velvet chairs, framed by a rose-gold partition screen that filters afternoon light into golden ribbons across the room. The master suite features a quilted ivory headboard wall with integrated bedside lighting, a custom dressing room, and a marble-clad ensuite. The entrance foyer sets the tone from the very first step with a bespoke nameplate, a console in brushed gold, and a fluted mirror that stretches from floor to ceiling.`,
    challenges: `Creating a consistent sense of brilliance and luxury across a large 4BHK footprint while keeping the design feeling intimate and personal — avoiding the impersonal feel of a five-star hotel lobby.`,
    solutions: `A warm rose-gold and ivory palette runs through all spaces as the connective tissue, while custom millwork, hand-selected fabrics, and personal touches including a bespoke entrance nameplate make every corner feel designed specifically for its owners.`,
    tags: ['4BHK', 'Luxury', 'Rose Gold', 'Marble', 'Sophisticated', 'Velvet'],
    videoUrl: 'https://youtu.be/6skiWI3z8g8',
  },
  {
    id: '3',
    title: 'FARMHOUSE-RANCHARDA',
    slug: 'farmhouse-rancharda',
    category: 'residential',
    location: 'Rancharda, Ahmedabad',
    year: 2024,
    size: '8,500 sq ft',
    status: 'completed',
    featured: false,
    description: `Set on the outskirts of Ahmedabad in the village of Rancharda, this sprawling 8,500 sq ft farmhouse is a luxurious escape from the city. The crown jewel is its entertainment lounge — a space unlike any other in private residential design in Gujarat. A sweeping teal and grey marble mural wall forms the backdrop for an arched bar unit that stretches the full width of the room, lined with individually lit niche displays, curated decanters, and collectibles. Deep red velvet bar stools, a warm wooden beam ceiling with oversized circular pendant lights, and a custom carved stone bar counter complete the theatre. The outdoor spaces include a pergola dining area, a fire pit lounge, and a naturalistic swimming pool with a tiled surround designed in mosaic by local artisans. The interior continues this sensibility: raw stone walls, terracotta floor tiles, and natural plaster finishes give the farmhouse an authentic, rooted character while bespoke furniture and curated art collections ensure it is unmistakably luxury.`,
    challenges: `Designing an entertainment space that could genuinely rival the ambience of the finest hotel bars and restaurants, while remaining appropriate and personal for private family use at a farmhouse setting.`,
    solutions: `Natural materials — stone, wood, terracotta, velvet — were used in carefully considered proportions to anchor the drama with warmth. The arched bar niches and warm amber lighting create intimacy at scale. The outdoor and indoor spaces were designed as a single experiential sequence rather than disconnected rooms.`,
    tags: ['Farmhouse', 'Entertainment', 'Bar Lounge', 'Dramatic', 'Luxury', 'Rancharda'],
    videoUrl: 'https://youtu.be/KUWhU-RQJCk?si=PBO1bXfzlN3_ITj9',
  },
  {
    id: '4',
    title: 'COMMERCIAL-EVENT MANAGEMENT OFFICE-AMALGA',
    slug: 'event-office',
    category: 'commercial',
    location: 'Ahmedabad, Gujarat',
    year: 2023,
    size: '2,200 sq ft',
    status: 'completed',
    featured: false,
    description: `Designed for Amalga — a dynamic event management company — this 2,200 sq ft office in Ahmedabad needed to be as visually impressive as the events it produces. The reception and client-facing zones are theatrical in the best sense: a backlit logo wall in brushed metal, a custom curved reception desk in glossy white with gold edge profiles, and a client lounge with velvet seating and a live moss wall that communicates creativity from the first handshake. The working floor is an open-plan, activity-based workspace with collaborative zones, focus pods, and a central brainstorming table suspended beneath a dramatic installation of event photographs and mood boards. A dedicated AV and presentation suite completes the brief with full acoustic panelling and a 130-inch presentation screen.`,
    challenges: `Creating an office that communicates the creative ambition and executional excellence of an event management company, while also functioning as a high-performance workplace for a team working to tight event deadlines.`,
    solutions: `The office was split into a client-facing brand zone — designed to impress and inspire — and a production-oriented working zone designed for collaboration and focus. Acoustic materials were integrated into the design of the working zone to reduce noise and aid concentration without compromising aesthetics.`,
    tags: ['Commercial', 'Event Management', 'Creative Office', 'Brand Identity', 'Contemporary'],
    videoUrl: 'https://youtu.be/xMyVu1XXDu0',
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
    description: `A full restaurant interior in the heart of Los Angeles — where the high energy of LA's dining culture meets the disciplined sophistication of Indian spatial design. The 3,200 sq ft space is organised around a central bar that doubles as a performance stage for the open kitchen behind it, with dining zones radiating outward in booths, banquette seating, and communal tables for different dining experiences within the same space. A feature wall of reclaimed Indian teak with inset brass detailing brings warmth and heritage into the California context. Pendant lighting — a custom installation of hand-blown glass spheres in amber and smoke — creates an intimate glow that transforms the space from a bright lunch setting to a sultry dinner environment at the turn of a dimmer. External signage and the entry sequence were designed to stop pedestrian traffic on one of LA's busiest restaurant corridors.`,
    challenges: `Meeting the exacting expectations of the Los Angeles dining public — among the most design-literate restaurant-goers in the world — while honouring the client's vision for a space rooted in South Asian warmth and heritage.`,
    solutions: `Heritage materials — reclaimed teak, hand-beaten brass, terracotta tiles — were combined with California-contemporary finishes — poured concrete floors, architectural glass, industrial steel. The result speaks both languages fluently and creates a dining environment that is entirely unique on the LA scene.`,
    tags: ['International', 'Restaurant', 'Los Angeles', 'USA', 'Hospitality', 'Luxury Dining'],
  },
];

const newProjects = [
  {
    id: '6',
    title: '3BHK-INDRAPRASTH GREEN A BLOCK',
    slug: 'indraprashtha-green-a',
    category: 'residential',
    location: 'Indraprashtha Greens, S.G. Highway, Ahmedabad',
    year: 2023,
    size: '1,950 sq ft',
    status: 'completed',
    featured: false,
    description: `A beautifully executed 3BHK apartment at Indraprashtha Greens that proves thoughtful design is not a function of size. The living and dining areas flow seamlessly, anchored by a warm walnut wood TV unit, layered cove lighting, and a textured feature wall in muted sage. The modular kitchen is compact yet highly functional, with sleek upper cabinets in matte white and a striking island finished in charcoal laminate. Bedrooms are serene — soft neutrals, under-bed storage, and custom wardrobes that make every inch count.`,
    challenges: `Maximising both storage and visual openness in a standard 3BHK layout on S.G. Highway where space efficiency is critical for young professional families.`,
    solutions: `Recessed storage, multi-functional furniture, and a continuous neutral palette with warm lighting eliminate visual clutter and make the 1,950 sq ft feel significantly more expansive.`,
    tags: ['3BHK', 'Apartment', 'Contemporary', 'Warm Interiors', 'S.G. Highway'],
    videoUrl: 'https://youtu.be/dYkegbOqFI0',
  },
  {
    id: '7',
    title: '3BHK-INDRAPRASTH GREENS F BLOCK',
    slug: 'indraprashtha-green-f',
    category: 'residential',
    location: 'Indraprashtha Greens, S.G. Highway, Ahmedabad',
    year: 2023,
    size: '1,850 sq ft',
    status: 'completed',
    featured: false,
    description: `The F Block apartment at Indraprashtha Greens is an exercise in restrained elegance. A strictly curated palette of ivory, warm grey, and brushed gold runs through every room — from the living room's fluted panel feature wall to the master bedroom's upholstered headboard wall. The kitchen is a standout: gloss white shutters paired with a black quartz countertop, under-cabinet strip lighting, and pull-out organizers that maximise every drawer. This home is designed for those who believe that less, done well, is always more.`,
    challenges: `Differentiating two apartments in the same society while maintaining the client's preference for a timeless, trend-resistant design language.`,
    solutions: `A strictly neutral base was personalised through material texture — fluted panels, woven fabric wallcovering, and brushed metal hardware — rather than colour, ensuring longevity alongside visual interest.`,
    tags: ['3BHK', 'Apartment', 'Minimalist', 'Neutral Palette', 'S.G. Highway'],
  },
  {
    id: '8',
    title: '3BHK-MAPLE TREE F BLOCK',
    slug: 'maple-tree-f-block',
    category: 'residential',
    location: 'Maple Tree Society, Bopal, Ahmedabad',
    year: 2024,
    size: '2,100 sq ft',
    status: 'completed',
    featured: false,
    description: `A warm, modern 3BHK in one of Bopal's most sought-after societies. This apartment at Maple Tree, F Block draws its character from natural wood tones, earthy textures, and carefully considered lighting. The living room features a full-height wooden bookshelf-cum-display unit that doubles as a room divider, creating a defined dining zone without sacrificing openness. The master bedroom is a calming retreat with a built-in dressing area, a large format grey tile floor, and warm amber cove lighting that sets the mood effortlessly.`,
    challenges: `Creating distinct zones within an open-plan layout while honouring the client's love of natural materials and earthy warmth.`,
    solutions: `Strategic use of wood grain laminates, earthy stone-finish tiles, and warm-toned LED profiles creates natural separation between zones. Furniture placement reinforces flow without the need for walls.`,
    tags: ['3BHK', 'Apartment', 'Modern', 'Bopal', 'Wood Tones'],
  },
  {
    id: '9',
    title: '3BHK-PANCHAM PENTAGON',
    slug: 'pancham-pentagon',
    category: 'residential',
    location: 'Pancham Pentagon, Ahmedabad',
    year: 2024,
    size: '2,000 sq ft',
    status: 'completed',
    featured: false,
    description: `This 3BHK at Pancham Pentagon is a bold statement of personality. The living room commands attention with a dramatic geometric false ceiling featuring multi-tier cove lighting in warm white, a deep charcoal feature wall with recessed LED niches, and a custom L-shaped sofa in teal velvet that anchors the space. The kitchen takes a two-tone approach — matte grey lower cabinets against high-gloss white uppers, with a chevron-pattern backsplash tile that adds unexpected energy. Children's and guest bedrooms have been given equal care, with each space reflecting the individual personality of its occupant.`,
    challenges: `Designing a home with strong visual character for a family that wanted bold interiors without sacrificing warmth or functionality.`,
    solutions: `A controlled material palette — deep charcoals, warm wood accents, and strategic pops of teal — delivers drama while warm lighting and plush upholstery maintain the essential liveable quality.`,
    tags: ['3BHK', 'Apartment', 'Contemporary', 'Bold Design', 'Cove Lighting'],
    videoUrl: 'https://youtu.be/Um4iMJQ0JT8',
  },
  {
    id: '10',
    title: '3BHK-RATNAKAAR PRISTINE',
    slug: 'ratnakaar-pristine',
    category: 'residential',
    location: 'Ratnakaar Pristine, South Bopal, Ahmedabad',
    year: 2024,
    size: '1,900 sq ft',
    status: 'completed',
    featured: true,
    description: `One of Samay Innovation's most comprehensively documented residential projects, this 3BHK at Ratnakaar Pristine in South Bopal is a masterclass in premium apartment design. Every room tells a considered story: the living area features a full marble-look porcelain feature wall, a floating TV unit in brushed walnut with integrated lighting, and a custom false ceiling with multi-layer cove profiles. The master bedroom is a true luxury retreat — a quilted fabric headboard wall, custom walk-in wardrobe, and an ensuite bathroom finished in large-format book-matched stone tiles. The kitchen is a chef's delight: two rows of Hettich-fitted modular cabinets, a waterfall island, and a fully tiled backsplash in Calacatta marble.`,
    challenges: `Delivering a genuinely luxury finish across all rooms of a 3BHK within a mid-rise development where structural limitations restrict architectural interventions.`,
    solutions: `Premium surface materials — imported laminates, large-format porcelain, and fabric wallcoverings — were used to elevate every surface, while bespoke joinery and Hettich hardware ensured the quality read in every detail.`,
    tags: ['3BHK', 'Apartment', 'Luxury', 'Premium Finishes', 'South Bopal'],
    videoUrl: 'https://youtu.be/DE7-zH3b6Hw',
  },
  {
    id: '11',
    title: '4BHK + HOMETHEATRE-VALENCIA RAJKOT',
    slug: 'valencia-rajkot',
    category: 'residential',
    location: 'Valencia, Rajkot',
    year: 2024,
    size: '5,500 sq ft',
    status: 'completed',
    featured: false,
    description: `A showcase of luxury residential living in Rajkot, this expansive 5,500 sq ft 4BHK at Valencia is distinguished by its dedicated home theatre — one of the most immersive private cinema rooms in the city. The theatre features acoustic wall panels in charcoal grey fabric, recliner seating for eight, a 150-inch 4K projection wall, and a custom ceiling with star-light fibre optic panels that replicate a night sky. The living room above is equally impressive — double-height, with a floating staircase, a full-length marble feature wall, and custom drape lighting. The kitchen is a premium culinary space with a large central island, integrated professional-grade appliances, and custom cabinetry in brushed linen.`,
    challenges: `Integrating a fully functional private cinema into a residential 4BHK without the theatre aesthetic compromising the luxury residential feel of the rest of the home.`,
    solutions: `The home theatre occupies a discrete, dedicated level with its own entry and acoustic separation. The design language of rich dark fabric, recessed lighting, and bespoke joinery is carried into the living areas in a tonal echo — creating connection between spaces rather than contrast.`,
    tags: ['4BHK', 'Home Theatre', 'Luxury', 'Rajkot', 'Entertainment', 'Cinema Room'],
  },
  {
    id: '12',
    title: '4BHK-GIRIRAJ AMBAVADI',
    slug: 'giriraj-ambavadi',
    category: 'residential',
    location: 'Ambavadi, Ahmedabad',
    year: 2024,
    size: '4,100 sq ft',
    status: 'completed',
    featured: false,
    description: `Located in Ambavadi — one of Ahmedabad's most established and prestigious residential corridors — this 4BHK is a bold, sophisticated statement in dark luxury. The living room commands immediate attention: a floor-to-ceiling fluted black panel feature wall, an oversized sectional in deep charcoal velvet, a backlit stone console, and a custom coffered ceiling with recessed warm lighting create an atmosphere of quiet power. The kitchen is a high-performer — full-height dark grey lacquer cabinets with integrated handles, Calacatta quartz countertops, and a butler's pantry hidden behind a push-to-open door. The master bedroom carries the same dark luxury sensibility with a dramatic fabric headboard wall in deep emerald and a custom walk-in wardrobe with full-length illuminated mirrors.`,
    challenges: `Designing a premium interior for a prominent Ambavadi address using dark tones — which risk making spaces feel heavy — while maintaining the openness and livability the family required.`,
    solutions: `Dark tones were balanced with strategic mirror placement, high-gloss surfaces, and warm recessed lighting that prevent any sense of heaviness. The juxtaposition of matte and gloss surfaces adds dimensional depth.`,
    tags: ['4BHK', 'Apartment', 'Sophisticated', 'Ambavadi', 'Dark Tones', 'Premium'],
    videoUrl: 'https://youtu.be/XfFlB5KAQUU',
  },
  {
    id: '13',
    title: '4BHK-POPLAR DOMAIN',
    slug: 'poplar-domain',
    category: 'residential',
    location: 'Poplar Domain, Ahmedabad',
    year: 2024,
    size: '3,600 sq ft',
    status: 'completed',
    featured: false,
    description: `A clean, contemporary 4BHK at Poplar Domain that prioritises spatial flow and material quality above decoration. The open-plan living and dining area is defined by a monolithic marble-look feature wall, a floating TV console in smoked oak, and a dining area centred around a six-seater extendable table in brushed concrete finish. The kitchen is extensively appointed — an island with a waterfall edge, full-height pull-out larder units, and integrated Bosch appliances create a space that is as easy to cook in as it is beautiful. All four bedrooms follow a considered programme: each has its own accent wall, custom wardrobe, and dressing zone while the master bedroom enjoys an ensuite with a freestanding bath.`,
    challenges: `Maintaining visual continuity across a large 4BHK plan without repetition, while ensuring each of the four bedrooms feels distinct and personally tailored.`,
    solutions: `A common material language — oak, stone, and matte white — runs throughout while each bedroom is differentiated through its accent colour, artwork, and bespoke joinery detail, ensuring cohesion at the macro level and individuality at the intimate level.`,
    tags: ['4BHK', 'Apartment', 'Contemporary', 'Clean Lines', 'Premium'],
  },
  {
    id: '14',
    title: '4BHK-SHILP SHALIGRAM',
    slug: 'shilp-shaligram',
    category: 'residential',
    location: 'Shilp Shaligram, Ahmedabad',
    year: 2024,
    size: '3,750 sq ft',
    status: 'completed',
    featured: false,
    description: `Shilp — meaning craftsmanship — is a name this project lives up to fully. Every detail of this 3,750 sq ft 4BHK at Shilp Shaligram reflects a commitment to quality that goes beyond surface finishes into the bones of the design. The entrance corridor features hand-finished lime plaster walls, a custom console in solid teak, and a recessed ceiling profile that draws you into the main living space. The living room is warm and composed — a full-height walnut bookshelf unit, an oversized sofa in warm sand linen, and a geometric coffee table in bronze metal and glass. The kitchen is a functional showpiece: Hettich-fitted drawers, a Silestone countertop, and custom glazed cabinet doors that display selected crockery as objects of beauty.`,
    challenges: `Meeting the client's expectation of visible, tangible quality — craftsmanship they could feel as well as see — without crossing into decorative excess.`,
    solutions: `Investment was directed into materials that reward close inspection: solid wood joints, full-extension soft-close drawers, hand-trowelled plaster finishes, and solid brass hardware. Where others specify veneer, we specified solid timber.`,
    tags: ['4BHK', 'Apartment', 'Premium Craftsmanship', 'Warm Contemporary', 'Custom Joinery'],
    videoUrl: 'https://youtu.be/5iGDprIIHCE',
  },
  {
    id: '15',
    title: 'COMMERCIAL-BEFIT PHYSIOTHERAPY CLINIC',
    slug: 'befit-physiotherapy',
    category: 'commercial',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '950 sq ft',
    status: 'completed',
    featured: false,
    description: `Healthcare design demands a specific emotional register — one that simultaneously communicates clinical competence and personal warmth. This physiotherapy clinic for Befit in Ahmedabad achieves this balance through a biophilic design approach: white walls textured in soft lime plaster, natural oak joinery, and a living green wall in the waiting area that reduces patient anxiety and communicates a genuine commitment to wellbeing. The treatment zones are designed with patient dignity in mind — each bay is acoustically screened with fabric panels and has its own warm-tone LED profile lighting that makes examinations comfortable and calming. The reception desk is a welcoming feature in itself — a sculptural form in white corian with a warm walnut inlay.`,
    challenges: `Designing a clinical space that avoids the sterile, institutional character of typical healthcare environments, while meeting the hygiene, durability, and functional requirements of an active physiotherapy practice.`,
    solutions: `Anti-bacterial surface materials were specified throughout but finished to look like premium residential choices — white corian, sealed oak, washable lime plaster. The biophilic elements provide emotional warmth while the underlying material specification meets clinical standards.`,
    tags: ['Commercial', 'Clinic', 'Healthcare', 'Biophilic Design', 'Wellness'],
    videoUrl: 'https://youtu.be/rDh9fBW37o0',
  },
  {
    id: '16',
    title: 'COMMERCIAL-IMPORT & EXPORT OFFICE SHIVALIK',
    slug: 'import-export-shivalik',
    category: 'commercial',
    location: 'Shivalik, Ahmedabad',
    year: 2024,
    size: '650 sq ft',
    status: 'completed',
    featured: false,
    description: `A compact but meticulously designed corporate office for an import and export business at Shivalik, Ahmedabad. In 650 sq ft, the design achieves a level of finish that communicates credibility and authority to visiting trade partners. The reception zone features a full-height branded feature wall with the company identity in three-dimensional acrylic lettering, a premium stone-finish reception desk, and a client-facing seating area in leather-upholstered chairs. The working area is efficiently planned with custom workstations, built-in filing and storage, and a fully equipped meeting room with a glass partition that can be revealed or concealed using frosted privacy film.`,
    challenges: `Achieving a corporate-grade interior finish that communicates the scale and authority of a serious trade business within a space of just 650 sq ft.`,
    solutions: `Every square foot was planned to serve a double purpose — storage below desks, display above, a meeting table that converts to a working surface. Premium material choices (stone-effect laminate, brushed aluminium, leather) deliver a first-class impression without requiring first-class square footage.`,
    tags: ['Commercial', 'Office', 'Corporate', 'Compact', 'Shivalik'],
  },
  {
    id: '17',
    title: 'COMMERCIAL-IT OFFICE STRATUM FOCUS',
    slug: 'stratum-focus-it-office',
    category: 'commercial',
    location: 'Ahmedabad, Gujarat',
    year: 2024,
    size: '3,200 sq ft',
    status: 'completed',
    featured: false,
    description: `A 3,200 sq ft headquarters for Stratum Focus, a growing IT company in Ahmedabad, designed to attract and retain top tech talent while communicating the company's brand values of precision, focus, and innovation. The reception zone is anchored by a dramatic branded wall installation in powder-coated steel, backlit with a gradient of the company's brand colours. The open-plan working floor is an activity-based workspace with a clear hierarchy of collaboration zones — from a full-team town-hall area and cluster collaboration pods to individual focus booths with acoustic hoods. The pantry is a social hub with a barista-style coffee station, island seating, and a games zone that encourages cross-team interaction. A dedicated server room and a high-security client data presentation suite complete the program.`,
    challenges: `Designing an IT workspace that is both technically equipped — with raised flooring, cable management, and server infrastructure — and aesthetically compelling enough to support the company's employer brand as it competed for talent.`,
    solutions: `Technical infrastructure was treated as a design element — cable trays in brand colours, perforated metal feature walls that conceal wiring, and acoustic ceiling tiles in a geometric pattern that doubles as a wayfinding system across the floor plate.`,
    tags: ['Commercial', 'IT Office', 'Tech', 'Workspace', 'Corporate', 'Activity-Based'],
    videoUrl: 'https://youtu.be/-qvSZg0zmaM',
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
    size: '4,500 sq ft',
    status: 'completed',
    featured: true,
    description: `Lamhaa — meaning moments in Urdu — is a fine-dining Indian restaurant in New Jersey that invited Samay Innovation to design a space as evocative as its name. The 4,500 sq ft interior is a sequence of emotional moments: the entrance is a dark, cave-like passage with hand-painted murals depicting the streets of Old Delhi, which opens dramatically into a main dining room of extraordinary warmth and grandeur. The central dining hall features a 24-foot vaulted ceiling with carved jaali-patterned panels backlit in amber, ten-foot curtained arches between dining bays, and a floor of hand-cut Agra stone that grounds the interior in unmistakable Indian heritage. A private dining room seats sixteen beneath a custom chandelier made from 400 hand-knotted silk tassels. The bar carries its own identity — a serpentine counter in polished black granite, shelving that ascends to the ceiling, and custom bar stools in embossed leather.`,
    challenges: `Creating an authentic, immersive Indian fine-dining experience for the demanding New Jersey market — which has seen many Indian restaurants — while achieving a level of design ambition that would justify premium positioning and generate significant social media attention.`,
    solutions: `Authenticity was drawn from craft heritage — hand-painted murals, hand-cut stone, hand-knotted textiles — rather than pastiche. The design references specific historic Indian architectural traditions (Mughal vaulting, Rajasthani jaali work) rather than generic "Indian restaurant" tropes, resulting in an interior that was immediately distinctive and organically highly photographable.`,
    tags: ['International', 'Restaurant', 'New Jersey', 'USA', 'Indian Cuisine', 'Hospitality'],
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
    size: '1,800 sq ft',
    status: 'completed',
    featured: false,
    description: `An intimate luxury lounge in the United States — a private members-style space defined by deep comfort, extraordinary material quality, and an atmosphere that makes every guest feel they have stepped into a world apart. The 1,800 sq ft space is divided between a reception bar, a main lounge, and a semi-private intimate zone. The reception bar anchors the space — a ten-foot counter in book-matched Nero Portoro marble, lit from below by concealed LEDs that turn the stone into a glowing sculpture. The lounge is furnished with entirely custom pieces: deep sofas in cognac leather, occasional tables in solid bronze and smoked glass, and rugs hand-knotted in New Zealand wool. Walls are finished in fabric-wrapped acoustic panels in charcoal and copper that absorb sound while adding a layer of tactile luxury.`,
    challenges: `Creating a luxury lounge that could command premium pricing and justify a members-only positioning in a competitive US hospitality market, using a budget that required every design decision to deliver maximum impact.`,
    solutions: `Investment was concentrated in the highest-visibility elements — the bar counter, the key feature wall, and the bespoke furniture pieces — while secondary spaces used the same material language in more cost-effective applications. The result reads as uniform luxury while efficiently directing budget to impact points.`,
    tags: ['International', 'Lounge', 'USA', 'Luxury', 'Hospitality', 'Members Club'],
  },
  {
    id: '20',
    title: '3BHK-ARISTO BLAZE',
    slug: 'aristo-blaze',
    category: 'residential',
    location: 'Aristo Blaze, Ahmedabad',
    year: 2024,
    size: '2,050 sq ft',
    status: 'completed',
    featured: false,
    description: `A confident, character-rich 3BHK at Aristo Blaze that refuses to play it safe. The entrance foyer makes an immediate impression — a backlit onyx-look fluted panel leads you into a living space defined by a deep navy feature wall, gold-accented shelving, and a custom sofa in warm terracotta. The dining area features a sculptural pendant light above a six-seater marble-top table, while the kitchen carries the premium theme with lacquered grey shutters and a matching grey quartz island. The master bedroom is a sanctuary of burgundy, warm wood, and ambient lighting.`,
    challenges: `Translating the client's love of high-contrast, hotel-inspired luxury into a family home that feels welcoming rather than intimidating.`,
    solutions: `Rich jewel tones were balanced with warm timber accents and tactile fabrics. Dimmable cove lighting ensures the same space transitions seamlessly from bold and dramatic to warm and intimate.`,
    tags: ['3BHK', 'Apartment', 'Contemporary', 'Dramatic', 'Feature Wall'],
  },
  {
    id: '21',
    title: '3BHK-ELITE MARS A BLOCK',
    slug: 'elite-mars-a-block',
    category: 'residential',
    location: 'Elite Mars, A Block, Ahmedabad',
    year: 2024,
    size: '1,950 sq ft',
    status: 'completed',
    featured: false,
    description: `The A Block apartment at Elite Mars is a study in sophisticated contemporary living. A restrained palette of warm whites, taupe, and brushed champagne gold runs throughout — from the living room's custom TV wall with integrated storage niches to the master bedroom's upholstered panel wall and floating side tables. The kitchen is exceptionally well-planned: full-height white lacquer cabinets with a central island, black matte fittings, and Quartz stone countertops create a chef-worthy space within the apartment typology. The children's bedroom adds a playful touch — pastel greens and custom loft joinery spark imagination without compromising the overall design language.`,
    challenges: `Designing a home that works equally well for parents who wanted sophistication and children who needed a playful, functional environment.`,
    solutions: `Common areas stay rigorously sophisticated while each child's room gets its own curated colour palette and bespoke storage — all within the same material and tonal family to maintain visual coherence.`,
    tags: ['3BHK', 'Apartment', 'Sophisticated', 'Premium', 'Contemporary'],
    videoUrl: 'https://youtu.be/yWTRl4oCLbQ',
  },
  {
    id: '22',
    title: '3BHK-GREENZ TURQUIOSE SHELA',
    slug: 'greenz-turquoise-shela',
    category: 'residential',
    location: 'Greenz Turquoise, Shela, Ahmedabad',
    year: 2024,
    size: '2,200 sq ft',
    status: 'completed',
    featured: false,
    description: `Shela's Greenz Turquoise society provided the perfect setting for this vibrant, nature-inspired 3BHK. The apartment's largest room — a generously proportioned living and dining space — is flooded with natural light and anchored by an organic green feature wall finished in textured lime plaster. Custom rattan light fittings, a curved sofa, and a live-edge coffee table bring a distinctly contemporary natural aesthetic. The kitchen carries this sensibility forward with sage green cabinetry, open display shelving in natural wood, and terracotta-finish floor tiles. The bedrooms are calm, layered retreats in earthy whites and warm sand tones.`,
    challenges: `Incorporating a strong nature-inspired aesthetic — requested by the client — without the result feeling casual or under-designed relative to a premium Shela address.`,
    solutions: `Natural materials were paired with precision: lime plaster walls with sharp-edged cove lighting, rattan pendants above a polished marble dining table, organic curves alongside architectural joinery — nature-inspired but never rustic.`,
    tags: ['3BHK', 'Apartment', 'Contemporary', 'Shela', 'Nature-Inspired'],
    videoUrl: 'https://youtu.be/en9ON9t_0kI',
  },
  {
    id: '23',
    title: '3BHK-SHEETAL WEST PARK VASTRAPUR',
    slug: 'sheetal-west-park',
    category: 'residential',
    location: 'Sheetal West Park, Vastrapur, Ahmedabad',
    year: 2023,
    size: '1,800 sq ft',
    status: 'completed',
    featured: false,
    description: `In one of Ahmedabad's most prestigious residential addresses — Vastrapur — this 3BHK at Sheetal West Park demonstrates how to design thoughtfully within a compact footprint. The living room prioritises openness: a low-profile sofa, a wall-mounted TV unit with floating shelves, and a seamlessly integrated dining table in the same wood finish. The kitchen is a standout feature — a fully fitted modular kitchen in two-tone white and anthracite with under-cabinet lighting and a subway-tile backsplash that balances practicality with aesthetics. The master bedroom features a customised walk-in wardrobe with a full-length mirror and warm-white profile lighting.`,
    challenges: `Designing a luxury interior at a premium Vastrapur address within the spatial constraints of a compact 3BHK, while meeting the refined expectations of its residents.`,
    solutions: `Flush-fitted joinery, wall-mounted storage, and a carefully edited furniture selection keep the floor area clear and sightlines long — creating the impression of a far larger, more expansive home.`,
    tags: ['3BHK', 'Apartment', 'Modern', 'Vastrapur', 'Compact Luxury'],
    videoUrl: 'https://youtu.be/jjfuxNnDOH8',
  },
  {
    id: '24',
    title: '4BHK-THE BUNGLOWS WEST',
    slug: 'the-bunglows-west-4bhk',
    category: 'residential',
    location: 'The Bunglows West, Ahmedabad',
    year: 2024,
    size: '5,200 sq ft',
    status: 'completed',
    featured: false,
    description: `Grand in scale and deliberate in every detail, this 5,200 sq ft 4BHK bungalow at The Bunglows West in Ahmedabad sets a new benchmark for luxury residential design in the city's western corridor. The entrance portico leads into a double-height foyer with a chandelier installation that anchors a sweeping curved staircase. The living room is designed for entertaining at scale — a 12-seater sectional, a bar niche with backlit display shelving, and a 12-foot bespoke TV wall in veneered walnut with integrated ambient lighting. The kitchen and utility wing are professional-grade, with a central island, walk-in pantry, and a dry kitchen area for daily use. All four bedrooms are suite-configured, each with dedicated sitting areas and ensuite bathrooms.`,
    challenges: `Designing a home that feels intimate and liveable despite its grand scale — avoiding the impersonal atmosphere that often plagues large luxury properties.`,
    solutions: `The floor plan was zoned into a public entertaining wing and a private family wing. Materials shift subtly between zones — bolder and more dramatic in the entertaining spaces, warmer and softer in the family rooms — creating an appropriate emotional register for each area.`,
    tags: ['4BHK', 'Bungalow', 'Luxury', 'Grand', 'Premium', 'West Ahmedabad'],
  },
  {
    id: '25',
    title: '4BHK-VENICE BUNGLOWS',
    slug: 'venice-bungalows-4bhk',
    category: 'residential',
    location: 'Venice Bungalows, Ahmedabad',
    year: 2024,
    size: '4,500 sq ft',
    status: 'completed',
    featured: false,
    description: `A bold, contemporary bungalow at Venice that makes a strong design statement from the moment you arrive. The living room features a striking geometric false ceiling with multi-tier cove lighting, a dramatic diagonal wall panel in fluted veneer, and a rich dark velvet sectional anchored by a marble-top coffee table with a sculptural gold base. The double-height staircase is a focal point — open-riser treads in solid marble with a custom steel and glass balustrade. The modular kitchen continues the premium theme: dark glossy cabinets, black Marquina marble countertops, and under-cabinet accent lighting make this a space where design and function are inseparable. Outdoor spaces — a landscaped courtyard and a covered terrace — extend the living area seamlessly.`,
    challenges: `Designing a high-impact, contemporary home across a large bungalow footprint while maintaining visual coherence and ensuring that bold design choices in the living areas did not overwhelm the private, restful quality of the bedrooms.`,
    solutions: `A unifying palette of dark velvets, warm gold accents, and natural marble runs from public to private spaces. In bedrooms, the same materials appear in softer, lighter forms — ensuring the language is consistent without the intensity.`,
    tags: ['4BHK', 'Bungalow', 'Contemporary', 'Geometric', 'Premium', 'Luxury Kitchen'],
  },
  {
    id: '26',
    title: '4BHK-VILLA YATKRUPA SOC ANAND',
    slug: 'villa-yatkrupa-anand',
    category: 'residential',
    location: 'Yatkrupa Society, Anand, Gujarat',
    year: 2024,
    size: '4,800 sq ft',
    status: 'completed',
    featured: false,
    description: `A warmly composed 4BHK villa in Anand's Yatkrupa Society — a home that honours the cultural sensibility of its owners while speaking an entirely contemporary design language. The living room balances traditional warmth with modern precision: a Rajasthani handcrafted wooden jali screen as a room divider, a custom sofa in warm ochre upholstery, and a modern cove-lit ceiling that frames the space without overpowering it. The dining room seats ten around a reclaimed teak table, lit by a ring-chandelier in antique brass. The kitchen is a functional workhorse — full modular cabinetry in ivory and walnut, with ample counter space and discreet pantry storage. The private spaces are designed for multigenerational living, with a ground-floor bedroom suite for senior family members designed for both comfort and accessibility.`,
    challenges: `Designing a home that serves a multigenerational family — with members spanning from grandparents to teenagers — without the result feeling like a compromise or a house divided.`,
    solutions: `A single warm-contemporary design language runs throughout. Spatial zones rather than stylistic differences separate the generations — ground-floor suites are accessible and calm, upper-floor rooms are vibrant and personal.`,
    tags: ['4BHK', 'Villa', 'Anand', 'Warm Contemporary', 'Heritage Sensibility'],
    videoUrl: 'https://youtu.be/EvBlFFzwTlg',
  },
  {
    id: '27',
    title: '5BHK- THE BUNGLOWS WEST SAMPLE',
    slug: 'the-bunglows-west-5bhk',
    category: 'residential',
    location: 'The Bunglows West, Ahmedabad',
    year: 2025,
    size: '6,700 sq ft',
    status: 'completed',
    featured: true,
    description: `The definitive expression of luxury residential design in Ahmedabad, this 6,700 sq ft sample bungalow at The Bunglows West was designed to set the aspirational standard for the entire development. From the landscaped entrance — a water feature, bespoke gate design, and double-height portico with a chandelier visible from the street — to the last square foot of the master suite, every space is curated to inspire. The living room is a gallery-level composition: a 20-foot feature wall in book-matched Italian marble, a sculptural cloud-ceiling installation with 600 points of light, and furniture that has been custom-designed and manufactured exclusively for this project. The home includes a fully equipped home gym, a spa-level master bathroom with a soaking tub and rain shower, an outdoor infinity pool deck, and a rooftop entertainment terrace. Five bedroom suites each carry their own personality, material palette, and custom joinery scheme.`,
    challenges: `Creating a sample flat that would immediately and viscerally communicate the highest possible aspiration for luxury living to prospective buyers, while remaining functional enough to serve as an actual show home for extended periods.`,
    solutions: `Every material, fitting, and furniture piece was specified at the top of its category. Nothing was value-engineered. The result is a home that functions as a piece of architecture — a showstopper that converts aspiration into purchase decisions.`,
    tags: ['5BHK', 'Sample Flat', 'Showstopper', 'Luxury', 'Bungalow', 'West Ahmedabad'],
  },
  {
    id: '28',
    title: 'COMMERCIAL-SATYAM IMPEX TILES SHOWROOM CTM',
    slug: 'satyam-impex-tiles',
    category: 'commercial',
    location: 'CTM Char Rasta, Ahmedabad',
    year: 2024,
    size: '1,400 sq ft',
    status: 'completed',
    featured: false,
    description: `A premium tiles showroom for Satyam Impex at CTM — Ahmedabad's largest ceramics and building materials trading hub — designed to stand out in a street where every neighbour is a competitor. The showroom design is itself a catalogue of the products it sells: every surface, floor, wall, counter, and ceiling uses a different tile from the range, effectively turning the showroom into a life-size product demonstration. The display system uses a custom steel grid wall-mounting system that allows tiles to be swapped in and out as collections change, ensuring the showroom remains current without redesign costs. A dedicated sample table with integrated lighting allows customers to compare tiles under both natural and artificial light conditions. A consultation zone at the rear provides a private, comfortable space for project-level sales conversations.`,
    challenges: `Designing a showroom that could simultaneously function as a retail space, a product catalogue, a brand statement, and a client consultation space — all within 1,400 sq ft on a busy commercial street.`,
    solutions: `The showroom layout was sequenced as a customer journey: brand impression at the entrance, product browsing in the central zone, and private consultation at the rear. The design itself became the primary sales tool — demonstrating product applications in situ rather than on boards.`,
    tags: ['Commercial', 'Showroom', 'Tiles', 'Retail', 'CTM', 'Display Design'],
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
