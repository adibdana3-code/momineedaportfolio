import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// NOTE GitHub Pages + React Router : le routage a besoin d'un base ABSOLU.
// - Domaine racine / user-site / Netlify / Vercel : base '/'.
// - Project-site https://<user>.github.io/<repo>/ : base '/<repo>/'
//   (et ajuster pathSegmentsToKeep=1 dans public/404.html).
export default defineConfig({
  // Site utilisateur GitHub Pages (dépôt danaadib.github.io) → servi à la RACINE
  // https://danaadib.github.io/ . base '/' : le basename du routeur en est dérivé
  // automatiquement dans App.jsx (→ '' racine), et 404.html passe
  // pathSegmentsToKeep=0.
  base: '/',
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.hdr', '**/*.fbx'],
  server: {
    watch: {
      // Dossier sous OneDrive : la synchro verrouille les fichiers (surtout les
      // assets déposés dans public/) → le watcher chokidar plante (EBUSY).
      // public/ étant 100% statique, on l'exclut entièrement de la surveillance
      // (Vite continue de le servir ; un simple refresh prend en compte les ajouts).
      ignored: ['**/public/**', '**/img-src/**'],
    },
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
