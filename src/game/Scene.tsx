import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Floor from "./Floor";
import Player from "./Player";
import { useMemo } from "react";
import { Controls } from "../logic/controlers/Controls";

export default function Scene() {
  const controls = useMemo(() => new Controls(), []);
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-gray-700">
      <Canvas camera={{ position: [0.5, 2, 5] }}>
        <Physics>
          <ambientLight intensity={2} />
          <directionalLight intensity={3} position={[1, 5, 5]} />
          <OrbitControls />

          {/* Objetos */}
          <Floor />
          <Player />
        </Physics>
      </Canvas>
    </div>
  );
}
