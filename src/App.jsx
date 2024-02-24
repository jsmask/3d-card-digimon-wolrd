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
  Points,
  PointMaterial,
  useTexture,
  Stars,
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
import { suspend } from 'suspend-react'
import { Ophanimon } from "./components/Ophanimon";
import { Card } from "./components/Card";

import * as random from 'maath/random/dist/maath-random.esm'

extend(geometry);


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
      camera={{ fov: 75, position: [0, 0, 2] }}
      eventSource={document.getElementById("root")}
      eventPrefix="client"
    >
      <Suspense fallback={<Loader />}>
        <color attach="background" args={["#110715"]} />
        <Stars radius={80} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
        <Environment preset="city" />
        <Card id="01" name="神圣天女兽" level="究极体" type="疫苗种" borderColor="#CC99DD" Model={Ophanimon} position={[0, 0, 0]} rotation={[0, 0, 0]}></Card>
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

// function Stars(props) {
//   const ref = useRef()
//   const star = useTexture("textures/star.png")
//   const [sphere] = useState(() =>
//     random.inSphere(new Float32Array(5000), { radius: 50 })
//   )

//   useFrame((state, delta) => {
//     ref.current.rotation.x -= delta / 10
//     ref.current.rotation.y -= delta / 15
//   })
//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
//         <PointMaterial transparent color="#FFFFFF" map={star} size={0.1} sizeAttenuation={true} depthWrite={false} />
//       </Points>
//     </group>
//   )
// }

export default App;
