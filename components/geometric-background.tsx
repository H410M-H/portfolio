"use client"
import { useRef, useMemo, useEffect } from "react"
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
      direction: Math.random() > 0.5 ? 1 : -1,
      velocity: new Vector3(),
      phase: Math.random() * Math.PI * 2
    }))
  }, [viewport])

  const scrollVelocity = useRef(0)
  const scrollTarget = useRef(0)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const nextScrollY = window.scrollY
      scrollTarget.current = MathUtils.clamp((nextScrollY - lastScrollY.current) * 0.012, -1.4, 1.4)
      lastScrollY.current = nextScrollY
    }

    lastScrollY.current = window.scrollY
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Spring-damped motion makes scroll energy settle naturally instead of stopping abruptly.
  useFrame(({ mouse, clock }, delta) => {
    const time = clock.getElapsedTime()
    const frame = Math.min(delta, 0.05)
    scrollVelocity.current = MathUtils.damp(scrollVelocity.current, scrollTarget.current, 5, frame)
    scrollTarget.current = MathUtils.damp(scrollTarget.current, 0, 7, frame)
    const motionForce = scrollVelocity.current

    if (groupRef.current) {
      groupRef.current.rotation.x = MathUtils.damp(
        groupRef.current.rotation.x,
        mouse.y * 0.2 + Math.sin(time * 0.5) * 0.1 + motionForce * 0.08,
        4,
        frame
      )
      groupRef.current.rotation.y = MathUtils.damp(
        groupRef.current.rotation.y,
        mouse.x * 0.2 + Math.cos(time * 0.5) * 0.1 + motionForce * 0.12,
        4,
        frame
      )

      shapes.forEach((shape) => {
        const force = new Vector3(
          Math.cos(time * shape.speed + shape.phase) * 0.018 * shape.direction + motionForce * 0.06,
          Math.sin(time * shape.speed + shape.phase) * 0.018 * shape.direction - motionForce * 0.035,
          Math.sin(time * 0.7 + shape.phase) * 0.01
        )
        shape.velocity.add(force.multiplyScalar(frame * 3))
        shape.velocity.multiplyScalar(Math.pow(0.92, frame * 60))
        shape.position.addScaledVector(shape.velocity, frame)
        shape.rotation[0] += shape.velocity.y * frame * 0.35
        shape.rotation[1] += shape.velocity.x * frame * 0.35
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
