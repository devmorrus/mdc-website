import { useRef, type RefObject } from 'react'
import * as THREE from 'three'
import { useThreeScene } from '../../hooks/useThreeScene'

interface ServicesShowcaseCanvasProps {
  mountRef: RefObject<HTMLDivElement | null>
}

const PARTICLE_COUNT = 160

function createEllipsePoints(radiusX: number, radiusY: number, segments: number) {
  const points: THREE.Vector3[] = []

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(theta) * radiusX, Math.sin(theta) * radiusY, 0))
  }

  return points
}

export function ServicesShowcaseCanvas({ mountRef }: ServicesShowcaseCanvasProps) {
  const groupRef = useRef<THREE.Group | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const positionsRef = useRef<Float32Array | null>(null)
  const basePositionsRef = useRef<Float32Array | null>(null)
  const ringsRef = useRef<THREE.Line[]>([])

  useThreeScene(mountRef, {
    mouseparallax: true,
    pixelRatioCap: 1.25,
    setup({ scene, camera }) {
      camera.position.set(0, 0, 18)
      camera.lookAt(0, 0, 0)

      const group = new THREE.Group()
      scene.add(group)
      groupRef.current = group

      const particleGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array(PARTICLE_COUNT * 3)
      const colors = new Float32Array(PARTICLE_COUNT * 3)

      const palette = [
        new THREE.Color('#38bdf8'),
        new THREE.Color('#60a5fa'),
        new THREE.Color('#f6c445'),
      ]

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3
        positions[i3] = (Math.random() - 0.5) * 18
        positions[i3 + 1] = (Math.random() - 0.5) * 10
        positions[i3 + 2] = (Math.random() - 0.5) * 6

        const color = palette[Math.floor(Math.random() * palette.length)]
        colors[i3] = color.r
        colors[i3 + 1] = color.g
        colors[i3 + 2] = color.b
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const particleMaterial = new THREE.PointsMaterial({
        size: 0.14,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })

      const particles = new THREE.Points(particleGeometry, particleMaterial)
      group.add(particles)
      particlesRef.current = particles
      positionsRef.current = positions
      basePositionsRef.current = positions.slice()

      const ringDefinitions = [
        { radiusX: 6.8, radiusY: 2.6, color: '#38bdf8', opacity: 0.24, rotation: [0.5, -0.2, 0.1] as const },
        { radiusX: 5.4, radiusY: 5.4, color: '#f6c445', opacity: 0.16, rotation: [1.08, 0.3, -0.2] as const },
        { radiusX: 8.2, radiusY: 3.2, color: '#60a5fa', opacity: 0.12, rotation: [0.08, 0.1, 0.4] as const },
      ]

      ringsRef.current = ringDefinitions.map((ringDefinition) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(
          createEllipsePoints(ringDefinition.radiusX, ringDefinition.radiusY, 120),
        )
        const material = new THREE.LineBasicMaterial({
          color: ringDefinition.color,
          transparent: true,
          opacity: ringDefinition.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        const line = new THREE.Line(geometry, material)
        const [rotationX, rotationY, rotationZ] = ringDefinition.rotation
        line.rotation.set(rotationX, rotationY, rotationZ)
        group.add(line)
        return line
      })

      return () => {
        scene.remove(group)
        group.traverse((child) => {
          if (child instanceof THREE.Points || child instanceof THREE.Line) {
            child.geometry.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach((material) => material.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
        groupRef.current = null
        particlesRef.current = null
        positionsRef.current = null
        basePositionsRef.current = null
        ringsRef.current = []
      }
    },
    onFrame({ mouse, reducedMotion }, delta) {
      const group = groupRef.current
      const particles = particlesRef.current
      const positions = positionsRef.current
      const basePositions = basePositionsRef.current

      if (!group || !particles || !positions || !basePositions) return

      const t = performance.now() * 0.00032

      if (!reducedMotion) {
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3
          const baseX = basePositions[i3]
          const baseY = basePositions[i3 + 1]
          const baseZ = basePositions[i3 + 2]
          const phase = i * 0.11

          positions[i3] = baseX + Math.sin(t * 1.6 + phase) * 0.07
          positions[i3 + 1] = baseY + Math.cos(t * 1.2 + phase) * 0.1
          positions[i3 + 2] = baseZ + Math.sin(t * 1.05 + phase) * 0.08
        }

        particles.geometry.attributes.position.needsUpdate = true

        group.rotation.y += delta * 0.08
        group.rotation.x = mouse.y * 0.05
        group.position.x = mouse.x * 0.8

        ringsRef.current.forEach((ring, index) => {
          ring.rotation.z += delta * (0.04 + index * 0.012)
        })
      }
    },
  })

  return null
}
