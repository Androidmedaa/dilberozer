"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type LightingSettings = {
  lightsOn: boolean;
  ambientIntensity: number;
  warmth: number;
};

type SceneLightingProps = {
  settings: LightingSettings;
  activeBookWarmth?: boolean;
};

export function SceneLighting({ settings, activeBookWarmth }: SceneLightingProps) {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const windowRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    const amb = settings.lightsOn
      ? 0.52 + settings.ambientIntensity * 0.45
      : 0.12 + settings.ambientIntensity * 0.08;
    const key = settings.lightsOn ? 1.35 : 0.22;
    const fill = settings.lightsOn ? 0.42 : 0.08;
    const window = settings.lightsOn ? 1.1 : 0.15;
    const warm = settings.warmth;

    const t = delta * 4;
    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, amb, t);
      const c = new THREE.Color().setRGB(
        0.92 + warm * 0.06,
        0.88 + warm * 0.04,
        0.78 - warm * 0.05,
      );
      ambientRef.current.color.lerp(c, t);
    }
    if (keyRef.current) {
      keyRef.current.intensity = THREE.MathUtils.lerp(keyRef.current.intensity, key, t);
      keyRef.current.color.lerp(
        new THREE.Color().setRGB(1, 0.92 + warm * 0.05, 0.82 + warm * 0.08),
        t,
      );
    }
    if (fillRef.current) {
      fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, fill, t);
    }
    if (windowRef.current) {
      const boost = activeBookWarmth ? 0.25 : 0;
      windowRef.current.intensity = THREE.MathUtils.lerp(
        windowRef.current.intensity,
        window + boost * (settings.lightsOn ? 1 : 0),
        t,
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.55} color="#fff4e0" />
      <directionalLight
        ref={keyRef}
        position={[2.8, 5.5, -1.5]}
        intensity={1.35}
        color="#ffe8c0"
        castShadow
        shadow-mapSize={[1536, 1536]}
        shadow-camera-far={22}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      <directionalLight
        ref={fillRef}
        position={[-2.5, 3, 2.5]}
        intensity={0.4}
        color="#d8c8b0"
      />
      <pointLight
        ref={windowRef}
        position={[2.2, 3.2, -3.8]}
        intensity={1}
        color="#ffd898"
        distance={8}
        decay={2}
      />
      <hemisphereLight
        args={["#fff8e8", "#1a1008", settings.lightsOn ? 0.35 : 0.12]}
      />
    </>
  );
}
