/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ——— DA « Magazine Éditorial / Pop Neo-Brutalism » ———
        paper: '#E3D6BF', // Chalk — fond principal (crème minéral)
        ink: '#2C3A2E', // Deep Forest — texte & lignes (vert anthracite)
        amaranth: '#933B5B', // Amaranth — accent & Contact (framboise sombre)
        brookgreen: '#AABAAE', // Brook Green — vert sauge clair
        thulian: '#B5728A', // Thulian Pink — vieux rose
        pomelo: '#9F9679', // Pomelo Olive — kaki clair
        chalk: '#E3D6BF', // = paper (texte clair sur fonds sombres)
        forest: '#2C3A2E', // = ink (alias sémantique)
        // Anciens tokens « pop » REMAPPÉS vers la palette éditoriale : conserve la
        // compatibilité de toutes les classes existantes (bg-orange, text-acid…)
        // tout en adoptant les nouvelles couleurs. Nom conservé = zéro churn.
        bubblegum: '#B5728A', // → Thulian
        acid: '#AABAAE', // → Brook Green
        orange: '#933B5B', // → Amaranth (accent UI : soulignés, survols)
        butter: '#9F9679', // → Pomelo
      },
      fontFamily: {
        // Titres display « magazine » (Playfair Display, regular + italic mêlés).
        // Reem Kufi = pendant arabe (glyphes arabes en fallback → toujours Reem Kufi).
        serif: ['"Playfair Display"', '"Reem Kufi"', 'Georgia', 'serif'],
        // UI, micro-copie dense, grotesque géométrique.
        // IBM Plex Sans Arabic = pendant arabe (fallback pour les glyphes arabes).
        sans: ['"Space Grotesk"', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
        // Arabe explicite (nom & titres) — Reem Kufi imposé par la DA.
        kufi: ['"Reem Kufi"', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.24em',
        wide2: '0.28em',
      },
      transitionTimingFunction: {
        cine: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      transitionDuration: {
        800: '800ms',
        1100: '1100ms',
        1200: '1200ms',
      },
      boxShadow: {
        // Ombre « neo-brutalist » dure (offset, sans flou)
        brutal: '6px 6px 0 0 #0A0A0A',
        brutalSm: '3px 3px 0 0 #0A0A0A',
      },
    },
  },
  plugins: [],
};
