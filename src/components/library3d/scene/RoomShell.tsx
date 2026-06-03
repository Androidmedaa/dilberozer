"use client";

import { palette } from "./colors";

type RoomShellProps = { lightsOn?: boolean };

export function RoomShell({ lightsOn = true }: RoomShellProps) {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color={palette.roomFloor} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.2, -4.2]} receiveShadow>
        <planeGeometry args={[12, 4.5]} />
        <meshStandardMaterial color={palette.roomWall} roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-5.5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial color={palette.roomWall} roughness={0.92} />
      </mesh>

      {/* Right wall */}
      <mesh position={[5.5, 2.2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial color={palette.roomWall} roughness={0.92} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 4.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color={palette.roomDark} roughness={1} />
      </mesh>

      {/* Window light panel (back wall) */}
      <mesh position={[2.2, 2.8, -4.15]}>
        <planeGeometry args={[2.2, 1.4]} />
        <meshStandardMaterial
          color={palette.ambientWarm}
          emissive={palette.goldGlow}
          emissiveIntensity={lightsOn ? 0.55 : 0.12}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}
