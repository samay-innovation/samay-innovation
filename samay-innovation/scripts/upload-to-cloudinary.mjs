import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PHOTOS_ROOT = path.join(__dirname, '../samay-innovation-photos');
const OUTPUT_FILE = path.join(__dirname, '../src/data/cloudinary-urls.json');

// ⚠️  Regenerate your API secret after this run: Cloudinary Dashboard → Settings → Security
cloudinary.config({
  cloud_name: 'diojzujpv',
  api_key: '243874697819765',
  api_secret: '3Aib_fyjyLQBbbBJJP4TypHAiY8',
});

const PROJECT_FOLDERS = {
  // ── Already uploaded — skip ──────────────────────────────────────────────
  // 'ARVIND VILLA NO 6 KHATRAJ':   { slug: 'arvind-villa-khatraj',  name: 'Arvind Villa No. 6, Khatraj', type: 'residential' },
  // 'FARMHOUSE PICS AT RANCHARDA': { slug: 'farmhouse-rancharda',   name: 'Farmhouse at Rancharda',      type: 'residential' },
  // 'Indraprashtha':               { slug: 'indraprashtha',         name: 'Indraprashtha',               type: 'residential' },
  // 'PARIJAAT ECLAT 4BHK PHOTOS':  { slug: 'parijaat-eclat-4bhk',  name: 'Parijaat Eclat 4BHK',         type: 'residential' },
  // 'Venice Bunglows Watermarked': { slug: 'venice-bungalows',      name: 'Venice Bungalows',            type: 'residential' },
  // 'Ashutosh Kumar 3BHK':         { slug: 'ashutosh-kumar-3bhk',   name: 'Ashutosh Kumar 3BHK',         type: 'residential' },
  // 'EVENT OFFICE':                { slug: 'event-office',          name: 'Event Office',                type: 'commercial'  },

  // ── New international projects ───────────────────────────────────────────
  'RAVELLO ITALY':               { slug: 'ravello-italy',          name: 'Ravello, Italy',              type: 'hospitality' },
  'USA RESTAURANT IN LA':        { slug: 'usa-restaurant-la',      name: 'USA Restaurant in LA',        type: 'hospitality' },
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

  console.log(`\n📁 ${projectInfo.name} (${images.length} images)`);
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
        overwrite: false,
      };

      let result;
      if (fileSize > 9 * 1024 * 1024) {
        // Compress in memory before uploading — keeps quality high, brings size under 10MB
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

  const result = {};

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
