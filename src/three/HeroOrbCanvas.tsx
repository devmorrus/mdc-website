import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'

export function HeroOrbCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100)
    camera.position.z = 5.5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ─── Lighting ───────────────────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x1a3a6e, 0.6)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffd64a, 2.0)
    keyLight.position.set(3, 4, 5)
    scene.add(keyLight)

    const rimLight = new THREE.DirectionalLight(0x4499ff, 1.2)
    rimLight.position.set(-4, -2, 2)
    scene.add(rimLight)

    const pointLight = new THREE.PointLight(0xffd64a, 1.5, 12)
    pointLight.position.set(0, 0, 3)
    scene.add(pointLight)

    // ─── Core orb (icosahedron wireframe) ───────────────────────────────────────
    const orbGeo = new THREE.IcosahedronGeometry(1.1, 1)
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: 0xffd64a,
      metalness: 0.4,
      roughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    })
    const orb = new THREE.Mesh(orbGeo, orbMat)
    scene.add(orb)

    // ─── Inner solid orb ────────────────────────────────────────────────────────
    const innerGeo = new THREE.IcosahedronGeometry(0.85, 2)
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a3a8f,
      metalness: 0.6,
      roughness: 0.3,
      transparent: true,
      opacity: 0.5,
      envMapIntensity: 1,
    })
    const innerOrb = new THREE.Mesh(innerGeo, innerMat)
    scene.add(innerOrb)

    // ─── Orbit rings ────────────────────────────────────────────────────────────
    const rings: THREE.Mesh[] = []

    const ringConfigs = [
      { radius: 1.7, tube: 0.008, color: 0xffd64a, opacity: 0.5, rotX: Math.PI / 2, rotY: 0 },
      { radius: 2.0, tube: 0.005, color: 0x4499ff, opacity: 0.35, rotX: Math.PI / 4, rotY: Math.PI / 6 },
      { radius: 2.3, tube: 0.004, color: 0xffd64a, opacity: 0.25, rotX: -Math.PI / 3, rotY: Math.PI / 4 },
    ]

    ringConfigs.forEach((cfg) => {
      const geo = new THREE.TorusGeometry(cfg.radius, cfg.tube, 8, 80)
      const mat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
      })
      const ring = new THREE.Mesh(geo, mat)
      ring.rotation.x = cfg.rotX
      ring.rotation.y = cfg.rotY
      rings.push(ring)
      scene.add(ring)
    })

    // ─── Particle field ─────────────────────────────────────────────────────────
    const particleCount = 180
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 1.8

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      sizes[i] = Math.random() * 2.5 + 0.5

      // Mix amber and blue
      const isAmber = Math.random() > 0.4
      if (isAmber) {
        colors[i * 3] = 1.0
        colors[i * 3 + 1] = 0.85
        colors[i * 3 + 2] = 0.29
      } else {
        colors[i * 3] = 0.27
        colors[i * 3 + 1] = 0.6
        colors[i * 3 + 2] = 1.0
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      vertexColors: true,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ─── Animations ─────────────────────────────────────────────────────────────
    const tweens: gsap.core.Tween[] = []

    if (!prefersReducedMotion) {
      // Core orb spin
      tweens.push(
        gsap.to(orb.rotation, {
          y: Math.PI * 2,
          duration: 22,
          repeat: -1,
          ease: 'none',
        }),
      )

      // Core orb float
      tweens.push(
        gsap.to(orb.position, {
          y: 0.18,
          duration: 3.8,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        }),
      )

      // Inner orb counter-rotation
      tweens.push(
        gsap.to(innerOrb.rotation, {
          y: -Math.PI * 2,
          x: Math.PI * 2,
          duration: 35,
          repeat: -1,
          ease: 'none',
        }),
      )

      // Ring rotations
      rings.forEach((ring, i) => {
        tweens.push(
          gsap.to(ring.rotation, {
            z: Math.PI * 2 * (i % 2 === 0 ? 1 : -1),
            duration: 18 + i * 6,
            repeat: -1,
            ease: 'none',
          }),
        )
      })

      // Particles slow rotation
      tweens.push(
        gsap.to(particles.rotation, {
          y: Math.PI * 2,
          x: Math.PI * 0.5,
          duration: 60,
          repeat: -1,
          ease: 'none',
        }),
      )

      // Pulsing point light
      tweens.push(
        gsap.to(pointLight, {
          intensity: 0.6,
          duration: 2.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        }),
      )
    }

    // ─── Mouse parallax ─────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      gsap.to(scene.rotation, {
        x: mouse.y * 0.15,
        y: mouse.x * 0.25,
        duration: 1.2,
        ease: 'power2.out',
      })
    }
    container.addEventListener('mousemove', handleMouseMove)

    // ─── Render loop ────────────────────────────────────────────────────────────
    let frameId = 0
    const render = () => {
      frameId = requestAnimationFrame(render)
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      const { clientWidth, clientHeight } = container
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }

    handleResize()
    render()
    window.addEventListener('resize', handleResize)

    // ─── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId)
      tweens.forEach((t) => t.kill())

      // Dispose geometries & materials
      ;[orbGeo, innerGeo, particleGeo].forEach((g) => g.dispose())
      ;[orbMat, innerMat, particleMat].forEach((m) => m.dispose())
      ringConfigs.forEach((_, i) => {
        rings[i]?.geometry.dispose()
        ;(rings[i]?.material as THREE.Material)?.dispose()
      })

      renderer.dispose()
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}