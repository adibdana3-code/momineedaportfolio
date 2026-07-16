/**
 * Conversion des 4 photos « en mode manuel » (JPG lourds) → WebP web-ready.
 * Usage : node scripts/convert-photos-manuel.mjs
 */
import sharp from 'sharp';
import { existsSync } from 'node:fs';
import path from 'node:path';

const SRC_DIR = path.join(process.cwd(), 'img-src', 'projects');
const OUT_DIR = path.join(process.cwd(), 'public', 'img', 'projects');
const MAX_W = 1800;
const QUALITY = 82;

// [source (dans img-src/projects), nom de sortie]
const JOBS = [
  ['photo en mode manuel-2024-1.jpg', 'photo-manuel-1'],
  ['photo en mode manuel-2024-2.JPG', 'photo-manuel-2'],
  ['photo en mode manuel-2024-3.JPG', 'photo-manuel-3'],
  ['photo en mode manuel-2024-4.JPG', 'photo-manuel-4'],
];

const report = [];
for (const [file, name] of JOBS) {
  const src = path.join(SRC_DIR, file);
  if (!existsSync(src)) {
    console.warn('⚠️  Introuvable :', file);
    continue;
  }
  const out = path.join(OUT_DIR, `${name}.webp`);
  const info = await sharp(src)
    .rotate() // respecte l'orientation EXIF
    .resize({ width: MAX_W, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  report.push({ name, outWH: `${info.width}×${info.height}`, ratio: (info.width / info.height).toFixed(3), kb: Math.round(info.size / 1024) });
}
console.table(report);
