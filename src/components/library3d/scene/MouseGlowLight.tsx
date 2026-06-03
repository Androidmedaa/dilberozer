"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type MouseGlowLightProps = {
  enabled?: boolean;
};

const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -1.15);
const target = new THREE.Vector3();
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
const fallback = new THREE.Vector3(0, 1.2, 1.5);

export function MouseGlowLight({ enabled = true }: MouseGlowLightProps) {
  const lightRef = useRef<THREE.PointLight>(null);
  const smooth = useRef(new THREE.Vector3(0, 1.2, 1.5));
  const { camera, gl } = useThree();

  useEffect(() => {
    if (!enabled) return;

    const canvas = gl.domElement;

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      if (!raycaster.ray.intersectPlane(plane, target)) {
        raycaster.ray.at(4, fallback);
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, camera, gl]);

  useFrame((_, delta) => {
    if (!lightRef.current || !enabled) return;
    smooth.current.lerp(target, delta * 10);
    lightRef.current.position.copy(smooth.current);
  });

  if (!enabled) return null;

  return (
    <pointLight
      ref={lightRef}
      color="#ffd878"
      intensity={1.2}
      distance={5}
      decay={2}
      position={[0, 1.2, 1.5]}
    />
  );
}
