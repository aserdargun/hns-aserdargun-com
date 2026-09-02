import type { Locale } from '../content/schema'

export const copy = {
  product: { tr: 'Harness Mühendisliği Gözlemevi', en: 'Harness Engineering Observatory' },
  navigation: {
    weekly: { tr: 'Haftalık', en: 'Weekly' },
    radar: { tr: 'Radar', en: 'Radar' },
    compare: { tr: 'Karşılaştır', en: 'Compare' },
    knowledge: { tr: 'Bilgi', en: 'Knowledge' },
    patterns: { tr: 'Desenler', en: 'Patterns' },
    timeline: { tr: 'Zaman Çizgisi', en: 'Timeline' },
    methodology: { tr: 'Metodoloji', en: 'Methodology' },
  },
  menu: { tr: 'Menü', en: 'Menu' },
  notFound: { tr: 'Sayfa bulunamadı', en: 'Page not found' },
  notFoundBody: {
    tr: 'Aradığınız araştırma görünümü mevcut değil.',
    en: 'The research view you requested does not exist.',
  },
  latestWeekly: { tr: 'Son haftalığa dön', en: 'Return to latest weekly' },
  reviewed: { tr: 'İnceleme', en: 'Reviewed' },
} as const

export function t<T extends { tr: string; en: string }>(value: T, locale: Locale): string {
  return value[locale]
}
