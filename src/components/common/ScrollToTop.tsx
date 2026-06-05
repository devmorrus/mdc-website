import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    const hasNamedHash = location.hash.length > 1

    if (hasNamedHash) {
      const elementId = location.hash.replace('#', '')
      const element = document.getElementById(elementId)

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [location.hash, location.pathname])

  return null
}
