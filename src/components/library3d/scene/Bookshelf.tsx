"use client";

import { palette } from "./colors";

export function Bookshelf() {
  const SHELF_Y = 1.02;

  return (
    <group>
      {/* Center desk */}
      <mesh position={[0, 0.78, 0.12]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.09, 1.35]} />
        <meshStandardMaterial color={palette.woodDesk} roughness={0.72} metalness={0.08} />
      </mesh>

      {/* Right-wall bookshelf */}
      <group position={[2.05, 0, -2.25]} rotation={[0, -0.52, 0]}>
        <mesh position={[0.35, 2.15, 0]} receiveShadow>
          <boxGeometry args={[0.12, 2.9, 2.2]} />
          <meshStandardMaterial color={palette.roomWall} roughness={0.92} />
        </mesh>

        <mesh position={[0.22, SHELF_Y, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.48, 0.11, 2.1]} />
          <meshStandardMaterial
            color={palette.woodShelf}
            roughness={0.72}
            metalness={0.05}
          />
        </mesh>

        <mesh position={[0.08, 1.9, -1.05]} castShadow>
          <boxGeometry args={[0.14, 2.2, 0.12]} />
          <meshStandardMaterial color={palette.woodShelf} roughness={0.82} />
        </mesh>
        <mesh position={[0.08, 1.9, 1.05]} castShadow>
          <boxGeometry args={[0.14, 2.2, 0.12]} />
          <meshStandardMaterial color={palette.woodShelf} roughness={0.82} />
        </mesh>

        <mesh position={[0.18, 2.72, 0]} castShadow>
          <boxGeometry args={[0.4, 0.08, 1.8]} />
          <meshStandardMaterial color={palette.woodDesk} roughness={0.8} />
        </mesh>
      </group>

      {/* Back wall (full width) */}
      <mesh position={[0, 2.15, -3.82]} receiveShadow>
        <boxGeometry args={[5.5, 2.9, 0.12]} />
        <meshStandardMaterial color={palette.roomWall} roughness={0.92} />
      </mesh>
    </group>
  );
}
