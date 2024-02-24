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
    Stars,
} from "@react-three/drei";
// import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
// import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { Suspense, useEffect, useRef, useState,forwardRef } from "react";
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

extend(geometry);

const IPix = import("../assets/fonts/IPix.ttf")

const GOLDENRATIO = 1.61803398875;

import { Ophanimon } from "./Ophanimon";

export function Card({
    id,
    name,
    level,
    type,
    Model,
    children,
    borderColor,
    ...props
}) {
    const [hovered, hover] = useState(false)
    return (
        <group {...props}
            onPointerOver={(e) => (e.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}>
            <Frame
                id={id}
                name={name}
                level={level}
                type={type}
                borderColor={borderColor}
            >
                <Sky />
                <Ophanimon actived={hovered} />
                <Environment preset="city" />
            </Frame>
            <Ophanimon clip actived={hovered} />
        </group>
    )
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
    borderColor = "black",
    ...props
}) {
    return (
        <group {...props}>
            <Text
                font={suspend(IPix).default}
                color="black"
                fontSize={0.08}
                letterSpacing={-0.025}
                anchorY="top"
                anchorX="center"
                lineHeight={0.8}
                position={[0, 0.75, 0.01]}
            >
                {name}
            </Text>
            <Text
                font={suspend(IPix).default}
                color="black"
                fontSize={0.05}
                anchorX="right"
                position={[0.4, -0.72, 0.01]}
            >
                {level}
            </Text>
            <Text
                font={suspend(IPix).default}
                color="black"
                fontSize={0.05}
                anchorX="left"
                position={[-0.4, -0.72, 0.01]}
            >
                {type}
            </Text>
            <mesh name={id}>
                <roundedPlaneGeometry args={[width, height, 0.1]} />
                <MeshPortalMaterial>{children}</MeshPortalMaterial>
            </mesh>
            <mesh name={id} position={[0, 0, -0.001]}>
                <roundedPlaneGeometry args={[width + 0.05, height + 0.05, 0.12]} />
                <meshBasicMaterial color={borderColor} />
            </mesh>
        </group>
    );
}