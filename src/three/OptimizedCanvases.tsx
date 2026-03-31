/**
 * Optimized mini-canvases untuk section yang ada di bawah fold.
 * Semua menggunakan:
 *   - useThreeScene (visibility-aware render loop)
 *   - LazyCanvas (tidak diinisialisasi sampai masuk viewport)
 *   - MeshBasicMaterial / MeshLambertMaterial (bukan Physical/Standard)
 *   - Partikel dikurangi 50-60%
 *   - Segment torus/ring dikurangi
 *
 * Export:
 *   VisionCanvasOpt
 *   LegalityCanvasOpt
 *   ServicesHeroCanvasOpt
 *   PortfolioHeroCanvasOpt
 *   ContactHeroCanvasOpt
 */

import { useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { useThreeScene } from '../hooks/useThreeScene'

// ─── Shared helpers ──────────────────────────────────────────────────────────

function makeParticles(count: number, spread: [number, number, number], amberRatio = 0.5) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * spread[0]
    pos[i * 3 + 1] = (Math.random() - 0.5) * spread[1]
    pos[i * 3 + 2] = (Math.random() - 0.5) * spread[2]
    const a = Math.random() < amberRatio
    col[i * 3] = a ? 1.0 : 0.27; col[i * 3 + 1] = a ? 0.84 : 0.6; col[i * 3 + 2] = a ? 0.29 : 1.0
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
  const mat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending })
  return new THREE.Points(geo, mat)
}

function makeTorus(r: number, tube: number, color: number, opacity: number, rx = 0, ry = 0) {
  const geo = new THREE.TorusGeometry(r, tube, 6, 60) // 6 radial, 60 tubular – reduced
  const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.rotation.x = rx; mesh.rotation.y = ry
  return mesh
}

// ─── VisionCanvas ────────────────────────────────────────────────────────────
export function VisionCanvasOpt() {
  const mountRef = useRef<HTMLDivElement>(null)

  useThreeScene(mountRef, {
    antialias: false, pixelRatioCap: 1.5,
    setup({ scene, camera, reducedMotion }) {
      camera.position.z = 4
      const pts = makeParticles(60, [8, 6, 3], 1.0)
      scene.add(pts)
      const ring = makeTorus(2.2, 0.006, 0xffd64a, 0.22, Math.PI / 2.5)
      scene.add(ring)
      const tweens: gsap.core.Tween[] = []
      if (!reducedMotion) {
        tweens.push(gsap.to(pts.rotation, { y: Math.PI * 2, duration: 40, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(ring.rotation, { z: Math.PI * 2, duration: 25, repeat: -1, ease: 'none' }))
      }
      return () => tweens.forEach(t => t.kill())
    },
  })

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

// ─── LegalityCanvas ──────────────────────────────────────────────────────────
export function LegalityCanvasOpt() {
  const mountRef = useRef<HTMLDivElement>(null)

  useThreeScene(mountRef, {
    antialias: false, pixelRatioCap: 1.5,
    setup({ scene, camera, reducedMotion }) {
      camera.position.z = 5
      const pts = makeParticles(50, [10, 6, 4], 1.0)
      scene.add(pts)
      const ring = makeTorus(1.5, 0.005, 0xffd64a, 0.2, Math.PI / 3)
      scene.add(ring)
      const tweens: gsap.core.Tween[] = []
      if (!reducedMotion) {
        tweens.push(gsap.to(pts.rotation, { y: Math.PI * 2, duration: 50, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(ring.rotation, { z: Math.PI * 2, duration: 30, repeat: -1, ease: 'none' }))
      }
      return () => tweens.forEach(t => t.kill())
    },
  })

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

// ─── ServicesHeroCanvas ──────────────────────────────────────────────────────
export function ServicesHeroCanvasOpt() {
  const mountRef = useRef<HTMLDivElement>(null)

  useThreeScene(mountRef, {
    antialias: false, pixelRatioCap: 1.5, mouseparallax: true,
    setup({ scene, camera, reducedMotion }) {
      camera.position.set(0, 2.5, 7); camera.lookAt(0, 0, 0)
      scene.add(new THREE.AmbientLight(0x1a3a6e, 0.6))
      const key = new THREE.DirectionalLight(0xffd64a, 2.0); key.position.set(4, 6, 4); scene.add(key)

      // Grid
      const grid = new THREE.GridHelper(14, 14, 0xffd64a, 0x1a3a8f)
      grid.position.y = -1.5
      const gridMats = Array.isArray(grid.material) ? grid.material : [grid.material]
      gridMats.forEach((m: THREE.Material) => { (m as THREE.LineBasicMaterial).transparent = true; (m as THREE.LineBasicMaterial).opacity = 0.15 })
      scene.add(grid)

      const group = new THREE.Group(); scene.add(group)

      // 3 icosahedra instead of 4, BasicMaterial
      const icoDefs = [
        { size: 1.0, pos: [0, 0.2, 0] as [number,number,number], color: 0xffd64a, op: 0.65 },
        { size: 0.5, pos: [2.0, 0.8, -1] as [number,number,number], color: 0x4499ff, op: 0.45 },
        { size: 0.38, pos: [-1.8, 0.5, -0.5] as [number,number,number], color: 0xffd64a, op: 0.4 },
      ]
      const meshes: THREE.Mesh[] = []
      icoDefs.forEach((d) => {
        const geo = new THREE.IcosahedronGeometry(d.size, 1)
        const mat = new THREE.MeshBasicMaterial({ color: d.color, wireframe: true, transparent: true, opacity: d.op })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(...d.pos); meshes.push(mesh); group.add(mesh)
      })

      const ring = makeTorus(1.6, 0.008, 0xffd64a, 0.38, Math.PI / 2.5)
      group.add(ring)

      const pts = makeParticles(70, [12, 7, 6], 0.5)
      scene.add(pts)

      const tweens: gsap.core.Tween[] = []
      if (!reducedMotion) {
        tweens.push(gsap.to(group.rotation, { y: Math.PI * 2, duration: 22, repeat: -1, ease: 'none' }))
        meshes.forEach((m, i) => tweens.push(gsap.to(m.rotation, { x: Math.PI * 2, y: Math.PI, duration: 15 + i * 3, repeat: -1, ease: 'none' })))
        tweens.push(gsap.to(ring.rotation, { z: Math.PI * 2, duration: 10, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(group.position, { y: 0.25, duration: 4.2, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
        tweens.push(gsap.to(pts.rotation, { y: Math.PI * 2, duration: 55, repeat: -1, ease: 'none' }))
      }
      return () => tweens.forEach(t => t.kill())
    },
    onFrame({ scene, mouse, reducedMotion }) {
      if (!reducedMotion && (mouse.x !== 0 || mouse.y !== 0)) {
        scene.rotation.x += (mouse.y * 0.08 - scene.rotation.x) * 0.04
        scene.rotation.y += (mouse.x * 0.15 - scene.rotation.y) * 0.04
      }
    },
  })

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

// ─── PortfolioHeroCanvas ─────────────────────────────────────────────────────
export function PortfolioHeroCanvasOpt() {
  const mountRef = useRef<HTMLDivElement>(null)

  useThreeScene(mountRef, {
    antialias: false, pixelRatioCap: 1.5, mouseparallax: true,
    setup({ scene, camera, reducedMotion }) {
      camera.position.z = 7
      scene.add(new THREE.AmbientLight(0x1a3a6e, 0.6))
      const key = new THREE.DirectionalLight(0xffd64a, 2.0); key.position.set(5, 5, 5); scene.add(key)

      // 4 boxes BasicMaterial wireframe
      const boxDefs = [
        { size: [0.55, 0.55, 0.55] as [number,number,number], pos: [-2.8, 1.2, 0] as [number,number,number], color: 0xffd64a, op: 0.55 },
        { size: [0.38, 0.38, 0.38] as [number,number,number], pos: [3.0, -0.8, -1] as [number,number,number], color: 0x4499ff, op: 0.45 },
        { size: [0.45, 0.45, 0.45] as [number,number,number], pos: [1.4, 1.7, -0.5] as [number,number,number], color: 0xffd64a, op: 0.38 },
        { size: [0.28, 0.28, 0.28] as [number,number,number], pos: [-2.2, -1.4, 0.5] as [number,number,number], color: 0xffd64a, op: 0.4 },
      ]
      const meshes: THREE.Mesh[] = []
      boxDefs.forEach((d) => {
        const geo = new THREE.BoxGeometry(...d.size)
        const mat = new THREE.MeshBasicMaterial({ color: d.color, wireframe: true, transparent: true, opacity: d.op })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(...d.pos)
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
        meshes.push(mesh); scene.add(mesh)
      })

      const cGeo = new THREE.OctahedronGeometry(0.9, 0)
      const cMat = new THREE.MeshBasicMaterial({ color: 0xffd64a, wireframe: true, transparent: true, opacity: 0.6 })
      const center = new THREE.Mesh(cGeo, cMat); scene.add(center)

      const pts = makeParticles(70, [12, 8, 6], 0.4)
      scene.add(pts)

      const tweens: gsap.core.Tween[] = []
      if (!reducedMotion) {
        tweens.push(gsap.to(center.rotation, { y: Math.PI * 2, x: Math.PI, duration: 18, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(center.position, { y: 0.2, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
        meshes.forEach((m, i) => {
          tweens.push(gsap.to(m.rotation, { x: Math.PI * 2, y: Math.PI, duration: 10 + i * 2.5, repeat: -1, ease: 'none' }))
          tweens.push(gsap.to(m.position, { y: m.position.y + 0.28, duration: 3 + i * 0.6, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
        })
        tweens.push(gsap.to(pts.rotation, { y: Math.PI * 2, duration: 55, repeat: -1, ease: 'none' }))
      }
      return () => tweens.forEach(t => t.kill())
    },
    onFrame({ scene, mouse, reducedMotion }) {
      if (!reducedMotion && (mouse.x !== 0 || mouse.y !== 0)) {
        scene.rotation.x += (mouse.y * 0.10 - scene.rotation.x) * 0.04
        scene.rotation.y += (mouse.x * 0.18 - scene.rotation.y) * 0.04
      }
    },
  })

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

// ─── ContactHeroCanvas ───────────────────────────────────────────────────────
export function ContactHeroCanvasOpt() {
  const mountRef = useRef<HTMLDivElement>(null)

  useThreeScene(mountRef, {
    antialias: false, pixelRatioCap: 1.5, mouseparallax: true,
    setup({ scene, camera, reducedMotion }) {
      camera.position.set(0, 1.5, 7); camera.lookAt(0, 0, 0)
      scene.add(new THREE.AmbientLight(0x1a3a6e, 0.6))
      const key = new THREE.DirectionalLight(0xffd64a, 2.0); key.position.set(4, 5, 4); scene.add(key)

      // Network nodes – 8 instead of 12
      const nodeCount = 8
      const nodePositions: THREE.Vector3[] = []
      const nodeMeshes: THREE.Mesh[] = []
      for (let i = 0; i < nodeCount; i++) {
        const geo = new THREE.SphereGeometry(0.07 + Math.random() * 0.05, 6, 6)
        const mat = new THREE.MeshLambertMaterial({ color: Math.random() > 0.5 ? 0xffd64a : 0x4499ff })
        const mesh = new THREE.Mesh(geo, mat)
        const p = new THREE.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 3)
        mesh.position.copy(p); nodePositions.push(p); nodeMeshes.push(mesh); scene.add(mesh)
      }
      // Lines
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (nodePositions[i].distanceTo(nodePositions[j]) < 3.5) {
            const lg = new THREE.BufferGeometry().setFromPoints([nodePositions[i], nodePositions[j]])
            const lm = new THREE.LineBasicMaterial({ color: 0xffd64a, transparent: true, opacity: 0.12 })
            scene.add(new THREE.Line(lg, lm))
          }
        }
      }

      const center = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffd64a, wireframe: true, transparent: true, opacity: 0.55 }))
      scene.add(center)
      const ring = makeTorus(1.4, 0.008, 0xffd64a, 0.38, Math.PI / 2.5)
      scene.add(ring)
      const pts = makeParticles(65, [12, 8, 6], 1.0)
      scene.add(pts)

      const tweens: gsap.core.Tween[] = []
      if (!reducedMotion) {
        tweens.push(gsap.to(center.rotation, { y: Math.PI * 2, duration: 16, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(center.position, { y: 0.2, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
        tweens.push(gsap.to(ring.rotation, { z: Math.PI * 2, duration: 11, repeat: -1, ease: 'none' }))
        nodeMeshes.forEach((m, i) => tweens.push(gsap.to(m.position, { y: m.position.y + 0.22, duration: 2.5 + i * 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut' })))
        tweens.push(gsap.to(pts.rotation, { y: Math.PI * 2, duration: 60, repeat: -1, ease: 'none' }))
      }
      return () => tweens.forEach(t => t.kill())
    },
    onFrame({ scene, mouse, reducedMotion }) {
      if (!reducedMotion && (mouse.x !== 0 || mouse.y !== 0)) {
        scene.rotation.x += (mouse.y * 0.10 - scene.rotation.x) * 0.04
        scene.rotation.y += (mouse.x * 0.18 - scene.rotation.y) * 0.04
      }
    },
  })

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}

// ─── Generic CTA canvas (Services, Portfolio, Legality closing sections) ─────
export function CtaCanvasOpt() {
  const mountRef = useRef<HTMLDivElement>(null)

  useThreeScene(mountRef, {
    antialias: false, pixelRatioCap: 1.5,
    setup({ scene, camera, reducedMotion }) {
      camera.position.z = 5
      const pts = makeParticles(55, [10, 6, 4], 1.0)
      scene.add(pts)
      const r1 = makeTorus(2.0, 0.007, 0xffd64a, 0.2, Math.PI / 3)
      const r2 = makeTorus(2.8, 0.005, 0x4499ff, 0.13, -Math.PI / 4, Math.PI / 5)
      scene.add(r1, r2)
      const tweens: gsap.core.Tween[] = []
      if (!reducedMotion) {
        tweens.push(gsap.to(pts.rotation, { y: Math.PI * 2, duration: 45, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(r1.rotation, { z: Math.PI * 2, duration: 28, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(r2.rotation, { z: -Math.PI * 2, duration: 35, repeat: -1, ease: 'none' }))
      }
      return () => tweens.forEach(t => t.kill())
    },
  })

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}