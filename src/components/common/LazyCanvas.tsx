/**
 * LazyCanvas – wrapper yang menunda mount Three.js canvas sampai
 * element masuk viewport. Drastis mengurangi beban saat halaman pertama dibuka
 * karena canvas di bawah fold tidak diinisialisasi sama sekali.
 *
 * Usage:
 *   <LazyCanvas className="h-80 w-full">
 *     {(ref) => <MyThreeCanvas mountRef={ref} />}
 *   </LazyCanvas>
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface LazyCanvasProps {
  className?: string
  /** rootMargin untuk IntersectionObserver, default "200px" (preload 200px sebelum masuk) */
  rootMargin?: string
  children: (mountRef: React.RefObject<HTMLDivElement | null>) => ReactNode
  /** Placeholder saat belum dimount – default div kosong dengan bg gradient */
  placeholder?: ReactNode
}

export function LazyCanvas({
  className = '',
  rootMargin = '200px',
  children,
  placeholder,
}: LazyCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const [shouldMount, setShouldMount] = useState(false)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {shouldMount ? (
        <div ref={mountRef as React.RefObject<HTMLDivElement>} className="h-full w-full">
          {children(mountRef)}
        </div>
      ) : (
        placeholder ?? (
          <div className="h-full w-full rounded-inherit bg-linear-to-br from-blue-900/20 to-blue-950/40" />
        )
      )}
    </div>
  )
}