import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '')
      const element = document.getElementById(elementId)

      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start' })
        return
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.hash, location.pathname])

  return null
}
