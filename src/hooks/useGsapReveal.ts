/**
 * useGsapReveal – hook ringan untuk scroll-triggered GSAP reveal.
 *
 * Menggantikan pola berulang IntersectionObserver + gsap.fromTo
 * yang ada di setiap section. Satu hook, cleanup otomatis, zero-
 * tween jika user prefer reduced motion.
 *
 * Usage:
 *   const sectionRef = useGsapReveal<HTMLElement>()
 *   const ref = useGsapReveal<HTMLDivElement>({ from: { x: -40 }, once: true })
 *
 *   // Multiple targets staggered
 *   const sectionRef = useGsapReveal<HTMLElement>({
 *     targets: () => cardsRef.current,
 *     from: { y: 50, scale: 0.95 },
 *     to: { stagger: 0.1, ease: 'back.out(1.1)' },
 *   })
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface RevealOptions {
  /** GSAP fromVars. Default: { y: 30, opacity: 0 } */
  from?: gsap.TweenVars
  /** GSAP toVars merged with defaults. Default: { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out' } */
  to?: gsap.TweenVars
  /** Callback returning extra targets to animate (e.g. cardsRef.current). Root ref is always animated. */
  targets?: () => (Element | null | undefined)[] | NodeListOf<Element>
  /** IntersectionObserver threshold. Default 0.1 */
  threshold?: number
  /** Disconnect after first trigger? Default true */
  once?: boolean
  /** Delay in seconds before animation starts. Default 0 */
  delay?: number
}

export function useGsapReveal<T extends Element = HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !ref.current) return

    const {
      from = { y: 30, opacity: 0 },
      to = {},
      targets,
      threshold = 0.1,
      once = true,
      delay = 0,
    } = options

    const toDefaults: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration: 0.65,
      ease: 'power3.out',
      delay,
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const animTargets = targets
            ? [ref.current, ...Array.from(targets() ?? [])]
            : [ref.current]

          gsap.fromTo(
            animTargets.filter(Boolean),
            from,
            { ...toDefaults, ...to },
          )

          if (once) observer.disconnect()
        })
      },
      { threshold },
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}