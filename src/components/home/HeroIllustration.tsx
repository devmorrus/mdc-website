import { useEffect, useMemo, useRef, useState } from 'react'

import heroIllustrationSvg from '../../assets/man-working-nobg.svg?raw'

const GEAR_GROUP_PATTERN = /<g>\s*<g style="opacity:0\.3;">/g
const LOWER_PERSON_GRADIENT_ID = 'SVGID_00000139996830928737077280000015866587528419977901_'
const UPPER_PERSON_GRADIENT_ID = 'SVGID_00000109741159698382929600000008786620927554476972_'
const SVG_NS = 'http://www.w3.org/2000/svg'

interface HotspotStyle {
  left: string
  top: string
  width: string
  height: string
}

function enhanceHeroIllustrationSvg(markup: string) {
  let nextMarkup = markup.replace(/^<\?xml[^>]*>\s*/, '')

  nextMarkup = nextMarkup.replace(
    '<svg ',
    '<svg class="hero-illustration-svg" ',
  )

  let gearGroupIndex = 0
  nextMarkup = nextMarkup.replace(GEAR_GROUP_PATTERN, () => {
    gearGroupIndex += 1

    if (gearGroupIndex === 1) {
      return '<g class="hero-gear-group hero-gear-group--primary" tabindex="0"><g style="opacity:0.3;">'
    }

    if (gearGroupIndex === 2) {
      return '<g class="hero-gear-group hero-gear-group--secondary" tabindex="0"><g style="opacity:0.3;">'
    }

    return '<g><g style="opacity:0.3;">'
  })

  return nextMarkup
}

export function HeroIllustration() {
  const [activePerson, setActivePerson] = useState<'' | 'lower' | 'upper'>('')
  const [hotspots, setHotspots] = useState<{ upper: HotspotStyle | null; lower: HotspotStyle | null }>({
    upper: null,
    lower: null,
  })
  const shellRef = useRef<HTMLDivElement>(null)
  const svgMarkup = useMemo(() => enhanceHeroIllustrationSvg(heroIllustrationSvg), [])

  useEffect(() => {
    const shell = shellRef.current

    if (!shell) {
      return
    }

    const svg = shell.querySelector<SVGSVGElement>('svg')
    const lowerGradient = shell.querySelector<SVGLinearGradientElement>(`#${LOWER_PERSON_GRADIENT_ID}`)
    const upperGradient = shell.querySelector<SVGLinearGradientElement>(`#${UPPER_PERSON_GRADIENT_ID}`)

    if (!svg || !lowerGradient || !upperGradient) {
      return
    }

    const upperGroup = upperGradient.closest('g') as SVGGElement | null
    const lowerParent = lowerGradient.parentElement

    if (!upperGroup || !lowerParent) {
      return
    }

    upperGroup.classList.add('hero-person-group', 'hero-person-group--upper')
    upperGroup.setAttribute('tabindex', '0')

    let lowerGroup = lowerParent.querySelector<SVGGElement>(':scope > .hero-person-group--lower')

    if (!lowerGroup) {
      lowerGroup = document.createElementNS(SVG_NS, 'g')
      lowerGroup.classList.add('hero-person-group', 'hero-person-group--lower')
      lowerGroup.setAttribute('tabindex', '0')
      lowerParent.insertBefore(lowerGroup, lowerGradient)

      let currentNode: ChildNode | null = lowerGradient
      while (currentNode && currentNode !== upperGroup) {
        const nextNode: ChildNode | null = currentNode.nextSibling
        lowerGroup.appendChild(currentNode)
        currentNode = nextNode
      }
    }

    const viewBox = svg.viewBox.baseVal
    const lowerAnchor =
      lowerGroup.querySelector<SVGGraphicsElement>(`path[style*="fill:url(#${LOWER_PERSON_GRADIENT_ID})"]`) ?? lowerGroup

    const toHotspotStyle = (
      target: SVGGraphicsElement,
      paddingX: number,
      paddingY: number,
    ): HotspotStyle => {
      const box = target.getBBox()
      const left = ((box.x - paddingX) / viewBox.width) * 100
      const top = ((box.y - paddingY) / viewBox.height) * 100
      const width = ((box.width + paddingX * 2) / viewBox.width) * 100
      const height = ((box.height + paddingY * 2) / viewBox.height) * 100

      return {
        left: `${Math.max(left, 0)}%`,
        top: `${Math.max(top, 0)}%`,
        width: `${Math.min(width, 100)}%`,
        height: `${Math.min(height, 100)}%`,
      }
    }

    setHotspots({
      upper: toHotspotStyle(upperGroup, 80, 80),
      lower: toHotspotStyle(lowerAnchor, 120, 120),
    })
  }, [svgMarkup])

  return (
    <div
      ref={shellRef}
      className="hero-illustration-shell relative z-10 w-full max-w-[36rem] scale-105 md:max-w-[39rem] md:scale-110"
      data-active-person={activePerson}
      role="img"
      aria-label="Ilustrasi tim Morrus Digital Connecting dengan elemen pengaturan dan figur kerja interaktif."
    >
      {hotspots.upper ? (
        <button
          type="button"
          aria-label="Animasi orang bagian atas"
          className="hero-person-hotspot"
          style={hotspots.upper}
          onMouseEnter={() => setActivePerson('upper')}
          onMouseLeave={() => setActivePerson('')}
          onTouchStart={() => setActivePerson('upper')}
          onTouchEnd={() => setActivePerson('')}
          onTouchCancel={() => setActivePerson('')}
          onFocus={() => setActivePerson('upper')}
          onBlur={() => setActivePerson('')}
        />
      ) : null}
      {hotspots.lower ? (
        <button
          type="button"
          aria-label="Animasi orang bagian bawah"
          className="hero-person-hotspot"
          style={hotspots.lower}
          onMouseEnter={() => setActivePerson('lower')}
          onMouseLeave={() => setActivePerson('')}
          onTouchStart={() => setActivePerson('lower')}
          onTouchEnd={() => setActivePerson('')}
          onTouchCancel={() => setActivePerson('')}
          onFocus={() => setActivePerson('lower')}
          onBlur={() => setActivePerson('')}
        />
      ) : null}
      <div
        className="hero-illustration-markup"
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    </div>
  )
}
