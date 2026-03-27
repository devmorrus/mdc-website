import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import * as THREE from 'three'

export function HeroOrbCanvas() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 4

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
    directionalLight.position.set(3, 3, 4)
    scene.add(directionalLight)

    const ambientLight = new THREE.AmbientLight(0x2d8cff, 0.45)
    scene.add(ambientLight)

    const geometry = new THREE.IcosahedronGeometry(1.2, 1)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffd64a,
      metalness: 0.2,
      roughness: 0.15,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const spinTween = gsap.to(mesh.rotation, {
      y: Math.PI * 2,
      duration: 18,
      repeat: -1,
      ease: 'none',
    })

    const floatTween = gsap.to(mesh.position, {
      y: 0.2,
      duration: 2.6,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    })

    let frameId = 0

    const render = () => {
      frameId = requestAnimationFrame(render)
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      const { clientWidth, clientHeight } = container
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight)
    }

    handleResize()
    render()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(frameId)
      spinTween.kill()
      floatTween.kill()
      geometry.dispose()
      material.dispose()
      renderer.dispose()

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}
