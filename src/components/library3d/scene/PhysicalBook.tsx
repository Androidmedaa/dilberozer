"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import type { BookConfig, BookId } from "@/components/library/types";
import { createLeatherCoverTexture } from "./bookTextures";
import { BOOK_DIMENSIONS, BOOK_REST, FOCUS_TRANSFORM } from "./bookLayout";
import { useBookSwapRef } from "./BookSwapContext";

type PhysicalBookProps = {
  book: BookConfig;
  onSelect: (id: BookId) => void;
  selectable: boolean;
  isMenuHighlighted?: boolean;
};

export function PhysicalBook({
  book,
  onSelect,
  selectable,
  isMenuHighlighted = false,
}: PhysicalBookProps) {
  const swapRef = useBookSwapRef();
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const leftCoverRef = useRef<THREE.Group>(null);
  const rightCoverRef = useRef<THREE.Group>(null);
  const closedCoverRef = useRef<THREE.Mesh>(null);
  const sealRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  const dim = BOOK_DIMENSIONS[book.size];
  const rest = BOOK_REST[book.id];
  const coverThickness = 0.022;
  const spineWidth = 0.034;
  const pageDepth = dim.thickness - coverThickness * 2;

  const coverTexture = useMemo(
    () =>
      createLeatherCoverTexture({
        title: book.coverTitle,
        subtitle: book.subtitle,
        coverColor: book.coverColor,
        accentColor: book.accent,
        spineColor: book.spineColor,
      }),
    [book],
  );

  const smooth = useRef({
    focus: 0,
    open: book.id === "home" ? 0.75 : 0,
    yaw: dim.baseYaw as number,
    glow: 0,
  });

  useFrame((_, delta) => {
    const swap = swapRef.current;
    if (!groupRef.current) return;

    const isCurrent = swap.current === book.id;
    const isMovingTarget = swap.phase === "moving" && isCurrent;
    let targetFocus = 0;
    let targetOpen = book.id === "home" && swap.phase === "overview" ? 0.75 : 0;

    if (swap.phase === "overview") {
      targetFocus = 0;
      targetOpen = book.id === "home" ? 0.75 : 0;
    } else if (swap.phase === "closing" && isCurrent) {
      targetFocus = 1 - swap.eased;
      targetOpen =
        book.id === "home" ? 0.75 + 0.25 * (1 - swap.eased) : 1 - swap.eased;
    } else if (swap.phase === "moving" && isMovingTarget) {
      targetFocus = swap.eased;
      targetOpen = 0;
    } else if (swap.phase === "opening" && isCurrent) {
      targetFocus = 1;
      targetOpen = swap.eased;
    } else if (swap.phase === "reading" && isCurrent) {
      targetFocus = 1;
      targetOpen = 1;
    }

    const t = delta * 8;
    smooth.current.focus = THREE.MathUtils.lerp(smooth.current.focus, targetFocus, t);
    smooth.current.open = THREE.MathUtils.lerp(smooth.current.open, targetOpen, t);
    const hoverBoost = hovered && selectable ? 0.1 : 0;
    smooth.current.yaw = THREE.MathUtils.lerp(
      smooth.current.yaw,
      dim.baseYaw + hoverBoost,
      t,
    );
    const lit = isMenuHighlighted || isCurrent || (hovered && selectable);
    smooth.current.glow = THREE.MathUtils.lerp(
      smooth.current.glow,
      lit ? (isMenuHighlighted ? 0.85 : 0.65) : 0.08,
      t,
    );

    const restPos = new THREE.Vector3(...rest.position);
    const focusPos = new THREE.Vector3(...FOCUS_TRANSFORM.position);
    const pos = restPos.lerp(focusPos, smooth.current.focus);
    const restScale = book.placement === "desk" ? 1.15 : 1;
    const scale = THREE.MathUtils.lerp(restScale, FOCUS_TRANSFORM.scale, smooth.current.focus);

    groupRef.current.position.copy(pos);
    groupRef.current.scale.setScalar(scale);

    const restRot = rest.rotation ?? [0, dim.baseYaw, 0];
    const tiltX = THREE.MathUtils.lerp(restRot[0], FOCUS_TRANSFORM.rotation[0], smooth.current.focus);
    const rotY = THREE.MathUtils.lerp(
      restRot[1],
      FOCUS_TRANSFORM.rotation[1],
      smooth.current.focus,
    );
    groupRef.current.rotation.set(
      tiltX,
      rotY + smooth.current.yaw * (1 - smooth.current.focus * 0.9),
      0,
    );

    const coverAngle = smooth.current.open * 1.72;
    if (leftCoverRef.current) leftCoverRef.current.rotation.y = -coverAngle;
    if (rightCoverRef.current) rightCoverRef.current.rotation.y = coverAngle;

    if (closedCoverRef.current) {
      const shut = Math.max(0, 1 - smooth.current.open * 2.5);
      closedCoverRef.current.visible = shut > 0.05;
      closedCoverRef.current.scale.z = shut;
    }
    if (sealRef.current) {
      sealRef.current.visible = smooth.current.open < 0.25;
    }

    if (glowRef.current) {
      glowRef.current.intensity = smooth.current.glow * (0.4 + smooth.current.open * 0.55);
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (selectable) onSelect(book.id);
  };

  const emissiveIntensity =
    isMenuHighlighted || hovered || swapRef.current.current === book.id
      ? 0.32
      : book.placement === "desk"
        ? 0.12
        : 0.1;

  const pointerProps = {
    onClick: handleClick,
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      if (selectable) {
        setHovered(true);
        document.body.style.cursor = "pointer";
      }
    },
    onPointerOut: () => {
      setHovered(false);
      if (!document.body.classList.contains("library-wand-active")) {
        document.body.style.cursor = "default";
      }
    },
  };

  return (
    <group ref={groupRef}>
      <pointLight
        ref={glowRef}
        position={[0, dim.height * 0.15, dim.thickness]}
        color={book.accent}
        intensity={0}
        distance={3}
        decay={2}
      />

      <mesh position={[0, 0, -coverThickness / 2]} castShadow receiveShadow>
        <boxGeometry args={[dim.width * 0.94, dim.height * 0.97, pageDepth]} />
        <meshStandardMaterial color="#e8e0d0" roughness={0.9} />
      </mesh>

      <mesh position={[-dim.width / 2 - spineWidth / 2, 0, 0]} castShadow>
        <boxGeometry args={[spineWidth, dim.height, dim.thickness]} />
        <meshStandardMaterial
          color={book.spineColor}
          roughness={0.75}
          metalness={0.06}
          emissive={book.accent}
          emissiveIntensity={emissiveIntensity * 0.4}
        />
      </mesh>

      <group ref={leftCoverRef} position={[-dim.width / 2, 0, dim.thickness / 2]}>
        <mesh position={[dim.width / 2, 0, 0]} castShadow {...pointerProps}>
          <boxGeometry args={[dim.width, dim.height, coverThickness]} />
          <meshStandardMaterial
            map={coverTexture}
            roughness={0.58}
            metalness={0.14}
            emissive={book.accent}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      </group>

      <group ref={rightCoverRef} position={[dim.width / 2, 0, dim.thickness / 2]}>
        <mesh position={[-dim.width / 2, 0, 0]} castShadow {...pointerProps}>
          <boxGeometry args={[dim.width, dim.height, coverThickness]} />
          <meshStandardMaterial
            color="#f5ecd8"
            roughness={0.88}
            emissive={book.accent}
            emissiveIntensity={emissiveIntensity * 0.35}
          />
        </mesh>
      </group>

      <mesh
        ref={closedCoverRef}
        position={[0, 0, dim.thickness / 2 + coverThickness * 0.5]}
        {...pointerProps}
      >
        <boxGeometry args={[dim.width, dim.height, coverThickness]} />
        <meshStandardMaterial
          map={coverTexture}
          roughness={0.58}
          metalness={0.14}
          emissive={book.accent}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {book.size === "small-sealed" && (
        <group ref={sealRef} position={[dim.width * 0.28, -dim.height * 0.22, dim.thickness / 2 + coverThickness]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.014, 24]} />
            <meshStandardMaterial
              color={book.accent}
              emissive={book.accent}
              emissiveIntensity={0.3}
              metalness={0.45}
              roughness={0.35}
            />
          </mesh>
        </group>
      )}

      {hovered && selectable && (
        <mesh position={[0, 0, dim.thickness / 2 + 0.05]}>
          <boxGeometry args={[dim.width + 0.1, dim.height + 0.1, 0.01]} />
          <meshBasicMaterial color={book.accent} transparent opacity={0.14} />
        </mesh>
      )}
    </group>
  );
}
