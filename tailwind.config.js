/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ——— DA « Indie Art Zine & Pop Neo-Brutalism » ———
        paper: '#FFFFFF', // Blanc pur (respiration)
        ink: '#0A0A0A', // Noir profond (texte, bordures)
        bubblegum: '#E881B3', // Rose
        acid: '#79C15A', // Vert acide
        orange: '#FF6B35', // Orange électrique
        butter: '#FDF395', // Jaune pâle
        amaranth: '#933B5B', // Framboise sombre (section Contact)
        chalk: '#E3D6BF', // Beige crème clair (texte sur fonds sombres)
      },
      fontFamily: {
        // Titres colossaux, serif italique expressif
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        // UI, micro-copie dense, grotesque géométrique
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
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
