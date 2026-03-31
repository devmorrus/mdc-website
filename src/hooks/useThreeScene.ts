/**
 * useThreeScene – lightweight hook yang mengurus:
 *  1. Satu WebGLRenderer per canvas (bukan shared context – browsers limit to ~8 contexts)
 *  2. Render loop yang berhenti saat tab tidak aktif (Page Visibility API)
 *  3. Render loop yang berhenti saat canvas di luar viewport (IntersectionObserver)
 *  4. Throttled mousemove (rAF-gated, bukan per-event)
 *  5. Resize dengan debounce 150ms
 *  6. Otomatis cleanup semua resource
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export interface ThreeSceneConfig {
  /** Dipanggil sekali setelah renderer siap. Return fungsi cleanup opsional. */
  setup: (ctx: ThreeSceneContext) => (() => void) | void
  /** Dipanggil tiap frame. Delta dalam detik. */
  onFrame?: (ctx: ThreeSceneContext, delta: number) => void
  /** Apakah aktifkan mouse parallax helper */
  mouseparallax?: boolean
  /** Pixel ratio cap, default 1.5 */
  pixelRatioCap?: number
  /** Aktifkan antialias, default false (pakai FXAA manual jika perlu) */
  antialias?: boolean
}

export interface ThreeSceneContext {
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  container: HTMLDivElement
  /** Normalized mouse [-1, 1] – hanya tersedia jika mouseparallax: true */
  mouse: { x: number; y: number }
  /** Apakah user prefer reduced motion */
  reducedMotion: boolean
}

export function useThreeScene(
  mountRef: React.RefObject<HTMLDivElement | null>,
  config: ThreeSceneConfig,
) {
  const configRef = useRef(config)
  configRef.current = config

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pixelRatioCap = configRef.current.pixelRatioCap ?? 1.5

    // ── Renderer ───────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: configRef.current.antialias ?? false, // off by default – big win
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, pixelRatioCap))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100,
    )

    const mouse = { x: 0, y: 0 }

    const ctx: ThreeSceneContext = { renderer, scene, camera, container, mouse, reducedMotion }

    // ── User setup ────────────────────────────────────────────────────────────
    const userCleanup = configRef.current.setup(ctx)

    // ── Render loop ───────────────────────────────────────────────────────────
    let frameId = 0
    let isVisible = true       // IntersectionObserver
    let isTabActive = true      // Page Visibility API
    let lastTime = performance.now()

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick)
      if (!isVisible || !isTabActive) return

      const delta = Math.min((now - lastTime) / 1000, 0.1) // cap at 100ms
      lastTime = now

      configRef.current.onFrame?.(ctx, delta)
      renderer.render(scene, camera)
    }
    frameId = requestAnimationFrame(tick)

    // ── Page Visibility ───────────────────────────────────────────────────────
    const onVisibilityChange = () => {
      isTabActive = document.visibilityState === 'visible'
      if (isTabActive) lastTime = performance.now()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    // ── IntersectionObserver ─────────────────────────────────────────────────
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) lastTime = performance.now()
      },
      { threshold: 0.05 },
    )
    io.observe(container)

    // ── Mouse parallax (throttled via rAF flag) ────────────────────────────────
    let mousePending = false
    const onMouseMove = (e: MouseEvent) => {
      if (!configRef.current.mouseparallax || reducedMotion) return
      if (mousePending) return
      mousePending = true
      requestAnimationFrame(() => {
        mousePending = false
        const rect = container.getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      })
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // ── Resize (debounced 150ms) ───────────────────────────────────────────────
    let resizeTimer = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        const w = container.clientWidth
        const h = container.clientHeight || 1
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
      }, 150)
    }
    window.addEventListener('resize', onResize, { passive: true })

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(resizeTimer)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      io.disconnect()

      userCleanup?.()

      // Dispose all scene objects
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material?.dispose()
          }
        }
      })

      renderer.dispose()
      renderer.forceContextLoss()
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}