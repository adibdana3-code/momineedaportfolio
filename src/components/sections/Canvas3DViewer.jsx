import { Suspense, useEffect, useMemo, useRef, useState, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const MASSING_URL = `${import.meta.env.BASE_URL}models/villa-massing.json`;
const TARGET_SIZE = 5; // taille cible du volume dans la scène

/**
 * Construit une géométrie 3D à partir des polygones d'enveloppe gbXML.
 * gbXML est en Z-up → on remappe (x, y, z) vers (x, z, y) pour Three (Y-up).
 * Triangulation en éventail (surfaces planes convexes : murs, toits, dalles).
 */
function buildMassing(surfaces) {
  const positions = [];
  for (const s of surfaces) {
    const loop = s.loop.map(([x, y, z]) => [x, z, y]); // Z-up → Y-up
    for (let i = 1; i < loop.length - 1; i++) {
      positions.push(...loop[0], ...loop[i], ...loop[i + 1]);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();

  const box = geometry.boundingBox;
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);
  geometry.translate(-center.x, -center.y, -center.z); // recentre à l'origine

  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = TARGET_SIZE / maxDim;

  // Arêtes « nettes » (masque les diagonales de triangulation coplanaires)
  const edges = new THREE.EdgesGeometry(geometry, 20);
  return { geometry, edges, scale };
}

/** Volume architectural reconstruit, rotation liée au scroll. */
function MassingModel({ progress }) {
  const ref = useRef();
  const [surfaces, setSurfaces] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(MASSING_URL)
      .then((r) => r.json())
      .then((d) => alive && setSurfaces(d.surfaces))
      .catch(() => alive && setSurfaces([]));
    return () => {
      alive = false;
    };
  }, []);

  const built = useMemo(() => (surfaces && surfaces.length ? buildMassing(surfaces) : null), [surfaces]);

  useFrame((state) => {
    if (!ref.current) return;
    const p = progress.get();
    ref.current.rotation.y = -0.6 + p * Math.PI * 1.5 + Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
  });

  if (!built) return null;
  return (
    <group ref={ref} scale={built.scale}>
      <mesh geometry={built.geometry}>
        <meshStandardMaterial
          color="#9A9576"
          roughness={0.9}
          metalness={0}
          side={THREE.DoubleSide}
          flatShading
        />
      </mesh>
      <lineSegments geometry={built.edges}>
        <lineBasicMaterial color="#2C3A2E" transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

/** Repli si la scène ne charge pas. */
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

export default function Canvas3DViewer() {
  const wrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start end', 'end start'],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const corner = 'absolute h-3.5 w-3.5 border-forest';

  const fallback = (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <span className="font-sans text-[10px] uppercase tracking-editorial text-amaranth">Scène 3D</span>
      <span className="whitespace-pre-line font-display text-[clamp(22px,2.6vw,34px)] font-bold uppercase leading-tight tracking-[-0.01em] text-forest">
        {'Volume\nindisponible'}
      </span>
    </div>
  );

  return (
    <div
      ref={wrapRef}
      data-discover="Scène 3D"
      className="relative col-span-5 col-start-2 mt-10 flex aspect-square items-center justify-center overflow-hidden border-[0.5px] border-forest"
    >
      <span className="pointer-events-none absolute left-4 top-4 z-10 font-sans text-[10px] uppercase tracking-editorial text-amaranth">
        Scène 3D — Villa
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 z-10 font-sans text-[10px] uppercase tracking-editorial text-olive">
        Rotation · Scroll
      </span>

      <SceneBoundary fallback={fallback}>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [4, 2.5, 8], fov: 40 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={1.05} />
          <directionalLight position={[6, 9, 5]} intensity={1.25} />
          <directionalLight position={[-6, 3, -5]} intensity={0.55} color="#933B5B" />
          <Suspense fallback={null}>
            <MassingModel progress={progress} />
          </Suspense>
        </Canvas>
      </SceneBoundary>

      <span className={`${corner} left-3.5 top-3.5 border-l-[0.5px] border-t-[0.5px]`} />
      <span className={`${corner} right-3.5 top-3.5 border-r-[0.5px] border-t-[0.5px]`} />
      <span className={`${corner} bottom-3.5 left-3.5 border-b-[0.5px] border-l-[0.5px]`} />
      <span className={`${corner} bottom-3.5 right-3.5 border-b-[0.5px] border-r-[0.5px]`} />
    </div>
  );
}
