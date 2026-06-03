"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import type { BookId } from "@/components/library/types";
import type { LightingSettings } from "./SceneLighting";
import { RoomShell } from "./RoomShell";
import { Bookshelf } from "./Bookshelf";
import { BookCollection } from "./BookCollection";
import { DeskHeroOpenBook } from "./DeskHeroOpenBook";
import { BookSwapController } from "./BookSwapContext";
import { DustParticles } from "./DustParticles";
import { CameraRig } from "./CameraRig";
import { MouseGlowLight } from "./MouseGlowLight";
import { SceneLighting } from "./SceneLighting";

type LibrarySceneProps = {
  focusedBook: BookId | null;
  menuHighlightBook?: BookId | null;
  onSelectBook: (id: BookId) => void;
  onReadingReady: () => void;
  onOverviewReady: () => void;
  lighting: LightingSettings;
};

function SceneContent({
  focusedBook,
  menuHighlightBook = null,
  onSelectBook,
  onReadingReady,
  onOverviewReady,
  lighting,
}: LibrarySceneProps) {
  return (
    <BookSwapController
      focusedBook={focusedBook}
      onReadingReady={onReadingReady}
      onOverviewReady={onOverviewReady}
    >
      <color attach="background" args={[lighting.lightsOn ? "#1e140c" : "#0a0604"]} />
      <fog
        attach="fog"
        args={[lighting.lightsOn ? "#2a1c10" : "#0f0a06", 6, lighting.lightsOn ? 18 : 12]}
      />

      <SceneLighting settings={lighting} activeBookWarmth={focusedBook !== null} />
      <spotLight
        position={[0, 3.2, 1.2]}
        angle={0.45}
        penumbra={0.6}
        intensity={lighting.lightsOn ? 1.15 : 0.2}
        color="#ffe8b8"
        castShadow
        target-position={[0, 0.85, 0.38]}
      />
      <RoomShell lightsOn={lighting.lightsOn} />

      <Bookshelf />
      <DeskHeroOpenBook
        onSelect={onSelectBook}
        focusedBook={focusedBook}
        selectable
      />
      <BookCollection
        onSelect={onSelectBook}
        highlightedBook={menuHighlightBook}
      />
      <DustParticles />
      <MouseGlowLight enabled={focusedBook === null && lighting.lightsOn} />

      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={lighting.lightsOn ? 0.5 : 0.35}
        scale={14}
        blur={2.8}
        far={5}
        color="#000000"
      />

      <CameraRig focusBook={focusedBook} />
    </BookSwapController>
  );
}

export function LibraryScene(props: LibrarySceneProps) {
  return (
    <Canvas
      shadows
      camera={{ fov: 42, near: 0.1, far: 30, position: [0.4, 2.2, 4.1] }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <SceneContent {...props} />
      </Suspense>
    </Canvas>
  );
}
