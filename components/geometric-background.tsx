"use client"
import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { MathUtils, Color, Vector3 } from "three"
import type * as THREE from "three"

const COLORS = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", 
  "#96CEB4", "#FFEEAD", "#FF9F76",
  "#D4A5A5", "#79BFA1", "#E5779E"
]

export default function GeometricBackground() {
  const { viewport } = useThree()
  const groupRef = useRef<THREE.Group>(null)

  // Generate dynamic shapes with varied geometry
  const shapes = useMemo(() => {
    return Array.from({ length: 30 }, () => ({
      position: new Vector3(
        MathUtils.randFloatSpread(viewport.width * 2),
        MathUtils.randFloatSpread(viewport.height * 2),
        MathUtils.randFloatSpread(20) - 10
      ),
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.8 + 0.2,
      color: new Color(COLORS[Math.floor(Math.random() * COLORS.length)]),
      shape: Math.floor(Math.random() * 5),
      speed: Math.random() * 0.02 + 0.01,
      direction: Math.random() > 0.5 ? 1 : -1
    }))
  }, [viewport])

  // Animate shapes with mouse interaction and floating effect
  useFrame(({ mouse, clock }) => {
    const time = clock.getElapsedTime()
    
    if (groupRef.current) {
      groupRef.current.rotation.x = MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.2 + Math.sin(time * 0.5) * 0.1,
        0.05
      )
      groupRef.current.rotation.y = MathUtils.lerp(
        groupRef.current.rotation.y,
        mouse.x * 0.2 + Math.cos(time * 0.5) * 0.1,
        0.05
      )

      shapes.forEach((shape) => {
        shape.position.y += Math.sin(time * shape.speed) * 0.005 * shape.direction
        shape.position.x += Math.cos(time * shape.speed) * 0.005 * shape.direction
      })
    }
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} color="#ffffff" />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#FF6B6B" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#4ECDC4" />

      {shapes.map((shape, i) => (
        <mesh
          key={i}
          position={shape.position}
          rotation={shape.rotation as [number, number, number]}
          scale={shape.scale}
        >
          {shape.shape === 0 ? (
            <boxGeometry args={[1, 1, 1]} />
          ) : shape.shape === 1 ? (
            <sphereGeometry args={[1, 32, 32]} />
          ) : shape.shape === 2 ? (
            <octahedronGeometry args={[1, 0]} />
          ) : shape.shape === 3 ? (
            <torusKnotGeometry args={[1, 0.3, 64, 16]} />
          ) : (
            <icosahedronGeometry args={[1]} />
          )}
          <meshPhysicalMaterial
            color={shape.color}
            transparent
            opacity={0.8}
            metalness={0.4}
            roughness={0.2}
            emissive={shape.color}
            emissiveIntensity={0.3}
            clearcoat={0.8}
          />
        </mesh>
      ))}

      {/* Animated background elements */}
      <mesh position={[0, 0, -15]} scale={8}>
        <torusGeometry args={[5, 1.5, 32, 100]} />
        <meshStandardMaterial
          color="#FFEEAD"
          wireframe
          transparent
          opacity={0.1}
          emissive="#FFEEAD"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
}