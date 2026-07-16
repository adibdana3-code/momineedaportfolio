/**
 * Optimisation des rendus sources (JPG/PNG lourds) → WebP web-ready.
 * Usage : node scripts/optimize-images.mjs
 * Sortie : public/img/projects/*.webp (+ dimensions imprimées pour choisir les ratios).
 */
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'img', 'projects');
const MAX_W = 1800;
const QUALITY = 80;

// [source relative, nom de sortie]
const JOBS = [
  ['PORTFOLIO/maison revit/Renderings FINAUX/Project_1_-_House_rendering.rvt_2025-Dec-03_08-47-26AM-000_Vue_extérieure_jpg.jpg', 'maison-exterieur'],
  ['PORTFOLIO/maison revit/Renderings FINAUX/Project_1_-_House_rendering.rvt_2025-Dec-03_08-40-33AM-000_Intérieur_1F_vers_skylight_et_terrasse_jpg.jpg', 'maison-interieur'],
  ['PORTFOLIO/maison revit/Renderings FINAUX/Project_1_-_House_rendering.rvt_2025-Dec-03_10-31-42AM-000_3D_View_1_jpg.jpg', 'maison-3d'],
  ['PORTFOLIO/DAT/AA_FINAL MEME DA/6. Office atrium - 3rd floor.jpg', 'dat-atrium'],
  ['PORTFOLIO/DAT/AA_FINAL MEME DA/1. Lobby entrée.jpg', 'dat-lobby'],
  ['PORTFOLIO/DAT/AA_FINAL MEME DA/3. Retail - shop fronts.jpg', 'dat-retail'],
  ['PORTFOLIO/DAT/AA_FINAL MEME DA/4. Office lobby.jpg', 'dat-office-lobby'],
  ['PORTFOLIO/pysall détails porte/PF_000_A_05_DT_0_91_920_AA.jpg', 'pysall-detail'],
];

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  const report = [];
  for (const [rel, name] of JOBS) {
    const src = path.join(ROOT, rel);
    if (!existsSync(src)) {
      console.warn('⚠️  Introuvable :', rel);
      continue;
    }
    const out = path.join(OUT_DIR, `${name}.webp`);
    const meta = await sharp(src).metadata();
    const info = await sharp(src)
      .rotate() // respecte l'orientation EXIF
      .resize({ width: MAX_W, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);
    const ratio = (info.width / info.height).toFixed(3);
    report.push({ name, srcWH: `${meta.width}×${meta.height}`, outWH: `${info.width}×${info.height}`, ratio, kb: Math.round(info.size / 1024) });
  }
  console.table(report);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
