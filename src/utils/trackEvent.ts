type TrackEventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/**
 * Kirim event ke Google Tag Manager (dataLayer).
 * Aman dipanggil walau GTM belum termuat atau diblokir.
 */
export function trackEvent(event: string, params: TrackEventParams = {}): void {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    page_path: window.location.pathname,
    ...params,
  })
}
