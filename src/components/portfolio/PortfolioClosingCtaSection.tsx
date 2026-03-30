import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { Link } from 'react-router-dom'
import type { PortfolioClosingCtaContent } from '../../types/portfolio'

interface PortfolioClosingCtaSectionProps {
  content: PortfolioClosingCtaContent
}

function PortfolioCtaCanvas() {
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

    // Particle field
    const pCount = 70
    const pGeo = new THREE.BufferGeometry()
    const pPos = new Float32Array(pCount * 3)
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 10; pPos[i * 3 + 1] = (Math.random() - 0.5) * 6; pPos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
    const pMat = new THREE.PointsMaterial({ size: 0.045, color: 0xffd64a, transparent: true, opacity: 0.45, depthWrite: false, blending: THREE.AdditiveBlending })
    const pts = new THREE.Points(pGeo, pMat)
    scene.add(pts); geos.push(pGeo); mats.push(pMat)

    // Two rings
    const ringConfigs: Array<[number, number, number, number]> = [
      [2.2, 0xffd64a, Math.PI / 2.8, 0.22],
      [3.0, 0x4499ff, -Math.PI / 4, 0.14],
    ]
    ringConfigs.forEach(([radius, color, rotationX, opacity]) => {
      const g = new THREE.TorusGeometry(radius, 0.006, 8, 100)
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      const mesh = new THREE.Mesh(g, m)
      mesh.rotation.x = rotationX
      scene.add(mesh); geos.push(g); mats.push(m)
    })

    const tweens: gsap.core.Tween[] = []
    if (!prefersReducedMotion) {
      tweens.push(gsap.to(pts.rotation, { y: Math.PI * 2, duration: 50, repeat: -1, ease: 'none' }))
      scene.children.filter(c => c instanceof THREE.Mesh).forEach((mesh, i) => {
        tweens.push(gsap.to((mesh as THREE.Mesh).rotation, { z: Math.PI * 2 * (i % 2 === 0 ? 1 : -1), duration: 28 + i * 6, repeat: -1, ease: 'none' }))
      })
    }

    let frameId = 0
    const render = () => { frameId = requestAnimationFrame(render); renderer.render(scene, camera) }
    const handleResize = () => { camera.aspect = container.clientWidth / container.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(container.clientWidth, container.clientHeight) }
    handleResize(); render()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize); cancelAnimationFrame(frameId); tweens.forEach(t => t.kill())
      geos.forEach(g => g.dispose()); mats.forEach(m => m.dispose())
      renderer.dispose()
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

export function PortfolioClosingCtaSection({ content }: PortfolioClosingCtaSectionProps) {
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
        <div className="absolute inset-0 opacity-40"><PortfolioCtaCanvas /></div>
        <div className="absolute inset-0 bg-linear-to-br from-blue-950/40 via-transparent to-blue-950/55" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-300/50 to-transparent" />
        <div className="absolute top-0 right-0 h-36 w-36 bg-linear-to-bl from-amber-300/10 to-transparent rounded-bl-[100px] pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.022]" style={{ backgroundImage: 'linear-gradient(rgba(251,191,36,1) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 grid gap-8 px-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-12 md:py-16">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-300/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-pulse" />
              Next Project
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-blue-50 md:text-4xl" style={{ fontFamily: "'Sora', sans-serif" }}>
              <span className="bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                {content.title.split(' ').slice(0, 4).join(' ')}
              </span>
              <br />
              {content.title.split(' ').slice(4).join(' ')}
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-blue-200/65 md:text-base">{content.description}</p>

            {/* Horizontal trust pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['Konsultasi Gratis', 'Dari Konsep ke Produksi', 'Scalable Architecture'].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/18 bg-blue-900/28 px-3 py-1 text-xs text-blue-300/60">
                  <svg className="h-3 w-3 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <div className="shrink-0">
            <Link
              to={content.buttonHref}
              className="group relative block overflow-hidden rounded-2xl bg-amber-300 px-8 py-4 text-base font-bold text-blue-950 shadow-[0_0_40px_rgba(251,191,36,0.35)] transition-all duration-300 hover:bg-amber-200 hover:shadow-[0_0_60px_rgba(251,191,36,0.5)] hover:scale-[1.03] text-center whitespace-nowrap"
            >
              <span className="relative z-10">{content.buttonLabel}</span>
              <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}