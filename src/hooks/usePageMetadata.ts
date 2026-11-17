import { useEffect } from 'react'

interface UsePageMetadataParams {
  title: string
  description: string
  canonicalPath?: string
  /** Set true untuk halaman yang tidak boleh diindeks (mis. 404 / slug tidak ditemukan). */
  noIndex?: boolean
}

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.morrusdigitalconnecting.com').replace(/\/$/, '')

function getCanonicalUrl(canonicalPath?: string) {
  const path = canonicalPath ?? window.location.pathname
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '')
  return `${SITE_URL}${normalizedPath}`
}

/**
 * Set atribut pada elemen <head>, buat elemen bila belum ada.
 * Mengembalikan fungsi untuk mengembalikan nilai sebelumnya.
 */
function setHeadElement(
  tagName: 'meta' | 'link',
  matchAttribute: string,
  matchValue: string,
  valueAttribute: string,
  value: string,
): () => void {
  let element = document.head.querySelector<HTMLElement>(`${tagName}[${matchAttribute}="${matchValue}"]`)
  const created = !element
  const previousValue = element?.getAttribute(valueAttribute) ?? null

  if (!element) {
    element = document.createElement(tagName)
    element.setAttribute(matchAttribute, matchValue)
    document.head.appendChild(element)
  }

  element.setAttribute(valueAttribute, value)

  return () => {
    if (!element) return
    if (created) {
      element.remove()
    } else if (previousValue !== null) {
      element.setAttribute(valueAttribute, previousValue)
    }
  }
}

export function usePageMetadata({ title, description, canonicalPath, noIndex = false }: UsePageMetadataParams): void {
  useEffect(() => {
    const previousTitle = document.title
    const canonicalUrl = getCanonicalUrl(canonicalPath)

    document.title = title

    const restoreFns = [
      setHeadElement('meta', 'name', 'description', 'content', description),
      setHeadElement('link', 'rel', 'canonical', 'href', canonicalUrl),
      setHeadElement('meta', 'name', 'robots', 'content', noIndex ? 'noindex, follow' : 'index, follow'),
      setHeadElement('meta', 'property', 'og:title', 'content', title),
      setHeadElement('meta', 'property', 'og:description', 'content', description),
      setHeadElement('meta', 'property', 'og:url', 'content', canonicalUrl),
      setHeadElement('meta', 'name', 'twitter:title', 'content', title),
      setHeadElement('meta', 'name', 'twitter:description', 'content', description),
    ]

    return () => {
      document.title = previousTitle
      restoreFns.forEach((restore) => restore())
    }
  }, [canonicalPath, description, noIndex, title])
}
