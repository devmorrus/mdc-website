import { useLayoutEffect } from 'react'
import gsap from 'gsap'

interface UseHomeHeroAnimationParams {
  scope: React.RefObject<HTMLElement | null>
}

export function useHomeHeroAnimation({ scope }: UseHomeHeroAnimationParams): void {
  useLayoutEffect(() => {
    if (!scope.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tweenTargets = Array.from(scope.current.querySelectorAll<HTMLElement>('[data-hero-animate]'))

    if (tweenTargets.length === 0) return

    const context = gsap.context(() => {
      gsap.from(tweenTargets, {
        y: 18,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.08,
      })
    }, scope)

    return () => {
      context.revert()
    }
  }, [scope])
}
