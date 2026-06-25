import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 3800
const WAVE_WIDTH = 120
const WAVE_DEPTH = 50
const WAVE_AMPLITUDE = 2.8
const WAVE_FREQUENCY = 0.18
const PARTICLE_SIZE = 0.055
const CAMERA_Z = 28
const MOUSE_PARALLAX_STRENGTH = 0.006
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function buildParticleGeometry() {
  const positions = new Float32Array(PARTICLE_COUNT * 3)
  const colors = new Float32Array(PARTICLE_COUNT * 3)
  const sizes = new Float32Array(PARTICLE_COUNT)
  const randoms = new Float32Array(PARTICLE_COUNT)

  // Color stops: cyan → blue → indigo
  const colorStops = [
    new THREE.Color('#38bdf8'), // cyan-400
    new THREE.Color('#60a5fa'), // blue-400
    new THREE.Color('#818cf8'), // indigo-400
    new THREE.Color('#a78bfa'), // violet-400
  ]

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3

    // Spread particles across a grid with some randomness
    const col = (i % Math.ceil(Math.sqrt(PARTICLE_COUNT))) / Math.ceil(Math.sqrt(PARTICLE_COUNT))
    const row = Math.floor(i / Math.ceil(Math.sqrt(PARTICLE_COUNT))) / Math.ceil(Math.sqrt(PARTICLE_COUNT))

    const x = (col - 0.5) * WAVE_WIDTH + (Math.random() - 0.5) * 2.2
    const z = (row - 0.5) * WAVE_DEPTH + (Math.random() - 0.5) * 1.5
    const y = 0 // will be updated in animation loop

    positions[i3] = x
    positions[i3 + 1] = y
    positions[i3 + 2] = z

    // Color based on X position (gradient left to right)
    const t = (col + 0.5) * 0.85
    const stopIdx = Math.min(Math.floor(t * (colorStops.length - 1)), colorStops.length - 2)
    const localT = t * (colorStops.length - 1) - stopIdx
    const color = colorStops[stopIdx].clone().lerp(colorStops[stopIdx + 1], localT)

    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b

    // Vary particle sizes slightly
    sizes[i] = PARTICLE_SIZE * (0.5 + Math.random() * 1.0)
    randoms[i] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
  return geometry
}

function buildParticleMaterial() {
  return new THREE.PointsMaterial({
    size: PARTICLE_SIZE,
    vertexColors: true,
    transparent: true,
    opacity: 0.78,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

export function useHeroThreeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // WebGL support check
    const testCtx = (() => {
      try {
        return canvas.getContext('webgl2') ?? canvas.getContext('webgl')
      } catch {
        return null
      }
    })()
    if (!testCtx) return

    const prefersReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches

    // --- Scene setup ---
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // transparent, CSS handles bg color

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.set(0, 8, CAMERA_Z)
    camera.lookAt(0, 0, 0)

    const geometry = buildParticleGeometry()
    const material = buildParticleMaterial()
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    // Resize handler
    function handleResize() {
      if (!canvas) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas.parentElement ?? canvas)
    handleResize()

    // Mouse parallax
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    function handleMouseMove(e: MouseEvent) {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // Animation loop
    const clock = new THREE.Clock()
    let animFrameId: number
    const posArr = geometry.attributes.position.array as Float32Array
    const randomArr = geometry.attributes.aRandom.array as Float32Array

    function animate() {
      animFrameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      if (!prefersReducedMotion) {
        // Smooth mouse lerp
        mouseX += (targetMouseX - mouseX) * 0.04
        mouseY += (targetMouseY - mouseY) * 0.04

        // Update particle wave positions
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const i3 = i * 3
          const x = posArr[i3]
          const z = posArr[i3 + 2]
          const r = randomArr[i]

          // Main wave: sinusoidal across X + secondary ripple across Z
          const wave1 = Math.sin(x * WAVE_FREQUENCY + t * 0.55 + r) * WAVE_AMPLITUDE
          const wave2 = Math.sin(z * 0.22 + t * 0.38 + r * 0.5) * (WAVE_AMPLITUDE * 0.45)
          const wave3 = Math.cos(x * 0.09 + z * 0.11 + t * 0.28) * (WAVE_AMPLITUDE * 0.3)

          posArr[i3 + 1] = wave1 + wave2 + wave3
        }

        geometry.attributes.position.needsUpdate = true

        // Camera mouse parallax
        camera.position.x = mouseX * MOUSE_PARALLAX_STRENGTH * 14
        camera.position.y = 8 - mouseY * MOUSE_PARALLAX_STRENGTH * 8

        // Slow rotation of whole points cloud
        points.rotation.y = Math.sin(t * 0.06) * 0.06
      }

      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(animFrameId)
      resizeObserver.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return canvasRef
}
