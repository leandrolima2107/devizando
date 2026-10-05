'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  reduced: boolean;
  running: boolean;
};

/* --------------------------------------------------------------- câmera */

function Rig({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame(() => {
    if (reduced) {
      camera.position.set(0, 0, 6.4);
      camera.lookAt(target);
      return;
    }
    camera.position.x += (pointer.current.x * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (pointer.current.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(target);
  });

  return null;
}

/* ------------------------------------------------------------ escultura */

function Sculpture({ reduced }: { reduced: boolean }) {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (reduced || !ring.current) return;
    ring.current.rotation.z = state.clock.elapsedTime * 0.12;
  });

  return (
    <group>
      {/* Núcleo líquido iridescente */}
      <Float
        speed={reduced ? 0 : 1.2}
        rotationIntensity={reduced ? 0 : 0.35}
        floatIntensity={reduced ? 0 : 0.8}
      >
        <mesh>
          <icosahedronGeometry args={[1.5, 48]} />
          <MeshDistortMaterial
            color="#6d54f5"
            emissive="#2a1c66"
            emissiveIntensity={0.55}
            metalness={0.92}
            roughness={0.16}
            distort={reduced ? 0.22 : 0.42}
            speed={reduced ? 0 : 1.5}
          />
        </mesh>
      </Float>

      {/* Anel orbital */}
      <mesh ref={ring} rotation={[Math.PI / 2.35, 0.2, 0]}>
        <torusGeometry args={[2.55, 0.022, 24, 220]} />
        <meshStandardMaterial
          color="#8fd8ff"
          emissive="#4fd8ff"
          emissiveIntensity={2.1}
          metalness={1}
          roughness={0.25}
        />
      </mesh>

      {/* Segundo anel, mais amplo e discreto */}
      <mesh rotation={[Math.PI / 1.9, -0.35, 0.4]}>
        <torusGeometry args={[3.35, 0.008, 16, 200]} />
        <meshStandardMaterial
          color="#c39bff"
          emissive="#7c5cff"
          emissiveIntensity={1.4}
          metalness={1}
          roughness={0.4}
        />
      </mesh>

      {/* Poeira luminosa */}
      <Sparkles
        count={110}
        scale={[9, 5.5, 4]}
        size={2.2}
        speed={reduced ? 0 : 0.32}
        opacity={0.55}
        color="#b9c6ff"
      />
    </group>
  );
}

/* ----------------------------------------------------------------- cena */

export default function Scene3D({ reduced, running }: Props) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.4], fov: 42 }}
      frameloop={running ? 'always' : 'demand'}
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 4, 6]} intensity={2.6} color="#b9a5ff" />
      <directionalLight position={[-6, -2, 3]} intensity={1.8} color="#4fd8ff" />
      <directionalLight position={[0, -5, -4]} intensity={1.1} color="#ff9c6b" />
      <Rig reduced={reduced} />
      <Sculpture reduced={reduced} />
    </Canvas>
  );
}
