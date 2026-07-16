/**
 * Optimise TOUTES les images sources (img-src/projects) en webp web-ready
 * dans public/img/projects. Normalise les noms en kebab-case (sans espaces
 * ni caractères fragiles pour les URLs).
 * Usage : node scripts/optimize-projects.mjs
 */
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'img-src', 'projects');
const OUT_DIR = path.join(ROOT, 'public', 'img', 'projects');
const MAX_W = 2000;
const QUALITY = 80;

// Normalise un nom de fichier → slug kebab-case + .webp
function cleanName(file) {
  return (
    file
      .replace(/\.[^.]+$/, '') // retire l'extension
      .replace(/\s+/g, '-') // espaces → -
      .replace(/\+/g, '') // "r+1" → "r1"
      .replace(/\./g, '-') // "rend.1" → "rend-1"
      .replace(/-+/g, '-') // collapse
      .toLowerCase() + '.webp'
  );
}

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));
  const report = [];
  for (const file of files) {
    const src = path.join(SRC_DIR, file);
    const outName = cleanName(file);
    const out = path.join(OUT_DIR, outName);
    const info = await sharp(src)
      .rotate()
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    report.push({
      out: outName,
      wh: `${info.width}×${info.height}`,
      ratio: (info.width / info.height).toFixed(2),
      kb: Math.round(info.size / 1024),
    });
  }
  report.sort((a, b) => a.out.localeCompare(b.out));
  console.table(report);
  console.log('Total :', report.length, 'images →', OUT_DIR);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
