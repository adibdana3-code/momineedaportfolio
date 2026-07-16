/**
 * Extrait l'enveloppe d'un fichier gbXML → JSON de polygones 3D léger.
 * Usage : node scripts/gbxml-to-massing.mjs [source.xml] [sortie.json]
 *
 * gbXML : chaque <Surface surfaceType="…"> porte une <PlanarGeometry><PolyLoop>
 * de <CartesianPoint> (3 <Coordinate> = x, y, z en mètres, z = hauteur).
 * On ne garde que l'enveloppe pour une maquette lisible (pas les ombres ni
 * les cloisons intérieures).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const SRC = process.argv[2] || 'Villa.xml';
const OUT = process.argv[3] || 'public/models/villa-massing.json';

// Types conservés pour l'enveloppe
const KEEP = new Set([
  'ExteriorWall',
  'Roof',
  'RaisedFloor',
  'UndergroundWall',
  'UndergroundSlab',
  'SlabOnGrade',
]);

const xml = readFileSync(SRC, 'utf8');

const surfRe = /<Surface\b[^>]*surfaceType="([^"]+)"[^>]*>([\s\S]*?)<\/Surface>/g;
const planarRe = /<PlanarGeometry>([\s\S]*?)<\/PlanarGeometry>/;
const loopRe = /<PolyLoop>([\s\S]*?)<\/PolyLoop>/;
const ptRe =
  /<CartesianPoint>\s*<Coordinate>([^<]+)<\/Coordinate>\s*<Coordinate>([^<]+)<\/Coordinate>\s*<Coordinate>([^<]+)<\/Coordinate>\s*<\/CartesianPoint>/g;

const surfaces = [];
const counts = {};
let m;
while ((m = surfRe.exec(xml))) {
  const type = m[1];
  if (!KEEP.has(type)) continue;
  const planar = m[2].match(planarRe);
  if (!planar) continue;
  const loop = planar[1].match(loopRe);
  if (!loop) continue;
  const pts = [];
  let p;
  ptRe.lastIndex = 0;
  while ((p = ptRe.exec(loop[1]))) {
    pts.push([parseFloat(p[1]), parseFloat(p[2]), parseFloat(p[3])]);
  }
  if (pts.length >= 3) {
    surfaces.push({ type, loop: pts });
    counts[type] = (counts[type] || 0) + 1;
  }
}

// Bornes pour info
const bb = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
for (const s of surfaces)
  for (const pt of s.loop)
    for (let i = 0; i < 3; i++) {
      bb.min[i] = Math.min(bb.min[i], pt[i]);
      bb.max[i] = Math.max(bb.max[i], pt[i]);
    }

mkdirSync(path.dirname(OUT), { recursive: true });
// Arrondi à 3 décimales pour alléger le JSON
const round = (n) => Math.round(n * 1000) / 1000;
const out = {
  unit: 'm',
  source: path.basename(SRC),
  surfaces: surfaces.map((s) => ({ type: s.type, loop: s.loop.map((pt) => pt.map(round)) })),
};
writeFileSync(OUT, JSON.stringify(out));

console.log('Surfaces exportées :', surfaces.length, counts);
console.log(
  'BBox (m) :',
  bb.min.map(round),
  '→',
  bb.max.map(round),
  '| dims:',
  bb.max.map((v, i) => round(v - bb.min[i]))
);
console.log('Écrit :', OUT, `(${Math.round(JSON.stringify(out).length / 1024)} Ko)`);
