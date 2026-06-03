"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { BookId } from "@/components/library/types";
import { palette } from "./colors";
import { FOCUS_TRANSFORM } from "./bookLayout";
import { useBookSwapRef } from "./BookSwapContext";
import { createParchmentSpreadTexture } from "./bookTextures";

const DESK_REST = {
  position: new THREE.Vector3(0, 0.838, 0.38),
  rotation: new THREE.Euler(0.2, 0, 0),
  scale: 2.05,
};

type DeskHeroOpenBookProps = {
  onSelect: (id: BookId) => void;
  focusedBook: BookId | null;
  selectable: boolean;
};

function CurvedPageStack({
  side,
  spread,
  parchmentMap,
}: {
  side: "left" | "right";
  spread: number;
  parchmentMap: THREE.CanvasTexture;
}) {
  const segments = 16;
  const halfW = 0.82;
  const depth = 1.05;
  const sign = side === "left" ? -1 : 1;

  return (
    <group position={[sign * 0.04, 0, 0]}>
      {Array.from({ length: segments }, (_, i) => {
        const t = (i + 1) / segments;
        const angle = sign * THREE.MathUtils.lerp(0.06, 0.58, t) * spread;
        const x = sign * t * halfW * 0.95;
        const lift = Math.sin(t * Math.PI * 0.85) * 0.035 * spread;
        const curl = (1 - t) * 0.012 * spread;
        return (
          <mesh
            key={i}
            position={[x, lift + curl, -i * 0.0035]}
            rotation={[0, angle, sign * 0.02 * t]}
            castShadow
            receiveShadow
          >
            <boxGeometry args={[halfW / segments + 0.025, 0.011, depth]} />
            <meshStandardMaterial
              map={i === segments - 1 ? parchmentMap : undefined}
              color="#f3ead6"
              roughness={0.94}
              metalness={0}
              emissive="#fff8e8"
              emissiveIntensity={0.04}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function SpineEmbers({ active }: { active: number }) {
  const ref = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: 24 }, () => ({
        x: (Math.random() - 0.5) * 0.18,
        z: (Math.random() - 0.5) * 0.35,
        speed: 0.35 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        size: 0.008 + Math.random() * 0.014,
      })),
    [],
  );

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.children.forEach((child, i) => {
      const s = seeds[i];
      const life = (t * s.speed + s.phase) % 1;
      child.position.set(s.x, 0.04 + life * 0.55, s.z);
      const mat = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = active * (1 - life) * 0.85;
    });
  });

  return (
    <group ref={ref}>
      {seeds.map((s, i) => (
        <mesh key={i} position={[s.x, 0.04, s.z]}>
          <sphereGeometry args={[s.size, 6, 6]} />
          <meshBasicMaterial color={palette.goldGlow} transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

export function DeskHeroOpenBook({
  onSelect,
  focusedBook,
  selectable,
}: DeskHeroOpenBookProps) {
  const swapRef = useBookSwapRef();
  const [hovered, setHovered] = useState(false);
  const [spread, setSpread] = useState(1);
  const [emberActive, setEmberActive] = useState(1);
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const spineGlowRef = useRef<THREE.PointLight>(null);

  const parchmentMap = useMemo(() => createParchmentSpreadTexture(), []);

  const smooth = useRef({ focus: 0, open: 1, visible: 1, glow: 0.6 });

  useFrame((_, delta) => {
    const swap = swapRef.current;
    if (!groupRef.current) return;

    const isHomeFocus = focusedBook === "home";
    const otherFocused = focusedBook !== null && focusedBook !== "home";
    const homeAnimating =
      swap.current === "home" &&
      (swap.phase === "moving" || swap.phase === "opening" || swap.phase === "reading");

    let targetFocus = 0;
    let targetOpen = 1;
    let targetVisible = 1;

    if (!focusedBook && swap.phase === "overview") {
      targetFocus = 0;
      targetOpen = 1;
      targetVisible = 1;
    } else if (isHomeFocus) {
      if (homeAnimating) {
        targetFocus =
          swap.phase === "reading" ? 1 : swap.phase === "moving" || swap.phase === "opening" ? swap.eased : 0;
        if (swap.phase === "closing") targetFocus = 1 - swap.eased;
        targetOpen = 1;
        targetVisible = 1;
      } else if (swap.phase === "closing" && swap.pending === "home") {
        targetVisible = 0.08;
        targetOpen = 0.05;
      } else {
        targetFocus = 0;
        targetOpen = 1;
        targetVisible = 1;
      }
    } else if (otherFocused) {
      targetFocus = 0;
      targetOpen = 0.06;
      targetVisible = 0.1;
    }

    const t = delta * 6;
    smooth.current.focus = THREE.MathUtils.lerp(smooth.current.focus, targetFocus, t);
    smooth.current.open = THREE.MathUtils.lerp(smooth.current.open, targetOpen, t);
    smooth.current.visible = THREE.MathUtils.lerp(smooth.current.visible, targetVisible, t);
    smooth.current.glow = THREE.MathUtils.lerp(
      smooth.current.glow,
      hovered || isHomeFocus ? 1 : 0.55,
      t,
    );

    setSpread(smooth.current.open);
    setEmberActive(smooth.current.open * smooth.current.visible);

    const restPos = DESK_REST.position;
    const focusPos = new THREE.Vector3(...FOCUS_TRANSFORM.position);
    focusPos.y -= 0.12;
    focusPos.z += 0.08;
    const pos = restPos.clone().lerp(focusPos, smooth.current.focus);
    const scale = THREE.MathUtils.lerp(
      DESK_REST.scale,
      FOCUS_TRANSFORM.scale * 0.92,
      smooth.current.focus,
    );

    groupRef.current.position.copy(pos);
    groupRef.current.scale.setScalar(scale * Math.max(0.05, smooth.current.visible));
    groupRef.current.rotation.set(
      THREE.MathUtils.lerp(
        DESK_REST.rotation.x,
        FOCUS_TRANSFORM.rotation[0] + 0.55,
        smooth.current.focus,
      ),
      0,
      0,
    );

    if (glowRef.current) {
      glowRef.current.intensity = smooth.current.glow * (0.9 + smooth.current.open * 0.6);
    }
    if (spineGlowRef.current) {
      spineGlowRef.current.intensity = emberActive * (1.1 + smooth.current.glow * 0.4);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (selectable) onSelect("home");
  };

  return (
    <group ref={groupRef}>
      <pointLight
        ref={glowRef}
        position={[0, 0.25, 0]}
        color={palette.goldGlow}
        intensity={0.9}
        distance={3.5}
        decay={2}
      />
      <pointLight
        ref={spineGlowRef}
        position={[0, 0.06, 0]}
        color="#ffcc66"
        intensity={1.2}
        distance={1.8}
        decay={2}
      />

      <group position={[-1.05, -0.02, 0.12]}>
        <mesh position={[0, 0.03, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.065, 0.05, 16]} />
          <meshStandardMaterial color="#2a1810" roughness={0.35} metalness={0.2} />
        </mesh>
        <mesh position={[0.02, 0.12, 0.02]} rotation={[0.3, 0.4, 0.8]}>
          <boxGeometry args={[0.02, 0.28, 0.012]} />
          <meshStandardMaterial color="#e8e0d8" roughness={0.8} />
        </mesh>
      </group>
      <group position={[1.05, -0.02, 0.12]}>
        <mesh position={[0, 0.03, 0]} castShadow>
          <cylinderGeometry args={[0.055, 0.065, 0.05, 16]} />
          <meshStandardMaterial color="#2a1810" roughness={0.35} metalness={0.2} />
        </mesh>
        <mesh position={[-0.02, 0.12, 0.02]} rotation={[0.25, -0.5, -0.7]}>
          <boxGeometry args={[0.02, 0.26, 0.012]} />
          <meshStandardMaterial color="#9a9088" roughness={0.75} />
        </mesh>
      </group>

      <group
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (selectable) {
            setHovered(true);
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          setHovered(false);
          if (!document.body.classList.contains("library-wand-active")) {
            document.body.style.cursor = "default";
          }
        }}
      >
        <mesh position={[0, 0.028, 0]} castShadow>
          <boxGeometry args={[0.14, 0.055, 1.08]} />
          <meshStandardMaterial
            color="#2a1a10"
            roughness={0.7}
            emissive={palette.gold}
            emissiveIntensity={0.15}
          />
        </mesh>

        <CurvedPageStack side="left" spread={spread} parchmentMap={parchmentMap} />
        <CurvedPageStack side="right" spread={spread} parchmentMap={parchmentMap} />

        <mesh position={[-0.88, 0.008, 0]} rotation={[0, 0.42 * spread, 0]} castShadow>
          <boxGeometry args={[0.1, 0.028, 1.06]} />
          <meshStandardMaterial color="#4a3020" roughness={0.65} metalness={0.1} />
        </mesh>
        <mesh position={[0.88, 0.008, 0]} rotation={[0, -0.42 * spread, 0]} castShadow>
          <boxGeometry args={[0.1, 0.028, 1.06]} />
          <meshStandardMaterial color="#4a3020" roughness={0.65} metalness={0.1} />
        </mesh>

        <SpineEmbers active={emberActive} />

        {hovered && selectable && (
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[1.85, 0.02, 1.15]} />
            <meshBasicMaterial color={palette.goldGlow} transparent opacity={0.1} />
          </mesh>
        )}
      </group>
    </group>
  );
}
