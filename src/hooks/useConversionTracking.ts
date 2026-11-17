import { useEffect } from 'react'
import { trackEvent } from '../utils/trackEvent'

function getLinkEventName(href: string): string | null {
  if (href.includes('wa.me/') || href.includes('api.whatsapp.com')) return 'whatsapp_click'
  if (href.startsWith('mailto:')) return 'email_click'
  if (href.startsWith('tel:')) return 'phone_click'
  if (/\.pdf($|[?#])/i.test(href)) return 'file_download'
  return null
}

/**
 * Satu listener global untuk klik CTA penting (WhatsApp, email, telepon, unduh PDF),
 * sehingga semua tautan di seluruh section ikut terlacak tanpa mengubah tiap komponen.
 */
export function useConversionTracking(): void {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null
      const link = target?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!link) return

      const href = link.getAttribute('href') ?? ''
      const eventName = getLinkEventName(href)
      if (!eventName) return

      trackEvent(eventName, {
        link_url: link.href,
        link_text: (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 100),
      })
    }

    document.addEventListener('click', handleClick, { capture: true })
    return () => document.removeEventListener('click', handleClick, { capture: true })
  }, [])
}
