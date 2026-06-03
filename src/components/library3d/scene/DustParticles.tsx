"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 120;

export function DustParticles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = Math.random() * 3.5 + 0.3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#fff8dc"
        size={0.025}
        transparent
        opacity={0.35}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
