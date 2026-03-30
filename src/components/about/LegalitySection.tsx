import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import type { LegalDocumentItem } from '../../types/about'

interface LegalitySectionProps {
  items: LegalDocumentItem[]
}

function LegalityMiniCanvas() {
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

    // Floating amber dots
    const count = 60
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xffd64a,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const pts = new THREE.Points(geo, mat)
    scene.add(pts)

    // Subtle torus
    const torusGeo = new THREE.TorusGeometry(1.5, 0.005, 8, 100)
    const torusMat = new THREE.MeshBasicMaterial({ color: 0xffd64a, transparent: true, opacity: 0.2 })
    const torus = new THREE.Mesh(torusGeo, torusMat)
    torus.rotation.x = Math.PI / 3
    scene.add(torus)

    const tweens: gsap.core.Tween[] = []
    if (!prefersReducedMotion) {
      tweens.push(gsap.to(pts.rotation, { y: Math.PI * 2, duration: 50, repeat: -1, ease: 'none' }))
      tweens.push(gsap.to(torus.rotation, { z: Math.PI * 2, duration: 30, repeat: -1, ease: 'none' }))
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
      cancelAnimationFrame(frameId)
      tweens.forEach((t) => t.kill())
      geo.dispose(); mat.dispose(); torusGeo.dispose(); torusMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

const DOC_ICONS: Record<string, React.ReactNode> = {
  'Akta Pendirian': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  'NIB': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  'NPWP': (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  ),
}

export function LegalitySection({ items }: LegalitySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !sectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          gsap.fromTo(wrapperRef.current, { y: 30, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' })
          gsap.fromTo(
            cardsRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12, delay: 0.3 },
          )
          observer.disconnect()
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="legality" className="relative mx-auto w-full max-w-6xl px-6 pb-24 pt-4 md:pb-32">
      <div
        ref={wrapperRef}
        className="relative overflow-hidden rounded-3xl border border-blue-200/15 bg-linear-to-br from-blue-900/35 via-blue-950/60 to-[#021331] shadow-[0_30px_80px_-20px_rgba(2,19,49,0.8)]"
      >
        {/* Three.js canvas background */}
        <div className="absolute inset-0 opacity-40">
          <LegalityMiniCanvas />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-950/50 via-transparent to-blue-950/60" />

        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-300/40 to-transparent" />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 h-10 w-10 border-l-2 border-t-2 border-amber-300/35 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-10 w-10 border-r-2 border-b-2 border-blue-400/25 rounded-br-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12">
          {/* Header */}
          <div className="mb-10 grid md:grid-cols-2 gap-6 items-end">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-amber-300/60" />
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-amber-300">Legalitas & Trust</p>
              </div>
              <h2
                className="text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Dokumen Legal{' '}
                <span className="bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                  Perusahaan
                </span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-blue-200/65 max-w-sm md:ml-auto">
              Untuk menjaga transparansi dan kepercayaan kerja sama, kami melengkapi legalitas perusahaan sesuai ketentuan yang berlaku di Indonesia.
            </p>
          </div>

          {/* Document cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {items.map((item, i) => (
              <article
                key={item.type}
                ref={(el) => { if (el) cardsRef.current[i] = el }}
                className="group relative overflow-hidden rounded-2xl border border-blue-200/15 bg-blue-900/30 p-6 backdrop-blur-sm transition-all duration-400 hover:border-amber-300/30 hover:bg-blue-900/45 hover:shadow-[0_12px_40px_rgba(251,191,36,0.1)]"
              >
                {/* Check mark top-right */}
                <div className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                  <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>

                {/* Icon */}
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-amber-300/30 bg-amber-300/10 text-amber-300 transition-all duration-300 group-hover:border-amber-300/50 group-hover:bg-amber-300/15">
                  {DOC_ICONS[item.type] ?? null}
                </div>

                {/* Doc type */}
                <h3
                  className="text-base font-bold text-amber-200 mb-2"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {item.type}
                </h3>

                {/* Summary */}
                <p className="text-sm leading-relaxed text-blue-200/65">{item.summary}</p>

                {/* Status badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">Terverifikasi</span>
                </div>

                {/* Bottom hover line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-linear-to-r from-amber-300/60 to-transparent transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-blue-200/10 bg-blue-950/40 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/25 bg-amber-300/8">
                <svg className="h-4 w-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <p className="text-sm text-blue-200/70">
                Butuh dokumen verifikasi lebih lanjut? Kami siap menyediakan salinannya.
              </p>
            </div>
            <a
              href="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200 transition-all duration-300 hover:border-amber-300/70 hover:bg-amber-300/20"
            >
              Hubungi Kami
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}