"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { BookId } from "@/components/library/types";
import { FOCUS_TRANSFORM } from "./bookLayout";

const FOCUS: Record<BookId | "default", { pos: THREE.Vector3; look: THREE.Vector3; fov: number }> = {
  default: {
    pos: new THREE.Vector3(-0.25, 2.05, 3.5),
    look: new THREE.Vector3(0.35, 0.95, 0.35),
    fov: 40,
  },
  home: {
    pos: new THREE.Vector3(0.05, 1.55, 2.05),
    look: new THREE.Vector3(0, 1.15, 0.45),
    fov: 32,
  },
  projects: {
    pos: new THREE.Vector3(0.08, 1.52, 1.95),
    look: new THREE.Vector3(...FOCUS_TRANSFORM.position),
    fov: 30,
  },
  about: {
    pos: new THREE.Vector3(0.1, 1.54, 1.92),
    look: new THREE.Vector3(...FOCUS_TRANSFORM.position),
    fov: 30,
  },
  internships: {
    pos: new THREE.Vector3(0.06, 1.5, 1.98),
    look: new THREE.Vector3(...FOCUS_TRANSFORM.position),
    fov: 31,
  },
  contact: {
    pos: new THREE.Vector3(0.12, 1.48, 2),
    look: new THREE.Vector3(...FOCUS_TRANSFORM.position),
    fov: 31,
  },
};

type CameraRigProps = {
  focusBook: BookId | null;
};

export function CameraRig({ focusBook }: CameraRigProps) {
  const { camera } = useThree();
  const lookAt = useRef(new THREE.Vector3());
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const targetFov = useRef(42);
  const breath = useRef(0);

  useFrame((state, delta) => {
    const key = focusBook ?? "default";
    const focus = FOCUS[key];
    targetPos.current.copy(focus.pos);
    targetLook.current.copy(focus.look);
    targetFov.current = focus.fov;

    breath.current += delta;
    if (!focusBook) {
      targetPos.current.y += Math.sin(breath.current * 0.45) * 0.025;
      targetPos.current.x += Math.sin(breath.current * 0.3) * 0.012;
    }

    const ease = focusBook ? delta * 2.4 : delta * 1.8;
    camera.position.lerp(targetPos.current, ease);
    lookAt.current.lerp(targetLook.current, ease * 1.1);
    camera.lookAt(lookAt.current);

    if ("fov" in camera && camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov.current, ease);
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
