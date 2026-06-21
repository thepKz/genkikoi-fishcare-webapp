import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import type { Group } from "three";

const MODEL_URL = "/models/water_fish.glb";

// Single-face koi: faces the camera, gentle idle breathing/float — not a free orbit toy.
function Koi() {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF(MODEL_URL);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.4) * 0.12; // subtle sway
    ref.current.position.y = Math.sin(t * 0.8) * 0.04; // gentle float
  });

  return (
    <Center>
      <group ref={ref}>
        <primitive object={scene} scale={1.25} />
      </group>
    </Center>
  );
}

useGLTF.preload(MODEL_URL);

export default function KoiModel({ className }: { className?: string }) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <directionalLight position={[-4, -2, -3]} intensity={0.18} color="#9cc4d6" />
      <Suspense fallback={null}>
        <Koi />
        <Environment preset="studio" environmentIntensity={0.45} />
      </Suspense>
    </Canvas>
  );
}
