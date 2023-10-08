
import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader.jsx";
import { useInView } from "react-intersection-observer";

const Earth = ({ isMobile }) => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive
      object={earth.scene}
      scale={isMobile ? 1.5 : 2} // Adjust the scale for mobile devices
      position-y={isMobile ? 1 : 0} // Move up by 20% for mobile devices
      rotation-y={0}
    />
  );
};

const EarthCanvas = () => {
  const [ref, inView] = useInView();
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call the function initially
    window.addEventListener("resize", handleResize); // Add a listener for window resize

    return () => {
      window.removeEventListener("resize", handleResize); // Remove the listener when unmounting
    };
  }, []);

  // Load the Earth component when it's in the viewport
  if (inView && !loaded) {
    setLoaded(true);
  }

  const increasedHeight = "625px";

  return (
    <div
      ref={ref}
      style={{ width: "100%", height: increasedHeight }} // Adjust the height as needed
    >
      {loaded && (
        <Canvas
          shadows
          frameloop="demand"
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [-4, 3, 6],
          }}
        >
          <Suspense fallback={<CanvasLoader />}>
            <OrbitControls
              autoRotate
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Earth isMobile={isMobile} />
            <Preload all />
          </Suspense>
        </Canvas>  
      )}
    </div>
  );
};
export default EarthCanvas;