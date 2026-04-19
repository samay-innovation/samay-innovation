import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PHOTOS_ROOT = path.join(__dirname, '../samay-innovation-photos');
const JSON_FILE = path.join(__dirname, '../src/data/cloudinary-urls.json');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

cloudinary.config({
  cloud_name: 'dpv8br6pe',
  api_key: '143469487193317',
  api_secret: 'oP1KC6gxz9zuDD6zNyyBbMr7Cts',
});

function getImagesRecursively(dir) {
  let images = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) images = images.concat(getImagesRecursively(fullPath));
    else if (IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) images.push(fullPath);
  }
  return images;
}

const folderPath = path.join(PHOTOS_ROOT, '4BHK-SHILP SHALIGRAM');
const images = getImagesRecursively(folderPath);
console.log(`\n📁 4BHK-SHILP SHALIGRAM (${images.length} images)`);

const urls = [];
for (let i = 0; i < images.length; i++) {
  const imagePath = images[i];
  const baseName = path.basename(imagePath, path.extname(imagePath));
  const publicId = baseName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
  try {
    const fileSize = fs.statSync(imagePath).size;
    const opts = { folder: 'samay/shilp-shaligram', public_id: publicId, overwrite: false };
    let result;
    if (fileSize > 9 * 1024 * 1024) {
      const buffer = await sharp(imagePath).jpeg({ quality: 82 }).toBuffer();
      result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(opts, (err, res) => { if (err) reject(err); else resolve(res); });
        stream.end(buffer);
      });
    } else {
      result = await cloudinary.uploader.upload(imagePath, opts);
    }
    urls.push(result.secure_url);
    process.stdout.write(`  [${i + 1}/${images.length}] ✓ ${path.basename(imagePath)}\n`);
  } catch (err) {
    process.stdout.write(`  [${i + 1}/${images.length}] ✗ ${path.basename(imagePath)} — ${err.message}\n`);
  }
}

// Patch existing cloudinary-urls.json
const existing = JSON.parse(fs.readFileSync(JSON_FILE, 'utf8'));
existing['shilp-shaligram'] = { name: '4BHK-SHILP SHALIGRAM', type: 'residential', images: urls };
fs.writeFileSync(JSON_FILE, JSON.stringify(existing, null, 2));
console.log(`\n✅ Done — ${urls.length} images. cloudinary-urls.json updated.`);
