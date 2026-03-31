import { useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'
import { useThreeScene } from '../hooks/useThreeScene'

export function HeroOrbCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useThreeScene(mountRef, {
    antialias: false,          // off – no visible diff on wireframe, huge perf win
    pixelRatioCap: 1.5,
    mouseparallax: true,

    setup(ctx) {
      const { scene, camera, reducedMotion } = ctx
      camera.position.z = 5.5

      // ── Lighting (cheap) ────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0x1a3a6e, 0.7))
      const key = new THREE.DirectionalLight(0xffd64a, 2.0)
      key.position.set(3, 4, 5); scene.add(key)
      const rim = new THREE.DirectionalLight(0x4499ff, 1.0)
      rim.position.set(-4, -2, 2); scene.add(rim)

      // ── Core orb: MeshBasicMaterial wireframe (no shader cost) ───────────────
      const orbGeo = new THREE.IcosahedronGeometry(1.1, 1)
      const orbMat = new THREE.MeshBasicMaterial({
        color: 0xffd64a, wireframe: true,
        transparent: true, opacity: 0.75,
      })
      const orb = new THREE.Mesh(orbGeo, orbMat)
      scene.add(orb)

      // ── Inner orb: MeshLambertMaterial (1 pass, not PBR) ────────────────────
      const innerGeo = new THREE.IcosahedronGeometry(0.85, 1) // detail 1, was 2
      const innerMat = new THREE.MeshLambertMaterial({
        color: 0x1a3a8f, transparent: true, opacity: 0.45,
      })
      const innerOrb = new THREE.Mesh(innerGeo, innerMat)
      scene.add(innerOrb)

      // ── Orbit rings: MeshBasicMaterial ──────────────────────────────────────
      const rings: THREE.Mesh[] = []
      const ringDefs = [
        { r: 1.7, tube: 0.008, color: 0xffd64a, op: 0.5, rx: Math.PI / 2, ry: 0 },
        { r: 2.0, tube: 0.005, color: 0x4499ff, op: 0.3, rx: Math.PI / 4, ry: Math.PI / 6 },
        { r: 2.3, tube: 0.004, color: 0xffd64a, op: 0.22, rx: -Math.PI / 3, ry: Math.PI / 4 },
      ]
      ringDefs.forEach((d) => {
        const geo = new THREE.TorusGeometry(d.r, d.tube, 6, 60) // reduced segments
        const mat = new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: d.op })
        const ring = new THREE.Mesh(geo, mat)
        ring.rotation.x = d.rx; ring.rotation.y = d.ry
        rings.push(ring); scene.add(ring)
      })

      // ── Particles: 90 instead of 180 ────────────────────────────────────────
      const pCount = 90
      const pGeo = new THREE.BufferGeometry()
      const pos = new Float32Array(pCount * 3)
      const col = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const r = 2.5 + Math.random() * 1.8
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pos[i * 3 + 2] = r * Math.cos(phi)
        const a = Math.random() > 0.4
        col[i * 3] = a ? 1.0 : 0.27; col[i * 3 + 1] = a ? 0.85 : 0.6; col[i * 3 + 2] = a ? 0.29 : 1.0
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      pGeo.setAttribute('color', new THREE.BufferAttribute(col, 3))
      const pMat = new THREE.PointsMaterial({
        size: 0.04, transparent: true, opacity: 0.65, vertexColors: true,
        sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending,
      })
      const particles = new THREE.Points(pGeo, pMat)
      scene.add(particles)

      // ── GSAP animations ──────────────────────────────────────────────────────
      const tweens: gsap.core.Tween[] = []
      if (!reducedMotion) {
        tweens.push(gsap.to(orb.rotation, { y: Math.PI * 2, duration: 22, repeat: -1, ease: 'none' }))
        tweens.push(gsap.to(orb.position, { y: 0.18, duration: 3.8, yoyo: true, repeat: -1, ease: 'sine.inOut' }))
        tweens.push(gsap.to(innerOrb.rotation, { y: -Math.PI * 2, x: Math.PI * 2, duration: 35, repeat: -1, ease: 'none' }))
        rings.forEach((ring, i) => {
          tweens.push(gsap.to(ring.rotation, { z: Math.PI * 2 * (i % 2 === 0 ? 1 : -1), duration: 18 + i * 6, repeat: -1, ease: 'none' }))
        })
        tweens.push(gsap.to(particles.rotation, { y: Math.PI * 2, duration: 60, repeat: -1, ease: 'none' }))
      }

      return () => tweens.forEach((t) => t.kill())
    },

    onFrame({ scene, mouse, reducedMotion }) {
      // Smooth mouse parallax on frame (not on event)
      if (!reducedMotion && (mouse.x !== 0 || mouse.y !== 0)) {
        scene.rotation.x += (mouse.y * 0.15 - scene.rotation.x) * 0.05
        scene.rotation.y += (mouse.x * 0.25 - scene.rotation.y) * 0.05
      }
    },
  })

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}