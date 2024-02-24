import * as THREE from "three";
import {
  Canvas,
  extend,
  useFrame,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import {
  OrbitControls,
  Environment,
  CameraShake,
  Reflector,
  Sky,
  AccumulativeShadows,
  RandomizedLight,
  useCursor,
  MeshPortalMaterial,
  CameraControls,
  Gltf,
  Text,
  Html,
  useProgress,
  Effects,
  Stats,
} from "@react-three/drei";
// import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
// import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { Suspense, useEffect, useRef, useState } from "react";
import { easing, geometry } from "maath";
import { useRoute, useLocation } from "wouter";

import {
  EffectComposer,
  Sepia,
  Noise,
  DotScreen,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import { Ophanimon } from "./components/Ophanimon";

// extend({ GlitchPass, BloomPass });
extend(geometry);

const GOLDENRATIO = 1.61803398875;
// const regular = import('@pmndrs/assets/fonts/inter_regular.woff')
// const medium = import('@pmndrs/assets/fonts/inter_medium.woff')

function Loader() {
  const { progress } = useProgress();
  return (
    <Html
      center
      style={{
        width: "120px",
        textAlign: "center",
        color: "white",
        fontSize: "2em",
        fontFamily: "fantasy",
      }}
    >
      {Math.floor(progress)}%
    </Html>
  );
}

function App() {
  return (
    <Canvas
      gl={{ localClippingEnabled: true }}
      camera={{ fov: 75, position: [0, 0, 1.5] }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
    >
      <Suspense fallback={<Loader />}>
        <color attach="background" args={["#f0f0f0"]} />
        <Environment preset="city" />
        <Frame id="01" name="神圣天女兽" level="究极体" type="疫苗种">
          <Sky />
          <Ophanimon position={[0, -2, -0.15]} />
          <Environment preset="city" />
        </Frame>
        <Ophanimon clip position={[0, -2, -0.15]} />
        <CameraControls
          makeDefault
          minAzimuthAngle={-Math.PI / 2.5}
          maxAzimuthAngle={Math.PI / 2.5}
          minPolarAngle={0.5}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
      <Stats />
    </Canvas>
  );
}

function Frame({
  id,
  name,
  level,
  type,
  bg,
  width = 1,
  height = GOLDENRATIO,
  children,
  ...props
}) {
  return (
    <group {...props}>
      <Text
        // font={suspend(medium).default}
        color="black"
        fontSize={0.2}
        letterSpacing={-0.025}
        anchorY="top"
        anchorX="left"
        lineHeight={0.8}
        position={[-0.375, 0.715, 0.01]}
      >
        {name}
      </Text>
      <Text
        // font={suspend(regular).default}
        color="black"
        fontSize={0.1}
        anchorX="right"
        position={[0.4, -0.715, 0.01]}
      >
        {type}
      </Text>
      <Text
        // font={suspend(regular).default}
        color="black"
        fontSize={0.1}
        anchorX="left"
        position={[-0.375, -0.715, 0.01]}
      >
        {level}
      </Text>
      <mesh name={id}>
        <roundedPlaneGeometry args={[width, height, 0.1]} />
        <MeshPortalMaterial>{children}</MeshPortalMaterial>
      </mesh>
      <mesh name={id} position={[0, 0, -0.001]}>
        <roundedPlaneGeometry args={[width + 0.05, height + 0.05, 0.12]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>
  );
}

export default App;
