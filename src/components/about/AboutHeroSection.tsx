import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import type { AboutHeroContent } from '../../types/about'

interface AboutHeroSectionProps {
  content: AboutHeroContent
}

function AboutHelixCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Lighting
    scene.add(new THREE.AmbientLight(0x1a3a6e, 0.8))
    const key = new THREE.DirectionalLight(0xffd64a, 2.5)
    key.position.set(3, 5, 4)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x4499ff, 1.5)
    rim.position.set(-4, -2, 2)
    scene.add(rim)
    const pt = new THREE.PointLight(0xffd64a, 2, 15)
    pt.position.set(0, 2, 3)
    scene.add(pt)

    // ── Floating geometric cluster ────────────────────────────────────────────
    const group = new THREE.Group()
    scene.add(group)

    // Central octahedron
    const octaGeo = new THREE.OctahedronGeometry(1.3, 0)
    const octaMat = new THREE.MeshPhysicalMaterial({
      color: 0xffd64a,
      metalness: 0.5,
      roughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    })
    const octa = new THREE.Mesh(octaGeo, octaMat)
    group.add(octa)

    // Inner tetrahedron
    const tetraGeo = new THREE.TetrahedronGeometry(0.9, 0)
    const tetraMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a5fff,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.45,
    })
    const tetra = new THREE.Mesh(tetraGeo, tetraMat)
    group.add(tetra)

    // Orbit ring 1 – amber
    const ring1Geo = new THREE.TorusGeometry(2.0, 0.012, 8, 90)
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xffd64a, transparent: true, opacity: 0.55 })
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat)
    ring1.rotation.x = Math.PI / 2
    group.add(ring1)

    // Orbit ring 2 – blue
    const ring2Geo = new THREE.TorusGeometry(2.4, 0.008, 8, 90)
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x4499ff, transparent: true, opacity: 0.38 })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI / 3.5
    ring2.rotation.y = Math.PI / 5
    group.add(ring2)

    // Orbit ring 3 – thin amber
    const ring3Geo = new THREE.TorusGeometry(1.6, 0.006, 8, 90)
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xffd64a, transparent: true, opacity: 0.3 })
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat)
    ring3.rotation.x = -Math.PI / 4
    ring3.rotation.z = Math.PI / 6
    group.add(ring3)

    // Satellite spheres
    const satellites: THREE.Mesh[] = []
    const satPositions = [
      { r: 2.0, theta: 0, phi: Math.PI / 2, color: 0xffd64a, size: 0.08 },
      { r: 2.0, theta: Math.PI, phi: Math.PI / 2, color: 0xffd64a, size: 0.08 },
      { r: 2.4, theta: Math.PI / 3, phi: Math.PI / 3, color: 0x4499ff, size: 0.06 },
      { r: 2.4, theta: Math.PI + Math.PI / 3, phi: Math.PI / 3, color: 0x4499ff, size: 0.06 },
      { r: 1.6, theta: Math.PI / 2, phi: -Math.PI / 4, color: 0xffd64a, size: 0.05 },
    ]
    satPositions.forEach((s) => {
      const geo = new THREE.SphereGeometry(s.size, 8, 8)
      const mat = new THREE.MeshPhysicalMaterial({ color: s.color, metalness: 0.8, roughness: 0.1 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(
        s.r * Math.sin(s.phi) * Math.cos(s.theta),
        s.r * Math.sin(s.phi) * Math.sin(s.theta),
        s.r * Math.cos(s.phi),
      )
      satellites.push(mesh)
      group.add(mesh)
    })

    // Particle field
    const pCount = 120
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pColors = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 3 + Math.random() * 2
      pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pPos[i * 3 + 2] = r * Math.cos(phi)
      const isAmber = Math.random() > 0.5
      pColors[i * 3] = isAmber ? 1.0 : 0.27
      pColors[i * 3 + 1] = isAmber ? 0.84 : 0.6
      pColors[i * 3 + 2] = isAmber ? 0.29 : 1.0
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3))
    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      transparent: true,
      opacity: 0.65,
      vertexColors: true,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    // Animations
    const tweens: gsap.core.Tween[] = []
    if (!prefersReducedMotion) {
      tweens.push(gsap.to(group.rotation, { y: Math.PI * 2, duration: 20, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(octa.rotation, { x: Math.PI * 2, duration: 14, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(tetra.rotation, { y: -Math.PI * 2, x: Math.PI, duration: 18, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(ring1.rotation, { z: Math.PI * 2, duration: 12, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(ring2.rotation, { z: -Math.PI * 2, duration: 17, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(ring3.rotation, { z: Math.PI * 2, duration: 22, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(group.position, { y: 0.2, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
      tweens.push(gsap.to(particles.rotation, { y: Math.PI * 2, duration: 55, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(pt, { intensity: 0.7, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
    }

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = container.getBoundingClientRect()
      const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      gsap.to(scene.rotation, { x: my * 0.12, y: mx * 0.18, duration: 1.4, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', handleMouseMove)

    let frameId = 0
    const render = () => { frameId = requestAnimationFrame(render); renderer.render(scene, camera) }

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    handleResize()
    render()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId)
      tweens.forEach((t) => t.kill())
      ;[octaGeo, tetraGeo, ring1Geo, ring2Geo, ring3Geo, pGeo].forEach((g) => g.dispose())
      ;[octaMat, tetraMat, ring1Mat, ring2Mat, ring3Mat, pMat].forEach((m) => m.dispose())
      renderer.dispose()
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

export function AboutHeroSection({ content }: AboutHeroSectionProps) {
  const scopeRef = useRef<HTMLElement>(null)
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      .fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.3')
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.4')
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')

    if (scrollRef.current) {
      gsap.to(scrollRef.current, { y: 8, duration: 1.4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1.5 })
    }
  }, [])

  return (
    <section
      ref={scopeRef}
      className="relative isolate overflow-hidden border-b border-blue-900/30 min-h-[88vh] flex items-center"
    >
      {/* Layered ambient glows */}
      <div className="pointer-events-none absolute -left-40 -top-20 h-75 w-125 rounded-full bg-sky-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-100 w-100 rounded-full bg-amber-300/15 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-75 w-125 rounded-full bg-blue-600/8 blur-[90px]" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Diagonal separator line */}
      <div className="pointer-events-none absolute right-0 inset-y-0 w-px bg-linear-to-b from-transparent via-amber-300/15 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        {/* Left: text */}
        <div className="space-y-7">
          {/* Eyebrow */}
          <span
            ref={badgeRef}
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-200/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            {content.eyebrow}
          </span>

          {/* Headline */}
          <h1
            ref={titleRef}
            className="text-4xl font-extrabold leading-[1.08] tracking-tight text-blue-50 md:text-5xl xl:text-6xl"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            {content.title.split(',').map((part, i, arr) => (
              <span key={i}>
                {i === 0 ? (
                  <span className="bg-linear-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                    {part}
                  </span>
                ) : (
                  <span className="text-blue-50">{part}</span>
                )}
                {i < arr.length - 1 && ','}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p ref={descRef} className="max-w-md text-base leading-relaxed text-blue-200/70 md:text-lg">
            {content.description}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 pt-2">
            <div className="h-px w-12 bg-linear-to-r from-amber-300/60 to-transparent" />
            <span className="text-xs text-blue-400/40 uppercase tracking-widest">Morrus Digital Connecting</span>
          </div>
        </div>

        {/* Right: Three.js canvas */}
        <div className="relative h-72 md:h-110">
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-amber-300/8 via-blue-500/5 to-transparent blur-xl" />
          <div className="relative h-full rounded-3xl border border-blue-200/12 bg-linear-to-br from-blue-900/35 via-blue-950/55 to-blue-950/80 shadow-[0_30px_80px_-20px_rgba(251,191,36,0.2)] backdrop-blur-sm overflow-hidden">
            {/* Corner accents */}
            <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-amber-300/40 rounded-tl-xl pointer-events-none" />
            <div className="absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-amber-300/40 rounded-br-xl pointer-events-none" />
            <AboutHelixCanvas />
          </div>

          {/* Floating stat badge */}
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-blue-200/20 bg-blue-950/85 px-5 py-3 backdrop-blur-md shadow-xl">
            <p className="text-[10px] text-blue-300/50 uppercase tracking-widest">Berdiri Sejak</p>
            <p className="text-2xl font-extrabold text-amber-300" style={{ fontFamily: "'Sora', sans-serif" }}>2021</p>
          </div>

          {/* Floating badge 2 */}
          <div className="absolute -top-4 -right-4 rounded-2xl border border-amber-300/20 bg-blue-950/85 px-5 py-3 backdrop-blur-md shadow-xl">
            <p className="text-[10px] text-blue-300/50 uppercase tracking-widest">Client Trust</p>
            <p className="text-2xl font-extrabold text-amber-300" style={{ fontFamily: "'Sora', sans-serif" }}>94%</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[10px] uppercase tracking-[0.25em] text-blue-400/40">Scroll</span>
        <svg className="h-4 w-4 text-amber-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-28 bg-linear-to-t from-[#021331] to-transparent" />
    </section>
  )
}