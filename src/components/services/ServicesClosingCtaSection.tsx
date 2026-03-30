import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { Link } from 'react-router-dom'
import type { ServicesClosingCtaContent } from '../../types/services'

interface ServicesClosingCtaSectionProps {
  content: ServicesClosingCtaContent
}

function CtaCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 0.1, 100)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const geos: THREE.BufferGeometry[] = []
    const mats: THREE.Material[] = []

    const count = 80
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ size: 0.05, color: 0xffd64a, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending })
    const pts = new THREE.Points(geo, mat)
    scene.add(pts); geos.push(geo); mats.push(mat)

    const rGeo = new THREE.TorusGeometry(2.0, 0.007, 8, 100)
    const rMat = new THREE.MeshBasicMaterial({ color: 0xffd64a, transparent: true, opacity: 0.22 })
    const ring = new THREE.Mesh(rGeo, rMat)
    ring.rotation.x = Math.PI / 3
    scene.add(ring); geos.push(rGeo); mats.push(rMat)

    const r2Geo = new THREE.TorusGeometry(2.8, 0.005, 8, 100)
    const r2Mat = new THREE.MeshBasicMaterial({ color: 0x4499ff, transparent: true, opacity: 0.15 })
    const ring2 = new THREE.Mesh(r2Geo, r2Mat)
    ring2.rotation.x = -Math.PI / 4; ring2.rotation.y = Math.PI / 5
    scene.add(ring2); geos.push(r2Geo); mats.push(r2Mat)

    const tweens: gsap.core.Tween[] = []
    if (!prefersReducedMotion) {
      tweens.push(gsap.to(pts.rotation, { y: Math.PI * 2, duration: 45, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(ring.rotation, { z: Math.PI * 2, duration: 28, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(ring2.rotation, { z: -Math.PI * 2, duration: 35, repeat: -1, ease: 'none' }))
    }

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
      cancelAnimationFrame(frameId); tweens.forEach(t => t.kill())
      geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose())
      renderer.dispose()
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

export function ServicesClosingCtaSection({ content }: ServicesClosingCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.fromTo(innerRef.current, { y: 30, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
          observer.disconnect()
        })
      },
      { threshold: 0.1 },
    )
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-4 md:pb-32">
      <div ref={innerRef} className="relative overflow-hidden rounded-3xl border border-amber-300/20 bg-linear-to-br from-blue-900/60 via-blue-950/75 to-[#021331] shadow-[0_40px_100px_-30px_rgba(251,191,36,0.18)]">
        <div className="absolute inset-0 opacity-45"><CtaCanvas /></div>
        <div className="absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-blue-950/50" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-300/50 to-transparent" />
        <div className="absolute top-0 right-0 h-36 w-36 bg-linear-to-bl from-amber-300/10 to-transparent rounded-bl-[100px] pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 flex flex-col items-center px-8 py-16 text-center md:py-20">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-300/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
            Siap Mulai?
          </span>

          <h2 className="mb-5 max-w-2xl text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl" style={{ fontFamily: "'Sora', sans-serif" }}>
            <span className="bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
              {content.title.split(' ').slice(0, 3).join(' ')}
            </span>{' '}
            {content.title.split(' ').slice(3).join(' ')}
          </h2>

          <p className="mb-10 max-w-lg text-sm leading-relaxed text-blue-200/65 md:text-base">{content.description}</p>

          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {['Konsultasi Gratis', 'Respon Cepat', 'Estimasi Transparan', 'Tanpa Komitmen Awal'].map((b) => (
              <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/20 bg-blue-900/30 px-3 py-1 text-xs text-blue-300/65">
                <svg className="h-3 w-3 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                {b}
              </span>
            ))}
          </div>

          <Link
            to={content.buttonHref}
            className="group relative overflow-hidden rounded-2xl bg-amber-300 px-10 py-4 text-base font-bold text-blue-950 shadow-[0_0_40px_rgba(251,191,36,0.35)] transition-all duration-300 hover:bg-amber-200 hover:shadow-[0_0_60px_rgba(251,191,36,0.55)] hover:scale-[1.02]"
          >
            <span className="relative z-10">{content.buttonLabel}</span>
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
          </Link>
        </div>
      </div>
    </section>
  )
}