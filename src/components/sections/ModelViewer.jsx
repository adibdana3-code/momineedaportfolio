import { Suspense, useEffect, useMemo, useRef, useState, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX, useGLTF, OrbitControls } from '@react-three/drei';
import { useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { useLanguage } from '../../context/LanguageContext.jsx';
import { ui } from '../../content/ui.js';

const TARGET = 5; // taille cible du modèle dans la scène
const STONE = '#CBC7BC'; // matériau « maquette » neutre

/**
 * Rotation Y liée au scroll (+ légère oscillation d'inactivité).
 * Appliquée à un <group> qui ENGLOBE le modèle → n'interfère pas avec
 * OrbitControls, qui pilote la caméra. `enabled=false` la désactive
 * (ex. vue intérieure 360°, où l'on veut regarder autour sans que la
 * pièce tourne toute seule).
 */
function useScrollRotation(ref, progress, enabled = true) {
  useFrame((state) => {
    if (!ref.current || !enabled) return;
    const p = progress ? progress.get() : 0;
    ref.current.rotation.y =
      -0.6 + p * Math.PI * 1.5 + Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
  });
}

/**
 * Maillage FBX (Villa, Cuisine…) — centré, mis à l'échelle.
 * DA « maquette conceptuelle » : les matériaux natifs sont remplacés par une
 * teinte UNIQUE (la couleur d'accent du projet). Le relief reste lisible grâce
 * à l'éclairage (lumière-clé + ombres). `hideMeshes` retire du rendu les
 * éléments de site parasites (cercle/terrain, barrière…) par nom.
 */
function FBXModel({ url, progress, spin, dropGround, hideMeshes, color = STONE }) {
  const fbx = useFBX(url);
  const ref = useRef();
  const scale = useMemo(() => {
    fbx.rotation.x = -Math.PI / 2; // FBX Revit en Z-up → redresse en Y-up (toit vers le haut)
    fbx.updateMatrixWorld(true); // world matrices à jour avant toute mesure de bbox

    // Matériau « maquette » : couleur unie du projet, mate, double-face (les faces
    // d'export Revit sont souvent inversées). Une seule instance partagée (perf).
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.78,
      metalness: 0,
      side: THREE.DoubleSide,
    });

    // Noms (sous-chaînes, insensibles à la casse) des meshes à retirer du rendu.
    const hide = (hideMeshes || []).map((s) => s.toLowerCase());

    const meshes = [];
    fbx.traverse((o) => {
      if (!o.isMesh) return;
      const name = (o.name || '').toLowerCase();
      if (hide.some((h) => name.includes(h))) {
        o.visible = false; // ex. Maison : « Toposolid » (sol/cercle) + « Railing » (barrière)
        return;
      }
      o.castShadow = true;
      o.receiveShadow = true;
      o.material = mat; // teinte unie du projet → lecture épurée du volume
      meshes.push(o);
    });

    // Masquage automatique optionnel : mesh le plus plat à la plus grande
    // empreinte X×Z → dalle/plan de masse. Complète `hideMeshes` quand on ne
    // connaît pas les noms du modèle.
    if (dropGround && meshes.length > 1) {
      let ground = null;
      let groundArea = 0;
      for (const m of meshes) {
        const s = new THREE.Vector3();
        new THREE.Box3().setFromObject(m).getSize(s);
        const foot = s.x * s.z;
        const flat = s.y < Math.min(s.x, s.z) * 0.25;
        if (flat && foot > groundArea) {
          groundArea = foot;
          ground = m;
        }
      }
      if (ground) ground.visible = false;
    }

    // Cadrage sur les meshes VISIBLES uniquement (site/sol exclus).
    const box = new THREE.Box3();
    let framed = false;
    for (const m of meshes) {
      if (!m.visible) continue;
      box.expandByObject(m);
      framed = true;
    }
    if (!framed) box.setFromObject(fbx);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    fbx.position.sub(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return TARGET / maxDim;
  }, [fbx, dropGround, hideMeshes, color]);
  // Le modèle vient de se monter (FBX chargé) → force R3F à (re)mesurer le canvas.
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [fbx]);
  useScrollRotation(ref, progress, spin);
  return (
    <group ref={ref} scale={scale}>
      <primitive object={fbx} />
    </group>
  );
}

/**
 * Modèle glTF/GLB (ex. bague Blender) — centré, mis à l'échelle.
 * Par défaut on CONSERVE les matériaux natifs (le design de l'objet lui-même).
 *
 * `forceColor` : remplace les matériaux par la couleur d'accent du projet.
 * Indispensable pour les exports CAO (ex. SimLab) dont le matériau par défaut
 * a `metallicFactor: 1` sans carte d'environnement → l'objet rendrait NOIR.
 *
 * Draco est décodé automatiquement par drei/useGLTF si nécessaire.
 */
function GLBModel({ url, progress, spin, forceColor, color = STONE }) {
  const gltf = useGLTF(url);
  const ref = useRef();
  const { obj, scale } = useMemo(() => {
    const obj = gltf.scene.clone(true); // clone → pas de mutation du cache useGLTF
    const mat = forceColor
      ? new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          roughness: 0.75,
          metalness: 0,
          side: THREE.DoubleSide,
        })
      : null;
    obj.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        if (mat) o.material = mat;
      }
    });
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    obj.position.sub(center); // recentre l'objet (glTF déjà Y-up, pas de rotation)
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { obj, scale: TARGET / maxDim };
  }, [gltf, forceColor, color]);
  useScrollRotation(ref, progress, spin);
  useEffect(() => {
    window.dispatchEvent(new Event('resize'));
  }, [obj]);
  return (
    <group ref={ref} scale={scale}>
      <primitive object={obj} />
    </group>
  );
}

/** Volume reconstruit depuis un massing gbXML (JSON) — faces + arêtes. */
function MassingModel({ url, color, progress, spin }) {
  const ref = useRef();
  const [surfaces, setSurfaces] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(url)
      .then((r) => r.json())
      .then((d) => alive && setSurfaces(d.surfaces))
      .catch(() => alive && setSurfaces([]));
    return () => {
      alive = false;
    };
  }, [url]);

  const built = useMemo(() => {
    if (!surfaces || !surfaces.length) return null;
    const positions = [];
    for (const s of surfaces) {
      const loop = s.loop.map(([x, y, z]) => [x, z, y]); // gbXML Z-up → Three Y-up
      for (let i = 1; i < loop.length - 1; i++) {
        positions.push(...loop[0], ...loop[i], ...loop[i + 1]);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.computeVertexNormals();
    geo.computeBoundingBox();
    const box = geo.boundingBox;
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    geo.translate(-center.x, -center.y, -center.z);
    const scale = TARGET / (Math.max(size.x, size.y, size.z) || 1);
    const edges = new THREE.EdgesGeometry(geo, 20);
    return { geo, edges, scale };
  }, [surfaces]);

  useScrollRotation(ref, progress, spin);
  useEffect(() => {
    if (built) window.dispatchEvent(new Event('resize'));
  }, [built]);
  if (!built) return null;
  return (
    <group ref={ref} scale={built.scale}>
      <mesh geometry={built.geo}>
        <meshStandardMaterial color={STONE} roughness={0.9} side={THREE.DoubleSide} flatShading />
      </mesh>
      <lineSegments geometry={built.edges}>
        <lineBasicMaterial color={color || '#0A0A0A'} transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
}

/** Repli si la scène échoue à charger. */
class SceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Viewer 3D unifié pour les pages projet.
 *
 * Interaction MIXTE :
 *   - rotation liée au scroll (sur le <group> englobant),
 *   - + manipulation à la souris via OrbitControls (glisser pour tourner),
 *     avec `enableDamping` pour une inertie « luxueuse ».
 *
 * Mode intérieur (`scene.interior`) : caméra placée DANS la géométrie,
 * OrbitControls restreint (zoom/pan désactivés, distance verrouillée) → l'on
 * regarde autour de soi comme dans une visite virtuelle à 360°, sans pouvoir
 * sortir de la pièce. La rotation-scroll est alors coupée (pièce fixe).
 *
 * @param {'fbx'|'massing'} type
 * @param {string} url    chemin du .fbx ou du massing .json
 * @param {string} color  couleur d'accent (arêtes du massing)
 * @param {object} [scene] { interior?, camera?:[x,y,z], radius?, target?:[x,y,z], dropGround? }
 * @param {string} label  petit cartel
 */
export default function ModelViewer({ type, url, color = '#0A0A0A', scene, label }) {
  // Cartels, indices d'interaction et libellés de curseur suivent la langue.
  const { lang } = useLanguage();
  const L = ui[lang] || ui.FR;
  const V = L.viewer;
  const C = L.cursor;
  // Cartel par défaut traduit (la page projet en fournit un explicitement).
  const cartel = label ?? L.project.scene;

  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start end', 'end start'] });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const interior = !!scene?.interior;
  // Vue intérieure : caméra proche du centre, distance verrouillée pour rester
  // dans la pièce. Vue extérieure : recul classique, zoom borné.
  const radius = scene?.radius ?? (interior ? 1.6 : undefined);
  const camPos = scene?.camera ?? (interior ? [0, 0.15, radius] : [5, 3, 8]);
  const target = scene?.target ?? [0, 0, 0];
  const controls = interior
    ? {
        enableZoom: false,
        enablePan: false,
        minDistance: radius,
        maxDistance: radius,
        rotateSpeed: -0.35,
      }
    : { enableZoom: true, enablePan: false, minDistance: 3, maxDistance: 16, rotateSpeed: 0.55 };

  // Rendu à la demande DÈS QUE LE VIEWER SORT DE L'ÉCRAN.
  //
  // Le viewer est désormais en tête de page : sans cela, la scène (ombres 2048,
  // dpr jusqu'à 2) continuerait de rendre en boucle pendant toute la lecture de
  // l'article, bien après être sortie du champ.
  //
  // Pourquoi pas `frameloop="demand"` en permanence : la rotation du modèle est
  // pilotée par le scroll dans `useScrollRotation` (via useFrame), avec une
  // légère oscillation d'inactivité. En mode « demand » aucune frame n'est
  // demandée au scroll → le modèle se figerait. On garde donc « always » tant
  // qu'il est visible, et l'on bascule en « demand » sitôt qu'il ne l'est plus.
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      // marge : la scène est déjà à plein régime juste avant d'entrer dans le champ.
      rootMargin: '200px 0px',
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // R3F ne mesure pas toujours son conteneur au montage (lazy + Suspense) :
  // un ResizeObserver force R3F à re-mesurer dès que le conteneur est dimensionné.
  useEffect(() => {
    const el = wrapRef.current;
    const fire = () => window.dispatchEvent(new Event('resize'));
    const ro = el && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fire) : null;
    ro?.observe(el);
    const timers = [100, 400, 900, 1600].map((t) => setTimeout(fire, t));
    return () => {
      ro?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  const fallback = (
    <div className="flex h-full w-full items-center justify-center">
      <span className="font-serif text-[clamp(20px,3vw,34px)] italic text-ink/60">
        {V.unavailable}
      </span>
    </div>
  );

  const hint = interior ? V.hintLook : V.hintTurn;
  const dropGround = !!scene?.dropGround;

  return (
    <div
      ref={wrapRef}
      data-cursor={interior ? C.look : C.turn}
      className="relative h-[56vh] min-h-[380px] w-full overflow-hidden bg-[#F3F1EA]"
    >
      <span className="pointer-events-none absolute left-4 top-4 z-10 font-sans text-[10px] uppercase tracking-editorial text-ink/50">
        {cartel}
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 z-10 font-sans text-[10px] uppercase tracking-editorial text-ink/40">
        {hint}
      </span>
      <SceneBoundary fallback={fallback}>
        <Canvas
          shadows
          frameloop={inView ? 'always' : 'demand'}
          dpr={[1, 2]}
          camera={{ position: camPos, fov: interior ? 72 : 40 }}
          gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
          style={{ background: 'transparent' }}
        >
          {/* Éclairage contrasté : ciel/sol doux (hémisphère) + ambiante basse
              pour préserver le relief, une lumière-clé directionnelle puissante
              qui PROJETTE les ombres (volumes détachés), et un appoint arrière
              blanc discret pour ne pas boucher les noirs. */}
          <hemisphereLight args={['#ffffff', '#b8b2a2', 0.5]} />
          <ambientLight intensity={0.32} />
          <directionalLight
            castShadow
            position={[7, 11, 6]}
            intensity={2.2}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.0004}
            shadow-camera-near={0.5}
            shadow-camera-far={40}
            shadow-camera-left={-8}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-bottom={-8}
          />
          <directionalLight position={[-6, 4, -5]} intensity={0.5} color="#ffffff" />
          <Suspense fallback={null}>
            {type === 'fbx' ? (
              <FBXModel
                url={url}
                progress={progress}
                spin={!interior}
                dropGround={dropGround}
                hideMeshes={scene?.hideMeshes}
                color={color}
              />
            ) : type === 'glb' ? (
              <GLBModel
                url={url}
                progress={progress}
                spin={!interior}
                forceColor={!!scene?.forceColor}
                color={color}
              />
            ) : (
              <MassingModel url={url} color={color} progress={progress} spin={!interior} />
            )}
          </Suspense>
          {/* OrbitControls : manipulation souris + inertie. En intérieur : verrouillé
              à une distance fixe autour du point de vue → simple regard 360°. */}
          <OrbitControls
            makeDefault
            enableDamping
            dampingFactor={0.08}
            target={target}
            {...controls}
          />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
