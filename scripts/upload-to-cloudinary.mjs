import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PHOTOS_ROOT = path.join(__dirname, '../samay-innovation-photos');
const OUTPUT_FILE = path.join(__dirname, '../src/data/cloudinary-urls.json');

cloudinary.config({
  cloud_name: 'dpv8br6pe',
  api_key: '143469487193317',
  api_secret: 'oP1KC6gxz9zuDD6zNyyBbMr7Cts',
});

const PROJECT_FOLDERS = {
  // ── Already uploaded — skip ───────────────────────────────────────────────
  // '4BHK-ARVIND VILLA NO 6 KHATRAJ':             { slug: 'arvind-villa-khatraj',       name: 'Arvind Villa No. 6, Khatraj',       type: 'residential', overwrite: false },
  // '4BHK PARIJAAT ECLAAT':                       { slug: 'parijaat-eclat-4bhk',        name: 'Parijaat Eclat 4BHK',               type: 'residential', overwrite: false },
  // 'COMMERCIAL-EVENT MANAGEMENT OFFICE-AMALGA':  { slug: 'event-office',               name: 'Event Office (Amalga)',             type: 'commercial',  overwrite: false },
  // 'COMMERCIAL-RESTAURANT IN LA, USA':           { slug: 'usa-restaurant-la',           name: 'Restaurant Interior, Los Angeles',  type: 'hospitality', overwrite: false },
  // 'FARMHOUSE-RANCHARDA':                        { slug: 'farmhouse-rancharda',         name: 'Farmhouse at Rancharda',            type: 'residential', overwrite: false },
  // '3BHK-INDRAPRASTH GREEN A BLOCK':             { slug: 'indraprashtha-green-a',       name: 'Indraprashtha Greens, A Block',     type: 'residential', overwrite: false },
  // '3BHK-INDRAPRASTH GREENS F BLOCK':            { slug: 'indraprashtha-green-f',       name: 'Indraprashtha Greens, F Block',     type: 'residential', overwrite: false },
  // '3BHK-MAPLE TREE F BLOCK':                    { slug: 'maple-tree-f-block',          name: 'Maple Tree, F Block',               type: 'residential', overwrite: false },
  // '3BHK-PANCHAM PENTAGON':                      { slug: 'pancham-pentagon',            name: 'Pancham Pentagon',                  type: 'residential', overwrite: false },
  // '3BHK-RATNAKAAR PRISTINE':                    { slug: 'ratnakaar-pristine',          name: 'Ratnakaar Pristine',                type: 'residential', overwrite: false },
  // '4BHK + HOMETHEATRE-VALENCIA RAJKOT':         { slug: 'valencia-rajkot',             name: 'Valencia Rajkot',                   type: 'residential', overwrite: false },
  // '4BHK-GIRIRAJ AMBAVADI':                      { slug: 'giriraj-ambavadi',            name: 'Giriraj Ambavadi',                  type: 'residential', overwrite: false },
  // '4BHK-POPLAR DOMAIN':                         { slug: 'poplar-domain',               name: 'Poplar Domain',                     type: 'residential', overwrite: false },
  // '4BHK-SHILP SHALIGRAM':                       { slug: 'shilp-shaligram',             name: 'Shilp Shaligram',                   type: 'residential', overwrite: false },
  // 'COMMERCIAL-BEFIT PHYSIOTHERAPY CLINIC':      { slug: 'befit-physiotherapy',         name: 'Befit Physiotherapy Clinic',        type: 'commercial',  overwrite: false },
  // 'COMMERCIAL-IMPORT & EXPORT OFFICE SHIVALIK': { slug: 'import-export-shivalik',      name: 'Import & Export Office, Shivalik',  type: 'commercial',  overwrite: false },
  // 'COMMERCIAL-IT OFFICE STRATUM FOCUS':         { slug: 'stratum-focus-it-office',     name: 'IT Office – Stratum Focus',         type: 'commercial',  overwrite: false },
  // 'COMMERCIAL-LAMHAA RESTAURANT NJ,USA':        { slug: 'lamhaa-restaurant-nj',        name: 'Lamhaa Restaurant, New Jersey',     type: 'hospitality', overwrite: false },
  // 'COMMERCIAL-LUXURY LOUNGE IN USA':            { slug: 'luxury-lounge-usa',           name: 'Luxury Lounge, USA',                type: 'hospitality', overwrite: false },

  // ── New projects (batch 2) ────────────────────────────────────────────────
  '3BHK-ARISTO BLAZE':                          { slug: 'aristo-blaze',                name: '3BHK-ARISTO BLAZE',                 type: 'residential', overwrite: false },
  '3BHK-ELITE MARS A BLOCK':                    { slug: 'elite-mars-a-block',          name: '3BHK-ELITE MARS A BLOCK',           type: 'residential', overwrite: false },
  '3BHK-GREENZ TURQUIOSE SHELA':                { slug: 'greenz-turquoise-shela',      name: '3BHK-GREENZ TURQUIOSE SHELA',       type: 'residential', overwrite: false },
  '3BHK-SHEETAL WEST PARK VASTRAPUR':           { slug: 'sheetal-west-park',           name: '3BHK-SHEETAL WEST PARK VASTRAPUR',  type: 'residential', overwrite: false },
  '4BHK-THE BUNGLOWS WEST':                     { slug: 'the-bunglows-west-4bhk',      name: '4BHK-THE BUNGLOWS WEST',            type: 'residential', overwrite: false },
  '4BHK-VENICE BUNGLOWS':                       { slug: 'venice-bungalows-4bhk',       name: '4BHK-VENICE BUNGLOWS',              type: 'residential', overwrite: false },
  '4BHK-VILLA YATKRUPA SOC ANAND':              { slug: 'villa-yatkrupa-anand',        name: '4BHK-VILLA YATKRUPA SOC ANAND',     type: 'residential', overwrite: false },
  '5BHK- THE BUNGLOWS WEST SAMPLE':             { slug: 'the-bunglows-west-5bhk',      name: '5BHK- THE BUNGLOWS WEST SAMPLE',    type: 'residential', overwrite: false },
  'COMMERCIAL-SATYAM IMPEX TILES SHOWROOM CTM': { slug: 'satyam-impex-tiles',          name: 'COMMERCIAL-SATYAM IMPEX TILES SHOWROOM CTM', type: 'commercial', overwrite: false },
};

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

function getImagesRecursively(dir) {
  let images = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      images = images.concat(getImagesRecursively(fullPath));
    } else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
      images.push(fullPath);
    }
  }
  return images;
}

async function uploadProject(folderName, projectInfo) {
  const folderPath = path.join(PHOTOS_ROOT, folderName);
  if (!fs.existsSync(folderPath)) {
    console.log(`  Skipping "${folderName}" — folder not found`);
    return [];
  }

  const images = getImagesRecursively(folderPath);
  if (images.length === 0) {
    console.log(`  Skipping "${folderName}" — no images found`);
    return [];
  }

  console.log(`\n📁 ${projectInfo.name} (${images.length} images, overwrite: ${projectInfo.overwrite})`);
  const urls = [];

  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    const baseName = path.basename(imagePath, path.extname(imagePath));
    const publicId = baseName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    try {
      const fileSize = fs.statSync(imagePath).size;
      const uploadOptions = {
        folder: `samay/${projectInfo.slug}`,
        public_id: publicId,
        overwrite: projectInfo.overwrite,
      };

      let result;
      if (fileSize > 9 * 1024 * 1024) {
        const buffer = await sharp(imagePath).jpeg({ quality: 82 }).toBuffer();
        result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(uploadOptions, (err, res) => {
            if (err) reject(err); else resolve(res);
          });
          stream.end(buffer);
        });
        process.stdout.write(`  [${i + 1}/${images.length}] ✓ ${path.basename(imagePath)} (compressed)\n`);
      } else {
        result = await cloudinary.uploader.upload(imagePath, uploadOptions);
        process.stdout.write(`  [${i + 1}/${images.length}] ✓ ${path.basename(imagePath)}\n`);
      }

      urls.push(result.secure_url);
    } catch (err) {
      process.stdout.write(`  [${i + 1}/${images.length}] ✗ ${path.basename(imagePath)} — ${err.message}\n`);
    }
  }

  return urls;
}

async function main() {
  console.log('🚀 Starting Cloudinary upload...');
  console.log(`   Photos root: ${PHOTOS_ROOT}\n`);

  // Patch existing JSON — preserves already-uploaded projects
  const result = fs.existsSync(OUTPUT_FILE)
    ? JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'))
    : {};

  for (const [folderName, projectInfo] of Object.entries(PROJECT_FOLDERS)) {
    const urls = await uploadProject(folderName, projectInfo);
    result[projectInfo.slug] = {
      name: projectInfo.name,
      type: projectInfo.type,
      images: urls,
    };
  }

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

  console.log('\n\n=== UPLOAD SUMMARY ===');
  let total = 0;
  for (const [slug, data] of Object.entries(result)) {
    console.log(`  ${data.name}: ${data.images.length} images`);
    total += data.images.length;
  }
  console.log(`  ─────────────────────`);
  console.log(`  Total: ${total} images uploaded`);
  console.log(`\n✅ URLs saved to: src/data/cloudinary-urls.json`);
  console.log('⚠️  Remember to regenerate your Cloudinary API secret!');
}

main().catch(console.error);
