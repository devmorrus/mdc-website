import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import type { PortfolioHeroContent } from '../../types/portfolio'

interface PortfolioHeroSectionProps {
  content: PortfolioHeroContent
}

function PortfolioHeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 7

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0x1a3a6e, 0.6))
    const key = new THREE.DirectionalLight(0xffd64a, 2.0)
    key.position.set(5, 5, 5); scene.add(key)
    const rim = new THREE.DirectionalLight(0x4499ff, 1.2)
    rim.position.set(-4, -2, 2); scene.add(rim)

    const geos: THREE.BufferGeometry[] = []
    const mats: THREE.Material[] = []
    const meshes: THREE.Mesh[] = []
    const tweens: gsap.core.Tween[] = []

    // Floating cubes/boxes scattered in scene
    const boxDefs = [
      { size: [0.6, 0.6, 0.6], pos: [-3, 1.2, 0], color: 0xffd64a, opacity: 0.6, wireframe: true },
      { size: [0.4, 0.4, 0.4], pos: [3.2, -0.8, -1], color: 0x4499ff, opacity: 0.5, wireframe: true },
      { size: [0.5, 0.5, 0.5], pos: [1.5, 1.8, -0.5], color: 0xffd64a, opacity: 0.4, wireframe: false },
      { size: [0.3, 0.3, 0.3], pos: [-2.5, -1.5, 0.5], color: 0xffd64a, opacity: 0.45, wireframe: true },
      { size: [0.45, 0.45, 0.45], pos: [0.5, -1.8, -1], color: 0x4499ff, opacity: 0.35, wireframe: false },
      { size: [0.25, 0.25, 0.25], pos: [-1.2, 2.0, -1.5], color: 0xffd64a, opacity: 0.4, wireframe: true },
    ]

    boxDefs.forEach((def) => {
      const geo = new THREE.BoxGeometry(...(def.size as [number, number, number]))
      const mat = new THREE.MeshPhysicalMaterial({ color: def.color, metalness: 0.6, roughness: 0.2, wireframe: def.wireframe, transparent: true, opacity: def.opacity })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(...(def.pos as [number, number, number]))
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
      scene.add(mesh); meshes.push(mesh); geos.push(geo); mats.push(mat)
    })

    // Central octahedron
    const cGeo = new THREE.OctahedronGeometry(0.9, 0)
    const cMat = new THREE.MeshPhysicalMaterial({ color: 0xffd64a, metalness: 0.5, roughness: 0.1, wireframe: true, transparent: true, opacity: 0.65 })
    const center = new THREE.Mesh(cGeo, cMat)
    scene.add(center); geos.push(cGeo); mats.push(cMat)

    // Particles
    const pCount = 90
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pCol = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 12; pPos[i * 3 + 1] = (Math.random() - 0.5) * 8; pPos[i * 3 + 2] = (Math.random() - 0.5) * 6
      const a = Math.random() > 0.4; pCol[i * 3] = a ? 1.0 : 0.27; pCol[i * 3 + 1] = a ? 0.84 : 0.6; pCol[i * 3 + 2] = a ? 0.29 : 1.0
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles); geos.push(pGeo); mats.push(pMat)

    if (!prefersReducedMotion) {
      tweens.push(gsap.to(center.rotation, { y: Math.PI * 2, x: Math.PI, duration: 18, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(center.position, { y: 0.2, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
      meshes.forEach((m, idx) => {
        tweens.push(gsap.to(m.rotation, { x: Math.PI * 2, y: Math.PI, duration: 10 + idx * 2.5, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(m.position, { y: m.position.y + 0.3, duration: 3 + idx * 0.6, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
      })
      tweens.push(gsap.to(particles.rotation, { y: Math.PI * 2, duration: 55, repeat: -1, ease: 'none' }))
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = container.getBoundingClientRect()
      gsap.to(scene.rotation, { x: ((e.clientY - rect.top) / rect.height - 0.5) * 0.1, y: ((e.clientX - rect.left) / rect.width - 0.5) * 0.18, duration: 1.4, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', handleMouseMove)

    let frameId = 0
    const render = () => { frameId = requestAnimationFrame(render); renderer.render(scene, camera) }
    const handleResize = () => { camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight) }
    handleResize(); render()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId); tweens.forEach(t => t.kill())
      geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose())
      renderer.dispose()
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

export function PortfolioHeroSection({ content }: PortfolioHeroSectionProps) {
  const badgeRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(badgeRef.current, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
      .fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, '-=0.3')
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.35')
  }, [])

  return (
    <section className="relative isolate overflow-hidden border-b border-blue-900/30 min-h-[80vh] flex items-center">
      <div className="pointer-events-none absolute -left-40 -top-20 h-105 w-105 rounded-full bg-sky-500/14 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-90 w-90 rounded-full bg-amber-300/14 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Three.js fills right portion */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-70">
        <PortfolioHeroCanvas />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[30%] bg-linear-to-l from-[#021331] via-[#021331]/50 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 md:py-36">
        <div className="max-w-2xl space-y-7">
          <p ref={badgeRef} className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-200/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            {content.eyebrow}
          </p>

          <h1 ref={titleRef} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-blue-50 md:text-5xl xl:text-6xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            {content.title.split(' ').map((word, i) => {
              const accent = ['Pilihan', 'Mewakili', 'Standar', 'Kualitas', 'Morrus'].includes(word)
              return (
                <span key={i}>
                  <span className={accent ? 'bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent' : ''}>{word}</span>{' '}
                </span>
              )
            })}
          </h1>

          <p ref={descRef} className="max-w-lg text-base leading-relaxed text-blue-200/70 md:text-lg">{content.description}</p>

          {/* Industry filters visual */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['Company Profile', 'Web App', 'Internal System', 'Brand Website', 'Platform'].map((label) => (
              <span key={label} className="rounded-full border border-blue-200/18 bg-blue-900/28 px-3.5 py-1.5 text-xs font-medium text-blue-300/65 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/40 hover:text-amber-200 cursor-default">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-[#021331] to-transparent" />
    </section>
  )
}