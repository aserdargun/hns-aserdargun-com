import type { Locale } from '../content/schema'

const localeKey = 'hns-locale'

export function isLocale(value: unknown): value is Locale {
  return value === 'tr' || value === 'en'
}

export function readStoredLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(localeKey)
  return isLocale(stored) ? stored : 'en'
}

export function rememberLocale(locale: Locale) {
  window.localStorage.setItem(localeKey, locale)
}

export function localizedPath(path: string, targetLocale: Locale): string {
  const url = new URL(path, 'https://hns.aserdargun.com')
  const parts = url.pathname.split('/').filter(Boolean)
  if (isLocale(parts[0])) parts[0] = targetLocale
  else parts.unshift(targetLocale)
  return `/${parts.join('/')}${url.search}${url.hash}`
}
