/**
 * Marques de référence (SVG) pour la section « Genèse » d'un projet graphique.
 *
 * Les trois signes (Tour Eiffel, Cèdre, Balance) sont redessinés au trait, en
 * currentColor, pour rester dans la DA éditoriale et se fondre avec le logotype
 * final — chaque signe est ainsi présenté dans le même langage graphique.
 */

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/** Tour Eiffel — silhouette stylisée (France). */
function Eiffel(props) {
  return (
    <svg viewBox="0 0 100 120" role="img" aria-label="Tour Eiffel" {...props}>
      <g {...common}>
        <path d="M50 6 v14" />
        <path d="M43 20 h14" />
        <path d="M43 20 C45 44 37 60 29 78 L21 102" />
        <path d="M57 20 C55 44 63 60 71 78 L79 102" />
        <path d="M38 50 h24" />
        <path d="M30 76 h40" />
        <path d="M21 102 h58" />
        <path d="M34 76 C42 88 58 88 66 76" />
      </g>
    </svg>
  );
}

/** Cèdre du Liban — étages horizontaux caractéristiques (Liban). */
function Cedar(props) {
  return (
    <svg viewBox="0 0 100 120" role="img" aria-label="Cèdre du Liban" {...props}>
      <g {...common}>
        <path d="M50 104 V26" />
        <path d="M36 26 h28" />
        <path d="M26 42 h48" />
        <path d="M16 58 h68" />
        <path d="M24 74 h52" />
        <path d="M36 104 h28" />
      </g>
    </svg>
  );
}

/** Balance de la Justice — fléau et plateaux (Justice). */
function Scales(props) {
  return (
    <svg viewBox="0 0 100 120" role="img" aria-label="Balance de la justice" {...props}>
      <g {...common}>
        <path d="M50 18 v82" />
        <path d="M34 100 h32" />
        <path d="M20 30 h60" />
        <path d="M50 18 l-8 12 h16 z" />
        <path d="M22 30 v10" />
        <path d="M78 30 v10" />
        <path d="M10 40 a12 8 0 0 0 24 0" />
        <path d="M66 40 a12 8 0 0 0 24 0" />
      </g>
    </svg>
  );
}

const MARKS = { eiffel: Eiffel, cedar: Cedar, scales: Scales };

export default function GenesisMark({ name, ...props }) {
  const Cmp = MARKS[name];
  return Cmp ? <Cmp {...props} /> : null;
}
