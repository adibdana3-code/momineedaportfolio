/**
 * Détourage des photos haute définition du tabouret (fond supprimé, alpha).
 * Outil PONCTUEL, déjà exécuté — conservé comme référence de méthode.
 *
 * ⚠️ La dépendance a été DÉSINSTALLÉE après usage (≈100 Mo : ONNX + modèles),
 * pour ne pas alourdir le projet. Pour re-détourer d'autres photos :
 *   npm i -D @imgly/background-removal-node
 *   node scripts/cutout-tabouret.mjs   (adapter JOBS ci-dessous)
 *   npm un -D @imgly/background-removal-node
 *
 * Entrées  : public/img/projects/IMG_8886.jpeg, IMG_8888.jpeg
 * Sorties  : img-src/projects/tabouret1-hd-cut.png, tabouret2-hd-cut.png (RGBA)
 * Ensuite  : conversion webp + intégration dans projects.js.
 */
import { removeBackground } from '@imgly/background-removal-node';
import fs from 'node:fs';
import path from 'node:path';

const JOBS = [
  ['public/img/projects/IMG_8886.jpeg', 'img-src/projects/tabouret1-hd-cut.png'],
  ['public/img/projects/IMG_8888.jpeg', 'img-src/projects/tabouret2-hd-cut.png'],
];

for (const [src, out] of JOBS) {
  const t0 = Date.now();
  process.stdout.write(`→ ${path.basename(src)} … `);
  const blob = await removeBackground(src, {
    output: { format: 'image/png', quality: 1 },
  });
  const buf = Buffer.from(await blob.arrayBuffer());
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  console.log(
    `${path.basename(out)} — ${(buf.length / 1024 / 1024).toFixed(1)} Mo en ${((Date.now() - t0) / 1000).toFixed(0)}s`
  );
}
console.log('Terminé.');
