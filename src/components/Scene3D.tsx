import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSphere({ position, color, speed, distort, scale }: {
  position: [number, number, number]
  color: string
  speed: number
  distort: number
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 2000
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    return pos
  }, [])

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#8b5cf6"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
      <spotLight position={[0, 15, 5]} intensity={0.8} color="#f59e0b" angle={0.5} penumbra={1} />

      <FloatingSphere position={[-5, 3, -10]} color="#8b5cf6" speed={0.5} distort={0.4} scale={1.5} />
      <FloatingSphere position={[6, -2, -12]} color="#ec4899" speed={0.3} distort={0.3} scale={2} />
      <FloatingSphere position={[0, 5, -15]} color="#f59e0b" speed={0.4} distort={0.5} scale={1} />
      <FloatingSphere position={[-8, -4, -8]} color="#10b981" speed={0.6} distort={0.2} scale={1.2} />

      <ParticleField />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8, -10]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#0f0f14" transparent opacity={0.8} />
      </mesh>
    </>
  )
}
