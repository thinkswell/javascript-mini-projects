import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Computers = ({ isMobile }) => {
  const { scene } = useGLTF("./desktop_pc/scene.gltf");

  const scaleFactor = 4.2;
  const scale = isMobile
    ? [0.4 * scaleFactor, 0.4 * scaleFactor, 0.4 * scaleFactor]
    : [1 * scaleFactor, 1 * scaleFactor, 1 * scaleFactor];

  // Adjust the yOffset for mobile view to move the model 20% down
  const yOffset = isMobile ? -0.2 : 0.2; // Adjust as needed

  return (
    <group>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.16}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={scene}
        scale={scale}
        position={[0, yOffset, -2.2]}
        rotation={[0.9, 0, 0]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas frameloop="demand" shadows dpr={[1, 2]} camera={{ position: [0, 6, 5], fov: 15 }}>
      <OrbitControls
        enableZoom={false}
        rotateSpeed={0.4} // Adjust the rotateSpeed as needed
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Computers isMobile={isMobile} />
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
