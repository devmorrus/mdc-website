import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { useThreeScene } from '../../hooks/useThreeScene'
import type { AboutHeroContent } from '../../types/about'

interface AboutHeroSectionProps {
  content: AboutHeroContent
}

function AboutHelixCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useThreeScene(mountRef, {
    antialias: false,
    pixelRatioCap: 1.5,
    mouseparallax: true,

    setup({ scene, camera, reducedMotion }) {
      camera.position.set(0, 0, 7)

      scene.add(new THREE.AmbientLight(0x1a3a6e, 0.8))
      const key = new THREE.DirectionalLight(0xffd64a, 2.2)
      key.position.set(3, 5, 4); scene.add(key)
      const rim = new THREE.DirectionalLight(0x4499ff, 1.0)
      rim.position.set(-4, -2, 2); scene.add(rim)

      const group = new THREE.Group()
      scene.add(group)

      // Central octahedron – BasicMaterial wireframe
      const octaGeo = new THREE.OctahedronGeometry(1.3, 0)
      const octaMat = new THREE.MeshBasicMaterial({ color: 0xffd64a, wireframe: true, transparent: true, opacity: 0.7 })
      const octa = new THREE.Mesh(octaGeo, octaMat)
      group.add(octa)

      // Inner tetrahedron – Lambert (1 pass)
      const tetraGeo = new THREE.TetrahedronGeometry(0.9, 0)
      const tetraMat = new THREE.MeshLambertMaterial({ color: 0x1a5fff, transparent: true, opacity: 0.4 })
      const tetra = new THREE.Mesh(tetraGeo, tetraMat)
      group.add(tetra)

      // Rings – reduced segments
      const ringDefs = [
        { r: 2.0, op: 0.5, color: 0xffd64a, rx: Math.PI / 2, ry: 0 },
        { r: 2.4, op: 0.33, color: 0x4499ff, rx: Math.PI / 3.5, ry: Math.PI / 5 },
        { r: 1.6, op: 0.25, color: 0xffd64a, rx: -Math.PI / 4, ry: Math.PI / 6 },
      ]
      const rings: THREE.Mesh[] = []
      ringDefs.forEach((d) => {
        const g = new THREE.TorusGeometry(d.r, 0.010, 6, 60)
        const m = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: d.op })
        const mesh = new THREE.Mesh(g, m)
        mesh.rotation.x = d.rx; mesh.rotation.y = d.ry
        rings.push(mesh); group.add(mesh)
      })

      // Particles – 80
      const pCount = 80
      const pGeo = new THREE.BufferGeometry()
      const pPos = new Float32Array(pCount * 3)
      const pCol = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 3 + Math.random() * 2
        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pPos[i * 3 + 2] = r * Math.cos(phi)
        const a = Math.random() > 0.5
        pCol[i * 3] = a ? 1.0 : 0.27; pCol[i * 3 + 1] = a ? 0.84 : 0.6; pCol[i * 3 + 2] = a ? 0.29 : 1.0
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3))
      const pMat = new THREE.PointsMaterial({ size: 0.045, transparent: true, opacity: 0.6, vertexColors: true, depthWrite: false, blending: THREE.AdditiveBlending })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      const tweens: gsap.core.Tween[] = []
      if (!reducedMotion) {
        tweens.push(gsap.to(group.rotation, { y: Math.PI * 2, duration: 20, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(octa.rotation, { x: Math.PI * 2, duration: 14, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(tetra.rotation, { y: -Math.PI * 2, duration: 18, repeat: -1, ease: 'none' }))
        rings.forEach((ring, i) => tweens.push(gsap.to(ring.rotation, { z: Math.PI * 2 * (i % 2 === 0 ? 1 : -1), duration: 12 + i * 5, repeat: -1, ease: 'none' })))
        tweens.push(gsap.to(group.position, { y: 0.2, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
        tweens.push(gsap.to(particles.rotation, { y: Math.PI * 2, duration: 55, repeat: -1, ease: 'none' }))
      }

      return () => tweens.forEach((t) => t.kill())
    },

    onFrame({ scene, mouse, reducedMotion }) {
      if (!reducedMotion && (mouse.x !== 0 || mouse.y !== 0)) {
        scene.rotation.x += (mouse.y * 0.12 - scene.rotation.x) * 0.05
        scene.rotation.y += (mouse.x * 0.18 - scene.rotation.y) * 0.05
      }
    },
  })

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
    <section ref={scopeRef} className="relative isolate overflow-hidden border-b border-blue-900/30 min-h-[88vh] flex items-center">
      <div className="pointer-events-none absolute -left-40 -top-20 h-125 w-125 rounded-full bg-sky-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-100 w-100 rounded-full bg-amber-300/15 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-px bg-linear-to-b from-transparent via-amber-300/15 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center md:py-32">
        <div className="space-y-7">
          <span ref={badgeRef} className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-200/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            {content.eyebrow}
          </span>
          <h1 ref={titleRef} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-blue-50 md:text-5xl xl:text-6xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            {content.title.split(',').map((part, i, arr) => (
              <span key={i}>
                {i === 0 ? <span className="bg-linear-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">{part}</span> : <span className="text-blue-50">{part}</span>}
                {i < arr.length - 1 && ','}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p ref={descRef} className="max-w-md text-base leading-relaxed text-blue-200/70 md:text-lg">{content.description}</p>
          <div className="flex items-center gap-3 pt-2">
            <div className="h-px w-12 bg-linear-to-r from-amber-300/60 to-transparent" />
            <span className="text-xs text-blue-400/40 uppercase tracking-widest">Morrus Digital Connecting</span>
          </div>
        </div>

        {/* Canvas – always visible on hero so no lazy loading needed here */}
        <div className="relative h-72 md:h-110">
          <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-amber-300/8 via-blue-500/5 to-transparent blur-xl" />
          <div className="relative h-full rounded-3xl border border-blue-200/12 bg-linear-to-br from-blue-900/35 via-blue-950/55 to-blue-950/80 shadow-[0_30px_80px_-20px_rgba(251,191,36,0.2)] backdrop-blur-sm overflow-hidden">
            <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-amber-300/40 rounded-tl-xl pointer-events-none" />
            <div className="absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-amber-300/40 rounded-br-xl pointer-events-none" />
            <AboutHelixCanvas />
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-2xl border border-blue-200/20 bg-blue-950/85 px-5 py-3 backdrop-blur-md shadow-xl">
            <p className="text-[10px] text-blue-300/50 uppercase tracking-widest">Berdiri Sejak</p>
            <p className="text-2xl font-extrabold text-amber-300" style={{ fontFamily: "'Sora', sans-serif" }}>2021</p>
          </div>
          <div className="absolute -top-4 -right-4 rounded-2xl border border-amber-300/20 bg-blue-950/85 px-5 py-3 backdrop-blur-md shadow-xl">
            <p className="text-[10px] text-blue-300/50 uppercase tracking-widest">Client Trust</p>
            <p className="text-2xl font-extrabold text-amber-300" style={{ fontFamily: "'Sora', sans-serif" }}>94%</p>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[10px] uppercase tracking-[0.25em] text-blue-400/40">Scroll</span>
        <svg className="h-4 w-4 text-amber-300/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </div>
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-28 bg-linear-to-t from-[#021331] to-transparent" />
    </section>
  )
}