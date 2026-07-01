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
 *     includeRoot: false,
 *     from: { y: 50, scale: 0.95 },
 *     to: { stagger: 0.1, ease: 'back.out(1.1)' },
 *   })
 */

import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

interface RevealOptions<T extends Element = HTMLElement> {
  /** GSAP fromVars. Default: { y: 24, autoAlpha: 0 } */
  from?: gsap.TweenVars
  /** GSAP toVars merged with defaults. Default: { y: 0, autoAlpha: 1, duration: 0.85, ease: 'power2.out' } */
  to?: gsap.TweenVars
  /** Callback returning extra targets to animate (e.g. cardsRef.current). */
  targets?: (root: T) => (Element | null | undefined)[] | NodeListOf<Element>
  /** Also animate the root ref together with targets. Default true if no targets are provided, otherwise false. */
  includeRoot?: boolean
  /** Observe each target individually instead of animating the whole group at once. */
  observeEachTarget?: boolean
  /** IntersectionObserver threshold. Default 0.12 */
  threshold?: number
  /** IntersectionObserver root margin. Default "0px 0px -10% 0px" */
  rootMargin?: string
  /** Disconnect after first trigger? Default true */
  once?: boolean
  /** Delay in seconds before animation starts. Default 0 */
  delay?: number
}

const CLEAR_PROPS = 'transform,opacity,visibility,willChange'
const useSafeLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useGsapReveal<T extends Element = HTMLElement>(options: RevealOptions<T> = {}) {
  const ref = useRef<T>(null)

  useSafeLayoutEffect(() => {
    if (!ref.current) return
    const {
      from = { y: 24, autoAlpha: 0 },
      to = {},
      targets,
      includeRoot,
      observeEachTarget = false,
      threshold = 0.12,
      rootMargin = '0px 0px -10% 0px',
      once = true,
      delay = 0,
    } = options

    const toDefaults: gsap.TweenVars = {
      y: 0,
      autoAlpha: 1,
      duration: 0.85,
      ease: 'power2.out',
      delay,
      clearProps: CLEAR_PROPS,
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const shouldIncludeRoot = includeRoot ?? !targets
    const tweenVars = { ...toDefaults, ...to }
    const tweenRefs: gsap.core.Tween[] = []

    const resolveTargets = () => {
      const resolvedTargets = targets ? Array.from(targets(ref.current as T) ?? []) : []
      const collectedTargets = shouldIncludeRoot ? [ref.current, ...resolvedTargets] : resolvedTargets

      return Array.from(new Set(collectedTargets.filter((target): target is Element => Boolean(target))))
    }

    const animTargets = resolveTargets()
    if (animTargets.length === 0) return

    if (prefersReducedMotion) {
      gsap.set(animTargets, { clearProps: CLEAR_PROPS })
      return
    }

    gsap.set(animTargets, {
      ...from,
      willChange: 'transform, opacity',
      overwrite: 'auto',
    })

    const animateTargets = (targetsToAnimate: Element[]) => {
      if (targetsToAnimate.length === 0) return
      tweenRefs.push(gsap.to(targetsToAnimate, { ...tweenVars, overwrite: 'auto' }))
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        if (observeEachTarget) {
          animateTargets([entry.target])

          if (once) {
            observer.unobserve(entry.target)
          }

          return
        }

        animateTargets(animTargets)

        if (once) {
          observer.disconnect()
        }
      })
    }, { threshold, rootMargin })

    if (observeEachTarget) {
      animTargets.forEach((target) => observer.observe(target))
    } else {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
      tweenRefs.forEach((tween) => tween.kill())
    }
  }, [])

  return ref
}
