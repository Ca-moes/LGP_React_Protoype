import "./App.css";

import { useEffect, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { Html, useProgress, softShadows, OrbitControls } from "@react-three/drei";

import Train from "./Train";

softShadows();

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const App = () => (
  <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000, position: [-4, 4, 4] }}>
    <ambientLight intensity={0.3} />
    <directionalLight
      castShadow
      position={[0, 10, 0]}
      intensity={1.5}
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />

    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[500, 200]} />
      <shadowMaterial attach="material" opacity={0.3} />
    </mesh>

    <axesHelper args={[2, 2, 2]} />
    <OrbitControls />

    <Suspense fallback={<Loader />}>
      <Train position={[-10, 0, 0]} />
    </Suspense>
  </Canvas>
);

export default App;
