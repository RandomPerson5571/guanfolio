"use client";

import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";

const ROBOT_MODEL_URL = "/cads/Push_Back_DT_Compressed.glb";

export function RobotModel({
  mouse,
}: {
  mouse: React.RefObject<{ x: number; y: number }>;
}) {
  const group = useRef<Group | null>(null);

  const gltf = useGLTF(ROBOT_MODEL_URL);

  useFrame((state) => {
    if (!group.current) return;

    const targetX = mouse.current.x * 0.35;
    const targetY = mouse.current.y * 0.18;
    const targetRotY = mouse.current.x * 0.25;
    const targetRotX = mouse.current.y * 0.15;

    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.06;

    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.06;

    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.23) * 0.03;

    group.current.position.x += (targetX - group.current.position.x) * 0.06;

    group.current.position.y += (targetY - group.current.position.y) * 0.04;
  });

  return (
    <group
      ref={group}
      position={[0, -0.8, 0]}
      rotation={[0.1, 0, 0]}
      scale={1.35}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

useGLTF.preload(ROBOT_MODEL_URL);

export default function RobotScene() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <Canvas
      shadows
      camera={{
        position: [20, -40, 30],
        fov: 50,
        rotateZ: Math.PI / 2,
        rotateX: Math.PI / 2,
        rotateY: Math.PI / 2,
      }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={(state) => {
        state.gl.shadowMap.type = THREE.PCFShadowMap;
      }}
    >
      <color attach="background" args={["#050509"]} />

      <ambientLight intensity={0.4} />

      <spotLight
        position={[6, 8, 10]}
        angle={0.2}
        penumbra={0.35}
        intensity={1.8}
        color="#7db5ff"
        castShadow
      />

      <pointLight position={[-4, 2, 6]} intensity={1.2} color="#ff95d8" />

      <pointLight position={[0, -3, -2]} intensity={0.6} color="#2d78ff" />
      <Suspense
        fallback={
          <Html center className="text-white/70 text-sm">
            Loading robot...
          </Html>
        }
      >
        <RobotModel mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
