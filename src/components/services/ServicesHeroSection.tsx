import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import type { ServicesHeroContent } from '../../types/services'

interface ServicesHeroSectionProps {
  content: ServicesHeroContent
}

function ServicesHeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 2.5, 7)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0x1a3a6e, 0.7))
    const key = new THREE.DirectionalLight(0xffd64a, 2.2)
    key.position.set(4, 6, 4)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0x4499ff, 1.4)
    rim.position.set(-4, -2, 2)
    scene.add(rim)

    // Perspective grid
    const gridHelper = new THREE.GridHelper(14, 14, 0xffd64a, 0x1a3a8f)
    gridHelper.position.y = -1.5
    const gridMats = Array.isArray(gridHelper.material) ? gridHelper.material : [gridHelper.material]
    gridMats.forEach((m: THREE.Material) => {
      (m as THREE.LineBasicMaterial).transparent = true;
      (m as THREE.LineBasicMaterial).opacity = 0.18
    })
    scene.add(gridHelper)

    const group = new THREE.Group()
    scene.add(group)

    const icosaDefs = [
      { size: 1.0, pos: [0, 0.2, 0] as [number,number,number], color: 0xffd64a, opacity: 0.7, wireframe: true },
      { size: 0.55, pos: [2.2, 0.8, -1] as [number,number,number], color: 0x4499ff, opacity: 0.5, wireframe: true },
      { size: 0.4, pos: [-2.0, 0.5, -0.5] as [number,number,number], color: 0xffd64a, opacity: 0.45, wireframe: true },
      { size: 0.3, pos: [1.2, -0.6, 1] as [number,number,number], color: 0xffd64a, opacity: 0.35, wireframe: false },
    ]

    const meshes: THREE.Mesh[] = []
    const geos: THREE.BufferGeometry[] = []
    const mats: THREE.Material[] = []

    icosaDefs.forEach((def) => {
      const geo = new THREE.IcosahedronGeometry(def.size, 1)
      const mat = new THREE.MeshPhysicalMaterial({
        color: def.color, metalness: 0.5, roughness: 0.15,
        wireframe: def.wireframe, transparent: true, opacity: def.opacity,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(...def.pos)
      meshes.push(mesh); geos.push(geo); mats.push(mat)
      group.add(mesh)
    })

    const ringGeo = new THREE.TorusGeometry(1.6, 0.008, 8, 90)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd64a, transparent: true, opacity: 0.4 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    ring.rotation.x = Math.PI / 2.5
    geos.push(ringGeo); mats.push(ringMat)
    group.add(ring)

    const pCount = 100
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    const pCol = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 12
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 7
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6
      const a = Math.random() > 0.45
      pCol[i * 3] = a ? 1.0 : 0.27; pCol[i * 3 + 1] = a ? 0.84 : 0.6; pCol[i * 3 + 2] = a ? 0.29 : 1.0
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)
    geos.push(pGeo); mats.push(pMat)

    const tweens: gsap.core.Tween[] = []
    if (!prefersReducedMotion) {
      tweens.push(gsap.to(group.rotation, { y: Math.PI * 2, duration: 22, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(meshes[0].rotation, { x: Math.PI * 2, y: Math.PI, duration: 15, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(meshes[1].rotation, { y: -Math.PI * 2, duration: 12, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(meshes[2].rotation, { x: Math.PI * 2, duration: 18, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(ring.rotation, { z: Math.PI * 2, duration: 10, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(group.position, { y: 0.25, duration: 4.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
      tweens.push(gsap.to(particles.rotation, { y: Math.PI * 2, duration: 55, repeat: -1, ease: 'none' }))
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return
      const rect = container.getBoundingClientRect()
      const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      gsap.to(scene.rotation, { x: my * 0.08, y: mx * 0.15, duration: 1.5, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', handleMouseMove)

    let frameId = 0
    const render = () => { frameId = requestAnimationFrame(render); renderer.render(scene, camera) }
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    handleResize(); render()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId)
      tweens.forEach(t => t.kill())
      geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose())
      renderer.dispose()
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

export function ServicesHeroSection({ content }: ServicesHeroSectionProps) {
  const badgeRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(badgeRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
      .fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 }, '-=0.3')
      .fromTo(descRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.35')
      .fromTo(pillsRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, '-=0.3')
  }, [])

  return (
    <section className="relative isolate overflow-hidden border-b border-blue-900/30 min-h-[80vh] flex items-center">
      <div className="pointer-events-none absolute -left-40 -top-20 h-112.5 w-112.5 rounded-full bg-sky-500/14 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-95 w-95 rounded-full bg-amber-300/14 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Three.js fills right half */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-75">
        <ServicesHeroCanvas />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-[#021331] via-[#021331]/60 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 md:py-36">
        <div className="max-w-2xl space-y-7">
          <span ref={badgeRef} className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-200/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            {content.eyebrow}
          </span>

          <h1 ref={titleRef} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-blue-50 md:text-5xl xl:text-6xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            {content.title.split(' ').map((word, i) => {
              const accent = ['Digital', 'Layanan', 'Terstruktur', 'Pertumbuhan', 'Bisnis'].includes(word)
              return (
                <span key={i}>
                  <span className={accent ? 'bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent' : ''}>{word}</span>{' '}
                </span>
              )
            })}
          </h1>

          <p ref={descRef} className="max-w-lg text-base leading-relaxed text-blue-200/70 md:text-lg">{content.description}</p>

          <div ref={pillsRef} className="flex flex-wrap gap-2 pt-2">
            {['Company Profile', 'Custom App', 'Dashboard', 'Maintenance'].map((label) => (
              <span key={label} className="rounded-full border border-blue-200/20 bg-blue-900/30 px-4 py-1.5 text-xs font-medium text-blue-300/70 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/40 hover:text-amber-200 cursor-default">
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