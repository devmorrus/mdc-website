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
      gsap.set(tweenTargets, {
        y: 18,
        autoAlpha: 0,
        scale: 0.996,
        force3D: true,
        willChange: 'transform, opacity',
      })

      gsap.to(tweenTargets, {
        y: 0,
        autoAlpha: 1,
        scale: 1,
        duration: 0.92,
        ease: 'power2.out',
        stagger: 0.095,
        delay: 0.08,
        clearProps: 'transform,opacity,visibility,willChange',
      })
    }, scope)

    return () => {
      context.revert()
    }
  }, [scope])
}
