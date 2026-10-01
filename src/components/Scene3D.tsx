'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { makePhoneTexture, makeScreenTexture, type ScreenKind } from './sceneTextures';

export type ServiceKey = ScreenKind | 'geral';

type Props = {
  active: ServiceKey;
  reduced: boolean;
  running: boolean;
};

const ACCENT = '#ff5b24';

/* --------------------------------------------------------------- câmera */

function Rig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0.1, 0), []);

  useFrame(() => {
    if (reduced) {
      camera.position.set(0, 0.35, 5.3);
      camera.lookAt(target);
      return;
    }
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.035;
    camera.position.y += (0.35 + pointer.y * 0.55 - camera.position.y) * 0.035;
    camera.lookAt(target);
  });

  return null;
}

/* ---------------------------------------------------------- materiais */

function useCanvasTexture(kind: ScreenKind) {
  return useMemo(() => {
    const texture = new THREE.CanvasTexture(makeScreenTexture(kind));
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, [kind]);
}

function usePhoneTexture() {
  return useMemo(() => {
    const texture = new THREE.CanvasTexture(makePhoneTexture());
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
}

/* ------------------------------------------------------------- objetos */

type PartProps = {
  focused: boolean;
  reduced: boolean;
  children: React.ReactNode;
  position: [number, number, number];
  floatAmp?: number;
  speed?: number;
};

/** Grupo com flutuação suave e destaque de escala conforme o serviço ativo. */
function Part({ focused, reduced, children, position, floatAmp = 0.08, speed = 0.6 }: PartProps) {
  const ref = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const t = state.clock.elapsedTime;
    const wanted = focused ? 1.12 : 1;
    group.scale.lerp(new THREE.Vector3(wanted, wanted, wanted), 0.045);
    if (!reduced) {
      group.position.y = base.y + Math.sin(t * speed + base.x) * floatAmp;
      group.rotation.y = Math.sin(t * 0.22 + base.z) * 0.07;
    }
  });

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  );
}

function Monitor({ focused, reduced, kind }: { focused: boolean; reduced: boolean; kind: ScreenKind }) {
  const texture = useCanvasTexture(kind);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <Part focused={focused} reduced={reduced} position={[0, 0.25, -0.2]} floatAmp={0.07} speed={0.5}>
      <RoundedBox args={[3.05, 1.95, 0.12]} radius={0.05} smoothness={4} castShadow={false}>
        <meshStandardMaterial color="#2c353f" metalness={0.55} roughness={0.42} />
      </RoundedBox>
      <mesh position={[0, 0, 0.075]}>
        <planeGeometry args={[2.82, 1.72]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      <mesh position={[0, -1.16, -0.1]}>
        <cylinderGeometry args={[0.07, 0.11, 0.5, 18]} />
        <meshStandardMaterial color="#2c353f" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, -1.42, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.07, 28]} />
        <meshStandardMaterial color="#2c353f" metalness={0.5} roughness={0.4} />
      </mesh>
    </Part>
  );
}

function Phone({ focused, reduced }: { focused: boolean; reduced: boolean }) {
  const texture = usePhoneTexture();
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <Part focused={focused} reduced={reduced} position={[-2.25, -0.35, 1.05]} floatAmp={0.11} speed={0.75}>
      <group rotation={[0, 0.38, 0.06]}>
        <RoundedBox args={[0.78, 1.6, 0.09]} radius={0.12} smoothness={4}>
          <meshStandardMaterial color="#2c353f" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <mesh position={[0, 0, 0.052]}>
          <planeGeometry args={[0.66, 1.46]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
    </Part>
  );
}

function Panel({ focused, reduced }: { focused: boolean; reduced: boolean }) {
  return (
    <Part focused={focused} reduced={reduced} position={[2.35, 0.55, 0.65]} floatAmp={0.1} speed={0.62}>
      <group rotation={[0.12, -0.55, -0.05]}>
        <RoundedBox args={[1.55, 1.1, 0.08]} radius={0.06} smoothness={4}>
          <meshStandardMaterial color="#2f3945" metalness={0.45} roughness={0.5} />
        </RoundedBox>
        <mesh position={[-0.32, 0.22, 0.05]}>
          <planeGeometry args={[0.72, 0.34]} />
          <meshBasicMaterial color={ACCENT} toneMapped={false} transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.28, 0.22, 0.05]}>
          <planeGeometry args={[0.36, 0.34]} />
          <meshBasicMaterial color="#4d5967" toneMapped={false} />
        </mesh>
        <mesh position={[-0.15, -0.22, 0.05]}>
          <planeGeometry args={[1.1, 0.3]} />
          <meshBasicMaterial color="#2b333d" toneMapped={false} />
        </mesh>
      </group>
    </Part>
  );
}

function AiCore({ focused, reduced }: { focused: boolean; reduced: boolean }) {
  const shell = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!shell.current || !glow.current) return;
    if (!reduced) {
      shell.current.rotation.y += delta * 0.16;
      shell.current.rotation.x += delta * 0.07;
    }
    const material = glow.current.material as THREE.MeshBasicMaterial;
    const target = focused ? 0.95 : 0.55;
    material.opacity += (target - material.opacity) * 0.05;
  });

  return (
    <Part focused={focused} reduced={reduced} position={[-1.95, 1.45, -0.35]} floatAmp={0.13} speed={0.5}>
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[0.33, 24, 24]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.55} toneMapped={false} />
      </mesh>
    </Part>
  );
}

function NodeNetwork({ focused, reduced, count = 5 }: { focused: boolean; reduced: boolean; count?: number }) {
  const nodes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        return [Math.cos(angle) * 0.85, Math.sin(angle) * 0.55, Math.sin(angle * 1.7) * 0.35] as [
          number,
          number,
          number,
        ];
      }),
    [count],
  );

  return (
    <Part focused={focused} reduced={reduced} position={[2.15, -0.85, 1.15]} floatAmp={0.09} speed={0.68}>
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshBasicMaterial color={i === 0 ? ACCENT : '#5b6672'} toneMapped={false} />
        </mesh>
      ))}
      {nodes.map((p, i) => {
        return <Line key={`l${i}`} points={[[0, 0, 0], p]} color="#4d5967" lineWidth={1.2} transparent opacity={0.7} />;
      })}
      {nodes.map((p, i) => {
        const next = nodes[(i + 1) % nodes.length]!;
        return <Line key={`c${i}`} points={[p, next]} color="#4d5967" lineWidth={1} transparent opacity={0.45} />;
      })}
    </Part>
  );
}

function Servers({ focused, reduced }: { focused: boolean; reduced: boolean }) {
  return (
    <Part focused={focused} reduced={reduced} position={[0.15, -1.75, 0.95]} floatAmp={0.06} speed={0.45}>
      {[0, 1, 2].map((i) => (
        <group key={i} position={[0, i * 0.36, 0]}>
          <RoundedBox args={[1.5, 0.3, 0.72]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#2f3945" metalness={0.5} roughness={0.45} />
          </RoundedBox>
          <mesh position={[0.58, 0, 0.37]}>
            <circleGeometry args={[0.035, 12]} />
            <meshBasicMaterial color={i === 1 ? ACCENT : '#5b6672'} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </Part>
  );
}

function Halo() {
  return (
    <mesh position={[0, 0.15, -1.9]} rotation={[0.35, 0, 0]}>
      <torusGeometry args={[3.1, 0.012, 8, 96]} />
      <meshBasicMaterial color="#4d5967" transparent opacity={0.55} toneMapped={false} />
    </mesh>
  );
}

/* ---------------------------------------------------------------- cena */

function SceneContents({ active, reduced }: { active: ServiceKey; reduced: boolean }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 720;

  return (
    <>
      <Rig reduced={reduced} />

      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5.5, 4]} intensity={2.8} color="#ffffff" />
      <pointLight position={[-4.5, 2.2, 3]} intensity={38} distance={18} color={ACCENT} />
      <pointLight position={[4, -2, 3.5]} intensity={18} distance={16} color="#8fb4ff" />

      <Halo />

      <Monitor focused={active === 'sites' || active === 'sistemas'} reduced={reduced} kind={active === 'geral' ? 'sites' : active} />
      <Phone focused={active === 'automacoes'} reduced={reduced} />
      <Panel focused={active === 'sistemas'} reduced={reduced} />
      <AiCore focused={active === 'ia'} reduced={reduced} />
      <NodeNetwork focused={active === 'automacoes'} reduced={reduced} count={isMobile ? 4 : 5} />
      <Servers focused={active === 'infra'} reduced={reduced} />
    </>
  );
}

export default function Scene3D({ active, reduced, running }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={running ? 'always' : 'never'}
      camera={{ position: [0, 0.35, 5.3], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <SceneContents active={active} reduced={reduced} />
    </Canvas>
  );
}
