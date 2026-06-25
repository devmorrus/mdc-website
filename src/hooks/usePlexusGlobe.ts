import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const POINT_COUNT = 90
const GLOBE_RADIUS = 3.2
const MAX_CONNECT_DISTANCE = 1.95

function createCircleTexture(color1: string, color2: string) {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    grad.addColorStop(0.2, color1)
    grad.addColorStop(0.6, color2)
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
  }
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

function createTextTexture(text: string) {
  const size = 32
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'
    ctx.fillRect(0, 0, size, size)
    ctx.font = 'bold 24px monospace'
    ctx.fillStyle = 'rgba(56, 189, 248, 0.9)' // bright cyan
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, size / 2, size / 2)
  }
  const texture = new THREE.CanvasTexture(canvas)
  return texture
}

export function usePlexusGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // --- Scene Setup ---
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.z = 10

    // Main group to contain everything
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // --- 1. Nodes (Plexus Points) ---
    const basePoints: THREE.Vector3[] = []
    const driftDirections: THREE.Vector3[] = []
    const phases: number[] = []
    const colors: THREE.Color[] = []

    const colorPalettes = [
      new THREE.Color('#38bdf8'), // cyan
      new THREE.Color('#60a5fa'), // blue
      new THREE.Color('#818cf8'), // indigo
    ]

    for (let i = 0; i < POINT_COUNT; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      
      const x = GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta)
      const y = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
      const z = GLOBE_RADIUS * Math.cos(phi)

      basePoints.push(new THREE.Vector3(x, y, z))
      
      const randomVec = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize()
      driftDirections.push(randomVec)
      
      phases.push(Math.random() * Math.PI * 2)
      colors.push(colorPalettes[Math.floor(Math.random() * colorPalettes.length)])
    }

    const currentPoints = basePoints.map(p => p.clone())

    const nodeGeo = new THREE.BufferGeometry()
    const nodePosArr = new Float32Array(POINT_COUNT * 3)
    const nodeColorArr = new Float32Array(POINT_COUNT * 3)

    for (let i = 0; i < POINT_COUNT; i++) {
      const p = currentPoints[i]
      nodePosArr[i * 3] = p.x
      nodePosArr[i * 3 + 1] = p.y
      nodePosArr[i * 3 + 2] = p.z

      const color = colors[i]
      nodeColorArr[i * 3] = color.r
      nodeColorArr[i * 3 + 1] = color.g
      nodeColorArr[i * 3 + 2] = color.b
    }

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePosArr, 3))
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColorArr, 3))

    const nodeTexture = createCircleTexture('rgba(56, 189, 248, 0.85)', 'rgba(96, 165, 250, 0.15)')
    const nodeMat = new THREE.PointsMaterial({
      size: 0.38, // Slightly larger particles for better visibility
      map: nodeTexture,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    const nodePointsObj = new THREE.Points(nodeGeo, nodeMat)
    mainGroup.add(nodePointsObj)

    // --- 2. Connections (Plexus Lines) ---
    const maxLineSegments = 1000
    const lineGeo = new THREE.BufferGeometry()
    const linePosArr = new Float32Array(maxLineSegments * 2 * 3)
    const lineColorArr = new Float32Array(maxLineSegments * 2 * 3)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePosArr, 3))
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColorArr, 3))
    lineGeo.setDrawRange(0, 0)

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.58, // Brighter plexus lines
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const linesObj = new THREE.LineSegments(lineGeo, lineMat)
    mainGroup.add(linesObj)

    // --- 3. Internal Glowing Double Core ---
    const coreGroup = new THREE.Group()
    mainGroup.add(coreGroup)

    const coreGeo = new THREE.IcosahedronGeometry(1.5, 2)
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9, // bright cyan
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    coreGroup.add(coreMesh)

    const innerCoreGeo = new THREE.SphereGeometry(0.8, 16, 16)
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // cyan core glow
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat)
    coreGroup.add(innerCoreMesh)

    // --- 4. Tech HUD Rings & Satellites ---
    // Dashed Ring 1 (HUD element)
    const ring1Geo = new THREE.BufferGeometry()
    const ring1Points: THREE.Vector3[] = []
    const ring1Segments = 64
    const ring1Radius = GLOBE_RADIUS * 1.3
    for (let i = 0; i <= ring1Segments; i++) {
      const theta = (i / ring1Segments) * Math.PI * 2
      ring1Points.push(new THREE.Vector3(Math.cos(theta) * ring1Radius, 0, Math.sin(theta) * ring1Radius))
    }
    ring1Geo.setFromPoints(ring1Points)
    const ring1Mat = new THREE.LineDashedMaterial({
      color: 0x38bdf8,
      dashSize: 0.28,
      gapSize: 0.14,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const dashedRing = new THREE.Line(ring1Geo, ring1Mat)
    dashedRing.computeLineDistances()
    dashedRing.rotation.x = Math.PI / 3.5
    dashedRing.rotation.y = Math.PI / 10
    mainGroup.add(dashedRing)

    // Solid Ring 2 (HUD element)
    const ring2Geo = new THREE.BufferGeometry()
    const ring2Points: THREE.Vector3[] = []
    const ring2Radius = GLOBE_RADIUS * 1.48
    for (let i = 0; i <= ring1Segments; i++) {
      const theta = (i / ring1Segments) * Math.PI * 2
      ring2Points.push(new THREE.Vector3(Math.cos(theta) * ring2Radius, 0, Math.sin(theta) * ring2Radius))
    }
    ring2Geo.setFromPoints(ring2Points)
    const ring2Mat = new THREE.LineBasicMaterial({
      color: 0xfacc15, // gold ring
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const solidRing = new THREE.Line(ring2Geo, ring2Mat)
    solidRing.rotation.x = -Math.PI / 4
    solidRing.rotation.y = -Math.PI / 12
    mainGroup.add(solidRing)

    // Gold Satellites orbiting on Ring 2
    const satCount = 4
    const satGeo = new THREE.BufferGeometry()
    const satPosArr = new Float32Array(satCount * 3)
    satGeo.setAttribute('position', new THREE.BufferAttribute(satPosArr, 3))
    const satGoldTexture = createCircleTexture('rgba(250, 204, 21, 0.95)', 'rgba(245, 158, 11, 0.25)')
    const satMat = new THREE.PointsMaterial({
      size: 0.36,
      map: satGoldTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })
    const satellitesObj = new THREE.Points(satGeo, satMat)
    satellitesObj.rotation.copy(solidRing.rotation)
    mainGroup.add(satellitesObj)

    // Ring 3: Tilted floating particle shell ring
    const ringCount = 45
    const ringGeo = new THREE.BufferGeometry()
    const ringPosArr = new Float32Array(ringCount * 3)
    const ringRadius = GLOBE_RADIUS * 1.6

    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2
      ringPosArr[i * 3] = Math.cos(angle) * ringRadius
      ringPosArr[i * 3 + 1] = (Math.random() - 0.5) * 0.15
      ringPosArr[i * 3 + 2] = Math.sin(angle) * ringRadius
    }

    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPosArr, 3))
    const goldTexture = createCircleTexture('rgba(250, 204, 21, 0.95)', 'rgba(245, 158, 11, 0.20)')
    const ringMat = new THREE.PointsMaterial({
      size: 0.22,
      map: goldTexture,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    const ringPointsObj = new THREE.Points(ringGeo, ringMat)
    ringPointsObj.rotation.x = Math.PI / 3
    ringPointsObj.rotation.y = Math.PI / 8
    mainGroup.add(ringPointsObj)

    // --- 5. Floating Binary Digits (0 and 1) ---
    const binaryGroup = new THREE.Group()
    mainGroup.add(binaryGroup)

    const texture0 = createTextTexture('0')
    const texture1 = createTextTexture('1')
    
    const binarySprites: {
      sprite: THREE.Sprite
      speed: number
      phase: number
      rangeY: { min: number; max: number }
    }[] = []

    const binaryCount = 14
    for (let i = 0; i < binaryCount; i++) {
      const texture = Math.random() > 0.5 ? texture0 : texture1
      const mat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      })
      const sprite = new THREE.Sprite(mat)
      
      const angle = Math.random() * Math.PI * 2
      const radius = GLOBE_RADIUS * (1.15 + Math.random() * 0.55)
      sprite.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 6,
        Math.sin(angle) * radius
      )
      
      const scale = 0.32 + Math.random() * 0.18
      sprite.scale.set(scale, scale, 1)
      
      binaryGroup.add(sprite)
      
      binarySprites.push({
        sprite,
        speed: 0.12 + Math.random() * 0.22,
        phase: Math.random() * Math.PI * 2,
        rangeY: { min: -3.5, max: 3.5 }
      })
    }

    // --- 6. Interactive Mouse Tracker ---
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    function handleMouseMove(e: MouseEvent) {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    // --- Resize Observer ---
    function handleResize() {
      if (!canvas) return
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas.parentElement ?? canvas)
    handleResize()

    // --- Animation Loop ---
    const clock = new THREE.Clock()
    let animFrameId: number

    function animate() {
      animFrameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const delta = Math.min(clock.getDelta(), 0.1)

      // Node positions update (drift)
      for (let i = 0; i < POINT_COUNT; i++) {
        const base = basePoints[i]
        const dir = driftDirections[i]
        const phase = phases[i]
        const driftAmt = Math.sin(t * 0.9 + phase) * 0.32
        
        currentPoints[i].copy(base).addScaledVector(dir, driftAmt)
      }

      // Update Node geometry position attribute
      const nodePos = nodeGeo.attributes.position.array as Float32Array
      for (let i = 0; i < POINT_COUNT; i++) {
        nodePos[i * 3] = currentPoints[i].x
        nodePos[i * 3 + 1] = currentPoints[i].y
        nodePos[i * 3 + 2] = currentPoints[i].z
      }
      nodeGeo.attributes.position.needsUpdate = true

      // Rebuild Plexus Lines based on dynamic distances
      const linesPos = lineGeo.attributes.position.array as Float32Array
      const linesCol = lineGeo.attributes.color.array as Float32Array
      let lineIdx = 0

      for (let i = 0; i < POINT_COUNT; i++) {
        const pi = currentPoints[i]
        const ci = colors[i]
        
        for (let j = i + 1; j < POINT_COUNT; j++) {
          if (lineIdx >= maxLineSegments) break

          const pj = currentPoints[j]
          const cj = colors[j]
          
          const dx = pi.x - pj.x
          const dy = pi.y - pj.y
          const dz = pi.z - pj.z
          const distSq = dx * dx + dy * dy + dz * dz

          if (distSq < MAX_CONNECT_DISTANCE * MAX_CONNECT_DISTANCE) {
            const dist = Math.sqrt(distSq)
            const alpha = 1.0 - dist / MAX_CONNECT_DISTANCE

            const i6 = lineIdx * 6
            
            linesPos[i6] = pi.x
            linesPos[i6 + 1] = pi.y
            linesPos[i6 + 2] = pi.z
            
            linesPos[i6 + 3] = pj.x
            linesPos[i6 + 4] = pj.y
            linesPos[i6 + 5] = pj.z

            linesCol[i6] = ci.r * alpha
            linesCol[i6 + 1] = ci.g * alpha
            linesCol[i6 + 2] = ci.b * alpha
            
            linesCol[i6 + 3] = cj.r * alpha
            linesCol[i6 + 4] = cj.g * alpha
            linesCol[i6 + 5] = cj.b * alpha

            lineIdx++
          }
        }
      }

      lineGeo.attributes.position.needsUpdate = true
      lineGeo.attributes.color.needsUpdate = true
      lineGeo.setDrawRange(0, lineIdx * 2)

      // Update Satellites on Ring 2
      const satPos = satGeo.attributes.position.array as Float32Array
      for (let i = 0; i < satCount; i++) {
        const angle = t * 0.45 + (i / satCount) * Math.PI * 2
        satPos[i * 3] = Math.cos(angle) * ring2Radius
        satPos[i * 3 + 1] = 0
        satPos[i * 3 + 2] = Math.sin(angle) * ring2Radius
      }
      satGeo.attributes.position.needsUpdate = true

      // Update floating binary digits
      binarySprites.forEach((item) => {
        item.sprite.position.y += item.speed * delta
        item.sprite.position.x += Math.sin(t * 0.8 + item.phase) * 0.003
        
        const progress = (item.sprite.position.y - item.rangeY.min) / (item.rangeY.max - item.rangeY.min)
        const alpha = Math.sin(progress * Math.PI) * 0.55
        item.sprite.material.opacity = alpha

        if (item.sprite.position.y > item.rangeY.max) {
          item.sprite.position.y = item.rangeY.min
          const angle = Math.random() * Math.PI * 2
          const radius = GLOBE_RADIUS * (1.15 + Math.random() * 0.55)
          item.sprite.position.x = Math.cos(angle) * radius
          item.sprite.position.z = Math.sin(angle) * radius
        }
      })

      // Smooth mouse lerping
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05

      // Rotations
      mainGroup.rotation.y = t * 0.11 + mouseX * 0.45
      mainGroup.rotation.x = mouseY * 0.45

      coreMesh.rotation.y = -t * 0.25
      coreMesh.rotation.z = t * 0.15
      innerCoreMesh.rotation.y = t * 0.35

      ringPointsObj.rotation.z = t * 0.18
      dashedRing.rotation.z = -t * 0.08
      solidRing.rotation.z = t * 0.05

      renderer.render(scene, camera)
    }

    animate()

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animFrameId)
      resizeObserver.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      
      nodeGeo.dispose()
      nodeMat.dispose()
      nodeTexture.dispose()
      
      lineGeo.dispose()
      lineMat.dispose()
      
      coreGeo.dispose()
      coreMat.dispose()
      innerCoreGeo.dispose()
      innerCoreMat.dispose()
      
      ring1Geo.dispose()
      ring1Mat.dispose()
      
      ring2Geo.dispose()
      ring2Mat.dispose()
      
      satGeo.dispose()
      satMat.dispose()
      satGoldTexture.dispose()
      
      ringGeo.dispose()
      ringMat.dispose()
      goldTexture.dispose()

      binarySprites.forEach((item) => {
        item.sprite.material.dispose()
      })
      texture0.dispose()
      texture1.dispose()
      
      renderer.dispose()
    }
  }, [])

  return canvasRef
}
