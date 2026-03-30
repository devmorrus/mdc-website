import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import type { ContactHeroContent } from '../../types/contact'

interface ContactHeroSectionProps {
  content: ContactHeroContent
}

function ContactHeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.set(0, 1.5, 7)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0x1a3a6e, 0.6))
    const key = new THREE.DirectionalLight(0xffd64a, 2.0); key.position.set(4, 5, 4); scene.add(key)
    const rim = new THREE.DirectionalLight(0x4499ff, 1.2); rim.position.set(-4, -2, 2); scene.add(rim)

    const geos: THREE.BufferGeometry[] = []
    const mats: THREE.Material[] = []
    const tweens: gsap.core.Tween[] = []

    // Network nodes: spheres connected by lines
    const nodeCount = 12
    const nodePositions: THREE.Vector3[] = []
    const nodeMeshes: THREE.Mesh[] = []

    for (let i = 0; i < nodeCount; i++) {
      const geo = new THREE.SphereGeometry(0.06 + Math.random() * 0.06, 8, 8)
      const mat = new THREE.MeshPhysicalMaterial({
        color: Math.random() > 0.5 ? 0xffd64a : 0x4499ff,
        metalness: 0.8, roughness: 0.1, emissive: Math.random() > 0.5 ? 0xffd64a : 0x4499ff, emissiveIntensity: 0.3,
      })
      const mesh = new THREE.Mesh(geo, mat)
      const pos = new THREE.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3)
      mesh.position.copy(pos)
      nodePositions.push(pos)
      nodeMeshes.push(mesh)
      scene.add(mesh); geos.push(geo); mats.push(mat)
    }

    // Lines between nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 3.5) {
          const lineGeo = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]])
          const lineMat = new THREE.LineBasicMaterial({ color: 0xffd64a, transparent: true, opacity: 0.15 })
          scene.add(new THREE.Line(lineGeo, lineMat)); geos.push(lineGeo); mats.push(lineMat)
        }
      }
    }

    // Central sphere
    const cGeo = new THREE.SphereGeometry(0.55, 16, 16)
    const cMat = new THREE.MeshPhysicalMaterial({ color: 0xffd64a, metalness: 0.5, roughness: 0.1, wireframe: true, transparent: true, opacity: 0.6 })
    const center = new THREE.Mesh(cGeo, cMat)
    scene.add(center); geos.push(cGeo); mats.push(cMat)

    // Orbit ring
    const rGeo = new THREE.TorusGeometry(1.4, 0.008, 8, 90)
    const rMat = new THREE.MeshBasicMaterial({ color: 0xffd64a, transparent: true, opacity: 0.4 })
    const ring = new THREE.Mesh(rGeo, rMat)
    ring.rotation.x = Math.PI / 2.5; scene.add(ring); geos.push(rGeo); mats.push(rMat)

    // Particles
    const pCount = 80
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) { pPos[i * 3] = (Math.random() - 0.5) * 12; pPos[i * 3 + 1] = (Math.random() - 0.5) * 8; pPos[i * 3 + 2] = (Math.random() - 0.5) * 6 }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.04, color: 0xffd64a, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending })
    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles); geos.push(pGeo); mats.push(pMat)

    if (!prefersReducedMotion) {
      tweens.push(gsap.to(center.rotation, { y: Math.PI * 2, duration: 16, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(center.position, { y: 0.2, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
      tweens.push(gsap.to(ring.rotation, { z: Math.PI * 2, duration: 11, repeat: -1, ease: 'none' }))
      nodeMeshes.forEach((m, idx) => { tweens.push(gsap.to(m.position, { y: m.position.y + 0.25, duration: 2.5 + idx * 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })) })
      tweens.push(gsap.to(particles.rotation, { y: Math.PI * 2, duration: 60, repeat: -1, ease: 'none' }))
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

export function ContactHeroSection({ content }: ContactHeroSectionProps) {
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
    <section className="relative isolate overflow-hidden border-b border-blue-900/30 min-h-[70vh] flex items-center">
      <div className="pointer-events-none absolute -left-40 -top-20 h-100 w-100 rounded-full bg-sky-500/14 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-85 w-85 rounded-full bg-amber-300/14 blur-[100px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="pointer-events-none absolute right-0 top-0 h-full w-[55%] opacity-75">
        <ContactHeroCanvas />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-[28%] bg-linear-to-l from-[#021331] via-[#021331]/50 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl space-y-7">
          <p ref={badgeRef} className="inline-flex items-center gap-2 rounded-full border border-amber-300/45 bg-amber-200/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            {content.eyebrow}
          </p>

          <h1 ref={titleRef} className="text-4xl font-extrabold leading-[1.08] tracking-tight text-blue-50 md:text-5xl xl:text-6xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            {content.title.split(' ').map((word, i) => {
              const accent = ['Diskusikan', 'Digital', 'Bisnis'].includes(word)
              return (
                <span key={i}>
                  <span className={accent ? 'bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent' : ''}>{word}</span>{' '}
                </span>
              )
            })}
          </h1>

          <p ref={descRef} className="max-w-lg text-base leading-relaxed text-blue-200/70 md:text-lg">{content.description}</p>

          {/* Contact method quick links */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="mailto:hello@morrusdigital.com" className="group inline-flex items-center gap-2 rounded-xl border border-blue-200/20 bg-blue-900/25 px-4 py-2 text-sm text-blue-300/70 backdrop-blur-sm transition-all duration-300 hover:border-amber-300/40 hover:text-amber-200">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              Email
            </a>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-xl border border-blue-200/20 bg-blue-900/25 px-4 py-2 text-sm text-blue-300/70 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400/40 hover:text-emerald-300">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-linear-to-t from-[#021331] to-transparent" />
    </section>
  )
}